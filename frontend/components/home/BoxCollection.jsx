
import CardBox from './CardBox'
export default function BoxCollection({topCollection,bottomCollection}){
 
    return(
      <>
      {
         topCollection&&<div className={`grid md:grid-cols-3 container mx-auto`}>
         {
          topCollection.map((collection,index)=>(
            <div key={index} className='col-span-1'>
              <CardBox hight="md:h-72" collection={collection.attributes}/>
            </div>
          ))
         }
         </div>
      }
        {
         bottomCollection&&<div className={`grid md:grid-cols-2 container mx-auto`}>
         {
          bottomCollection.map((collection,index)=>(
            <div key={index} className='col-span-1'>
              <CardBox hight="md:h-96" collection={collection.attributes}/>
            </div>
          ))
         }
         </div>
      }
      </>
       
    )
}