import { Link } from "react-router-dom";
import ManuItems from "../../../Components/ManuItems/ManuItems";
import Cover from "../../Shared/Cover/Cover";

const ManuCategory = ({ items, title, coverImg }) => {

   return (
      <div className="pt-8">
         {title && <Cover img={`${coverImg}`} title={`${title}`} />}
         <div className="grid md:grid-cols-2 gap-10 my-16">
            {items.map(item => <ManuItems item={item} key={item._id} />)}
         </div>

         <Link to={`/order/${title}`}>
            <button className="btn btn-outline border-0 border-b-2 mt-4">Order Now</button>
         </Link>

      </div>
   );
};

export default ManuCategory;