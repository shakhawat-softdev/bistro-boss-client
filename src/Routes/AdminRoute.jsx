
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";



const AdminRoute = ({ children }) => {
   const { user, loading } = useAuth()
   const location = useLocation();
   const [isAdmin] = useAdmin();
   // console.log("Is admin??", isAdmin);

   if (loading || !isAdmin) {
      return <progress className="progress w-56" value="0" max="100"></progress>
   }


   if (user && isAdmin) {
      return children;
   }
   return <Navigate to={'/'} state={{ from: location }} replace={true}></Navigate>
};

export default AdminRoute;