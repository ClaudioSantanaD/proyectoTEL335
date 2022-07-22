import React, { useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const DelPostModal = ({open, body}) => {

    const{user, authToken} = useContext(UserContext)

    async function erasePost(e){
        e.preventDefault()

        try{
    
          const resDel = await fetch('http://localhost:5000/foro/delete',{
                method: "DELETE",
                headers: {'Content-type':'application/json', 'auth-token':authToken},
                body: JSON.stringify({someTitle: body.title}),
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
                <h3>¿Seguro que deseas borrar esta post?</h3>
            </div>
            <div className='body'>
                <p>Titulo: {body.title}</p>
                <p>Creado en: {body.createdAt}</p>
                <p>Ultima Modificacion: {body.updatedAt}</p>
            </div>
            <div className='footer'>
                <button className='btn btn-danger' onClick={erasePost}>Borrar</button>
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

export default DelPostModal