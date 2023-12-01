import { Link } from "react-router-dom"

  
  export default function PostingList({cars,filters}) {
    console.log(filters)
    return (
        <>
            { cars?
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {cars.map((product) => {
                            const component = (
                                <Link key={product.vehicle_id} to={`/listing/${product.vehicle_id}`} state={{name:`${product.maker} ${product.model}`}} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                        src={product.image_url}
                                        alt={"Picture of"+product.maker+" "+product.model}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.maker+", "+product.model}</h3>
                                    <h4 className="text-sm text-gray-700">{product.body_type}</h4>
    
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                </Link>);
                            if(filters==null){
                                return component;
                            }
                            if(filters!=null && ((filters.maker==undefined || filters.maker.length==0 || filters.maker.includes(product.maker) )) && (filters.bodyType==undefined || filters.bodyType.length==0 || filters.bodyType.includes(product.body_type))){
                                return component;
                            }
                            return null;
                        }).filter((item)=>item!=null)}
                    </div>
                </div>
            </div>: 
            <div class="loader w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin-slow"></div>
            }
        
        </>
      
    )
  }
  