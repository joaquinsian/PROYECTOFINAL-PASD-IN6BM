'use strict'
const express = require('express')
const loginController = require('../controller/login.controller')

var api = express.Router();
api.post('/login', loginController.login);

module.exports = api;