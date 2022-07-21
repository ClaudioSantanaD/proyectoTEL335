import { useContext, useState } from "react"
import { UserContext } from "../context/userProvider"
import { Navigate } from 'react-router-dom'

const Login = () => {

  const {user, signIn} = useContext(UserContext)
  const [email_f, setEmail] = useState("")
  const [pass_f, setPass] = useState("")

  async function submitLogin(e){
    e.preventDefault()

    const dataLog = {email: email_f, password: pass_f}
    try{

      const resPost = await fetch('http://localhost:5000/user/login',{
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(dataLog),
            mode: 'cors'
      })
      const res = await resPost.json()
      signIn(res.token)
      return(<>
        <Navigate to="/" />
        <h3 className="alert alert-success">{res.message}</h3>
      </>)

    }catch(error){
      return(<h3>{error}</h3>)
    }  
  }


    return (
      <div>
        <h1>Login</h1>
        {user ? (
          <Navigate to="/" />
        ):(
          <form onSubmit={submitLogin}>
            <input type="email" placeholder="Ingrese su correo"className="form-control mb-3" name="email-f-log"
            value={email_f} onChange={(e) => setEmail(e.target.value)}  />

            <input type="password" placeholder="Ingrese contraseña"className="form-control" name="pass-f-log"
            value={pass_f} onChange={(e) => setPass(e.target.value)} />
            <button type="submit">Ingresar</button>
          </form>
          
        )}  
      </div>
    )
  }
  
  export default Login