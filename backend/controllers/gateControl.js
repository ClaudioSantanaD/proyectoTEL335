import {Gate} from '../models/gateModel.js'
import {UserAqua} from '../models/userModel.js'
import {Uptake} from '../models/consumeModel.js'
import {Historial} from '../models/histModel.js'

export const createGate = async (req, res) => {

    const {name, room, ratio, VEL} = req.body

    try{
        let newGate = new Gate( {name, room, ratio, VEL, user:req.user} )
        await newGate.save()
        let gateCreated = await Gate.findOne({name, user:req.user})

        let someUser = await UserAqua.findByIdAndUpdate(req.user, {$addToSet: {myGates:gateCreated._id}})

        res.json({message: "Llave guardada exitosamente", user: someUser.username})

    }catch(e){
        res.status(400).json({error:e.message})
        console.log(e)
    }
}

export const updateGate = async (req, res) => {
    
    const {someName, newRatio, newVel} = req.body

    try{

        let someGate = await Gate.findOneAndUpdate({name:someName, user:req.user}, {ratio:newRatio, VEL:newVel})
        if(!someGate) res.status(400).json({message:'No existe la llave dada'})

        res.json({message: "Llave actualizada exitosamente"})

    }catch(e){
        res.status(400).json(e)
        console.log(e)
    }

}

export const deleteGate = async (req, res) => {
    const {someName} = req.body

    try{

        let someGate = await Gate.findOneAndDelete({name:someName, user:req.user})
        if(!someGate) res.status(400).json({message:'No existe la llave dada'})

        res.json({message: "Se ha eliminado la llave"})


    }catch(e){
        res.status(400).json({error:e.message})
        console.log(e)
    }
}

export const getAllConsumos = async (req, res) => {
    
    try{
        
        let someUser = await UserAqua.findById(req.user)
        if(!someUser) res.status(400).json({message:'No se encuentra este usuario'})

        let consumos = await Uptake.find({ gate: { $in: someUser.myGates } })

        res.json(consumos)

    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

export const getAllGates = async (req, res) => {
    
    try{
        
        let someUser = await UserAqua.findById(req.user)
        if(!someUser) res.status(400).json({message:'No se encuentra este usuario'})

        let llaves = await Gate.find({ _id: { $in: someUser.myGates } })
        res.json(llaves)

    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e)
    }


}

export const getConsumoInDays = async (req, res) => {
    const {id, days} = req.params

    let aGate = await Gate.findOne({id, user: req.user})
    let gateUptakes = await aGate.getDaysConsumo(days, id)
    //TODO -> SACAR EL PROMEDIO DE gateUptakes SEGUN EL NUMERO DE DIAS DADO
    res.json(gateUptakes)


}

export const saveAndCleanConsumoProm = async (req, res) =>{
    const {nameGate, days} = req.body

    let aGate = await Gate.findOne({name:nameGate, user: req.user})
    let gateUptakes = await aGate.getDaysConsumo(days, aGate._id)

    let sum = 0 
    gateUptakes.map(async function (consumo){
        sum += consumo.waterMili

        let remFromGate = await Gate.findByIdAndUpdate(consumo.gate,{$pull: { uptakes: {$in: consumo._id}}})
        let remCons = await Uptake.findByIdAndDelete(consumo.id)
    })

    let register = new Historial({consumoPromedio: (sum/days).toFixed(2), dias: days, user: req.user})
    await register.save()

    registerCreated = await Historial.findOne({consumoPromedio: (sum/days).toFixed(2), dias: days, user: req.user})

    let someUser = await UserAqua.findByIdAndUpdate(req.user, {$addToSet: {history:registerCreated._id}})

    res.json({message: "Historial guardado y limpiado de la tabla consumos", promedio: (sum/days).toFixed(2), dias:days})
}

