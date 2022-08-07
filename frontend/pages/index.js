import Head from 'next/head'
import Image from 'next/image'
import HomePanner from "../components/home/Panner"
import styles from '../styles/Home.module.css'
import Slider from '../components/home/Slider'
import BoxCollection from '../components/home/BoxCollection'
import {API_URL} from '../utils/connectionConfig';
import Layout from '../components/Layout'
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb'
import Carousel from '../components/carousel/Carousel'
 function Home({pages,bottomCollection,topCollection,carousal,newProducts,popularProducts,offerProducts}) {

  console.log("landing Page",bottomCollection)
  return (
    <Layout title="homePage" desc="homePage" pages={pages}>
    <div className='scroll-smooth'>
      <div className="h-fit ">
         <HomePanner carousal={carousal}/>                                                                
         <BoxCollection topCollection={topCollection}/>
         <div className='grid md:grid-cols-3 container mx-auto  mt-4'>
         <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckDelivery className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>Free standard shipping on orders over $99</span>
          </div>
          <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckReturn className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>Free Return</span>
          </div>
          <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckReturn className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>high payment security</span>
          </div>
         </div>
           {newProducts.length>0 &&<Slider type="new" key={newProducts.id} title={"New Items"} products={newProducts}/>}
          <BoxCollection bottomCollection={bottomCollection}/>
          {popularProducts.length>0&&<Slider type="popular" key={popularProducts.id} title={"popular Items"} products={popularProducts}/>}
          {offerProducts.length>0&&<Slider type="sales" rtl={true} key={offerProducts.id} title={"greate sales Items"} products={offerProducts}/>}
      </div>
      
    </div>
    </Layout>
  )
}

export async function getStaticProps() {

  //new products
  const newRes = await fetch(`${API_URL}/api/products?sort=publishedAt:desc&populate=*&pagination[limit]=10`)
  const newproducts = await newRes.json()
  //popular products
  const popularRes = await fetch(`${API_URL}/api/products?filters[rate][$gt]=0&sort=rate:desc&populate=*&pagination[limit]=10`)
  const popularProducts = await popularRes.json()
  //offer products
  const offerRes = await fetch(`${API_URL}/api/products?filters[offer][$gt]=0&sort=offer:desc&populate=*&pagination[limit]=10`)
  const offerProducts = await offerRes.json()
//landig Page
   const carousalRes = await fetch(`${API_URL}/api/landingpages?filters[type][$eq]=carousal&populate=%2A`)
  const carousal = await carousalRes.json()
  const topCollectionRes = await fetch(`${API_URL}/api/landingpages?filters[type][$eq]=topCollection&populate=%2A`)
  const topCollection = await topCollectionRes.json()
  const bottomCollectionRes = await fetch(`${API_URL}/api/landingpages?filters[type][$eq]=bottomCollection&populate=%2A`)
  const bottomCollection = await bottomCollectionRes.json()
//pages
  const pagesRes = await fetch(`${API_URL}/api/pages?populate=*`)
  const pages = await pagesRes.json()

  return {
    props: {
      pages:pages.data,
      newProducts:newproducts.data,
      popularProducts:popularProducts.data,
      offerProducts:offerProducts.data,
      carousal:carousal.data,
      topCollection:topCollection.data,
      bottomCollection:bottomCollection.data

    },
  }
}
export default Home;