import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// var axios = require("axios");

const initialState = {
  dataFavorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
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
    addDataFavorite: (state, action) => {
      // console.log("addDataFavorite - action.payload", action.payload);

      state.dataFavorite.push(action.payload);
      // console.log("state", state);
      return state;
    },
    deleteDataFavorite: (state, action) => {
      // console.log("deleteDataFavorite - action.payload", action.payload);

      state.dataFavorite = state.dataFavorite.filter(
        (item) => item !== action.payload
      );

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

export const { clearState, clearData, addDataFavorite, deleteDataFavorite } =
  favoriteSlice.actions;

export const favoriteSelector = (state) => state.favorite;
