import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import manuImg from '../../../assets/menu/menu-bg.jpg'
import desertImg from '../../../assets/menu/dessert-bg.jpeg'
import pzzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupdImg from '../../../assets/menu/soup-bg.jpg';
import PopularManu from '../../Home/PopularManu/PopularManu';
import ManuCategory from '../ManuCategory/ManuCategory';
import useManu from '../../../Hooks/useManu';
import SectionTitle from '../../../Components/SectionTitle';


const Manu = () => {
   const [manu] = useManu();
   const dessert = manu.filter(item => item.category === 'dessert');
   const soup = manu.filter(item => item.category === 'soup');
   const salad = manu.filter(item => item.category === 'salad');
   const pizza = manu.filter(item => item.category === 'pizza');
   const offered = manu.filter(item => item.category === 'offered');
   return (

      <div>
         <Helmet>
            <title>Bistro Boss | Manu</title>
         </Helmet>

         <Cover img={manuImg} title={"Our Manu"} />

         {/* Main Cover */}
         <SectionTitle subHeading={"---Don't Miss---"} heading={"TODAY'S OFFER"} />

         {/* Offer Manu Items */}
         <ManuCategory items={offered} />


         <ManuCategory items={dessert} title={"dessert"} coverImg={desertImg} />
         <ManuCategory items={pizza} title={"pizza"} coverImg={pzzaImg} />
         <ManuCategory items={salad} title={"salad"} coverImg={saladImg} />
         <ManuCategory items={soup} title={"soup"} coverImg={soupdImg} />



      </div>

   );
};

export default Manu;