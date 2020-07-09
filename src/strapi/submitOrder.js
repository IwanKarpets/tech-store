// submit order
import axios from 'axios';
import url from '../utils/URL';


async function submitOrder({name, total, items, stripeTokenId, userToken}){
    console.log(name, total, userToken, stripeTokenId )
    const response = await axios.post(`${url}/orders`,
    {name, total, items, stripeTokenId},
    {
        headers:{
            Authorization: `Brear ${userToken}`
        }
    }).catch(error=>console.log(error));
    return response

}


export default submitOrder;
