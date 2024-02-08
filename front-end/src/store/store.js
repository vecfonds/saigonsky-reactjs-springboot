import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { productsSlice } from "./features/productsSlice";
import { shoppingCartSlice } from "./features/shoppingCartSlice";
import { favoriteSlice } from "./features/FavoriteSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
});

export default store;
