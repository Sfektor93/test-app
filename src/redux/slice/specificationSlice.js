import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSpecification = createAsyncThunk(
  "specification/getSpecification",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`http://localhost:7070/api/services/${id}`);

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

const specificationSlice = createSlice({
  name: "specification",
  initialState: {
    specification: {},
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpecification.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getSpecification.fulfilled, (state, action) => {
      state.status = "resolved";
      state.specification = action.payload;
    });
    builder.addCase(getSpecification.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default specificationSlice.reducer;
