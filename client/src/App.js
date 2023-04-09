import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import FoodDetails from './components/foodDetails/FoodDetails';
import FoodCatalog from './components/foodCatalog/FoodCatalog';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import {useLocation} from 'react-router-dom'
import Create from './components/create/Create'
import { useEffect } from 'react';
import OTP from './components/otp/OTP';
import Staff from './components/staff/Staff';
import Order from './components/order/Order';



function App() {
 const location = useLocation()
 
 useEffect(() => {
   window.scrollTo(0, 0)
 }, [location.pathname])


  return (
    <div>
       <Navbar />
       <Routes>
         <Route path='/home' element={<Home />} />
         <Route path='/' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/food/:id' element={<FoodDetails />} />
         <Route path='/foods/:id' element={<FoodCatalog />} />
         <Route path='/create' element={<Create />} />
         <Route path='/cart' element={<Cart />} />
         <Route path ='/otp' element={<OTP />} />
         <Route path='/staff' element={<Staff/>} />
         <Route path='/order' element={<Order/>} />
         <Route path='/checkout' element={<Checkout />} />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
