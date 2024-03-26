import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

const initialState = {
  username: "",
  phoneNumber: "",
  address: "",
  isFetching: false,
  isSuccessGetUser: false,
  isSuccessUpdateUser: false,
  isSuccessChangePassword: false,
  isError: false,
  message: "",
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (thunkAPI) => {
    try {
      const response = await userService.getUser();
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ username, address, phoneNumber }, thunkAPI) => {
    try {
      const response = await userService.updateUser({ username, address, phoneNumber });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ currentPassword, newPassword, confirmationPassword }, thunkAPI) => {
    try {
      const response = await userService.changePassword({ currentPassword, newPassword, confirmationPassword });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccessGetUser = false;
      state.isSuccessUpdateUser=false;
      state.isSuccessChangePassword=false;
      state.isFetching = false;
      state.message = "";
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
      state.username = action.payload.username;
      state.phoneNumber = action.payload.phonenumber;
      state.address = action.payload.address;
      //   console.log("state", state);
      return state;
    },
  },

  extraReducers: {
    [getUser.pending]: (state) => {
      console.log("getUser.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getUser.fulfilled]: (state, action) => {
      console.log("getUser.fulfilled", action.payload)
      state.isSuccessGetUser = true;
      state.isFetching = false;
      state.username = action.payload.username;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
    },

    [getUser.rejected]: (state, action) => {
      console.log("getUser.rejected", action)
      state.isFetching = false;
      state.message = action.payload.message;
    },


    [updateUser.pending]: (state) => {
      console.log("updateUser.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [updateUser.fulfilled]: (state, action) => {
      console.log("updateUser.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccessUpdateUser = true;
      state.message = action.payload.message;
    },

    [updateUser.rejected]: (state, action) => {
      console.log("updateUser.rejected", action)
      state.isError = true;
      state.message = action.payload.message;
    },

    [changePassword.pending]: (state) => {
      console.log("changePassword.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [changePassword.fulfilled]: (state, action) => {
      console.log("changePassword.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccessChangePassword = true;
      state.message = action.payload.message;
    },

    [changePassword.rejected]: (state, action) => {
      console.log("changePassword.rejected", action)
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export const { clearState, clearData, loadDataUser, editDataUser } =
  userSlice.actions;

export const userSelector = (state) => state.user;
