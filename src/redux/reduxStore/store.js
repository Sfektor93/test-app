import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../slice/listSlice";
import specificationReducer from "../slice/specificationSlice";

export default configureStore({
  reducer: {
    list: listReducer,
    specification: specificationReducer,
  },
});
