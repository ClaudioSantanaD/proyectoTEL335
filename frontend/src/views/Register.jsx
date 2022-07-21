import { useState } from "react"
import { Navigate } from "react-router-dom"

const Register = () => {

  const [email_f, setEmail] = useState("")
  const [name_f, setName] = useState("")
  const [username_f, setUsername] = useState("")
  const [pass_f, setPass] = useState("")

  async function SubmitRegister(e){
    e.preventDefault()

    const dataReg = {name: name_f, username: username_f, email: email_f, password: pass_f}

    try{

      const resPost = await fetch('http://localhost:5000/user/register',{
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(dataReg),
            mode: 'cors'
      })
      const res = await resPost.json()
      console.log(res.messagge)
      return(
      <>
        <Navigate to="/" />
        <h3 className="alert alert-success">{res.messagge}</h3>
      </>)

    }catch(error){
      return(<h3>{error}</h3>)
    }

    
  }

    return (
          
          <form onSubmit={SubmitRegister}>
            <h1>Registrarse</h1>
            <input type="text" placeholder="Ingrese su Nombre y Apellido"className="form-control mb-3" name="name-f"
            value={name_f} onChange={(e) => setName(e.target.value)} />

            <input type="text" placeholder="Nombre de usuario"className="form-control mb-3" name="username-f"
            value={username_f} onChange={(e) => setUsername(e.target.value)} />

            <input type="email" placeholder="Ingrese su correo"className="form-control mb-3" name="email-f"
            value={email_f} onChange={(e) => setEmail(e.target.value)}  />

            <input type="password" placeholder="Contraseña con un minimo de 8 caracteres"className="form-control" name="pass-f"
            value={pass_f} onChange={(e) => setPass(e.target.value)} />
            <button type="submit">Registrarse</button>
          </form>
    )
  }
  
  export default Register