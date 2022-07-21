import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const AddGateModal = ({open}) => {

	const{user, authToken} = useContext(UserContext)

	const [name_f, setName] = useState("")
    const [room_f, setRoom] = useState("")
    const [ratio_f, setRatio] = useState("")
    const [VEL_F, setVel] = useState("")

    async function submitGate(e){
        e.preventDefault()
    
        const dataLog = {name: name_f, room: room_f, ratio: ratio_f, VEL: VEL_F}
        try{
    
          const resPost = await fetch('http://localhost:5000/gate/create',{
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
				<form onSubmit={submitGate}>
                    <input type="text" placeholder="Nombre de la llave"className="form-control mb-3" name="name-f-crt"
                    value={name_f} onChange={(e) => setName(e.target.value)}  />
    
                    <input type="text" placeholder="Habitacion donde se ubica"className="form-control" name="room-f-crt"
                    value={room_f} onChange={(e) => setRoom(e.target.value)} />

                    <input type="text" placeholder="Diametro en milimetros"className="form-control" name="ratio-f-crt"
                    value={ratio_f} onChange={(e) => setRatio(e.target.value)} />

                    <input type="text" placeholder="Velocidad salida del agua en m/s "className="form-control" name="vel-f-crt"
                    value={VEL_F} onChange={(e) => setVel(e.target.value)} />
                <button type="submit">Agregar</button>
                <button onClick={() => open(false)} className='btn btn-danger'>Cancelar</button>
              </form>
			):(
				<h3>DEBES INICIAR SESION PARA PODER AGREGAR ESTO</h3>
			)}
		</>
    
  )
}

export default AddGateModal