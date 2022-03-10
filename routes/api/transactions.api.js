const router = require('express').Router();
const Models = require('../../libs/db.js');
const transactionsService = require("../../services/transactions.service");
const usersService = require("../../services/users.service");
const connectionsService = require("../../services/connections.service");

const TransactionsController = require('../../controllers/transactions.controller')(new transactionsService(Models), new connectionsService(Models), new usersService(Models));


router.post('/', TransactionsController.addTransaction);



module.exports = router;