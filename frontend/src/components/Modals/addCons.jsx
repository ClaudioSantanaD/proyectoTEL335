import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const AddGateModal = ({open}) => {

	const{user, authToken} = useContext(UserContext)

	const [name_f, setName] = useState("")
    const [time_f, setTime] = useState("")

    async function submitUptake(e){
        e.preventDefault()
    
        const dataLog = {nameGate: name_f, timeUse: time_f}
        try{
    
          const resPost = await fetch('http://localhost:5000/consumo/create',{
                method: "POST",
                headers: {'Content-type':'application/json', 'auth-token':authToken},
                body: JSON.stringify(dataLog),
                mode: 'cors'
          })
          const res = await resPost.json()
          console.log(res)
          return(<>
            <Navigate to="/" />
            <h3 className="alert alert-success">{res.message}</h3>
          </>)
    
        }catch(error){
          return(<h3>{error}</h3>)
        }  
      }

  return (
		<>
			{user ? (
				<form onSubmit={submitUptake}>
                    <input type="text" placeholder="Nombre de la llave"className="form-control mb-3" name="name-f-crt"
                    value={name_f} onChange={(e) => setName(e.target.value)}  />
    
                    <input type="text" placeholder="Segundos de uso"className="form-control" name="sec-f-crt"
                    value={time_f} onChange={(e) => setTime(e.target.value)} />

                <button type="submit">Registrar Consumo</button>
                <button onClick={() => open(false)} className='btn btn-danger'>Cancelar</button>
              </form>
			):(
				<h3>DEBES INICIAR SESION PARA PODER AGREGAR ESTO</h3>
			)}
		</>
    
  )
}

export default AddGateModal