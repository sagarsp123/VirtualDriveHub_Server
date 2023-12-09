
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState, useEffect} from 'react'
import logo from '../assets/car.jpg';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { apiClient } from '../axiosInstance';

export default function UpdateListing() {
  const params = useParams()
  const vehicle_id = params.id
  const navigate = useNavigate()
  const [listing,setListing] = useState({
    MakerName: "",
    model: "",
    trim: "",
    body_type: "",
    year: "",
    mileage: "",
    sale_status: "",
    price: "",
    addressLine1: "",
    city: "",
    stateAbbreviation: "",
    zip5: "",
  });

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const res = await apiClient.get(`listings/${vehicle_id}`);
        console.log('API Response:', res);

        if (res.data.length > 0) {
          const carData = res.data[0];
          setListing({
            MakerName: carData.MakerName,
            model: carData.model,
            trim: carData.trim,
            body_type: carData.body_type,
            year: carData.year,
            mileage: carData.mileage,
            sale_status: carData.sale_status,
            price: carData.price,
            addressLine1: carData.addressLine1,
            city: carData.city,
            stateAbbreviation: carData.stateAbbreviation,
            zip5: carData.zip5,
          });
        }
      } catch (err) {
        console.error('Error fetching car data:', err);
      }
    };

    fetchCarById();
  }, [vehicle_id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the listing
      const res = await apiClient.put(`listings/${vehicle_id}`, {
        MakerName: listing.MakerName,
        model: listing.model,
        trim: listing.trim,
        body_type: listing.body_type,
        year: listing.year,
        mileage: listing.mileage,
        sale_status: listing.sale_status,
        price: listing.price,
        addressLine1: listing.addressLine1,
        city: listing.city,
        stateAbbreviation: listing.stateAbbreviation,
        zip5: listing.zip5,
      });

      // Log the API response
      console.log('Update API Response:', res.data);

      // Show a pop-up message
      window.alert('Records have been updated!');

      setListing({MakerName: '',
      model: '',
      trim: '',
      body_type: '',
      year: 2023,
      mileage: 0,
      sale_status: 'Available',
      price: 0,
      addressLine1: '',
      city: '',
      stateAbbreviation: '',
      zip5: '',
    });

    navigate("/marketplace")

      // Handle success, display a message or redirect as needed
    } catch (err) {
      console.error('Error updating data:', err);
      // Handle error, display an error message or handle it accordingly
    }
  };


  
  return (
    <div
      className='flex min-h-screen' style={{ color: 'white' }}>
      <div
      className='flex-shrink-0 w-1/2'
      style={{
        paddingTop : '20px',
        background: `linear-gradient(rgba(1, 0, 0, 0.09), rgba(1, 0, 0, 0.09)), url(${logo}) center / cover no-repeat`,
      }}
        
    >
    </div>

    <div className='p-6 lg:px-10'>
    
    <form className="border border-gray-900 p-8" onSubmit={handleFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-2xl font-extrabold leading-7 text-gray-900">Update Existing Car Listing</h1>

          <div className="border-b border-gray-900/10 pb-12">
          <hr></hr>
          <br></br>
          <h2 className="text-base font-bold leading-7 text-gray-900">Car Details</h2>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="MakerName" className="block text-sm font-medium leading-6 text-gray-900">
                Maker
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="MakerName"
                  id="MakerName"
                  autoComplete="MakerName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.MakerName}
                  onChange={(e) => setListing((prev) => ({ ...prev, MakerName: e.target.value }))}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                Car Model
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="model"
                  id="model"
                  autoComplete="model"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.model}
                  onChange={(e) => setListing((prev) => ({ ...prev, model: e.target.value }))}
                
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="trim" className="block text-sm font-medium leading-6 text-gray-900">
                Trim
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="trim"
                  id="trim"
                  autoComplete="trim"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.trim}
                  onChange={(e) => setListing((prev) => ({ ...prev, trim: e.target.value }))}
                
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="body_type" className="block text-sm font-medium leading-6 text-gray-900">
                Body Type
              </label>
              <div className="mt-2">
                <input
                  id="body_type"
                  name="body_type"
                  type="text"
                  autoComplete="body_type"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.body_type}
                  onChange={(e) => setListing((prev) => ({ ...prev, body_type: e.target.value }))}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                Year
              </label>
              <div className="mt-2">
                <select
                  id="year"
                  name="year"
                  autoComplete="year"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={listing.year}
                  onChange={(e) => setListing((prev) => ({ ...prev, year: e.target.value }))}
                
                >
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                  <option>2013</option>
                  <option>2012</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="mileage" className="block text-sm font-medium leading-6 text-gray-900">
                Mileage
              </label>
              <div className="mt-2">
                <input
                  id="mileage"
                  name="mileage"
                  type="number"
                  autoComplete="mileage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.mileage}
                  onChange={(e) => setListing((prev) => ({ ...prev, mileage: e.target.value }))}
                
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="sale_status" className="block text-sm font-medium leading-6 text-gray-900">
                Sale Status
              </label>
              <div className="mt-2">
                <select
                  id="sale_status"
                  name="sale_status"
                  autoComplete="sale_status"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={listing.sale_status}
                  onChange={(e) => setListing((prev) => ({ ...prev, sale_status: e.target.value }))}
                
                >
                  <option>Available</option>
                  <option>Sold</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.price}
                  onChange={(e) => setListing((prev) => ({ ...prev, price: e.target.value }))}
                
                />
              </div>
            </div>


              </div>
        </div>
        
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h2 className="text-base font-bold leading-7 text-gray-900">Location</h2>
          
          <div className="col-span-full">
              <label htmlFor="addressLine1" className="block text-sm font-medium leading-6 text-gray-900">
                Address Line 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  autoComplete="addressLine1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.addressLine1}
                  onChange={(e) => setListing((prev) => ({ ...prev, addressLine1: e.target.value }))}
                
                />
              </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.city}
                  onChange={(e) => setListing((prev) => ({ ...prev, city: e.target.value }))}
                
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stateAbbreviation" className="block text-sm font-medium leading-6 text-gray-900">
                State Abbreviation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="stateAbbreviation"
                  id="stateAbbreviation"
                  autoComplete="stateAbbreviation"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.stateAbbreviation}
                  onChange={(e) => setListing((prev) => ({ ...prev, stateAbbreviation: e.target.value }))}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="zip5" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip5"
                  id="zip5"
                  autoComplete="zip5"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={listing.zip5}
                  onChange={(e) => setListing((prev) => ({ ...prev, zip5: e.target.value }))}
                />
              </div>
            </div>

          </div>
        </div>

        <div>
        <label htmlFor="image_url" className="block text-sm font-medium leading-6 text-gray-900">
                Image URL
          </label>
          <input
          type="file"
          id="image_url"
          accept="image/*"
          // onChange={handleImageChange}
        />
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
    </div>
  )

}
