import {loginUser, registerUser, logoutUser, freshToken, getNames} from '../controllers/authControl.js'
import { userValid } from '../middlewares/userValid.js'
import {reToken} from '../middlewares/tokenValid.js'
import {body} from 'express-validator'
import express from 'express'

const router = express.Router()

router.post("/login",
    [body("email","Ingrese un email valido").trim().isEmail().normalizeEmail().escape(),
    body("password","Ingrese contraseña valida de minimo 8 caracteres").trim().isLength({min:8}).escape()],
    userValid,
    loginUser)

router.post("/register", 
    [body("username","Ingresa un username valido").trim().notEmpty().escape(),
    body("email","Ingrese un email valido").trim().isEmail().normalizeEmail().escape(),
    body("password","Ingrese contraseña valida de minimo 8 caracteres").trim().isLength({min:8}).escape()], 
    userValid,
    registerUser)

router.get("/refresh", reToken, freshToken)
router.get("/logout", logoutUser)
router.get("/names/:id?", getNames)

export default router