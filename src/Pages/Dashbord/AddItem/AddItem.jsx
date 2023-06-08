import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../Hooks/useAxuosSecure";
import Swal from "sweetalert2";


const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_KEY

const AddItem = () => {
   const [axiosSecure] = useAxiosSecure();


   const { register, handleSubmit, reset } = useForm();

   const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`

   const onSubmit = data => {


      const formData = new FormData();
      formData.append('image', data.image[0])
      fetch(image_hosting_url, {
         method: 'POST',
         body: formData
      })
         .then(res => res.json())
         .then(imgResponse => {
            // console.log(imgResponse)
            if (imgResponse.success) {
               const imgURL = imgResponse.data.url;
               const { name, price, category, recepi } = data;
               const newItem = { name, price: parseFloat(price), category, recepi, image: imgURL };
               // console.log(newItem);

               axiosSecure.post(`/manu`, newItem)
                  .then(data => {
                     console.log('After POSTing new Manu Item', data.data)
                     if (data.data.insertedId) {
                        reset();
                        Swal.fire({
                           position: 'center',
                           icon: 'success',
                           title: 'Item Added Successfully!',
                           showConfirmButton: false,
                           timer: 1500
                        })
                     }
                  })
            }

         })
   };



   return (
      <>
         <Helmet>
            <title>Bistro Boss | Add Item</title>
         </Helmet>
         <div className="w-full px-10 ">
            <SectionTitle subHeading={"Whats's new"} heading={"Add an item"} />

            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full ">
                  <label className="label">
                     <span className="label-text font-semibold">Recepi Name*</span>
                  </label>
                  <input type="text" placeholder="Recepi Name" className="input input-bordered w-full "
                     {...register("name", { required: true, maxLength: 120 })}
                  />

               </div>

               <div className="flex">
                  <div className="form-control w-full ">
                     <label className="label">
                        <span className="label-text font-semibold">Category*</span>
                     </label>
                     <select defaultValue={"pick one"} className="select select-bordered"
                        {...register("category", { required: true })}
                     >
                        <option disabled >Pick one</option>
                        <option>Pizza</option>
                        <option>Soup</option>
                        <option>Salad</option>
                        <option>Drinks</option>
                        <option>Deshi</option>
                        <option>Desert</option>
                     </select>
                  </div>

                  <div className="form-control w-full ml-5">
                     <label className="label">
                        <span className="label-text font-semibold">Price*</span>
                     </label>
                     <input type="number" placeholder="Price" className="input input-bordered w-full "
                        {...register("price", { required: true })}
                     />
                  </div>
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text font-semibold">Recepi Details</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Details"
                     {...register("recepi", { required: true })}
                  ></textarea>
               </div>

               <div className="form-control w-full ">
                  <label className="label">
                     <span className="label-text font-semibold">Item Image</span>
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full "
                     {...register("image", { required: true })}
                  />
               </div>
               <input className="btn btn-small mt-4" type="submit" value="Add Item" />
            </form>
         </div>
      </>
   );
};

export default AddItem;