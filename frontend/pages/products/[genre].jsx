import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {MdArrowBackIosNew,MdArrowForwardIos} from "react-icons/md"
import {motion} from "framer-motion";
import Layout from '../../components/Layout';
import ProductCard from "../../components/product/ProductCard";
import { API_URL } from '../../utils/connectionConfig';

 function Products({products,pages}){
    const router=useRouter();
    const [color,setColor]=useState("");
    const [productItems,setproductItems]=useState(products);
    const [maxPrice,setMaxPrice]=useState(0);
    const [miniPrice,setMiniPrice]=useState(0);
    const [price,setPrice]=useState(0);
    const [size,setSize]=useState("");
    const [category,setCategory]=useState("");
    const [sideFilter,setSideFilter]=useState(false);
    const progres=useRef(); 

    const colorArray=[];
    const categoryArray=[];
    const sizeArray=[];
    // const productItems=[...products]

    products.forEach(item=>{  
        if(item.attributes.price>maxPrice){
            setMaxPrice(item.attributes.price)
        } 
        if(item.attributes.price<miniPrice&&miniPrice!==0){
            setMiniPrice(item.attributes.price)
        }else if(miniPrice===0){
            setMiniPrice(item.attributes.price)
        }
        if(!colorArray.includes(item.attributes.color)){
            colorArray.push(item.attributes.color)
        }
        if(!sizeArray.includes(item.attributes.size)){
            sizeArray.push(item.attributes.size)
        }
        if(!categoryArray.includes(item.attributes.category.data?.attributes.name)&&item.attributes.category.data){
            categoryArray.push(item.attributes.category.data?.attributes.name)
        }
    }) 
    
 
     useEffect(()=>{
        setproductItems(products);
        setPrice(maxPrice);
     },[products])

    useEffect(()=>{
       progres.current.style.width=`${((price-miniPrice)/(maxPrice-miniPrice))*100}%`
    },[price])

   
   const handleFliter=(type)=>{
    const items=[];
   setSideFilter(false)
    if(type==="price"){
        setCategory('')
        setSize('')
        setColor("")
    }else if(type==="size"){
        setCategory('')
        setPrice(maxPrice)
        setColor("")
    }else if(type==="category"){
        setColor('')
        setSize('')
        setPrice(maxPrice)
    }else if(type==="color"){
        setCategory('')
        setSize('')
        setPrice(maxPrice)
    }
    products.forEach(item=>{
        if(type==="price"&&item.attributes.price<=price){
            items.push(item)
        }else if(type==="size"&&item.attributes.size===size){
            items.push(item)
        }else if(type==="category"&&item.attributes.category.data?.attributes.name===category&&item.attributes.category.data){
            items.push(item)
        }else if(type==="color"&&item.attributes.color===color){
            items.push(item)
        }
    })
    setproductItems(items)
   }


   const handleAllFliters=()=>{
    const items=[];
    setSideFilter(false)
    products.forEach(item=>{
        if(item.attributes.price<=price&&
            item.attributes.size===size&&
            item.attributes.color===color &&
            item.attributes.category.data?.attributes.name===category&&
            item.attributes.category.data){
            items.push(item)
        }
    })
    setproductItems(items)
   }

    return(
        <Layout title="products pages" pages={pages}>
            <div className="container relative  mx-auto h-fit font-serif my-8 ">
                <div onClick={()=>setSideFilter(true)} className={`fixed ${sideFilter?"hidden":"block"} right-0 top-1/2 z-20 md:hidden`}>
                <MdArrowBackIosNew className='text-primary text-4xl cursor-pointer'/>
                </div>
                <h1 className='text-3xl font-bold capitalize w-full text-center my-8'>{router.query.genre}</h1>
               <div className="flex relative">
               
                    <div className="flex flex-wrap w-full md:w-3/4">
                        {
                           productItems.length>0? productItems?.map(product=>(
                                <div key={product.id} className='w-full md:w-1/3 my-4'>
                                <ProductCard id={product.id} product={product.attributes}/>
                            </div>
                            )):(
                                <div className='w-full h-screen flex items-center justify-center'>
                                    <div className='text-xl text-secondary'> No Product Found </div>
                                </div>
                            )
                    
                    }
                    </div >
                       <motion.div initial={{x:400}} animate={{x:sideFilter?0:400}}  transition={{duration:0.2,type:"tween",ease:"easeInOut"}} className={` h-screen overflow-y-scroll md:overflow-visible  border md:block bg-white fixed right-0 top-0 z-30 md:z-0 md:static md:max-h-fit w-3/4 md:w-1/4 p-4 my-4`}>
                         <div className="relative w-full">
                                <motion.div initial={{x:-15,opacity:0}} animate={{x:sideFilter?-18:-15,opacity:1}} transition={{duration:0.5}} onClick={()=>setSideFilter(false)} className={`flex w-fit fixed z-30 h-screen items-center top-1/6 md:hidden ${sideFilter?"block":"hidden"}`}>
                                    <MdArrowForwardIos className='text-primary text-4xl cursor-pointer'/>
                                </motion.div>
                            <div>
                            <div className="pt-4">
                            <div className='text-lg font-semibold py-4'>Fliter By Price:</div>
                            <div className="w-full flex items-center">
                                <div className='p-1 border mx-1'>${price}</div>
                                <div className="w-full relative h-2 rounded-full bg-gray-100 border px-0.5">
                                    <div ref={progres} className='h-full bg-gray-300 absolute z-10 left-0 top-0'></div>
                                    <input type="range" value={price} min={miniPrice} max={maxPrice} step={1} onChange={(e)=>setPrice(e.target.value)} className='bg-transparent  w-full appearance-none absolute z-20 left-0 -top-1 border-none outline-none'/>
                                </div>
                                <div className='p-1 border mx-1'>${maxPrice}</div>
                            </div>
                            <button onClick={()=>handleFliter("price")} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>Filter</button>
                            </div>
                            
                        
                            <div className="px-4">
                            <div className='text-lg font-semibold py-4'>Fliter By Category:</div>
                            <label className=" block my-2">
                                <input type="radio" value="allCategory" checked={category==="allCategory"?category:""} name="all"  onChange={(e)=>setCategory(e.target.value)} /> <span className='text-lg'>all</span>
                            </label>
                            {
                            categoryArray.map((categoryVal,index)=>(   
                                <label key={index} className=" block my-2">
                                    <input type="radio" value={categoryVal} checked={category===categoryVal?category:""} name={categoryVal}  onChange={(e)=>setCategory(e.target.value)} /> <span className='text-lg'>{categoryVal}</span>
                                </label>
                            ))
                        }
                        <button onClick={()=>handleFliter("category")} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>Filter</button>
                        </div>
                    
                        <div className="px-4">
                        <div className='text-lg font-semibold py-4'>Fliter By Size:</div>
                        <label className=" block my-2">
                            <input type="radio" value="allSize" checked={size==="allSize"?size:""} name="cash"  onChange={(e)=>setSize(e.target.value)} /> <span className='text-lg'>all</span>
                        </label>
                        {
                            sizeArray.map((sizeVal,index)=>(   
                                <label key={index} className=" block my-2">
                                    <input type="radio" value={sizeVal} checked={size===sizeVal?size:""} name={sizeVal}  onChange={(e)=>setSize(e.target.value)} /> <span className='text-lg'>{sizeVal}</span>
                                </label>
                            ))
                        }
                        <button onClick={()=>handleFliter("size")} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>Filter</button>
                        </div>
                    
                            <div className="px-4">
                            <div className='text-lg font-semibold py-4'>Fliter By Color:</div>
                            <label className=" block my-2">
                                <input type="radio" value="allColor" checked={color==="allColor"?color:""} name="allColor"  onChange={(e)=>setColor(e.target.value)} /> <span className='text-lg'>all</span>
                            </label>
                            {
                                colorArray.map((colorVal,index)=>(   
                                    <label key={index} className=" block my-2">
                                        <input type="radio" value={colorVal} checked={color===colorVal?color:""} name={colorVal}  onChange={(e)=>setColor(e.target.value)} /> <span className='text-lg'>{colorVal}</span>
                                    </label>
                                ))
                            }
                        
                        <button onClick={()=>handleFliter("color")} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>Filter</button>
                        </div>

                        <div className="my-4">
                        <div className='text-lg font-semibold py-4'>Fliter <span className='text-base font-normal'> price,category,color,size</span></div>
                        <button onClick={()=>handleAllFliters()} className='bg-primary text-white  py-1 px-8 w-full'>Filter By All</button>
                        </div>
                    </div>
                </div>
                          
            </motion.div>
                   
               </div>
              
            </div>
        </Layout>
    )
}


