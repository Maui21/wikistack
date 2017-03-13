const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/add', function (req, res, next) {
    res.render('addpage')
})

router.get('/users/:id', function(req, res, next) {
  User.findOne({
    where: {
        id: req.params.id
    }
  }).then(function(users){
      console.log(users)
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/users', function(req, res, next) {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        },
        include: [{ all: true }]
    })
        .then(function (foundPage) {
            res.render('wikipage', foundPage.dataValues)
        })
        .catch(next);
})

router.get('/', function (req, res, next) {
    Page.findAll({})
        .then(function (allPages) {
            res.render('index', { pages: allPages })
        })
        .catch(next);
})
router.post('/', function (req, res, next) {
    var page = Page.build({
        title: req.body.title,
        status: req.body.status,
        content: req.body.content
    });
    var user = User.findOrCreate({
        where: {
            name: req.body.author,
            email: req.body.email
        }
    })
        .then(function (user) {
            return page.save()
            .then(function (savedPage) {
                return savedPage.setAuthor(user[0])
            })
        })
        .then(function(page){
            res.redirect(page.fullUrl)
        })
        .catch(next);
})

module.exports = router;
