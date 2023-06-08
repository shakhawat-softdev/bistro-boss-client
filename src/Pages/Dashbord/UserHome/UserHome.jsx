import useAuth from "../../../Hooks/useAuth";


const UserHome = () => {
   const { user } = useAuth()
   return (
      <div className="w-full m-4">
         <h2 className="text-3xl ">Hi,{user.displayName}!! </h2>
      </div>
   );
};

export default UserHome;