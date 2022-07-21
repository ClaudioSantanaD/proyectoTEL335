import {Gate} from '../models/gateModel.js'
import mongoose from "mongoose"
const { Schema, model} = mongoose

const uptakeSchema = new Schema({
    gate: {type: Schema.Types.ObjectId, ref:"nameGate"},
    dateUse: {type: Date, default: (Date.now() - (4*60*60*1000))},
    timeUse: {type: Number, required: true},
    waterMili: {type: Number}
})

uptakeSchema.pre('save', async function(next){
    const consumo = this
    try{
        const llave = await Gate.findById(consumo.gate)

        const lit_sec = (Math.PI * ( (llave.ratio *(10**-2)) /2)**2) * llave.VEL
        consumo.waterMili = ((consumo.timeUse * lit_sec)*1000).toFixed(2)
        next()

    }catch(e){
        console.log(e)
        next()
    }
})

export const Uptake = model('1consumo', uptakeSchema)