import express from 'express';
import {getSingleUser, getUsers} from '../controllers/user.controller.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router()

router.get('/users',validateToken,getUsers)
router.get('/:id',validateObjectId,getSingleUser)


export default router