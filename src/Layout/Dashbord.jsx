import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUser } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Dashbord = () => {
   const [cart] = useCart();

   //TODO: load data from server to have dynamic isAdmin based on data
   // const isAdmin = true;
   const [isAdmin] = useAdmin()
   console.log("is Admin?", isAdmin);

   return (
      <>
         <Helmet>
            <title>Bistro Boss | Dashbord</title>
         </Helmet>
         <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
               <Outlet />
               <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>

            <div className="drawer-side">
               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
               <ul className="menu p-4 w-80  bg-[#D1A054]">
                  {
                     isAdmin ? <>
                        {/* <!--Admin Sidebar content here --> */}
                        <li><NavLink to={'/dashbord/adminHome'}><FaHome /> Admin Home</NavLink></li>
                        <li><NavLink to={'/dashbord/addItem'}><FaUtensils />Add An Item</NavLink></li>
                        <li><NavLink to={'/dashbord/manageItems'}><FaWallet />Manage Items</NavLink></li>
                        <li><NavLink to={'/dashbord/history'}><FaBook />Manage Booking</NavLink></li>
                        <li><NavLink to={'/dashbord/allUsers'}><FaUser />All Users</NavLink></li>

                     </>
                        :
                        <>
                           {/* <!--User Sidebar content here --> */}
                           <li><NavLink to={'/dashbord/UserHome'}><FaHome /> User Home</NavLink></li>
                           <li><NavLink to={'/dashbord/reservation'}><FaCalendarAlt />Reservations</NavLink></li>
                           <li><NavLink to={'/dashbord/payment'}><FaCalendarAlt />Payment</NavLink></li>
                           <li><NavLink to={'/dashbord/history'}><FaWallet />Payment History</NavLink></li>
                           <li> <NavLink to={'/dashbord/mycart'}><FaShoppingCart />My Cart <div className="badge badge-secondary">+{cart?.length || 0}</div></NavLink> </li>
                        </>
                  }


                  <div className="divider"></div>
                  <li><NavLink to={'/'}><FaHome />Home</NavLink></li>
                  <li><NavLink to={'/manu'}>Our Manu</NavLink></li>
                  <li><NavLink to={'/order'}>Order Food</NavLink></li>
               </ul>
            </div>

         </div>
      </>
   );
};

export default Dashbord;