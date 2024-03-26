import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

export const signupUser = createAsyncThunk(
  "authentication/signupUser",
  async ({ username, address, phoneNumber, password }, thunkAPI) => {
    try {
      const response = await authService.register(username, address, phoneNumber, password);
      // thunkAPI.dispatch(setMessage(response.data.message));
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "authentication/login",
  async ({ phoneNumber, password }, thunkAPI) => {
    try {
      const data = await authService.login(phoneNumber, password);
      // console.log(data)
      // thunkAPI.dispatch(setMessage("Đăng nhập thành công!"));
      return { user: data };
    } catch (error) {
      // console.log(error)
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (thunkAPI) => {
    try {
      const response = await authService.logout();
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.message = "";
      return state;
    },
  },

  extraReducers: {
    [signupUser.pending]: (state) => {
      console.log("signupUser.pending", state)
      state.isFetching = true;
    },

    [signupUser.fulfilled]: (state, action) => {
      console.log("signupUser.fulfilled", action.payload.message)
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    },

    [signupUser.rejected]: (state, action) => {
      console.log("signupUser.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    [loginUser.pending]: (state) => {
      console.log("loginUser.pending", state)
      state.isFetching = true;
    },

    [loginUser.fulfilled]: (state, action) => {
      console.log("loginUser.fulfilled", action.payload.message)
      state.isFetching = false;
      state.isSuccess = true;
    },

    [loginUser.rejected]: (state, action) => {
      console.log("loginUser.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    [logout.pending]: (state) => {
      console.log("logout.pending", state)
      state.isFetching = true;
    },

    [logout.fulfilled]: (state, action) => {
      console.log("logout.fulfilled", action.payload.message)
      state.message = action.payload.message;
    },

    [logout.rejected]: (state, action) => {
      console.log("logout.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export const { clearState } = authenticationSlice.actions;

export const authenticationSelector = (state) => state.authentication;