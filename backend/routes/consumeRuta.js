import {createConsumo, getConsumo} from '../controllers/consumeControl.js'
import {verifyToken}from '../middlewares/tokenValid.js'

import express from 'express'

const router = express.Router()

router.post("/create", verifyToken, createConsumo)
router.get("/byId/:id?", verifyToken, getConsumo)

export default router