import { Link } from "react-router-dom"
import logo from '../assets/acura.jpg';
  
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
                                <Link key={product.vehicle_id} to={`/listing/${product.vehicle_id}`} state={{name:`${product.MakerName} ${product.model}`}} className="group">
                                    <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.2rem' }}>
                                    <img
                                        src={`https://raw.github.com/VarunS9000/dump_repo/main/all_imgs/${encodeURIComponent(product.MakerName)}%20${encodeURIComponent(product.model)}.jpg`}
                                        alt={"Picture of " + product.MakerName + " " + product.model}
                                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                    />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.MakerName+", "+product.model}</h3>
                                    <h4 className="text-sm text-gray-700">{product.body_type}</h4>
    
                                    <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                </Link>);
                            if(filters==null){
                                return component;
                            }
                            if(filters!=null && ((filters.MakerName==undefined || filters.MakerName.length==0 || filters.MakerName.includes(product.MakerName) )) && (filters.body_type==undefined || filters.body_type.length==0 || filters.body_type.includes(product.body_type))){
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
  