
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
   const { createUser, updateUserProfile } = useContext(AuthContex)
   const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
   const navigate = useNavigate()


   const onSubmit = data => {
      const { name, photoURL, email, password } = data;
      console.log(data);
      createUser(email, password)
         .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(name, photoURL)
               .then(() => {
                  console.log('User Created Successfully');
                  reset();

                  Swal.fire({
                     position: 'top-end',
                     icon: 'success',
                     title: 'User Created Successfully',
                     showConfirmButton: false,
                     timer: 1500
                  });

                  navigate('/');
               })
               .catch(error => {
                  console.log(error)
               })



         })
         .catch(error => {
            console.error(error.massage)
         })

   };


   return (
      <>
         <Helmet>
            <title>Bistro Boss | Register</title>
         </Helmet>
         <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="text-center md:w-1/2 lg:text-left">
                  <h1 className="text-5xl font-bold">Register now!</h1>
                  <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
               </div>
               <div className="card md: w-1/2 max-w-sm shadow-2xl bg-base-100">

                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Name</span>
                        </label>
                        <input type="text"  {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500d">Name is required</span>}
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text"  {...register("photoURL", { required: true })} placeholder="URL" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-500d">Photo Url is required</span>}
                     </div>


                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500d">Email is required</span>}

                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password"  {...register("password", {
                           required: true,
                           minLength: 6,
                           maxLength: 20,
                           pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                        })} placeholder="required" className="input input-bordered" />

                        {errors.password?.type === 'minLength' && <p role="alert">Password must be minimum 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p role="alert">Password must be less then 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p role="alert">Password must have one upper case, one lower case, one number and one special character!</p>}

                        <label className="label">
                           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>
                     <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Register" />
                     </div>
                  </form>
                  <label className="label">
                     <p><small>New here?</small><Link to='/Login'><span className="label-text-alt link link-hover"> Login</span></Link></p>
                  </label>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;