import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Home from "./scenes/Home/index";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Intro from "./scenes/Intro/index";
import { lazy, useEffect, useLayoutEffect } from "react";
import SubNews from "./scenes/SubNews/SubNews";
import Products from "./scenes/Products/Products";
import Signup from "./scenes/Signup/Signup";
import Login from "./scenes/Login/Login";
import Contact from "./scenes/Contact/Contact";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import ProductDetail from "./scenes/ProductDetail/ProductDetail";
import ShoppingCart from "./scenes/ShoppingCart/ShoppingCart";
import Payment from "./scenes/Payment/Payment";
import PersonalInfomation from "./scenes/PersonalInfomation/PersonalInfomation";
import ChangePassword from "./scenes/ChangePassword/ChangePassword";
import OrderHistory from "./scenes/OrderHistory/OrderHistory";
import FavoritesList from "./scenes/FavoritesList/FavoritesList";
import { getUser } from "./store/features/userSlice";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dangky" element={<Signup />} />
          <Route path="/dangnhap" element={<Login />} />
          <Route path="/gioithieu" element={<Intro />} />
          <Route path="/sanpham" element={<Products />} />
          <Route path="/sanpham/:productId" element={<ProductDetail />} />
          <Route path="/giohang" element={<ShoppingCart />} />
          <Route path="/thanhtoan" element={<Payment />} />
          <Route path="/taikhoan" element={<PersonalInfomation />} />
          <Route path="/thaydoimatkhau" element={<ChangePassword />} />
          <Route path="/lichsudonhang" element={<OrderHistory />} />
          <Route path="/danhsachyeuthich" element={<FavoritesList />} />
          <Route path="/tintuc" element={<SubNews />} />
          <Route path="/lienhe" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </Wrapper>
    </Provider>
  );
}
