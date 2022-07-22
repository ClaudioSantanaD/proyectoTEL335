import { useParams } from "react-router-dom"
import { useGetFetch } from "../hooks/getFetch"
import { NavLink } from "react-router-dom"

const ShowPost = () => {
    const{idPost} = useParams()
    const {data, error, loading} = useGetFetch(`http://localhost:5000/foro/byId/${idPost}`)
      
    if(loading){return <h2>Cargando...</h2>}
    if(error !== ''){return <h2>{error}</h2>}
    
    return(
        <>
            <h1>{data.title}</h1>
            <p class="text-muted">Creado en: {data.created_in} por {data.author}</p> 
            <p class="text-muted"> Ultima modificacion: {data.last_modified}</p>
            <h4>{data.content}</h4>
            <NavLink to={`/`} className="btn btn-dark">Volver al Inicio</NavLink>
        </>
    )

}

export default ShowPost