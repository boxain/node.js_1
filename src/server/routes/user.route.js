/* user.route.js */
import express from 'express';
import userCtrl from '../controllers/user.controller';
import paramValidation from '../../config/param-validation';
const {validate , ValidationError} = require('express-validation');

const router = express.Router();
router.post('/',validate(paramValidation.createUser,{},{}),userCtrl.userPost);
router.route('/').get(userCtrl.userGet);
router.route('/:user_id').put(userCtrl.userPut);
router.route('/:user_id').delete(userCtrl.userDelete);
router.route('/login').post(userCtrl.userLogin);


export default router;
