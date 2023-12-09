import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Marketplace from './Screens/Marketplace';
import CreateListing from './Components/CreateListing';
import NotFound from './Screens/NotFound';
import ListingOverview from './Screens/ListingOverview';
import UpdateListing from './Components/UpdateListing';


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/marketplace" element={<Marketplace/>} />
      <Route path="/maps" element={<h1>Maps</h1>} />
      <Route path='/listing/:id' element={<ListingOverview/>}/>
      <Route path='/listing/create' element={<CreateListing/>}/>
      <Route path='/listing/update/:id' element={<UpdateListing/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
