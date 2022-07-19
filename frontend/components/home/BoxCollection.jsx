
import CardBox from './CardBox'
export default function BoxCollection({fristCollection,secondCollection}){

    return(
        <div className='grid md:grid-cols-2 container mx-auto'>

          <div className='col-span-1'>
            <CardBox name={fristCollection}/>
          </div>
          <div className='col-span-1'>
            <CardBox name={secondCollection}/>
          </div>
         </div>
    )
}