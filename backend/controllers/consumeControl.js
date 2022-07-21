import {Gate} from '../models/gateModel.js'
import {Uptake} from '../models/consumeModel.js'

export const createConsumo = async (req, res) => {
    
    const {nameGate, timeUse } = req.body

    try{

        let someGate = await Gate.findOne({name:nameGate, user:req.user})
        if(!someGate) res.status(400).json({message:'No se encuentra esta llave'})

        let newConsumo = new Uptake({gate:someGate.id, timeUse:timeUse})
        await newConsumo.save()
        let consumoCreated = await Uptake.findOne({gate:someGate.id, timeUse:timeUse})

        let hisGate = await Gate.findByIdAndUpdate(someGate.id, {$addToSet: {uptakes:consumoCreated._id}})

        res.json({message: "Consumo registrado", milliliters: consumoCreated.waterMili, gate: hisGate.name})


    }catch(e){
        res.status(400).json({error:e.message})
        console.log(e)
    }
}

export const getConsumo = async (req, res) => {

    const{id} = req.params

    try{
        let someUptake = await Uptake.findById(id).lean()
        let gateName = await Gate.findById(someUptake.gate).lean()
        res.json(gateName['name'])
    }catch(e){
        console.log(e)
    }

}
