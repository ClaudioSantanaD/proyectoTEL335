import { useContext } from 'react'
import { UserContext } from '../context/userProvider'
import { Navigate } from 'react-router-dom'


const RequireAuth = ({children}) => {

    const {user} = useContext(UserContext)

    if(!user){return <Navigate to="/"/>}

    return children
}

export default RequireAuth