import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/category.service";

export const getListCategory = createAsyncThunk(
    "category/getListCategory",
    async (thunkAPI) => {
      try {
        const response = await categoryService.getListCategory();
        // console.log(response)
        return response.data;
      } catch (error) {
        // console.log(error)
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  const initialState = {
    dataCategory: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    message: "",
  };

  export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
      clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
        state.message = "";
        return state;
      },
      clearData: (state) => {
        state = { ...initialState };
        return state;
      },
    },
  
    extraReducers: {
      [getListCategory.pending]: (state) => {
        console.log("getListCategory.pending", state)
        state.isFetching = true;
      },
  
      [getListCategory.fulfilled]: (state, action) => {
        console.log("getListCategory.fulfilled", action.payload)
        state.isFetching = false;
        state.isSuccess = true;
        state.dataCategory = action.payload;
      },
  
      [getListCategory.rejected]: (state, action) => {
        console.log("getListCategory.rejected", action)
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload.message;
      },
    },
  });
  
  export const { clearState, clearData } =
    categorySlice.actions;
  
  export const categorySelector = (state) => state.category;