import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userProvider"
import { useGetFetch } from "../hooks/getFetch"
import AddConsModal from "../components/Modals/addCons"
import CleanHist from "../components/Modals/cleanHist"
import jwt_decode from"jwt-decode"

const Consumos = () => {

  const{authToken} = useContext(UserContext)

  const[uptakes, setUptakes] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showCleanHist, setShowCleanHist] = useState(false)
  //const [bodyt, setBodyt] = useState({})

  async function misConsumos (someToken){

    try{
      const resGet = await fetch("http://localhost:5000/gate/allConsumo",{
        method:'GET',
        headers:{'auth-token':someToken},
        mode:'cors'
      })

      let list = await resGet.json()

      for(let i=0; i<list.length; i++){
        let gateName = await fetch(`http://localhost:5000/consumo/gateById/${list[i]['_id']}`,{
          method:'GET',
          headers:{'auth-token':someToken},
          mode:'cors'
        })
        list[i]['nameGate'] = await gateName.json()
      }
      return(list)

    }catch(error){
      return(error)
    }

  }
  

  useEffect( () => {
    misConsumos(authToken).then(res => setUptakes(res))
  },[authToken])

  let {data, error, loading} = useGetFetch(`http://localhost:5000/user/names/${jwt_decode(authToken).payload}`)

  if(loading){return <h2>Cargando...</h2>}
  if(error !== ''){return <h2>{error}</h2>}
  

  return (
    <>
      <h1>Consumos de {data.name}</h1>
      {showAdd && <AddConsModal open={setShowAdd}/>}
      {showCleanHist && <CleanHist open={setShowCleanHist}/>}

      <button onClick={() => {setShowAdd(true)}} className="btn btn-dark">Agregar Consumo</button>
      <button onClick={() => {showCleanHist(true)}} className="btn btn-dark">Limpiar Consumos</button>

        <table className="table table-striped table-dark">
    	    <thead>
            <tr>
              <th scope="col">Fecha y Hora uso</th>
              <th scope="col">Segundos de uso</th>
              <th scope="col">Mililitros de agua consumida</th>
              <th scope="col">Llave asociada</th>
            </tr>
          </thead>
        <tbody>
          {uptakes.map(item => (
          <tr key={item._id}>
				    <td>{item.dateUse}</td>
				    <td>{item.timeUse}</td>
				    <td>{item.waterMili}</td>
            <td>{item.nameGate}</td>   
		</tr>
          ))
          }
          </tbody>
      </table>
      </>
    )
  }
  
  export default Consumos