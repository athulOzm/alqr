import Master from '../../components/layout/Master'
import React from "react";
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import { getPost } from '../../lib/api';
import Image from 'next/image'



export default function category({items2}) {

     

    const router = useRouter();
    



  const [menucat, setMenucat] = useState([]);
  const [menus, setItems] = useState(items2);
  const [cat, setCat] = useState(router.query.category);

 
 

  useEffect(() => {

    setCat(router.query.category)

    const items = JSON.parse(localStorage.getItem('menucat'));
    if (items) {
        setMenucat(items);
    } 
    else{
        router.push(`/`);
    }

    async function loadData(){

        const res = await fetch(`${process.env.API}category/${cat}`);
        const postd = await res.json();
        setItems(postd.products);
    }
  
    if(menus.length == 0){
        loadData();
    }
   
    
  }, []);


  if(menus.length == 0){
    return <p className='text-white w-full h-full text-center justify-center'> <i>Loading..</i> </p>
}


 return (
   <Master
     footer = "show"
     search = "show"
     category = {cat}
     >

<main className='h-80vh overflow-y-auto	'>
       <div className="max-w-7xl mx-auto py-2   lg:px-4">

           <div className="text-2xl font-600 text-c4 p-3 pl-4">Categories</div>

           <div className="block categories-filter pl-4">

               {
                   menucat.map( cat => {

                    return <Link key={cat.name} href={`/category/${cat.name}`} className="link">
                   <a>
                       <Image
                            src={`${process.env.STORAGE_PATH}cover/${cat.cover}`}
                            width="35"
                            height="35"
                            layout="fixed"
                            title={cat.name}
                            alt={cat.name}
                            priority="true" className='pl-3' />

                   
                   <span className="">{cat.name}</span>
                   </a>
               </Link>
                    
                   })
               }


               
              
           </div>


           <div className='p-4 pb-16'>


               <span className="inline-grid grid-cols-2 gap-4 lg:grid-cols-6">
                   {
                       menus.map( product => {

                        return <span key={product.id}>
                        <Link href='/asdf'>
                            <a className="item-card">
                                {/* <img className="item-card-image" src="https://seven-burger.uiinitiative.com/images/desserts/apple-pie.png" /> */}
                                <Image
                            src={`${process.env.STORAGE_PATH}cover/${product.cover}`}
                            width="35"
                            height="35"
                            layout="fixed"
                            title={product.name}
                            alt={product.name}
                            priority="true" className='item-card-image' />
                                <div className="item-card-content">
                                    <div className="item-card-subtitle">{product.name}</div>
                                    <div className="item-card-price"><span>RO</span>{product.price}</div>
                                </div>
                            </a>
                        </Link>
                    </span>

                       })
                   }
                   
 
 
 

                    
               </span>

           </div>



       </div>
       </main>
     
   </Master>
 )
}

category.getInitialProps = async ({query, req}) => {

    if(!req){
      return {
        items2:[]
      }
    }
  
    const menus = await getPost(query.category);
   
    
    return {
      items2:menus.products
    }
  }