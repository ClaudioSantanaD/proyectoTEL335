import {createConsumo, getGateConsumo} from '../controllers/consumeControl.js'
import {verifyToken}from '../middlewares/tokenValid.js'

import express from 'express'

const router = express.Router()

router.post("/create", verifyToken, createConsumo)
router.get("/gateById/:id?", verifyToken, getGateConsumo)

export default router