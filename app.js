const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

var env = nunjucks.configure('views', {noCache: true}); // have res.render work with html files
app.set('view engine', 'html');                         // when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.listen(3007, function () {
	console.log('Express started on http://localhost:' + 3007);
});