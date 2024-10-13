const seedRouter = require('express').Router();

const { seedUsers } = require('../controllers/seedController');

seedRouter.post('/',seedUsers)

module.exports = {seedRouter}