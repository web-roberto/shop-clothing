import {createContext,useState,useEffect} from 'react'

const addCartItem=(cartItems,productToAdd) =>{
    //find if cartItems contains productToAdd
    //filter finishes when a true conditions is found and returns this item
    const existingCarItem=cartItems.filter((cartItem)=>cartItem.id===productToAdd.id)

    //If found, increment quantity
    if (existingCarItem.length>0) 
    return cartItems.map((cartItem)=>cartItem.id===productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}:cartItem)
    
    console.log('#### cartItems nuevo:',{...productToAdd,quantity:1})
    return [...cartItems,{...productToAdd,quantity:1}]
}

const removeCartItem=(cartItems,cartItemToRemove) =>{
    //find if cartItems contains productToAdd
    //filter finishes when a true conditions is found and returns this item
   // const existingCarItem=cartItems.filter((cartItem)=>cartItem.id===cartItemToRemove.id)

    //eliminar el producto
    if (cartItemToRemove.quantity===1) {
        return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);
    }

    //decrementar en 1
    return cartItems.map((cartItem)=>cartItem.id===cartItemToRemove.id?{...cartItem,quantity:cartItem.quantity-1}:cartItem)
   
    console.log('#### cartItems nuevo:',{...cartItemToRemove,quantity:1})
    return [...cartItems,{...cartItemToRemove,quantity:1}]
}

const clearCartItem = (cartItems,cartItemToClear) => cartItems.filter((cartItem)=>cartItem.id!==cartItemToClear.id);


export const CartContext=createContext({
    //needs initial values
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart:()=>{},
    cartCount:0,
    cartTotal:0

})
// The UserProvider is the  Provider of de UserContext and share un object with the useState in value
export const CartProvider= ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCarItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        // total=0, total=total+cartItem.quantity, almacena despues en newCartCount
        const newCartCount = cartItems.reduce((total,cartItem)=>total + cartItem.quantity,0)
        setCartCount(newCartCount)
    }, [cartItems])
    
    useEffect(() => {
        // total=0, total=total+cartItem.quantity, almacena despues en newCartCount
        const newCartTotal = cartItems.reduce((total,cartItem)=>
        total + cartItem.quantity*cartItem.price,0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart=(productToAdd)=>{
        setCarItems(addCartItem(cartItems,productToAdd))
    }


    const removeItemToCart=(cartItemToRemove)=>{
        setCarItems(removeCartItem(cartItems,cartItemToRemove))
    }

    const clearItemFromCart=(cartItemToClear)=>{
        setCarItems(clearCartItem(cartItems,cartItemToClear))
    }

    const value ={isCartOpen, setIsCartOpen,addItemToCart,removeItemToCart,cartItems,
        cartCount,clearItemFromCart,cartTotal} //an object with the state is shared

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}