const express = require('express')
const bodyParser = require('body-parser')
const testRouter = express.Router()

const userViewController = require('../controller/userViewController')
const jsonParser = bodyParser.json()

testRouter.get('/allUserViews', jsonParser, userViewController.allUserViews)
testRouter.get('/uniqueUserView', jsonParser, userViewController.uniqueUserView)

module.exports = testRouter

