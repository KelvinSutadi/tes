const SightsController = require('../controller/sightsController');

const sights = require('express').Router();

sights.post("/", SightsController.createSight);
sights.get("/", SightsController.getSights);
module.exports = sights