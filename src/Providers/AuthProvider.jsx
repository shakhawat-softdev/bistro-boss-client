import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const AuthContex = createContext(null);
const auth = getAuth(app);
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   //Create User (Register with email and password)
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password)
   };

   //SignIn user with Email and Password
   const signInEmailPass = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   //Logout User
   const logOut = () => {
      setLoading(true);
      return signOut(auth);
   };

   //Update Profile of Users
   const updateUserProfile = (name, photoUrl) => {
      return updateProfile(auth.currentUser, {
         displayName: name, photoURL: photoUrl
      })
   }

   useEffect(() => {
      const unsubcribe = onAuthStateChanged(auth, curerntUser => {
         setUser(curerntUser);
         console.log("Current User: ", curerntUser);
         setLoading(false);
      });
      return () => {
         return unsubcribe();
      }
   }, []);



   const authInfo = { user, loading, createUser, signInEmailPass, logOut, updateUserProfile }
   return (
      <AuthContex.Provider value={authInfo}>
         {children}
      </AuthContex.Provider>
   );
};

export default AuthProvider;