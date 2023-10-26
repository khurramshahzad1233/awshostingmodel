import React,{createContext, useContext,useState} from 'react';
const Usercontext=createContext();

const Userprovider = ({children}) => {

    const [user,setUser]=useState({})
    
  return (
    <Usercontext.Provider value={{user,setUser }}>
        {children}
    </Usercontext.Provider>
  )
};

export const Userstate=()=>{
    return useContext(Usercontext)
}

export default Userprovider   