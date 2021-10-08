var express = require('express');
var router = express.Router();

/* PROBLEM B */
router.get('/get', function(req, res, next) {
    res.render('get', { string: 'THIS IS A STRING' });
});

/* PROBLEM C use postman to view! */
router.post('/post', function(req, res, next) {
   res.render('post', {'response': req.body.input, 'length': req.body.input.length});
});

/* PROBLEM D */
router.get('/names/:pname', ((req, res, next) => {
    res.render('name', {'name': req.params.pname});
}));



module.exports = router;
