import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Address: "",
  Birthday: null,
  Email: "",
  Gender: "",
  Id: "",
  Is_active: 0,
  Name: "",
  Password: "",
  Phone_number: "",
  Role: "",
};

export const userSlice = createSlice({
  name: "user",
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
    loadDataUser: (state, action) => {
      // console.log("action.payload", action.payload);
      state = { ...action.payload.data };
      //   console.log("state", state);
      return state;
    },
    editDataUser: (state, action) => {
      //   console.log("action.payload", action.payload);
      state.Address = action.payload.address;
      state.Phone_number = action.payload.phonenumber;
      state.Name = action.payload.fullname;
      //   console.log("state", state);
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

export const { clearState, clearData, loadDataUser, editDataUser } =
  userSlice.actions;

export const userSelector = (state) => state.user;
