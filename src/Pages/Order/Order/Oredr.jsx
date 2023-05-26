import { useState } from 'react';
import orederCoverImg from '../../../assets/shop/order.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useManu from '../../../Hooks/useManu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Oredr = () => {
   const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
   const { category } = useParams();
   const inatialIndex = categories.indexOf(category);
   const [tabIndex, setTabIndex] = useState(inatialIndex);


   const [manu] = useManu();
   const salad = manu.filter(item => item.category === 'salad');
   const pizza = manu.filter(item => item.category === 'pizza');
   const soup = manu.filter(item => item.category === 'soup');
   const desserts = manu.filter(item => item.category === 'dessert');
   const drinks = manu.filter(item => item.category === 'drinks');


   return (
      <div>
         <Helmet>
            <title>Bistro Boss | Order</title>
         </Helmet>
         <Cover img={orederCoverImg} title={'Order Food'} />

         <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
               <Tab>Salad</Tab>
               <Tab>Pizza</Tab>
               <Tab>Soup</Tab>
               <Tab>Dessert</Tab>
               <Tab>Drinks</Tab>
            </TabList>
            <TabPanel>
               <OrderTab items={salad} />
            </TabPanel>
            <TabPanel>
               <OrderTab items={pizza} />
            </TabPanel>
            <TabPanel>
               <OrderTab items={desserts} />
            </TabPanel>
            <TabPanel>
               <OrderTab items={soup} />
            </TabPanel>
            <TabPanel>
               <OrderTab items={drinks} />
            </TabPanel>
         </Tabs>
      </div>
   );
};

export default Oredr;