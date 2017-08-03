const express = require('express');
const router = express.Router();
const Bug = require('../models/bug');

router.get('/bugs', function(req,res,next){
	Bug.find({}).then(function(post){
		res.send(post);
	});
});

router.post('/bugs', function(req,res,next){
	Bug.create(req.body).then(function(post){
		res.send(post);
	}).catch(next);
});

router.put('/bugs/:id', function(req,res,next){
	Bug.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Bug.findOne({_id: req.params.id}).then(function(post){
			res.send(post);
		});	
	});
});

module.exports = router;