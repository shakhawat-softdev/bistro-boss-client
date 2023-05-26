
import SectionTitle from '../../../Components/SectionTitle';
import featureImage from '../../../assets/home/featured.jpg'
import './Featured.css'


const Featured = () => {
   return (
      <div className="featurdeItems text-white pt-8 my-20  bg-fixed">

         <SectionTitle subHeading={'---Check it out---'} heading={'FROM OUR MENU'} />

         <div className="md:flex justify-center items-center  py-20 px-36 pt-12 bg-slate-500 opacity-50">
            <div>
               <img src={featureImage} alt="" />
            </div>
            <div className='md:ml-10'>
               <p>March 20, 2023</p>
               <h3 >WHERE CAN I GET SOME?</h3>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
               <button className="btn btn-outline border-0 border-b-2 mt-4">Order Now</button>
            </div>
         </div>
      </div>
   );
};

export default Featured;