export async function getStaticPaths (){
   
    const pageRes = await fetch(`${API_URL}/api/pages?populate=*`)
    const pages = await pageRes.json()
    const colectinRes = await fetch(`${API_URL}/api/colection-of-products`)
    const colections = await colectinRes.json()
    const categoryRes = await fetch(`${API_URL}/api/categories`)
    const categories = await categoryRes.json()

   const pageCollections=[];
   const pageCategories=[];
   const allItems=[];
   const newItems=[];
   const salesItems=[];
   const popularItems=[];

   colections.data.map(collection=>{
    pageCollections.push({params:{genre:`collections-${collection.attributes.slug}`}})
 
    })

    categories.data.map(category=>{
        pageCategories.push({params:{genre:`category-${category.attributes.slug}`}})
    })

   pages.data.map(page=>{
    allItems.push({params:{genre:`all-${page.attributes.slug}`}})
    newItems.push({params:{genre:`new-${page.attributes.slug}`}})
    salesItems.push({params:{genre:`sales-${page.attributes.slug}`}})
    salesItems.push({params:{genre:`popular-${page.attributes.slug}`}})
    })
    
    const paths=[...pageCollections,...pageCategories,...allItems,...newItems,...salesItems,...popularItems,{params:{genre:`popular-products`}},{params:{genre:`new-products`}},{params:{genre:`sales-products`}}]

    return{
        paths,
        fallback:false
    }
}

