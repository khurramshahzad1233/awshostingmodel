import React,{useEffect} from 'react';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Home from './pages/Home';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import axios from 'axios';
import Awsupload from './pages/Awsupload';

const App = () => {

  

  async function getprofiledata(){
    try {
      const mydata=await axios.get("/api/user/me");
    console.log(mydata)
    } catch (error) {
      console.log(error.response.data.message)
    }
    
  };


  useEffect(()=>{
    getprofiledata();

  },[])
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/upload' element={<Awsupload/>}/>
      </Routes>
    </Router>
  )
}

export default App