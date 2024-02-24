import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getList = createAsyncThunk(
  "list/getList",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("http://localhost:7070/api/services");

      if (!response.ok) {
        throw new Error("Простите, но мы всё сломали :(");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.mesasge);
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getList.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getList.fulfilled, (state, action) => {
      state.status = "resolved";
      state.list = action.payload;
    });
    builder.addCase(getList.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default listSlice.reducer;
