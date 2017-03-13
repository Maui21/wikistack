const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

// var generateUrlTitle = function (title) {
//     if (title) {
//         // Removes all non-alphanumeric characters from title
//         // And make whitespace underscore
//         return title.replace(/\s+/g, '_').replace(/\W/g, '');
//     } else {
//         // Generates random 5 letter string
//         return Math.random().toString(36).substring(2, 7);
//     }
// }

router.get('/add', function (req, res, next) {
    res.render('addpage')
})
router.get('/', function (req, res, next) {
    res.render('index')
})
router.post('/', function (req, res, next) {
    var page = Page.build({
        title: req.body.title,
        status: req.body.status,
        content: req.body.content
        // urlTitle: generateUrlTitle(req.body.title)
    });
    var user = User.build({
        name: req.body.author,
        email: req.body.email
    })
    page.save()
    .then(function(){
        res.json(page)
    })
    user.save()
    // res.redirect('/wiki')
})

module.exports = router;
