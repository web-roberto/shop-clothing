import {createContext,useState} from 'react'

export const CartContext=createContext({
    //needs initial values
    isCartOpen:false,
    setIsCartOpen:()=>{}
})
// The UserProvider is the  Provider of de UserContext and share un object with the useState in value
export const CartProvider= ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const value ={isCartOpen, setIsCartOpen} //an object with the state is shared

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}