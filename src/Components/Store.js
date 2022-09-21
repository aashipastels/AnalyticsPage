import {configureStore, createSlice} from '@reduxjs/toolkit';

const dataSlice= createSlice({
    name: "data",
    initialState: {
        data: "",
        appData: "",
        showData: false
    },
    reducers: {
        change(state, actions){
            state.data= actions.payload.data;
            state.appData= actions.payload.appData;
            state.showData= true;
        }
    }
});

const dimmetricsSlice= createSlice({
    name: "dim&metrics",
    initialState: {
        showDimMetrics: false
    },
    reducers: {
        showDimMetrics(state, actions){
            state.showDimMetrics= true;
        },
        donotShowDimMetrics(state, actions){
            state.showDimMetrics= false;
        }

    }
})

const selectedTableItems= createSlice({
    name: "selectedTableItems",
    initialState: {
        selectedTableItems: [],
        actualSelectedTableItems: []
    },
    reducers: {
        toggle(state, actions){
            state.selectedTableItems.push(actions.payload);
        },
        applyChanges(state, actions){
            for(let n=0; n< state.selectedTableItems.length; n++){
                if(state.actualSelectedTableItems.includes(state.selectedTableItems[n])){
                    state.actualSelectedTableItems= state.actualSelectedTableItems.filter((each)=>{
                        
                        return each !== state.selectedTableItems[n];
                    });
                    console.log(state.actualSelectedTableItems);
                }else{
                    state.actualSelectedTableItems.push(state.selectedTableItems[n])
                }
            };
            state.selectedTableItems= [];
            
            
        }
           }
});

const dragDropList= createSlice({
    name: 'dragDropList',
    initialState: {
        dragDropList: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    reducers: {
        dragDropListChange(state, actions){
            state.dragDropList= actions.payload.map((each)=>{
                return (each.index);
              })
        }
    }

})

const Store= configureStore({
    reducer: {
        data: dataSlice.reducer,
        dimMetrics: dimmetricsSlice.reducer,
        selectedTableItems: selectedTableItems.reducer,
        dragDropList: dragDropList.reducer
    }
});
export const dataActions= dataSlice.actions;
export const dimMetricsActions= dimmetricsSlice.actions;
export const selectedTableItemsActions= selectedTableItems.actions;
export const dragDropListActions= dragDropList.actions;
export default Store;