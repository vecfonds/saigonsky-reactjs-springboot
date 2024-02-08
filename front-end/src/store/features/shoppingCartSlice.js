import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataShoppingCart: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
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
    clearDataShoppingCart: (state) => {
      state = { ...initialState };
      return state;
    },
    addShoppingCart: (state, action) => {
      state.dataShoppingCart.push(action.payload);
      return state;
    },
    deleteShoppingCart: (state, action) => {
      // console.log("deleteShoppingCart - action.payload", action.payload);

      state.dataShoppingCart = state.dataShoppingCart.filter(
        (item) =>
          item.data.Id !== action.payload.data.Id ||
          item.color !== action.payload.color ||
          item.size !== action.payload.size
      );

      // console.log("state", state);
      return state;
    },
    setQuantityProduct: (state, action) => {
      // console.log("setQuantityProduct ", action.payload);

      state.dataShoppingCart.filter(
        (item) =>
          item.data.Id === action.payload.data.data.Id &&
          item.color === action.payload.data.color &&
          item.size === action.payload.data.size
      )[0].quantity = action.payload.quantity;
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

export const {
  clearState,
  clearDataShoppingCart,
  addShoppingCart,
  deleteShoppingCart,
  setQuantityProduct,
} = shoppingCartSlice.actions;

export const shoppingCartSelector = (state) => state.shoppingCart;
