// import './App.css'
import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration';
import Addrequest from './components/Addrequest';
import PendingRequest from './components/pendingRequest';
import HospitalDashboard from './components/HospitalDashboard';
import DonorDashboard from './components/DonorDashboard';

function App() {
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="Add" element={<Addrequest />} />
        <Route path="About" element={<About />} />
        <Route path="Login" element={<Login />} />
        <Route path="SignUp" element={<Registration />} />
        <Route path="pendingRequest" element={<PendingRequest />} />
        <Route path="HospitalDashboard" element={<HospitalDashboard />} />
        <Route path="DonorDashboard" element={<DonorDashboard />} />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
