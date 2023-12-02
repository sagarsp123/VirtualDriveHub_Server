import { useState, useEffect } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import axios from "axios";
import acura from '../assets/acura.jpg';


const reviews = { href: '#', average: 4, totalCount: 117 }


export default function ListingOverview() {
    const location = useLocation()
    const {name} = location.state
    const params = useParams()
    const vehicle_id = params.id
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true);

    const [makerNameValue, setMakerNameValue] = useState('');
    const [modelValue, setmodelValue] = useState('');
    const [price, setPrice] = useState('');
    const [body_type, setbody_type] = useState('');
    const [trim, set_trim] = useState('');
    const [mileage, set_mileage] = useState('');
    const [sale_status, set_sale] = useState('');
    const [year, set_year] = useState('');
    // const [makerNameValue, setMakerNameValue] = useState('');


    console.log(vehicle_id)
    const breadcrumbs = [
        { id: 1, name: 'Marketplace', href: '/marketplace' },
    ]
    
    const containerStyle = {
      backgroundColor: '#e0e0e0', // Gray background color
      color: '#000000', // Black text color
      padding: '20px', // Add padding for better spacing
      width: '960px', // Adjust the width as needed
      borderRadius: '10px', // Add rounded corners
      border: '2px solid #d1d1d1', // Add a border
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
    };
  
    const rowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px', // Add margin between rows
    };
  
    const separatorStyle = {
      border: '0.5px solid #000000', // Slightly black horizontal line
      margin: '10px 0', // Adjust margin for better spacing
    };
    
  useEffect(() => {
    //initialLoad().then((data)=>{setData(data); createFilters(data); setLoading(false);}).catch((e)=>{window.alert("error while fetching the data")})

    const fetchAllCars = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/listings/${vehicle_id}`);
        console.log('API Response:', res);
        setData(res.data);
        setLoading(false);
        setMakerNameValue(res.data[0].MakerName); // Set makerNameValue
        setmodelValue(res.data[0].model)
        setPrice(res.data[0].price)
        setbody_type(res.data[0].body_type)
        set_trim(res.data[0].trim)
        set_mileage(res.data[0].mileage)
        set_sale(res.data[0].sale_status)
        set_year(res.data[0].year)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCars();
    // setData(DemoData)
    // createFilters(DemoData)
    // setLoading(false)
},[vehicle_id])

console.log(data)

const carData = data[0];
// console.log(carData.model)
if (data.length > 0 && data[0]) {
  // Extract MakerName value
  const makerNameValue = data[0].MakerName;

  // Print the MakerName value
  console.log(makerNameValue);
} else {
  console.error("Data array is empty or undefined.");
}

  // Render your component with fetched data
  return (
    <div className="bg-white">
      <div className="pt-6" >
        <nav aria-label="Breadcrumb" className="flex justify-between items-center mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <Link to={`/posting/${vehicle_id}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {name}
              </Link>
            </li>
          </ol>
          <div className="flex-grow" />
          <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to="/listing/update" style={{ color: "inherit", textDecoration: "none" }}>
                  Update Listing
                </Link>
            </button>
        </nav>
      
        <div className="mx-auto max-w-2xl px-4 pb-1 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-2 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{makerNameValue} {modelValue}</h1>
          </div>

          {/* Options */}
          <div className="mt-2 lg:row-span-3 lg:mt-0 flex items-baseline">
            <p className="text-3xl tracking-tight text-gray-900">${price}</p>
            
          </div>
          </div>
      
      </div>
      <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
      {/* Left side */}
      <div style={{ width: '40%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ margin: 'auto' }}>
        <img src={acura} style={{ width: '170%', height: '130%', maxWidth: '200%', maxHeight: '200%',marginBottom: '30px', marginTop: '20px' , margin: 'auto' }} />
        </div>
      <br></br>
      <div style={containerStyle}>
      <h1>Overview</h1>
      <br></br>
      <br></br>
      <div style={rowStyle}>
        <p><bold>Maker:</bold></p>
        <p>{makerNameValue}</p>
      </div>
      <hr style={separatorStyle} />
      <div style={rowStyle}>
        <p><strong>Model:</strong></p>
        <p>{modelValue}</p>
      </div>
      <hr style={separatorStyle} />
      <div style={rowStyle}>
        <p><strong>Body Type:</strong></p>
        <p>{body_type}</p>
      </div>
      <hr style={separatorStyle} />
      <div style={rowStyle}>
        <p><strong>Trim:</strong></p>
        <p>{trim}</p>
      </div>
      <hr style={separatorStyle} />
      <div style={rowStyle}>
        <p><strong>Mileage:</strong></p>
        <p>{mileage}</p>
      </div>
      <hr style={separatorStyle} />
      <div style={rowStyle}>
        <p><strong>Year:</strong></p>
        <p>{year}</p>
      </div>
    </div>

      </div>
      
      
        
      </div>
    </div>
  );
}
