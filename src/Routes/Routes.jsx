import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Manu from "../Pages/Manu/Manu/Manu";
import Oredr from "../Pages/Order/Order/Oredr";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Register/Register";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";

createBrowserRouter

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: '/',
            element: <Home />
         },
         {
            path: 'manu',
            element: <Manu />
         },
         {
            path: 'order/:category',
            element: <Oredr />
         },
         {
            path: 'login',
            element: <Login />
         },
         {
            path: 'register',
            element: <Register />
         },
         {
            path: '/secret',
            element: <PrivateRoute><Secret></Secret></PrivateRoute>
         }
      ]
   },
]);