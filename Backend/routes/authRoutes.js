import express from 'express';
import {register, login, getUsers} from '../controllers/auth.controller.js';

//router
const router = express.Router()

//routes
router.get('/users',getUsers)
router.post('/register',register)
router.post('/login',login)

//export
export default router