import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../Hooks/useCart";

//TODO: provide publishable key
const pk = import.meta.env.VITE_PAYMENT_GETWAY_PK;
const stripePromise = loadStripe(pk);

const Payment = () => {
   const [cart] = useCart();
   const total = cart.reduce((previous, current) => previous + current.price, 0);
   const price = parseFloat(total.toFixed(2));

   console.log("Publishable Key", pk);

   return (
      <div className="p-5">
         <Helmet>
            <title>Bistro Boss | Payment</title>
         </Helmet>
         <SectionTitle subHeading={"Please Pay Money"} heading={"Payment"} />
         <div>
            <Elements stripe={stripePromise}>
               <CheckoutForm price={price} cart={cart} />
            </Elements>
         </div>
      </div>
   );
};

export default Payment;