import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
   const [cart, refetch] = useCart();
   const total = cart.reduce((previous, current) => previous + current.price, 0)


   const handleDelete = (item) => {
      // console.log(item);
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
         if (result.isConfirmed) {
            fetch(`http://localhost:5000/carts/${item._id}`, {
               method: 'DELETE',
            })
               .then(res => res.json())
               .then(data => {
                  if (data.deletedCount > 0) {
                     refetch();
                     Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                  }
               })

         }
      })
   }

   return (
      <div className="w-full mt-11">
         <Helmet>
            <title>Bistro Boss | My Cart</title>
         </Helmet>
         <div className="flex space-x-4 justify-evenly items-center uppercase font-semi-bold h-[60px]">
            <h2 className="text-3xl">My Cart Item: {cart.length}</h2>
            <h2 className="text-3xl">Total: ${total}</h2>
            <Link to={'/dashbord/payment'}><button className="btn btn-error btn-sm">Pay</button></Link>
         </div>

         <div className="overflow-x-auto w-full ">
            <table className="table w-full">

               <thead>
                  <tr>
                     <th> # </th>
                     <th>Food</th>
                     <th>Item Name</th>
                     <th>Price</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {cart.map((item, index) => <tr key={item._id}>
                     <td>
                        <label>
                           {index + 1}
                        </label>
                     </td>
                     <td>

                        <div className="avatar">
                           <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt="Avatar Tailwind CSS Component" />
                           </div>
                        </div>
                     </td>
                     <td>
                        {item.name}
                     </td>
                     <td className="text-end">${item.price}</td>
                     <td >
                        <button className="btn btn-ghost bg-red-600 text-white" onClick={() => handleDelete(item)}><FaTrash /> </button>
                     </td>
                  </tr>)}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default MyCart;