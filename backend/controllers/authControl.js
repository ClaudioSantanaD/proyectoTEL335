import { UserAqua } from '../models/userModel.js'
import { tokenGen, tokenRefreshGen } from '../helpers/tokenManager.js'
import {validationResult} from 'express-validator'

export const registerUser = async (req, res) => {
    //console.log(req.body)

    const {username, name, email, password} = req.body

    try {
        let emailCheq = await UserAqua.findOne({email: email})
        if(emailCheq) res.status(400).json({message:"Este usuario ya existe >:c"} ) 

        let usuario = new UserAqua({username, name, email, password })
        await usuario.save()

        res.status(201).json({messagge: "User registrado"})


    } catch(error){
        res.status(400).json(error)
        console.log(error)
    }

    //console.log(req.body)
}

export const loginUser = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors)
    }

    const {email, password} = req.body
    try {

        const usuario = await UserAqua.findOne({email})
        if(!usuario) res.status(403).json({message:'Error, datos dados erroneos'})

        if(!await usuario.comparePass(password)) res.status(403).json({message:'Error, datos dados erroneos'})

        const {token} = tokenGen(usuario.id)
        tokenRefreshGen(usuario.id, res)

        res.json({
            message:"Login Exitoso",
            token
        })

    } catch(error) {
        res.status(400).json(error)
        console.log(error)
    }

}

export const logoutUser = (req,res) => {
    res.clearCookie('refreshToken')
    res.json({'ok':true})
}

export const freshToken = (req, res) => {
    try{
        const {token} = tokenGen(req.user)
        return res.json({token})
    }catch(e){
        console.log(e)
    }
}

export const getNames = async (req, res) => {
    
    const {id} = req.params
    
    try{

        let someUsuario = await UserAqua.findById(id).lean()
        res.json({
            'name': someUsuario['name'],
            'userame': someUsuario['username']
        })

    }catch(e){
        console.log(e)
    }
}