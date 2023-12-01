import React from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import logo from '../assets/Homepage.jpg';

export default function Home() {
    
      return (
        <div>
           <img src={logo} alt="Car Showroom" style={{ width: '100%', height: '100vh', margin: '0' }}/>
        </div>
      );
    };
