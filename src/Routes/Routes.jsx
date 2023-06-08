import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Manu from "../Pages/Manu/Manu/Manu";
import Oredr from "../Pages/Order/Order/Oredr";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Register/Register";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashbord from "../Layout/DashBord";
import MyCart from "../Pages/Dashbord/MyCart/MyCart";
import AllUsers from "../Pages/Dashbord/AllUsers/AllUsers";
import AddItem from "../Pages/Dashbord/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashbord/ManageItems/ManageItems";
import Payment from "../Pages/Dashbord/Payment/Payment";
import AdminHome from "../Pages/Dashbord/Admin/AdminHome";
import UserHome from "../Pages/Dashbord/UserHome/UserHome";


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
   {
      path: '/dashbord',
      element: <PrivateRoute><Dashbord /></PrivateRoute>,
      children: [
         //User Route
         {
            path: 'userHome',
            element: <UserHome />
         },
         {
            path: 'mycart',
            element: <MyCart />
         },
         {
            path: 'payment',
            element: <Payment />
         },


         //Admin Routes
         {
            path: 'adminHome',
            element: <AdminRoute><AdminHome /></AdminRoute>
         },
         {
            path: 'allUsers',
            element: <AdminRoute><AllUsers /></AdminRoute>
         },
         {
            path: 'addItem',
            element: <AdminRoute> <AddItem /></AdminRoute>
         },
         {
            path: 'manageItems',
            element: <AdminRoute><ManageItems /></AdminRoute>
         }

      ]
   }

]);