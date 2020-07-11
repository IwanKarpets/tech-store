import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEARCART } from "./actions";

const reducer = (state, action)=>{
    switch(action.type){
        case REMOVE:
            return state.filter(item=>item.id!==action.payload)
        case INCREASE:
             return state.map(item=>{
            return item.id === action.payload
            ? {...item, amount: item.amount+1}
            : {...item};
             });
        case DECREASE:
            return state.map(item=>{
                return item.id===action.payload ? 
                {...item, amount: item.amount-1}
                :{...item}
            })


            case ADD_TO_CART:
                const { id, image, title, price} = action.payload;
                let product = {id, image,title, price, amount:1};
                return[...state, product]


            case CLEARCART:
                return [];
        

        default:
            return state
    }
    
}


export default reducer