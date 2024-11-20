import express from 'express';
import {testUserController} from '../controllers/test.controller.js';

//router
const router = express.Router();

//routes
router.get('/test-user',testUserController)

//export
export default router