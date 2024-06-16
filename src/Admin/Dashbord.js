import React, {   } from "react";
import "./Dashbord.css";

import MyTable from "./MyTable";

function Dashbord() {
 
  //useEffect to get the data from local storage every time the component renders
  //and after editing the data directly update this data to local storage
  

  return (
    <div>
      <div>
        <h2>DASHBORD</h2>

      
        <MyTable />
      </div>
    </div>
  );
}

export default Dashbord;
