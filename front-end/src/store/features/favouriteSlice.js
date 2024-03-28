import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favouriteService from "../../services/favourite.service";
// var axios = require("axios");

export const getFavourite = createAsyncThunk(
  "favourite/getFavourite",
  async (thunkAPI) => {
    try {
      const response = await favouriteService.getFavourite();
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProductToFavourite = createAsyncThunk(
  "favourite/addProductToFavourite",
  async ({ productId }, thunkAPI) => {
    try {
      const response = await favouriteService.addProductToFavourite({ productId });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductInFavourite = createAsyncThunk(
  "favourite/deleteProductInFavourite",
  async ({ productId }, thunkAPI) => {
    try {
      const response = await favouriteService.deleteProductInFavourite({ productId });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  dataFavourite: [],
  isFetching: false,
  isSuccessGetFavourite: false,
  isSuccessAddFavourite: false,
  isSuccessDeleteFavourite: false,
  isError: false,
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccessGetFavourite = false;
      state.isSuccessAddFavourite = false;
      state.isSuccessDeleteFavourite = false;
      state.isFetching = false;
      state.message = "";
      return state;
    },
    clearData: (state) => {
      state = { ...initialState };
      return state;
    },
    addDataFavourite: (state, action) => {
      // console.log("addDataFavorite - action.payload", action.payload);

      state.dataFavourite.push(action.payload);
      // console.log("state", state);
      return state;
    },
    deleteDataFavourite: (state, action) => {
      // console.log("deleteDataFavorite - action.payload", action.payload);

      state.dataFavourite = state.dataFavourite.filter(
        (item) => item.id !== action.payload
      );

      // console.log("state", state);
      return state;
    },
  },

  extraReducers: {
    [getFavourite.pending]: (state) => {
      // console.log("getFavourite.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getFavourite.fulfilled]: (state, action) => {
      // console.log("getFavourite.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccessGetFavourite = true;
      state.dataFavourite = action.payload;
      state.message = action.payload.message;
    },

    [getFavourite.rejected]: (state, action) => {
      // console.log("getFavourite.rejected", action)
      state.isFetching = false;
      state.isError = true;
      // state.message = action.payload.message;
    },


    [addProductToFavourite.pending]: (state) => {
      // console.log("addProductToFavourite.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [addProductToFavourite.fulfilled]: (state, action) => {
      // console.log("addProductToFavourite.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccessAddFavourite = true;
      state.dataFavourite.push(action.payload);
      state.message = action.payload.message;
    },

    [addProductToFavourite.rejected]: (state, action) => {
      // console.log("addProductToFavourite.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    [deleteProductInFavourite.pending]: (state) => {
      // console.log("deleteProductInFavourite.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [deleteProductInFavourite.fulfilled]: (state, action) => {
      // console.log("deleteProductInFavourite.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccessDeleteFavourite = true;
      state.message = action.payload.message;
    },

    [deleteProductInFavourite.rejected]: (state, action) => {
      // console.log("deleteProductInFavourite.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export const { clearState, clearData, addDataFavourite, deleteDataFavourite } =
  favouriteSlice.actions;

export const favouriteSelector = (state) => state.favourite;
