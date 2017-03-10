const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const nunjucks = require('nunjucks')
const router = require('./routes/index.js')
const models = require('./models');

//app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', router)



var env = nunjucks.configure('views', {noCache: true}); // have res.render work with html files
app.set('view engine', 'html');                         // when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

// app.listen(3000, function () {
// 	console.log('Express started on http://localhost:' + 3000);
// });