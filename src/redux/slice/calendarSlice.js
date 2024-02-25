import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    calendarTasks: [],
  },
  reducers: {
    addTask(state, action) {
      state.calendarTasks.push(action.payload);
    },
    removeTask(state, action) {
      state.calendarTasks = state.calendarTasks.filter(
        (item) => item.id !== action.payload
      );
    },
    editTask(state, action) {
      state.calendarTasks = state.calendarTasks.reduce((acc, item) => {
        if (
          item.content !== action.payload.content ||
          item.content.id !== action.payload.id ||
          item.data !== action.payload.data
        ) {
          acc.push(action.payload);
        } else acc.push(item);
        return acc;
      }, []);
    },
  },
});

export const { addTask, removeTask, editTask } = calendarSlice.actions;

export default calendarSlice.reducer;
