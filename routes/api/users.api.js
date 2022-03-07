const router = require('express').Router();
const Models = require('../../libs/db.js');
const userService = require("../../services/user.service");


const UserController = require('../../controllers/users.controller')(new userService(Models));;

router.get('/', UserController.getUsers);
router.post('/', UserController.add);


module.exports = router;
