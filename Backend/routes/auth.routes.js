import express from 'express';
import {register, login} from '../controllers/auth.controller.js';

//router
const router = express.Router()

//routes
router.post('/register',register)
router.post('/login',login)

//export
export default router