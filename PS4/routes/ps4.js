var express = require('express');
var router = express.Router();
const request = require('request');
const {response} = require("express");

/* CONFIG FILE */
let config = require('../config.json');

/* HTML FORM */
router.get('/', function(req, res, next) {
    res.render('form');
});





/* PROMISE VARIANT */
router.post('/promise', function(req, res, next) {
    let city = req.body.city;
    return new Promise((resolve, reject) => {
        request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + config.apikey,
            function(error, response, body) {
                if (response.statusCode == 200) {
                    let data = JSON.parse(body);
                    resolve(data);
                } else {
                    reject(response);
                }
        });
    })
        .then((data) => {
                //resolve
                res.render('post', {'weatherdata' : data.weather[0].description, 'cityname' : data.name,
                    'temperature' : data.main.temp});
            },
            //reject
            (data) => {
                res.render('index', {title: response.statusMessage});
            }
        );

});









/* ASYNC / AWAIT VARIANT */
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.post('/await', function(req, res, next) {
    let city = req.body.city;
    async function ratesAsync() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + config.apikey);
        const data = await response.json();
        console.log(data);
        return data
    }

    ratesAsync()
        .then(function (data) {
                res.render('post', {'weatherdata' : data.weather[0].description, 'cityname' : data.name,
                    'temperature' : data.main.temp});
            },
            (err) => console.log(`${err}`) //reject
        )
        .then(() => console.log('All done.'))

});







/* CALLBACK VARIANT */
router.post('/callback', function(req, res, next) {
    let city = req.body.city;
    const delayed = function ( callback ) {
            request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + config.apikey,
                function(error, response, body) {
                    if (response.statusCode == 200) {
                        let data = JSON.parse(body);
                        callback(data);
                    }
                });
    }

    const data = delayed(function (data) {
        res.render('post', {'weatherdata' : data.weather[0].description, 'cityname' : data.name,
            'temperature' : data.main.temp});
        }
    )
});





module.exports = router;