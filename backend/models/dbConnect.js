import mongoose from "mongoose"

try {
    await mongoose.connect(process.env.URi)
    console.log("Conectado a la db de aguatero")

}catch(e){
    console.log("Falló la conexion a la db: " + e)
}