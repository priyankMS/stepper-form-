import React from 'react';

import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Admin from './Admin/Admin';
import Main from './component/Main/Main';
import Dashbord from './Admin/Dashbord';
const App = () => {

  return(
  <div>
      <Routes>
        <Route path='/' element={<Main/>}/> 
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/dash' element={<Dashbord/>}/>
      </Routes>
    </div>
  )
};
export default App;