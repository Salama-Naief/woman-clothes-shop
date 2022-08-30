import Head from 'next/head';
import Image from 'next/image';
import HomePanner from "../components/home/Panner";
import Slider from '../components/home/Slider';
import BoxCollection from '../components/home/BoxCollection';
import {API_URL} from '../utils/connectionConfig';
import Layout from '../components/Layout';
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

 function Home({pages,landigPage,newProducts,popularProducts,offerProducts,errMsg,shoDetail}) {
  const router =useRouter();
  const {pathname,query,asPath}=router;
  //const [loading,setLoading]=useState(true);
  const {t,i18n}= useTranslation();
  const [bottomCollection,setBottomColection]=useState([]); 
  const [topCollection,setTopColection]=useState([]); 
  const [carousal,setCarousal]=useState([]); 

 

  useEffect(()=>{
    const top=[]
    const bottom=[];
    const caro=[]
    landigPage&&landigPage.map(item=>{
      if(item.attributes.type==="carousal"){
        caro.push(item)
      }
      if(item.attributes.type==="topCollection"){
        top.push(item)
      }
      if(item.attributes.type==="bottomCollection"){
        bottom.push(item)
      }
    })
    setTopColection(top);
    setBottomColection(bottom);
    setCarousal(caro);
   // setLoading(false)
  },[landigPage])
  
   useEffect(()=>{
    router.push({pathname,query},asPath,{locale:i18n.language})
  },[i18n.language,/* router*/])



  //error
  if(errMsg){
    return(
      <Layout title="error page">
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>error in back end connection</div></div>  
    </Layout>
    )
  }

  /*//loading
  if(loading){
    return(
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>loading...</div></div>  
    )
  }*/
  return (
    <Layout title="homePage" t={t} desc="homePage" pages={pages}>
    <div className='scroll-smooth'>
      <div className="h-fit ">
         <HomePanner carousal={carousal?carousal:[]}/>                                                                
         <BoxCollection topCollection={topCollection?topCollection:[]}/>
         <div className='grid md:grid-cols-3 container mx-auto  mt-4'>
         <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckDelivery className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>{i18n.language==="ar"?shoDetail.attributes.FreeShipping_arabic:shoDetail.attributes.FreeShipping}</span>
          </div>
          <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckReturn className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>{i18n.language==="ar"?shoDetail.attributes.freeReturn_arabic:shoDetail.attributes.FreeReturn}</span>
          </div>
          <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckReturn className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>{i18n.language==="ar"?shoDetail.attributes.paymentSecurity_arabic:shoDetail.attributes.paymentSecurity}</span>
          </div>
         </div>
           {newProducts&&newProducts.length>0 &&<Slider type="new" key={newProducts.id} title={t("product:new_items")} products={newProducts}/>}
          <BoxCollection bottomCollection={bottomCollection?bottomCollection:[]}/>
          {popularProducts&&popularProducts.length>0&&<Slider type="popular" key={popularProducts.id} title={t("product:popular_items")} products={popularProducts}/>}
          {offerProducts&&offerProducts.length>0&&<Slider type="sales" rtl={true} key={offerProducts.id} title={t("product:sales_items")} products={offerProducts}/>}
         
      </div>
      <div className='py-2'><hr/></div>
      <div className=' container mx-auto text-center mt-4 mb-8'>
      <div className='capitalize text-gray-900 text-3xl'>{t("common:about_us")}</div>
      <p className='text-gray-900 mx-4 mt-2 ' dangerouslySetInnerHTML={{__html:i18n.language==="ar"?shoDetail.attributes.aboutUs_arabic:shoDetail.attributes.aboutUs}}/>
      </div>
    </div>
    </Layout>
  )
}

export async function getStaticProps({locale}) {
  
  try{
   
           const newRes = await fetch(`${API_URL}/api/products?sort=publishedAt:desc&populate=*&pagination[limit]=7`)
           const newproducts = await newRes.json()
       // popular products
           const popularRes = await fetch(`${API_URL}/api/products?filters[rate][$gt]=0&sort=rate:desc&populate=*&pagination[limit]=7`)
           const popularProducts = await popularRes.json()
           //offer products
           const offerRes = await fetch(`${API_URL}/api/products?filters[offer][$gt]=0&sort=offer:desc&populate=*&pagination[limit]=7`)
           const offerProducts = await offerRes.json()

     const landingRes = await fetch(`${API_URL}/api/landingpages?populate=%2A`)
     const landigPage = await landingRes.json()
      //pages
        const pagesRes = await fetch(`${API_URL}/api/pages?populate=*`)
        const pages = await pagesRes.json();
       //shop detais
       const shoDetailRes = await fetch(`${API_URL}/api/shop-detail`)
       const shoDetail = await shoDetailRes.json()
      
        return {
          props: {
            pages:pages.data||[],
            newProducts:newproducts.data||[],
            popularProducts:popularProducts.data||[],
            offerProducts:offerProducts.data||[],
            shoDetail:shoDetail.data,
           landigPage:landigPage.data,
            errMsg:false,
            ...(await serverSideTranslations(locale, ['common',"product"]))
          }
        }
  }catch(err){
    return {
      props: {
        errMsg:true,
        ...(await serverSideTranslations(locale, ['common',"product"]))
      }
    }
 }
}
export default Home;