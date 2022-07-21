import React, { useContext, useState} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../../context/userProvider"
//import "../style-sheets/Modal.css"

const DelGateModal = ({open, body}) => {

    const{user, authToken} = useContext(UserContext)
    const [ratio_f, setRatio] = useState("")
    const [VEL_F, setVel] = useState("")


    async function changeGate(e){
        e.preventDefault()

        const bodyPut = JSON.stringify({someName:body.name, newRatio:ratio_f, newVel:VEL_F})

        try{
    
          const resPut = await fetch('http://localhost:5000/gate/update',{
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
				<form onSubmit={changeGate}>
                    <p>Nombre Llave: {body.name}</p>
    
                    <p>Diametro antiguo: {body.ratio}</p>

                    <input type="text" placeholder="Nuevo Diametro en milimetros"className="form-control" name="ratio-f-crt"
                    value={ratio_f} onChange={(e) => setRatio(e.target.value)} />

                    <p>Velocidad antigua: {body.VEL}</p>

                    <input type="text" placeholder="Nueva Velocidad (en m/s)"className="form-control" name="vel-f-crt"
                    value={VEL_F} onChange={(e) => setVel(e.target.value)} />
                <button type="submit">Actualizar</button>
                <button onClick={() => open(false)} className='btn btn-danger'>Cancelar</button>
              </form>
			):(
				<h3>DEBES INICIAR SESION PARA PODER ACTUALIZAR ESTO</h3>
			)}
		</>
    
  )
}

export default DelGateModal