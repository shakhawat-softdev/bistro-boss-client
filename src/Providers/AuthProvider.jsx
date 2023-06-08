import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import axios from "axios";

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

   //Signin User With Google
   const provider = new GoogleAuthProvider();
   const signInWithGoogle = () => {
      return signInWithPopup(auth, provider)
   }

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

         // get and set token

         if (curerntUser) {
            axios.post('http://localhost:5000/jwt', { email: curerntUser.email })
               .then(data => {
                  // console.log(data.data.token);
                  localStorage.setItem('access-token', data.data.token)
                  setLoading(false);
               })
         }
         else {
            localStorage.removeItem('access-token')
         }

         // setLoading(false);
      });
      return () => {
         return unsubcribe();
      }
   }, []);



   const authInfo = { user, loading, createUser, signInEmailPass, logOut, updateUserProfile, signInWithGoogle }
   return (
      <AuthContex.Provider value={authInfo}>
         {children}
      </AuthContex.Provider>
   );
};

export default AuthProvider;