import React, { useEffect, useState } from 'react';
import './Table.css';
import {useSelector} from 'react-redux';


let added1, added2;
  let copy;
  let  in1, in2;

let  dateList, appList, clicksList, responsesList, requestsList, impressionsList, revenueList, fRList, CTRList;


function Table() {
  const [appNameList, setAppNameList]= useState([]);
  const [allChanges, setAllChanges]= useState(false);
  const data= useSelector(state => state.data.data);
  const showData= useSelector(state => state.data.showData);
  const tableItems= useSelector(state=> state.selectedTableItems.actualSelectedTableItems);
  const dragDropListItems= useSelector(state=> state.dragDropList.dragDropList);
  const appData= useSelector(state => state.data.appData);
   let [mainList, setMainList]= useState([]);
  
  useEffect(()=>{
  
  if(data!== ""){
    
    dateList= data.data.map((each)=>{
      return `${each.date.split("-")[2].slice(0, 2)} June 2021`
  });

    appList= data.data.map((each)=>{
        return each.app_id
  });

    clicksList= data.data.map((each)=>{
      return each.clicks
    });

    responsesList= data.data.map((each)=>{
      return each.responses
    });

    requestsList= data.data.map((each)=>{
      return each.requests  
    });

    impressionsList= data.data.map((each)=>{
      return each.impressions
    });
    revenueList= data.data.map((each)=>{
      return each.revenue.toFixed(2);
    });
    fRList= data.data.map((each)=>{
      return `${(each.requests/each.responses * 100).toFixed(2)}%`;
    } );
    CTRList= data.data.map((each)=>{
      return `${(each.clicks/ each.impressions * 100).toFixed(2)}%`;
    });

    dateList= ["Date", ...dateList]
    clicksList= ["Clicks", ...clicksList]
    requestsList= ["Requests", ...requestsList]
    responsesList= ["Responses", ...responsesList]
    impressionsList= ["Impressions", ...impressionsList]
    revenueList= ["Revenue", ...revenueList]
    fRList= ["Fill Rate", ...fRList]
    CTRList= ["CTR", ...CTRList]
   
    let virtualAppList= [];
  
    for (let n=0; n< appList.length; n++){
        for (let i=0; i < appData.data.length; i++){
          if(appList[n]=== appData.data[i].app_id){
            virtualAppList.push(appData.data[i].app_name)
          }
        }
       
      }

      setAppNameList(["App", ...virtualAppList]);
      setAllChanges(true);
    };
  
  }, [data, dragDropListItems]);
  
 
  dragDropListItems.map((each, index)=>{
    copy= [dateList, appNameList,clicksList, requestsList, responsesList, impressionsList, revenueList, fRList, CTRList];
    if(each!== index){
      added1= copy[each];
      added2= copy[index];
      in1= index;
      in2= each;
    }
    
  })
    
  
  if(allChanges && data!== ""){
    
    if(in1!==in2){
      copy.splice(in1, 1, added1);
      copy.splice(in2, 1, added2);
       console.log(copy);
       setMainList([...copy]);
      setAllChanges(false);
  
    }
    else{
      setMainList([...copy]);
      
      setAllChanges(false);
    }
    }
  
  return(<>
  {showData && data!== "" && <div className='table'>
           <div className='insideTable'>
          
          {mainList[0]?.map((each)=> <h3>{each}</h3>)}
          </div>
          <div className='insideTable'>
          
          {mainList[1]?.map((each)=> <h3>{each}</h3>)}
          </div>
          
          
          {tableItems.includes('clicks') && <div className='insideTable'>
          
          {mainList[2]?.map((each)=> <h3>{each}</h3>)}
          </div>}
          {tableItems.includes('requests') && <div className='insideTable'>
          
          {mainList[3]?.map((each)=> <h3>{each}</h3>)}
          </div>}
          {tableItems.includes('responses') &&<div className='insideTable'>
          
          {mainList[4]?.map((each)=> <h3>{each}</h3>)}
          </div>}
          {tableItems.includes('impressions') && <div className='insideTable'>
          
          {mainList[5]?.map((each)=> <h3>{each}</h3>)}
          </div>}
          {tableItems.includes('revenue') && <div className='insideTable'>
          
          {mainList[6]?.map((each)=> <h3>{each}</h3>)}
            </div>}
          {tableItems.includes('fillRate') &&<div className='insideTable'>
          
          {mainList[7]?.map((each)=> <h3>{each}</h3>)}
          </div>}
          {tableItems.includes('CTR') &&<div className='insideTable'>
          
          {mainList[8]?.map((each)=> <h3>{each}</h3>)}
          </div>}
          
        </div>}
    </>
  )
}

export default Table