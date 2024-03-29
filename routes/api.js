
const express = require('express');
const router = express.Router();
const { checkToken } = require('../libs/jwt');
// Ficheros API
const apiUsersRouter = require('./api/users.api');
const apiConnectionsRouter = require('./api/connections.api');
const apiTransactionsRouter = require('./api/transactions.api');
// Rutas
router.use('/users',  apiUsersRouter);
router.use('/connections',checkToken,  apiConnectionsRouter);
router.use('/transactions',checkToken,  apiTransactionsRouter);

module.exports = router;