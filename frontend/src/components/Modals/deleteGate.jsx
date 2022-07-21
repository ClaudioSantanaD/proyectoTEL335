import React, { useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const DelGateModal = ({open, body}) => {

    const{user, authToken} = useContext(UserContext)

    async function eraseGate(e){
        e.preventDefault()

        try{
    
          const resDel = await fetch('http://localhost:5000/gate/delete',{
                method: "DELETE",
                headers: {'Content-type':'application/json', 'auth-token':authToken},
                body: JSON.stringify({someName: body.name}),
                mode: 'cors'
          })
          const res = await resDel.json()
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
				<div className='modalBackground'>
    		    <div className='modalContainer'>
                <div className='title'>
                <h3>Los registros de esta llave permanecerán en la base de datos. Esta accion es irreversible</h3>
                <h3>¿Seguro que deseas borrar esta llave?</h3>
            </div>
            <div className='body'>
                <p>Nombre: {body.name}</p>
                <p>Habitacion: {body.room}</p>
                <p>Diametro: {body.ratio}</p>
                <p>Velocidad: {body.VEL}</p>
            </div>
            <div className='footer'>
                <button className='btn btn-danger' onClick={eraseGate}>Borrar</button>
                <button onClick={() => open(false)} className='btn btn-warning'>Cancelar</button>
            </div>
        </div>
    </div>
			):(
				<h3>DEBES INICIAR SESION PARA PODER AGREGAR UN CONCIERTO</h3>
			)}
		</>
    
  )
}

export default DelGateModal