import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import billService from './../../services/bill.service';

const initialState = {
  billData: [],
  lastPage: true,
  pageNumber: 0,
  pageSize: 0,
  totalElements: 0,
  totalPages: 0,
  isFetching: false,
  isSuccessGetListBill: false,
  isSuccessAddBill: false,
  isError: false,
  message: "",
};

export const getListBillUser = createAsyncThunk(
  "bill/getListBillUser",
  async ({ pageNumber}, thunkAPI) => {
    try {
      const response = await billService.getListBillUser({ pageNumber});
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addBill = createAsyncThunk(
  "bill/addBill",
  async ({ payMethod }, thunkAPI) => {
    try {
      console.log(payMethod);
      const response = await billService.addBill({ payMethod });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccessGetListBill = false;
      state.isSuccessAddBill = false;
      state.isFetching = false;
      state.message = "";
      return state;
    },
    clearDataBill: (state) => {
      state = { ...initialState };
      return state;
    },
  },

  extraReducers: {
    [getListBillUser.pending]: (state) => {
      console.log("getListBillUser.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getListBillUser.fulfilled]: (state, action) => {
      console.log("getListBillUser.fulfilled", action.payload)
      state.isSuccessGetListBill = true;
      state.isFetching = false;
      state.billData = action.payload.content;
      state.lastPage = action.payload.lastPage;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;

    },

    [getListBillUser.rejected]: (state, action) => {
      console.log("getListBillUser.rejected", action)
      state.isFetching = false;
      state.message = action.payload.message;
    },


    [addBill.pending]: (state) => {
      console.log("addBill.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [addBill.fulfilled]: (state, action) => {
      console.log("addBill.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccessAddBill = true;
      state.message = action.payload.message;
    },

    [addBill.rejected]: (state, action) => {
      console.log("addBill.rejected", action)
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export const { clearState, clearDataBill } =
  billSlice.actions;

export const billSelector = (state) => state.bill;