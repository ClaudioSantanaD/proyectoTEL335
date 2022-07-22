import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userProvider"
import { useGetFetch } from "../hooks/getFetch"
import AddGateModal from "../components/Modals/addGate"
import UpGateModal from "../components/Modals/updateGate"
import DelGateModal from "../components/Modals/deleteGate"
import ConsumoDays from "../components/Modals/ConsumosInDays"
import jwt_decode from"jwt-decode"

const MyGates = () => {

  const{authToken} = useContext(UserContext)

  const[gates, setGates] = useState([])
  const[dayz, someDayz] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showCons, setShowCons] = useState(false)
  const [bodyt, setBodyt] = useState({})

  async function misLlaves (someToken){

    try{
      const resGet = await fetch("http://localhost:5000/gate/allGates",{
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
    misLlaves(authToken).then(res => setGates(res))
  },[authToken])

  let {data, error, loading} = useGetFetch(`http://localhost:5000/user/names/${jwt_decode(authToken).payload}`)

  if(loading){return <h2>Cargando...</h2>}
  if(error !== ''){return <h2>{error}</h2>}
  

  return (
    <>
      <h1>Llaves/Aparatos de consumo de {data.name}</h1>
      {showAdd && <AddGateModal open={setShowAdd}/>}
      {showUpdate && <UpGateModal open={setShowUpdate} body={bodyt}/>}
      {showDelete && <DelGateModal open={setShowDelete} body={bodyt}/>}
      {showCons && <ConsumoDays open={setShowCons} body={bodyt} />}

      <button onClick={() => {setShowAdd(true)}} className="btn btn-dark">Agregar Llave</button>

        <table className="table table-striped table-dark">
    	    <thead>
            <tr>
              <th scope="col">Nombre(s)</th>
              <th scope="col">Habitacion</th>
              <th scope="col">Diametro (en milimetros)</th>
              <th scope="col">Velocidad [m/s]</th>
            </tr>
          </thead>
        <tbody>
          {gates.map(item => (
          <tr key={item._id}>
						<td>{item.name}</td>
						<td>{item.room}</td>
						<td>{item.ratio}</td>
            <td>{item.VEL}</td>
            <button onClick={() => {setShowUpdate(true); setBodyt(item)}} className="btn btn-dark">Editar Llave</button>
            <button onClick={() => {setShowDelete(true); setBodyt(item)}} className="btn btn-dark">Eliminar Llave</button>
            <div className="input-group mb-3">
              <input type="text" class="form-control" placeholder="Obtener el consumo en dias hacia atras" 
              value={dayz} onChange={(e) => someDayz(e.target.value)}/>
              <div className="input-group-append">
                <button onClick={() => {setShowCons(true); item.days=dayz; setBodyt(item)}} className="btn btn-outline-secondary" type="button">Buscar</button>
              </div>
            </div>
            
					</tr>
          ))
          }
          </tbody>
      </table>
      </>
    )
  }
  
  export default MyGates