
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Header/Navbar';

const Main = () => {
   const loc = useLocation();
   const noHeaderFooter = loc.pathname.includes('login') || loc.pathname.includes('register');

   return (
      <>
         {noHeaderFooter || <Navbar />}
         <Outlet />
         {noHeaderFooter || < Footer />}
      </>
   );
};

export default Main;