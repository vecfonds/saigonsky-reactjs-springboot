import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/product.service";

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async ({ productId }, thunkAPI) => {
    try {
      const response = await productService.getProduct({ productId });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getListProduct = createAsyncThunk(
  "products/getListProduct",
  async ({ pageNumber, pageSize, sortBy, sortOrder }, thunkAPI) => {
    try {
      const response = await productService.getListProduct({ pageNumber, pageSize, sortBy, sortOrder });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getListProductByCategory = createAsyncThunk(
  "products/getListProductByCategory",
  async ({ pageNumber, pageSize, sortBy, sortOrder, categoryId }, thunkAPI) => {
    try {
      console.log("categoryId", categoryId)

      const response = await productService.getListProductByCategory({ pageNumber, pageSize, sortBy, sortOrder, categoryId });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getListProductByKeyword = createAsyncThunk(
  "products/getListProductByKeyword",
  async ({ pageNumber, pageSize, sortBy, sortOrder, keyword }, thunkAPI) => {
    try {
      console.log("keyword", keyword)
      console.log("sortBy", sortBy)
      console.log("sortOrder", sortOrder)
      const response = await productService.getListProductByKeyword({ pageNumber, pageSize, sortBy, sortOrder, keyword });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getListProductSimilar = createAsyncThunk(
  "products/getListProductSimilar",
  async ({ pageNumber, pageSize, sortBy, sortOrder, categoryId }, thunkAPI) => {
    try {
      console.log("categoryId", categoryId)

      const response = await productService.getListProductByCategory({ pageNumber, pageSize, sortBy, sortOrder, categoryId });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const initialState = {
  // data: {
  //   content: [],
  //   lastPage: false,
  //   pageNumber: 0,
  //   pageSize: 8,
  //   totalElements: 0,
  //   totalPages: 0,
  // },
  lastPage: true,
  pageNumber: 0,
  pageSize: 0,
  totalElements: 0,
  totalPages: 0,
  data: [],
  isFetching: false,
  isSuccess: false,
  isSuccessDataProductCurrent: false,
  isError: false,
  message: "",
  dataProductSimilar: [],
  dataProductCurrent: {}
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearStateProduct: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isSuccessDataProductCurrent = false;
      state.isFetching = false;
      state.message = "";
      return state;
    },
    clearData: (state) => {
      state = { ...initialState };
      return state;
    },
    loadDataProducts: (state, action) => {
      console.log("action.payload", action.payload);
      // state.data = action.payload;
      console.log("state", state);
      return state;
    },
  },

  extraReducers: {
    [getListProduct.pending]: (state) => {
      console.log("getListProduct.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getListProduct.fulfilled]: (state, action) => {
      console.log("getListProduct.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload.content;
      state.lastPage = action.payload.lastPage;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.message = "";
    },

    [getListProduct.rejected]: (state, action) => {
      console.log("getListProduct.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    [getListProductByCategory.pending]: (state) => {
      console.log("getListProductByCategory.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getListProductByCategory.fulfilled]: (state, action) => {
      console.log("getListProductByCategory.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload.content;
      state.lastPage = action.payload.lastPage;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.message = "";
    },

    [getListProductByCategory.rejected]: (state, action) => {
      console.log("getListProductByCategory.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    [getListProductByKeyword.pending]: (state) => {
      console.log("getListProductByKeyword.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getListProductByKeyword.fulfilled]: (state, action) => {
      console.log("getListProductByKeyword.fulfilled", action.payload)
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload.content;
      state.lastPage = action.payload.lastPage;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.message = "";
    },

    [getListProductByKeyword.rejected]: (state, action) => {
      console.log("getListProductByKeyword.rejected", action.payload.message)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
      state.data = [];
      state.totalElements = 0;
    },


    [getListProductSimilar.pending]: (state) => {
      console.log("getListProductSimilar.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getListProductSimilar.fulfilled]: (state, action) => {
      console.log("getListProductSimilar.fulfilled", action.payload)
      state.dataProductSimilar = action.payload.content;
    },

    [getListProductSimilar.rejected]: (state, action) => {
      console.log("getListProductSimilar.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    [getProduct.pending]: (state) => {
      console.log("getProduct.pending", state)
      state.isFetching = true;
      state.message = "";
    },

    [getProduct.fulfilled]: (state, action) => {
      console.log("getProduct.fulfilled", action.payload)
      state.isSuccessDataProductCurrent = true;
      state.dataProductCurrent = action.payload;
    },

    [getProduct.rejected]: (state, action) => {
      console.log("getProduct.rejected", action)
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export const { clearStateProduct, clearData, loadDataProducts } =
  productsSlice.actions;

export const productsSelector = (state) => state.products;
