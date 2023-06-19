import {createContext,useState,useEffect} from 'react'
import { onAuthStateChangedListener,createUserDocumentFromAuth, signOutUser } from '../utils/firebase/firebase.utils'
import  PRODUCTS from '../shop-data.json'

export const ProductsContext=createContext({
    //needs initial values
    products:[]
})
// The UserProvider is the  Provider of de UserContext and share un object with the useState in value
export const ProductsProvider= ({children}) =>{
    const [products, setProducts] = useState(PRODUCTS)
    const value ={products} //an object with the state is shared

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}