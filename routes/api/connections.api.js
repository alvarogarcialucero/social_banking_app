const router = require('express').Router();
const Models = require('../../libs/db.js');
const connectionsService = require("../../services/connections.service");
const userssService = require("../../services/users.service");

const ConnectionsController = require('../../controllers/connections.controller')(new connectionsService(Models), new userssService(Models));


router.post('/', ConnectionsController.requestConnection);
router.get('/:account', ConnectionsController.getConnections);
router.post('/approve', ConnectionsController.approveConnection);



module.exports = router;
