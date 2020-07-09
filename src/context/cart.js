// cart context
import React from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();

function getCartFromLocalStorage(){
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
}


function CartProvider({children}){
    const [cart, setCart]= React.useState(getCartFromLocalStorage);
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

        setTotal(parseFloat(newTotal).toFixed(1) )

    },[cart])

    const removeItem = id =>{
        setCart([...cart].filter(item=>item.id!==id))
    };

    const increaseAmount = (id) =>{
       
      
        const newCart = [...cart].map(item=>{
            return item.id = id ? {...item, amount: item.amount+1}: {...item, amount:item.amount}
        })

        setCart(newCart)



    };
    const decreaseAmount = (id, amount) =>{
        if(amount===1){
            removeItem(id)
            return
        }

        const newCart = [...cart].map(item=>{
            return item.id===id? {...item, amount: item.amount-1}:{...item}
        })

        setCart(newCart)
    };
    const addToCart = product =>{
       const {id, image, title, price} = product;
       const item = [...cart].find(item=>item.id===id);
       if(item){
           increaseAmount(id)
       }
           const newItem = {id, image, title, price, amount:1};
           const newCart =[...cart, newItem];
           console.log(newCart)
           setCart(newCart)
       
    };
    const clearCart = () =>{
        setCart([])
    };


    return <CartContext.Provider value={{cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, clearCart, addToCart}}>
        {children}
    </CartContext.Provider>
}


export {CartContext, CartProvider}