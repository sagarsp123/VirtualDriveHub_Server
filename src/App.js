import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Marketplace from './Screens/Marketplace';
import CreateListing from './Components/CreateListing';
import NotFound from './Screens/NotFound';
import ListingOverview from './Screens/ListingOverview';


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/marketplace" element={<Marketplace/>} />
      <Route path="/maps" element={<h1>Maps</h1>} />
      <Route path='/listing/:id' element={<ListingOverview/>}/>
      <Route path='/listing/create' element={<CreateListing/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
