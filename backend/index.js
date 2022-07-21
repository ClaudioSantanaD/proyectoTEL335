import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './models/dbConnect.js'
import userRouter from './routes/authRuta.js'
import gateRouter from './routes/gateRuta.js'
import consumoRouter from './routes/consumeRuta.js'
import postsRouter from './routes/forumRuta.js'
const app = express()

const corsOpt = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}

app.get("/", (res) => {
    res.json({message: "Ruta raiz mishangre"})
})

app.use(
    express.urlencoded({
        extended:false,
    })
)

app.use(cors(corsOpt))
app.use(express.json())
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/gate", gateRouter)
app.use("/consumo", consumoRouter)
app.use("/foro", postsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Backend arriba en " + PORT))