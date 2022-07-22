import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userProvider"
import { useGetFetch } from "../hooks/getFetch"
import AddPostModal from "../components/Modals/addPost"
import UpPostModal from "../components/Modals/updatePost"
import DelPostModal from "../components/Modals/deletePost"
import jwt_decode from"jwt-decode"

const MyGates = () => {

  const{authToken} = useContext(UserContext)

  const[posts, setPosts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [bodyt, setBodyt] = useState({})

  async function misPosts (someToken){

    try{
      const resGet = await fetch("http://localhost:5000/foro/byUserLoged",{
        method:'GET',
        headers:{'auth-token':someToken},
        mode:'cors'
      })
      return(await resGet.json())

    }catch(error){
      return(error)
    }

  }

  useEffect( () => {
    misPosts(authToken).then(res => setPosts(res))
  },[authToken])

  let {data, error, loading} = useGetFetch(`http://localhost:5000/user/names/${jwt_decode(authToken).payload}`)

  if(loading){return <h2>Cargando...</h2>}
  if(error !== ''){return <h2>{error}</h2>}
  

  return (
    <>
      <h1>Publicaciones en el foro de {data.name}</h1>
      {showAdd && <AddPostModal open={setShowAdd}/>}
      {showUpdate && <UpPostModal open={setShowUpdate} body={bodyt}/>}
      {showDelete && <DelPostModal open={setShowDelete} body={bodyt}/>}

      <button onClick={() => {setShowAdd(true)}} className="btn btn-dark">Escribir Post</button>

        {posts.map(item => (
          <div>
            <h1>{item.title}</h1>
            <p class="text-muted">Creado en: {item.createdAt} Ultima modificacion: {item.updatedAt}</p>
            <h4>{item.content}</h4>
            <button onClick={() => {setShowUpdate(true); setBodyt(item)}} className="btn btn-dark">Editar Post</button>
            <button onClick={() => {setShowDelete(true); setBodyt(item)}} className="btn btn-dark">Eliminar post</button>
          </div>
        ))}
    
    </>
    )
  }
  
  export default MyGates