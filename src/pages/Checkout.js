import React, { createContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from '../components/Cart/EmptyCart';
import { CartContext } from "../context/cart";
import {CardElement,StripeProvider,Elements, injectStripe} from 'react-stripe-elements'
import submitOrder from '../strapi/submitOrder';

 function Checkout(props) {
  
  const {cart, total, clearCart} = React.useContext(CartContext);
  const {user, showAlert, hideAlert, alert} = React.useContext(UserContext);
  
  const history =  useHistory();

  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');

  const isEmpty = !name || alert.show;
  
  async function handleSubmit(e){
    showAlert({msg: 'submiting order...please wait'})
    e.preventDefault()

    const response = await props.stripe
    .createToken()
    .catch(error=>console.log(error))
    console.log(response)
    const {token} = response;

    if(token){
      setError('');
      const {id} = token;
      let order = await submitOrder({
        name:name, 
        total:total,
        items: cart,
        stripeTokenId:id,
        userToken: user.token,
      })
      if(order){
        showAlert({msg:'your order is complete'})
        clearCart();
        history.push('/')
        return
      }
      else{
        showAlert({msg:"there was an error with your order, please try again!", type: 'danger'})
      }

    }

    else{
      hideAlert();
      setError(response.error.message);
    }



  }

  if(cart.lenght < 1) return <EmptyCart/>
  return(
  <section className="section form">
    <h2 className="section-title">checkout</h2>
    <form className="checkout-form">
      <h3>
        order total : <span>${total}</span>
      </h3>
      <div className="form-control">
        <label htmlFor="name">name</label>
        <input
        type="text"
        id="name"
        value={name}
        onChange={(e)=>{
          setName(e.target.value)
        }}
        />
      </div>
      <div className="stripe-input">
        <label htmlFor="card-element">
          Credit or Debit Cart 
        </label>
        <p className="stripe-info">
          Test using this credit card: <span>4242 4242 4242 4242</span>
          <br/>
          enter any 5 digits for the zip code
          <br/>
          enter any 3 digits for the CVC
        </p>
      </div>
      <CardElement className="card-element"></CardElement>
      {error && <p className="form-empty">{error}</p>}
      
      
      {isEmpty ?( <p className="form-empty"> please fill out name field</p>)
        :(<button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-ptimary btn-block"
        >
          submit
        </button>)}
    </form>
   </section> )
  
  
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = ()=>{
  return(
  <StripeProvider
   apiKey="pk_test_51H1zWSITtN8IN1Lll5WEDgrUqVK35fX0r6VhzQGAszllQx6rQxADE6vxpqKlEOrkCyOncsCBKMko76DLij2KE2jq007TcqJ0oM"
  >
      <Elements>
        <CardForm></CardForm>
      </Elements>
  </StripeProvider>)
}

export default StripeWrapper;
