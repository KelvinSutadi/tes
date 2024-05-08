const CulinaryController = require('../controller/culinaryController');

const culinary = require('express').Router();

culinary.post("/", CulinaryController.createCulinary);
culinary.get("/", CulinaryController.getCulinary);
module.exports = culinary