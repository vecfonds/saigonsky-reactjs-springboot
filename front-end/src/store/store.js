import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { productsSlice } from "./features/productsSlice";
import { shoppingCartSlice } from "./features/shoppingCartSlice";
import { favouriteSlice } from "./features/favouriteSlice";
import { authenticationSlice } from "./features/authenticationSlice";
import { billSlice } from "./features/billSlice";
import { categorySlice } from "./features/categorySlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    favourite: favouriteSlice.reducer,
    authentication: authenticationSlice.reducer,
    bill: billSlice.reducer,
    category: categorySlice.reducer
  },
});

export default store;
