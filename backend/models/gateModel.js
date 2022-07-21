import {Uptake} from '../models/consumeModel.js'
import mongoose from "mongoose"
const { Schema, model} = mongoose


const gateSchema = new Schema({
    name: { type: String, lowercase: true, required: true},
    room: { type: String, lowercase: true, required: true},
    ratio: { type: Number, required: true},
    VEL:{type: Number, default:2},
    user: { type: Schema.Types.ObjectId, ref:"user", required: true},
    uptakes: [{type: Schema.Types.ObjectId, ref: "1consumo", default: undefined}]
})

gateSchema.methods.getDaysConsumo = async function(n_days, gateId){
    
    let today = new Date()
    today.setDate(today.getDate() - n_days)

    const consumos = await Uptake.find({ 
        gate: { $in: gateId }, 
        //'dateUse': {$gte: (new Date((new Date()).getTime() - (n_days * 24 * 60 * 60 * 1000)))}
        dateUse: {$gte: today}
    }).sort({dateUse: -1})
        
    return consumos 
    
}

export const Gate = model('llave', gateSchema)