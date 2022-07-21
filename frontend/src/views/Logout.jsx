import { Link } from "react-router-dom"
import { UserContext } from "../context/userProvider"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const {user, signOut} = useContext(UserContext)
  return (
    <>
        {user ? (
            <div>
                <h2>¿Estas segur@ que deseas cerrar sesion?</h2>
                <Link to="/" className="btn btn-info">No</Link>
                <button onClick={signOut} className="btn btn-danger">Cerrar Sesion</button>
            </div>
        ):(<div>
                <Navigate to="/" />
                <h3 className="alert alert-success">Sesion Cerrada correctamente</h3>
            </div>
        )}
    </>
  )
}

export default Logout