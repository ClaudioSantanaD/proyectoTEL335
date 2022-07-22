import mongoose from "mongoose"
const { Schema, model} = mongoose

const histSchema = new Schema({
    consumoPromedio: {type: Number, required: true},
    dias: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref:"user", required: true},
    createdAt: {type: Date, default: (Date.now() - (4*60*60*1000))}
})

export const Historial = model('registro', histSchema)