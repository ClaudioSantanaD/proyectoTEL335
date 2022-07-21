import jwt from 'jsonwebtoken'

export const tokenGen = (payload) => {
    try{
        const expiresIn = 60*15
        const token = jwt.sign({payload}, process.env.ACCESS_TOKEN_SEC, {expiresIn})
        return {token, expiresIn}
    }catch (e){
        console.log(e)
    }
}

export const tokenRefreshGen = (payload, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 15

    try{

        const refreshToken = jwt.sign({payload}, process.env.REFRESH_TOKEN_SEC, {expiresIn})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "certero"),
            expires: new Date(Date.now() + expiresIn)
        })
    }catch(e){
        console.log(e)
    }
}