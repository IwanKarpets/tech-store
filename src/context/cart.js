// cart context
import React from 'react';
import localCart from '../utils/localCart';
import reducer from './reducer';
import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEARCART } from './actions';

const CartContext = React.createContext();

function getCartFromLocalStorage(){
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
}

function CartProvider({children}){
const cartI  = getCartFromLocalStorage()
    const [cart, dispatch]= React.useReducer(reducer, cartI);
    const [total, setTotal]= React.useState(0);
    const [cartItems, setCartItems]= React.useState(0);


    React.useEffect(()=>{

            localStorage.setItem('cart', JSON.stringify(cart));

        let newCartItems = cart.reduce((total, cartItem)=>{
            total+=cartItem.amount;

            //console.log(total)
            return total
            
        },0);
        setCartItems(newCartItems);

        let newTotal = cart.reduce((total, cartItem)=>{
            return total +=(cartItem.amount*cartItem.price)
        },0);

        setTotal(parseFloat(newTotal).toFixed(1))

    },[cart])

    const removeItem = id =>{
        dispatch({type:REMOVE, payload:id})

        // let newCart = cart.filter(item=>item.id!==id)
        //setCart([...cart].filter(item=>item.id!==id))
    };

    const increaseAmount = (id) =>{
        dispatch({type: INCREASE, payload: id})
      
        // const newCart = [...cart].map(item=>{
        //     return item.id = id ? {...item, amount: item.amount+1}: {...item, amount:item.amount}
        // })

        // setCart(newCart)

    };
    const decreaseAmount = (id, amount) =>{
        if(amount===1){
            dispatch({type: REMOVE, payload:id})
            //removeItem(id)
            return
        }

        dispatch({type:DECREASE, payload:id})

        // const newCart = [...cart].map(item=>{
        //     return item.id===id? {...item, amount: item.amount-1}:{...item}
        // })

        // setCart(newCart)
    };
     const addToCart = product =>{
       const {id, image, title, price} = product;
       const item = [...cart].find(item=>item.id===product.id);
       if(item){
        dispatch({type: INCREASE, payload: product.id}) 
       }

       else{
           dispatch({type:ADD_TO_CART, payload:product})
       }
    //        const newItem = {id, image, title, price, amount:1};
    //        const newCart =[...cart, newItem];
    //        setCart(newCart)
       
    };
    const clearCart = () =>{
        dispatch({type: CLEARCART})
        //setCart([])
    };


    return <CartContext.Provider value={{cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, clearCart, addToCart}}>
        {children}
    </CartContext.Provider>
}


export {CartContext, CartProvider}