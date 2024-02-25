import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../slice/listSlice";
import specificationReducer from "../slice/specificationSlice";
import calendarReducer from "../slice/calendarSlice";

export default configureStore({
  reducer: {
    list: listReducer,
    specification: specificationReducer,
    calendar: calendarReducer,
  },
});
