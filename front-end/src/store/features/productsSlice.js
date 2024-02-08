import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
var axios = require("axios");

const initialState = {
  data: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.message = "";
      state.isUploadSuccess = false;
      return state;
    },
    clearData: (state) => {
      state = { ...initialState };
      return state;
    },
    loadDataProducts: (state, action) => {
      // console.log("action.payload", action.payload);
      state.data = action.payload;
      // console.log("state", state);
      return state;
    },
  },

  extraReducers: {
    // [editUser.pending]: (state) => {
    //   state.isFetching = true;
    // },
    // [editUser.fulfilled]: (state, action) => {
    //   state.phoneNumber = action.payload.phoneNumber;
    //   state.fullname = action.payload.fullname;
    //   state.birthDay = action.payload.birthDay;
    //   state.isFetching = false;
    //   state.isSuccess = true;
    // },
    // [editUser.rejected]: (state, action) => {
    //   state.isFetching = false;
    //   state.isError = true;
    //   //   state.message = action.payload.message;
    // },
  },
});

export const { clearState, clearData, loadDataProducts } =
  productsSlice.actions;

export const productsSelector = (state) => state.products;
