import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxuosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import './checkoutForm.css'



const CheckoutForm = ({ price, cart }) => {
   const { user } = useAuth();
   const stripe = useStripe();
   const elements = useElements();
   const [cardError, setCardError] = useState('');
   const [axiosSecure] = useAxiosSecure();
   const [clientSecret, setClientSecret] = useState('');
   const [processing, setProcessing] = useState(false);
   const [transectionId, setTransectionId] = useState('');


   useEffect(() => {
      // console.log("price", price);
      if (price > 1) {
         axiosSecure.post("/create-payment-intent", { price })
            .then(res => {
               // console.log(res.data.clientSecret);
               setClientSecret(res.data.clientSecret);
            })
      }

   }, [price, axiosSecure]);

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (!stripe || !elements) {
         return
      }
      const card = elements.getElement(CardElement);

      console.log("Card: ", card);

      if (card == null) {
         return
      }

      const { error } = await stripe.createPaymentMethod({ type: 'card', card });
      if (error) {
         console.log("error", error);
         setCardError(error.message)
      }
      else {
         setCardError('');
         // console.log("paymentMethod", paymentMethod);
      }

      setProcessing(true);
      const { paymentIntent, error: confarmError } = await stripe.confirmCardPayment(clientSecret,
         {
            payment_method: {
               card: card,
               billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous',
               },
            },
         },
      )

      if (confarmError) {
         console.log(confarmError);
      }

      console.log("Payment Intent: ", paymentIntent);

      setProcessing(false)
      if (paymentIntent.status === "succeeded") {
         setTransectionId(paymentIntent.id)
         //Save payment Information to the server
         const payment = {
            user: user?.email,
            transectionId: paymentIntent.id,
            price,
            date: new Date(),
            quantity: cart.length,
            cartItems: cart.map(item => item._id),
            manuItems: cart.map(item => item.manuItemId),
            orderStatus: "Service-Pending",
            itemsName: cart.map(item => item.name)
         }
         axiosSecure.post('/payments', payment)
            .then(res => {
               console.log(res.data)
               if (res.data.insertedId) {
                  //Display Confarm



               }
            })
      }

   };

   return (
      <>
         <form className="w-2/3 m-8" onSubmit={handleSubmit}>
            <CardElement
               options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4', }, }, invalid: { color: '#9e2146', }, }, }}
            />
            <button className="btn btn-outline btn-primary btn-sm my-5" type="submit" disabled={!stripe || !clientSecret || processing}>
               Pay
            </button>
         </form>
         {cardError && <p className="red-600 ml-8">{cardError}!</p>}
         {transectionId && <p className="text-blue-700 ml-8">Transection Compelete with transection Id: {transectionId}!</p>}
      </>
   );
};

export default CheckoutForm;