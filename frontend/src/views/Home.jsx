import { useGetFetch } from "../hooks/getFetch"
import { NavLink } from "react-router-dom"

const Home = () => {

    const {data, error, loading} = useGetFetch('http://localhost:5000/foro/all')

    if(loading){return <h2>Cargando...</h2>}
    if(error !== ''){return <h2>{error}</h2>}

    let posts = []

    for(let i=0; i<data.length; i++){
        posts.push(<NavLink to={`/postForo/${data[i]['_id']}`} key={data[i]['title']} className="btn btn-dark">{data[i]['title']}</NavLink>)
    }

    return (
      <div>
          <h1>Posts del foro</h1>
          {posts}
      </div>
    )
  }
  
  export default Home