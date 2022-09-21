import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import DimMetrics from './Components/Dim&Metrics';
import Table from './Components/Table';
import {dataActions} from './Components/Store';
import {useDispatch} from 'react-redux';
import {dimMetricsActions} from './Components/Store';

function App() {
    const [dates, setDates]= useState('June 01 - June 02, 2021');
   
    const startDate= useRef();
    const endDate= useRef();
    const dispatch= useDispatch();
   
    function settinghandler(){
        dispatch(dimMetricsActions.showDimMetrics());
  }
    
    useEffect(()=>{
       async function fetchHandler (){
        const response= await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-06-01&endDate=2021-06-02`)
        
        const data= await response.json();
        

        const appDataResponse= await fetch('http://go-dev.greedygame.com/v3/dummy/apps');
        const appData= await appDataResponse.json();
      
        dispatch (dataActions.change({data: data, appData: appData}));
      }
      fetchHandler();
    }, [])
    


    async function  dateHandler(){

        let start= startDate.current.value;
        let end= endDate.current.value;
        console.log(start);
        let startArray= start.split("-");
        let endArray= end.split("-");
    
        setDates(`June ${startArray[2]} - June ${endArray[2]} , ${endArray[0]}` );

       

        const response= await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${start}&endDate=${end}`)
        const data= await response.json();
        console.log(data);

        const appDataResponse= await fetch('http://go-dev.greedygame.com/v3/dummy/apps');
        const appData= await appDataResponse.json();
      
        dispatch (dataActions.change({data: data, appData: appData}));
        
    }

  return (
    <div className='bigDiv'>
        <h2>Analytics</h2>
        Choose Start Date: <input className="input" type="date" name= "startDate" min="2021-06-01" max="2021-06-30" ref={startDate} ></input>
        Choose end Date: <input className="input" type="date" name= "startDate" min="2021-06-01" max="2021-06-30" ref={endDate} onChange={dateHandler} ></input>
        <div className='datesettings'>
        <div>{dates}</div>
        <button onClick={settinghandler}>Settings</button>
        </div>
        <DimMetrics/>
        <Table/>
    </div>
  )
}

export default App