import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)
    const [authToken, setAuthToken] = useState("")

    const {children} = props

    const signIn = (token) =>{
        setUser(true)
        setAuthToken(token)
    }

    const signOut = () =>{
      fetch('http://localhost:5000/user/logout')
      .then(setUser(false))
      .then(setAuthToken(""))

    }


  return (
    <UserContext.Provider value={{user, authToken, signIn, signOut}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider