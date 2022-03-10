const router = require('express').Router();
const Models = require('../../libs/db.js');
const usersService = require("../../services/users.service");


const UserController = require('../../controllers/users.controller')(new usersService(Models));;

router.get('/', UserController.getUsers);
router.post('/', UserController.add);
router.post('/login',UserController.login);


module.exports = router;
