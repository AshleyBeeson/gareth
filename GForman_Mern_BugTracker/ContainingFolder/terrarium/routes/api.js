const express = require('express');
const router = express.Router();
const Bug = require('../models/bug');

router.get('/bugs', function(req,res,next){
	Bug.find({}).then(function(post){
		res.send(post);
	});
});

module.exports = router;