import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shoppingCartService from "../../services/shoppingCart.service";

export const getCart = createAsyncThunk(
  "shoppingCart/getCart",
  async (thunkAPI) => {
    try {
      const response = await shoppingCartService.getCart();
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "shoppingCart/addProductToCart",
  async ({ productId, quantity, size, color }, thunkAPI) => {
    try {
      const response = await shoppingCartService.addProductToCart({ productId, quantity, size, color });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProductQuantityInCart = createAsyncThunk(
  "shoppingCart/updateProductQuantityInCart",
  async ({ productId, quantity, size, color }, thunkAPI) => {
    try {
      const response = await shoppingCartService.updateProductQuantityInCart({ productId, quantity, size, color });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const deleteProductInCart = createAsyncThunk(
  "shoppingCart/deleteProductInCart",
  async ({ productId, quantity, size, color }, thunkAPI) => {
    try {
      const response = await shoppingCartService.deleteProductInCart({ productId, quantity, size, color });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  dataShoppingCart: [],
  isFetchingShoppingCart: false,
  isSuccessGetShoppingCart: false,
  isSuccessAddShoppingCart: false,
  isSuccessUpdateShoppingCart: false,
  isSuccessDeleteShoppingCart: false,
  isErrorShoppingCart: false,
  messageShoppingCart: ""
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isErrorShoppingCart = false;
      state.isSuccessGetShoppingCart = false;
      state.isSuccessAddShoppingCart = false;
      state.isSuccessUpdateShoppingCart = false;
      state.isSuccessDeleteShoppingCart = false;
      state.isFetchingShoppingCart = false;
      state.messageShoppingCart = "";
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
        (item) => item.id !== action.payload.id);

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
    [getCart.pending]: (state) => {
      // console.log("getCart.pending", state)
      state.isFetchingShoppingCart = true;
      state.messageShoppingCart = "";
    },

    [getCart.fulfilled]: (state, action) => {
      // console.log("getCart.fulfilled", action.payload.cartItems)
      state.isFetchingShoppingCart = false;
      state.isSuccessGetShoppingCart = true;
      state.dataShoppingCart = action.payload.cartItems;
      state.messageShoppingCart = action.payload.message;
    },

    [getCart.rejected]: (state, action) => {
      // console.log("getCart.rejected", action)
      state.isFetchingShoppingCart = false;
      state.isErrorShoppingCart = true;
      // state.messageShoppingCart = action.payload.message;
    },


    [addProductToCart.pending]: (state) => {
      // console.log("addProductToCart.pending", state)
      state.isFetchingShoppingCart = true;
      state.messageShoppingCart = "";
    },

    [addProductToCart.fulfilled]: (state, action) => {
      // console.log("addProductToCart.fulfilled", action.payload.cartItems)
      state.isFetchingShoppingCart = false;
      state.isSuccessAddShoppingCart = true;
      state.dataShoppingCart = action.payload.cartItems;
      state.messageShoppingCart = action.payload.message;
    },

    [addProductToCart.rejected]: (state, action) => {
      // console.log("addProductToCart.rejected", action)
      state.isFetchingShoppingCart = false;
      state.isErrorShoppingCart = true;
      state.messageShoppingCart = action.payload.message;
    },

    [updateProductQuantityInCart.pending]: (state) => {
      // console.log("updateProductQuantityInCart.pending", state)
      state.isFetchingShoppingCart = true;
      state.messageShoppingCart = "";
    },

    [updateProductQuantityInCart.fulfilled]: (state, action) => {
      // console.log("updateProductQuantityInCart.fulfilled", action.payload.cartItems)
      state.isFetchingShoppingCart = false;
      state.isSuccessUpdateShoppingCart = true;
      state.dataShoppingCart = action.payload.cartItems;
      state.messageShoppingCart = action.payload.message;
    },

    [updateProductQuantityInCart.rejected]: (state, action) => {
      // console.log("updateProductQuantityInCart.rejected", action)
      state.isFetchingShoppingCart = false;
      state.isErrorShoppingCart = true;
      state.messageShoppingCart = action.payload.message;
    },


    [deleteProductInCart.pending]: (state) => {
      // console.log("deleteProductInCart.pending", state)
      state.isFetchingShoppingCart = true;
      state.messageShoppingCart = "";
    },

    [deleteProductInCart.fulfilled]: (state, action) => {
      // console.log("deleteProductInCart.fulfilled", action.payload)
      state.isFetchingShoppingCart = false;
      state.isSuccessDeleteShoppingCart = true;
      state.messageShoppingCart = action.payload.message;
    },

    [deleteProductInCart.rejected]: (state, action) => {
      // console.log("deleteProductInCart.rejected", action)
      state.isFetchingShoppingCart = false;
      state.isErrorShoppingCart = true;
      state.messageShoppingCart = action.payload.message;
    },
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
