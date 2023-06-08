import { useContext } from "react";
import { AuthContex } from "../Providers/AuthProvider";

const useAuth = () => {
   const auth = useContext(AuthContex);
   return auth;
}
export default useAuth;