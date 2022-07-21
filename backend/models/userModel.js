import mongoose from "mongoose"
const { Schema, model} = mongoose
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    username:{ type: String, lowercase: true, required: true, unique: true },
    name:{type: String},
    email:{ type: String, lowercase: true, required: true, unique: true, trim: true},
    password:{type: String, required: true},
    stars:{type: Number, default: 0},
    myGates:[{type: Schema.Types.ObjectId, default: undefined, ref:"llave"}],
    myPosts:[{type: Schema.Types.ObjectId, default: undefined, ref:"postForo"}],
    history:[{type: Schema.Types.ObjectId, default: undefined, ref:"registro"}]

})

userSchema.pre('save', async function(next){
    const usr = this
    if(!usr.isModified('password')) return next()

    try{
        const salt = await bcrypt.genSalt(11)
        usr.password = await bcrypt.hash(usr.password, salt)
        next()

    } catch(error){
        console.log(error)
        next()
    }
})

userSchema.methods.comparePass = async function(givenPass){
    return await bcrypt.compare(givenPass, this.password)
}

export const UserAqua = model('user', userSchema)