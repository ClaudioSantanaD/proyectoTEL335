import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({message: "Accesso denegado"})

    try{

        const {payload} = jwt.verify(token, process.env.ACCESS_TOKEN_SEC)
        req.user = payload
        next()

    } catch(error){
        console.log(error.message)

        const TokenErrors = {
            "invalid signature": "La firma del JWT no es valida",
            "jwt expired": "Token expirado",
            "invalid token": "Token invalido",
            "jwt malformed": "Token en formato no valido"
        }

        res.status(401).send({error: TokenErrors[error.message]})
        next()
        
    }
}

export const reToken = (req, res, next) => {

    try{

        const rToken = req.cookies.refreshToken
        if(!rToken) return res.status(401).json({message: "Accesso denegado"})

        const {payload} = jwt.verify(rToken,process.env.REFRESH_TOKEN_SEC)
        req.user = payload
        next()

    }catch(e){
        console.log(e)

        const TokenErrors = {
            "invalid signature": "La firma del JWT no es valida",
            "jwt expired": "Token expirado",
            "invalid token": "Token invalido",
            "jwt malformed": "Token en formato no valido"
        }

        res.status(401).json({error: TokenErrors[error.message]})
    }
}