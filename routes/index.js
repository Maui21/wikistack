const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    console.log('I\'m ALIIIIVE!!')
    res.send('I\'m still alive')
})

module.exports = router;
