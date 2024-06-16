import React from 'react'
import Admin from './Admin/Admin';
import { Outlet } from 'react-router-dom';

const PrivateRoutes = ()=>{
    const isAdmin = false;
    return isAdmin ? <Admin/> : <Outlet/>
}

export default PrivateRoutes