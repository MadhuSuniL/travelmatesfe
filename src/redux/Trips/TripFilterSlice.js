import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value : {
        search : '',
        address_from : '',
        address_to : '',
        distance__lte : '',
        distance__gte : '',
        group_size : '',  
        date__lte : '',
        date__gte : '',
        category : '',
        ordering : '',
    } 
}

export const tripFilterSlice = createSlice({
    name: 'tripFilterSlice',
    initialState,
    reducers: {
      setFilter: (state, action) => {
        const { field, value } = action.payload;
        console.log(field, value)
        state.value[field] = value  || '';
      },
      resetFilter: (state) => {
        state.value = initialState.value;
      },
    },
  })
// Action creators are generated for each case reducer function
export const { setFilter, resetFilter } = tripFilterSlice.actions

export default tripFilterSlice.reducer