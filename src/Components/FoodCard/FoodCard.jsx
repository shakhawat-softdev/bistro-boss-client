import { useContext } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";


const FoodCard = ({ item }) => {
   const { _id, name, image, price, recipe } = item;
   const { user } = useContext(AuthContex);
   const navigate = useNavigate();
   const location = useLocation();
   const [, refetch] = useCart();

   const handleAddToCart = () => {
      const cartItem = { userEmail: user.email, manuItemId: _id, name, image, price }
      if (user && user.email) {
         fetch('http://localhost:5000/carts', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cartItem)
         })
            .then(res => res.json())
            .then(data => {
               console.log(data)
               if (data.insertedId) {
                  refetch(); // refetch() cart to update the number of items in the cart
                  Swal.fire({ position: 'center', icon: 'success', title: 'Added to the cart!', showConfirmButton: false, timer: 1500 })
               }
            })
      }
      else {
         Swal.fire({
            title: 'Please login to order the food!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login Now!'
         }).then((result) => {
            if (result.isConfirmed) {
               navigate('/login', { state: { from: location } })
            }
         })
      }
   };

   return (
      <div className="card w-96 bg-base-100 shadow-xl">
         <figure><img src={image} alt="Shoes" /></figure>
         <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white"> ${price}</p>
         <div className="card-body flex flex-col items-center">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <div className="card-actions justify-end">
               <button className="btn btn-outline bg-slate-100 border-0 border-b-2 border-orange-400 mt-4"
                  onClick={() => handleAddToCart(item)}>Add to cart</button>
            </div>
         </div>
      </div>
   );
};

export default FoodCard;