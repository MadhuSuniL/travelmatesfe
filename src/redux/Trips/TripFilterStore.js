import { configureStore } from '@reduxjs/toolkit';
import TripFilterReducer from './TripFilterSlice';

export default configureStore({
  reducer: {
    tripFilter: TripFilterReducer
  },
});
