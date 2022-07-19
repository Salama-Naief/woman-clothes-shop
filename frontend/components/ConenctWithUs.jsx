

export default function ConenctionWithUs (){


    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <div className="w-full font-serif text-gray-900 bg-gray-400 flex justify-center p-4">
            <div className="text-center">
                <div className="text-3xl my-4 capitalize">Chate with us</div>
                <div className="my-2 capitalize text-gray-700"> connect and say your opinitin or order specific product</div>
               <form action="flex items-center" onSubmit={handleSubmit}>
                   <input type="text" className="outline-none border border-primary bg-white py-2 px-4 text-gray-900 w-80 flex-grow" placeholder="Message" />
                   <button type="submit" className="mx-2 py-2 px-3 text-gray-900 bg-white border border-primary uppercase font-bold">Send</button>
               </form>
               <div className="my-2 capitalize text-gray-700"> your ordir will be ready in 24 hour</div>
            </div>
        </div>
    )
}