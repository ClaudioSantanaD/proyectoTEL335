import React from 'react'
import{Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>ERROR 404 NOT FOUND</h1>
        <Link to='/' className="btn btn-outline-primary">Volver al Inicio</Link>
    </div>
  )
}

export default NotFound