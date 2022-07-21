//MODAL PARA CONFIRMAR LOS CRUD ANTES DE GUARDAR

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/userProvider'
//import "../style-sheets/Modal.css"

const Modal = ({open, body}) => {

	const{user, authToken} = useContext(UserContext)

	const headAdd = {'Content-type':'application/json','auth-token':authToken}
	const bodyPut = JSON.stringify({bandaName:body.bandaName, fechaHora:body.fechaHora})

	async function PutConcert(e){
		e.preventDefault()
		try{
			const resPost = await fetch('http://localhost:5000/user/addFavConcert',{
            method: "PUT",
            headers: headAdd,
            body: bodyPut,
            mode: 'cors'
      })
      const res = await resPost.json()
      console.log(res.message)
			return(<><Navigate to="/myConcerts"/></>)

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
                <h1>¿Segur@ que quieres agregar este concierto a tu lista?</h1>
            </div>
            <div className='body'>
                <p>Banda: {body.bandaName}</p>
                <p>Fecha: {body.fechaHora}</p>
                <p>Ciudad: {body.ciudad}</p>
                <p>Lugar: {body.detalle.lugar}</p>
            </div>
            <div className='footer'>
                <button className='btn btn-success' onClick={PutConcert}>Agregar</button>
                <button onClick={() => open(false)} className='btn btn-danger'>Cancelar</button>
            </div>
        </div>
    </div>
			):(
				<h3>DEBES INICIAR SESION PARA PODER AGREGAR UN CONCIERTO</h3>
			)}
		</>
    
  )
}

export default Modal