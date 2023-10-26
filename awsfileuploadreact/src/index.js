import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Userprovider from './context/Userprovider';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <GoogleOAuthProvider clientId='680966484762-r52v7ufhc3oh7g5h3i0j7qmg4e9uuub2.apps.googleusercontent.com'> 
    <Userprovider>
    <App />
    </Userprovider>
  </GoogleOAuthProvider> 
  
  
);

