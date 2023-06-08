import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import useManu from "../../../Hooks/useManu";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxuosSecure";


const ManageItems = () => {
   const [manu, , refetch] = useManu();
   const [axiosSecure] = useAxiosSecure();

   const handleDelete = (item) => {
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
            // Swal.fire( 'Deleted!', 'Your file has been deleted.', 'success' )
            axiosSecure.delete(`/manu/${item._id}`)
               .then(res => {
                  console.log("deleted responce: ", res.data);

                  if (res.data.deletedCount > 0) {
                     Swal.fire('Deleted!', 'Item has been deleted.', 'success!')
                     refetch();
                  }
               })
         }
      })
   }

   return (
      <div className="w-full">
         <Helmet>
            <title>Bistro Boss | Manage Items</title>
         </Helmet>

         <SectionTitle subHeading={"Hurry Up!"} heading={"Manage All Items"} />
         <h2 className="text-4xl font-bold text-center">Total Items:{manu.length}</h2>

         <div className=" overflow-x-auto">
            <table className="table w-full">
               {/* head */}
               <thead>
                  <tr>
                     <th> # </th>
                     <th>Item</th>
                     <th>Category</th>
                     <th className="text-right">Price</th>
                     <th>Update</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     manu.map((item, index) => <tr key={item._id}>
                        <th>
                           {index + 1}
                        </th>
                        <td>
                           <div className="flex items-center space-x-3">
                              <div className="avatar">
                                 <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                 </div>
                              </div>
                              <div>
                                 <div className="font-bold">{item.name}</div>
                              </div>
                           </div>
                        </td>
                        <td> {item.category} </td>
                        <td className="text-right">${item.price}</td>
                        <td>
                           <button className="btn btn-ghost btn-xs">Upadte</button>
                        </td>
                        <td >
                           <button className="btn btn-ghost bg-red-600 text-white" onClick={() => handleDelete(item)}><FaTrash /> </button>
                        </td>
                     </tr>)
                  }


               </tbody>

            </table>
         </div>

      </div>
   );
};

export default ManageItems;