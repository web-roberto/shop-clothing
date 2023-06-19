import {createContext,useState,useEffect} from 'react'
import { onAuthStateChangedListener,createUserDocumentFromAuth, signOutUser } from '../utils/firebase/firebase.utils'

export const UserContext=createContext({
//needs initial values
currentUser: null,
setCurrentUser:()=> null,
})
// The UserProvider is the  Provider of de UserContext and share un object with the useState in value
export const UserProvider= ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null)
    const value ={currentUser,setCurrentUser} //an object with the state is shared
    useEffect(() => {
        // if authenticated -> object, else null
        const unsubscribe=onAuthStateChangedListener(async(user)=>{
            console.log('-->useEffect tras cambiar el estado de user: ',user)
            //when is singed in with google, I create a doc in BDD
            if(user) await createUserDocumentFromAuth(user) //it was in sign-in-form.component before 
            setCurrentUser(user)
        })

        return unsubscribe //when unmounting the component, the listener is deleted
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}