
const express = require('express');
const router = express.Router();

// Ficheros API
const apiUsersRouter = require('./api/users.api');

// Rutas
router.use('/users',  apiUsersRouter);

module.exports = router;