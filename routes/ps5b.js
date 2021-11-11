const express = require('express');
const redis = require('redis');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const router = express.Router();
const request = require('request');
const {response} = require("express");

/* CONFIG FILE */
let config = require('../config.json');

/* CLIENT STUFF */
const {promisify} = require('util');
const client = redis.createClient(6379);
const getAsync = promisify(client.get).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);

client.flushdb((err, success) => {
    if (err) {
        throw new Error(err)
    }
});

/** GET */
/* Input a city in the path, get its data back. If done within 15 seconds, it will be cached. */
router.get('/:city', async (req, res, next) => {
    console.log("Here!");
    let city = req.params.city;
    if (await existsAsync(city)) {
        console.log("Found data!");
        let cityData = await getAsync(city);
        let response = {
            cityData: cityData,
            cached: true
        }
        res.send(response);

    } else {
        console.log("Didn't find anything.");
        let returnValueRaw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + config.apikey);
        let cityData = await returnValueRaw.json();
        await setAsync(city, JSON.stringify(cityData));
        let response = {
            cityData: cityData,
            cached: false
        }
        await expireAsync(city, 15);
        res.send(response)
    }
});



/** POST */
/* Same as above, but POST method variant. Use postman to test. */
router.post('/post', async (req, res, next) => {
    console.log(JSON.stringify(req.body.city));
    let city = req.body.city;
    if (await existsAsync(city)) {
        console.log("Found data!");
        let cityData = await getAsync(city);
        let response = {
            cityData: cityData,
            cached: true
        }
        res.send(response);

    } else {
        console.log("Didn't find anything.");
        let returnValueRaw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + config.apikey);
        let cityData = await returnValueRaw.json();
        await setAsync(city, JSON.stringify(cityData));
        let response = {
            cityData: cityData,
            cached: false
        }
        await expireAsync(city, 15);
        res.send(response)
    }
});

module.exports = router;