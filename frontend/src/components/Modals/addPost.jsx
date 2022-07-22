import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const AddPostModal = ({open}) => {

	const{user, authToken} = useContext(UserContext)

	const [title_f, setTitle] = useState("")
    const [content_f, setContent] = useState("")

    async function submitPost(e){
        e.preventDefault()
    
        const dataLog = {title: title_f, content: content_f}
        try{
    
          const resPost = await fetch('http://localhost:5000/foro/create',{
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
				<form onSubmit={submitPost}>
                    <input type="text" placeholder="Titulo"className="form-control mb-3" name="title-f-crt"
                    value={title_f} onChange={(e) => setTitle(e.target.value)}  />
    
                    <input type="text" placeholder="Contenido"className="form-control" name="room-f-crt"
                    value={content_f} onChange={(e) => setContent(e.target.value)} />

                <button type="submit">Postear</button>
                <button onClick={() => open(false)} className='btn btn-danger'>Cancelar</button>
              </form>
			):(
				<h3>DEBES INICIAR SESION PARA PODER AGREGAR ESTO</h3>
			)}
		</>
    
  )
}

export default AddPostModal