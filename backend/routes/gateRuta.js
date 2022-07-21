import {createGate, updateGate, deleteGate, getAllConsumos, getConsumoInDays, getAllGates, saveAndCleanConsumoProm} from '../controllers/gateControl.js'
import {verifyToken}from '../middlewares/tokenValid.js'

import express from 'express'

const router = express.Router()

router.get("/allConsumo", verifyToken, getAllConsumos)
router.get("/allGates", verifyToken, getAllGates)
router.get("/consumoInDays/:id?/:days?", verifyToken, getConsumoInDays)
router.put("/saveAndCleanHist", verifyToken, saveAndCleanConsumoProm)
router.post("/create",verifyToken, createGate)
router.put("/update", verifyToken, updateGate)
router.delete("/delete", verifyToken, deleteGate)

export default router