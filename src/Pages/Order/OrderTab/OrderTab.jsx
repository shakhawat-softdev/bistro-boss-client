import FoodCard from "../../../Components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Pagination } from "swiper";

//TODO PAGINATION IMPLEMENTAT

const OrderTab = ({ items }) => {
   const pagination = {
      clickable: true,
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
   };
   return (
      <div >


         <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
         >
            <SwiperSlide>
               <div className='grid md:grid-cols-3'>
                  {items.map(item => <FoodCard item={item} key={item._id} />)}
               </div>
            </SwiperSlide>

         </Swiper>
      </div>
   );
};

export default OrderTab;