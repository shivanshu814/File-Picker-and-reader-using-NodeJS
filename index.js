/* @format */

let express = require('express');
let app = express();
var mammoth = require('mammoth');
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (request, file, callback) {
		callback(null, './uploads/');
	},
	filename: function (request, file, callback) {
		callback(null, 'uploaded');
	},
});

var upload = multer({ storage: storage });

app.use(express.json());

app.get('/', function (req, res) {
	res.sendFile('/index.html', { root: '.' });
});

app.post(
	'/fileupload',
	upload.single('inputdoc'),
	async function (req, res, next) {
		var result = await mammoth.extractRawText({ path: req.file.path });
		var text = result.value;

		return res.send(text);
	}
);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server ran!');
});
