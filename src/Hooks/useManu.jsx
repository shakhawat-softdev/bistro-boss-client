import { useQuery } from "@tanstack/react-query";

// import { useEffect, useState } from "react";
const useManu = () => {
   // const [manu, setManu] = useState([]);
   // const [loding, setLoading] = useState(true)

   // useEffect(() => {
   //    fetch('http://localhost:5000/manu')
   //       .then(res => res.json())
   //       .then(data => {
   //          // console.log(data);
   //          setManu(data);
   //          setLoading(false);
   //       })
   // }, []);

   const { data: manu = [], isLoading: loading, refetch } = useQuery({
      queryKey: ['manu'],
      queryFn: async () => {
         const res = await fetch('http://localhost:5000/manu')
         return res.json();
      }
   })
   return [manu, loading, refetch];

};
export default useManu;