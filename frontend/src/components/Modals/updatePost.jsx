import React, { useContext, useState} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const UpPostModal = ({open, body}) => {

    const{user, authToken} = useContext(UserContext)

	const [title_f, setTitle] = useState("")
    const [content_f, setContent] = useState("")


    async function changePost(e){
        e.preventDefault()

        const bodyPut = JSON.stringify({oldTitle: body.title, newTitle:title_f, newContent:content_f})

        try{
    
          const resPut = await fetch('http://localhost:5000/foro/update',{
                method: "PUT",
                headers: {'Content-type':'application/json', 'auth-token':authToken},
                body: bodyPut,
                mode: 'cors'
          })
          const res = await resPut.json()
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
				<form onSubmit={changePost}>
                    <p>Actualizando post con titulo: {body.title}</p>
                    <input type="text" placeholder="Titulo Nuevo"className="form-control" name="ratio-f-crt"
                    value={title_f} onChange={(e) => setTitle(e.target.value)} />

                    <input type="text" placeholder="Contenido Modificado"className="form-control" name="vel-f-crt"
                    value={content_f} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">Actualizar</button>
                <button onClick={() => open(false)} className='btn btn-danger'>Cancelar</button>
              </form>
			):(
				<h3>DEBES INICIAR SESION PARA PODER ACTUALIZAR ESTO</h3>
			)}
		</>
    
  )
}

export default UpPostModal