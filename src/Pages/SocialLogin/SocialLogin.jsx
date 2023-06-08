import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContex } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
   const { signInWithGoogle } = useContext(AuthContex);
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/'

   const handleLogin = () => {
      signInWithGoogle()
         .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);

            const savedUser = { name: loggedUser.displayName, email: loggedUser.email };

            fetch('http://localhost:5000/users', {
               method: 'POST',
               headers: { 'content-type': 'application/json' },
               body: JSON.stringify(savedUser)

            })
               .then(res => res.json())
               .then(data => {
                  console.log(data);
                  if (data.insertedId) {
                     navigate(from, { replace: true });
                  }

                  navigate(from, { replace: true });
               })
         })
         .catch(error => {
            console.error(error.message)
         })
   };

   return (
      <div className="mx-auto mb-5">
         <button onClick={handleLogin} className="btn btn-circle btn-outline">
            <FaGoogle />
         </button>

      </div>
   );
};

export default SocialLogin;