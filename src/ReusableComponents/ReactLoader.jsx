/* eslint-disable react/prop-types */
import React from 'react';
import ScaleLoader  from "react-spinners/ScaleLoader";
import '../style/css/loader.css'


function ReactLoader({loaderClass,loading,message = "Loading..." }) {

  // const style:any = {textAlign: 'center',alignItem:'center'};

  return (
<>
<div className="loader-box" style={{height:'100vh'}}>
        <div className={loaderClass} style={{marginLeft:'0%',marginTop:'0%'}}>
        <ScaleLoader  
        color="grey"  
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader" 
        />
        <p>{message}</p>
        </div>
        </div>

      
   </>
  );
  }

export default ReactLoader;