export async function getStaticProps(ctx) {
    const {genre} =ctx.params;
    
    const pagesRes = await fetch(`${API_URL}/api/pages?populate=*`)
    const pages = await pagesRes.json()
    
    const router=genre.split('-');
    let filterValue=''
    if(router[2]){
        filterValue=router[1]+"-"+router[2]
    }else if(router[3]){
        filterValue=router[1]+"-"+router[2]+"-"+router[3]
    }else{
        filterValue=router[1] 
    }
    console.log("router",filterValue)
    let products;
    if(router[0]==="new"&&router[1]==="products"){
        const data = await fetch(`${API_URL}/api/products?/api/products?sort=publishedAt:desc&populate=*&pagination[limit]=30`)
        products = await data.json()
    }else if(router[0]==="sales"&&router[1]==="products"){
        const data = await fetch(`${API_URL}/api/products?filters[offer][$gt]=0&sort=offer:desc&populate=*&pagination[limit]=30`)
        products = await data.json()
    }else if(router[0]==="popular"&&router[1]==="products"){ 
        const data = await fetch(`${API_URL}/api/products?filters[rate][$gt]=0&sort=rate:desc&populate=*&pagination[limit]=30`)
        products = await data.json()
    }else if(router[0]==="new"){
        const currentMonth=new Date().getMonth();
        const lastMounth=currentMonth+1
        const data = await fetch(`${API_URL}/api/products?sort=publishedAt:desc&filters[genre][$eq]=${filterValue}&populate=*&pagination[limit]=30`)
        products = await data.json()
    }else if(router[0]==="sales"){
        const data = await fetch(`${API_URL}/api/products??filters[offer][$gt]=0&sort=offer:desc&filters[genre][$eq]=${filterValue}&populate=*&pagination[limit]=30`)
        products = await data.json()
    }else if(router[0]==="popular"){ 
        const data = await fetch(`${API_URL}/api/products?filters[rate][$gte]=1&sort=rate:desc&filters[genre][$eq]=${filterValue}&populate=*&pagination[limit]=30`)
        products = await data.json()
    }else if(router[0]==="all"){ 
        const data = await fetch(`${API_URL}/api/products?filters[genre][$eq]=${filterValue}&populate=*`)
        products = await data.json()
    }else if(router[0]==="related"){ 
        const data = await fetch(`${API_URL}/api/products?filters[genre][$eq]=${filterValue}&populate=*`)
        products = await data.json()
    }else if(router[0]==="category"||router[0]==="collections"){
        const data = await fetch(`${API_URL}/api/products?filters[${router[0]}][slug][$eq]=${filterValue}&populate=*`)
        products= await data.json()
       
    }else{
        const data = await fetch(`${API_URL}/api/products?populate=*`)
        products = await data.json()
    }

   
    return {
      props: {
        products:products.data,
        pages:pages.data
      },
    }
  }

export default Products;