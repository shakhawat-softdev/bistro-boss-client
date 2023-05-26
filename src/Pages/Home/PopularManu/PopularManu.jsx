import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import ManuItems from "../../../Components/ManuItems/ManuItems";
import useManu from "../../../Hooks/useManu";


const PopularManu = () => {
   const [manu] = useManu();
   const popular = manu.filter(item => item.category === 'popular');

   return (
      <section className="mb-12">
         <SectionTitle subHeading={'---Check it out---'} heading={'FROM OUR MENU'} />
         <div className="grid md:grid-cols-2 gap-10">
            {popular.map(item => <ManuItems item={item} key={item._id} />)}
         </div>
         <div className="text-center">
            <button className="btn btn-outline border-0 border-b-2 mt-4 mx-auto">View Full Manu</button>
         </div>
      </section>
   );
};

export default PopularManu;