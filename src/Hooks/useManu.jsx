import { useEffect, useState } from "react";
const useManu = () => {
   const [manu, setManu] = useState([]);
   const [loding, setLoading] = useState(true)
   useEffect(() => {
      fetch('http://localhost:5000/manu')
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setManu(data);
            setLoading(false);
         })
   }, []);
   return [manu, loding];

};
export default useManu;