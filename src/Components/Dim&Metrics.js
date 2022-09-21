import React, { useState, useRef } from 'react'
import './Dim&Metrics.css';
import {useDispatch, useSelector} from 'react-redux';
import {dimMetricsActions, selectedTableItemsActions, dragDropListActions} from './Store';

function DimMetrics() {
  
  const [isChange, setIsChange]= useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dispatch= useDispatch();
  
  const showOrNot= useSelector(state => state.dimMetrics.showDimMetrics);
  let [dmList, setList]= useState( [
    {index: 0,name: "date", value: "Date"},
    {index: 1,name: "app", value: "Apps"},
    {index: 2,name: "clicks", value: "Clicks"},
    {index: 3,name: "requests", value: "Ad Requests"},
    {index: 4,name: "responses", value: "Ad Responses"},
    {index: 5,name: "impressions", value: "Impression"},
    {index:6,name: "revenue", value: "Revenue"},
    {index:7,name: "fillRate", value: "Fill Rate"},
    {index: 8,name: "CTR", value: "CTR"},
]);

  function cancelhandler(){
    dispatch(dimMetricsActions.donotShowDimMetrics());
  };

  function toggleHandler(event){
    dispatch(selectedTableItemsActions.toggle(event.target.name));
    
    
  };
  
  function applyChangeshandler(){
    dispatch(selectedTableItemsActions.applyChanges());
    dispatch(dimMetricsActions.donotShowDimMetrics());
  };

  function startDrag(event, position){
    dragItem.current = position;
    
    
  }

  function dragOver(event, position){
  event.preventDefault();
  dragOverItem.current= position;

  }

 
    function drop(ev) {
      const copyListItems = [...dmList];
    const dragItemContent = copyListItems[dragItem.current];
    const dragOverItemContent= copyListItems[dragOverItem.current];
    copyListItems.splice(dragItem.current, 1, dragOverItemContent);
    copyListItems.splice(dragOverItem.current, 1, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
      setIsChange(true);

    }
  
    if(isChange){
      dispatch(dragDropListActions.dragDropListChange(dmList));
      setIsChange(false);
    }

  return ( <>
    {showOrNot && <div className='bigdimmetrics'>
    <h4>Dimensions and Metrics</h4>
    <div className='dimmetrics'>
    {dmList.map((each, index)=>{
      return <button  id= 'blue' onClick={toggleHandler} draggable onDragStart={(e)=> startDrag(e, index)} onDragOver={(e)=> dragOver(e, index)} onDrop={drop} name={each.name} key={index}>{each.value}</button>
    })}
    
    
    </div>

    <div className='buttonDiv'>
        <button onClick={cancelhandler}>Cancel</button>
        <button onClick={applyChangeshandler}>Apply Changes</button>
    </div>
</div>}
    </>
  )
}

export default DimMetrics 