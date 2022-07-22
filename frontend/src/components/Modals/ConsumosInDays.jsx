import { useContext, useState } from "react"
import { UserContext } from "../../context/userProvider"

const ConsumoDays = ({open, body}) => {

  const{authToken} = useContext(UserContext)
  const[uptakes, setUptakes] = useState([])

  async function gateConsumos (someToken){

    try{
      const resGet = await fetch(`http://localhost:5000/gate/consumoInDays/${body._id}/${body.days}`,{
        method:'GET',
        headers:{'auth-token':someToken},
        mode:'cors'
      })

      return(await resGet.json())

    }catch(error){
      return(error)
    }

  }

  gateConsumos(authToken).then(res => setUptakes(res))

  return (
    <>
        <table className="table table-striped table-dark">
    	    <thead>
            <tr>
              <th scope="col">Fecha y Hora uso</th>
              <th scope="col">Segundos de uso</th>
              <th scope="col">Mililitros de agua consumida</th>
            </tr>
          </thead>
        <tbody>
          {uptakes.map(item => (
          <tr key={item._id}>
				    <td>{item.dateUse}</td>
				    <td>{item.timeUse}</td>
				    <td>{item.waterMili}</td>
		</tr>
          ))
          }
          </tbody>
      </table>
      <button onClick={() => open(false)} className='btn btn-danger'>Cerrar</button>
      </>
    )
  }
  
  export default ConsumoDays