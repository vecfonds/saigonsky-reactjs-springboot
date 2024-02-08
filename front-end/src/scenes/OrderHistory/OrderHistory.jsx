import React, { useEffect, useState } from 'react'
import './OrderHistory.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/features/userSlice';
import axios from 'axios';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const OrderHistory = () => {
    const {
        Id,
        Name,
    } = useSelector(userSelector);

    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };

    const [dataOrderHistory, setDataOrderHistory] = useState();

    useEffect(() => {
        async function fetchData() {
            await axios
                .post(
                    "http://localhost/LTW_BE-dev/Controllers/GetBill.php",
                    {
                        customerID: Id
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    // console.log("GetBill.php", res.data);
                    if (res.data.isSuccess === true) {
                        setDataOrderHistory(res.data.data);
                        // console.log("res.data.", res.data.data);
                    }
                })
                .catch((err) => {
                    // console.log("err", err);
                });
        }

        fetchData();


    }, [Id])

    // console.log("dataOrderHistory", dataOrderHistory)

    return (
        <div id='order-history'>
            <div className="headeri">Xin chào {Name}</div>
            <div className="personal-information">
                <div className="personal-information-left">
                    <div className="category--list">
                        <div className="list-group">
                            <NavLink to="/taikhoan" className={navLinkClass}>
                                Thông tin tài khoản
                            </NavLink>
                            <NavLink to='/lichsudonhang' className={navLinkClass}>
                                Lịch sử đơn hàng
                            </NavLink>
                            <NavLink to='/danhsachyeuthich' className={navLinkClass}>
                                Danh sách yêu thích
                            </NavLink>
                            <NavLink to='/thaydoimatkhau' className={navLinkClass}>
                                Thay đổi mật khẩu
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="personal-information-right">

                    {dataOrderHistory?.map(bill =>
                        <div className="bill">
                            <div className='mobile-shoppingcart'>
                                <div className='mobile-shoppingcart-center'>
                                    {bill.details?.map((product) => (
                                        <div className='product-cart-shopping'>
                                            <div className="product-cart-shopping-img">
                                                <img src={`${product.Image}`} alt="" />

                                            </div>
                                            <div className="product-cart-shopping-detail">
                                                <h2 className="title">{product.Name}</h2>
                                                <div className='subtitle'>
                                                    <p className="brand-name"><strong>Thương hiệu:</strong> {product.Album}</p>
                                                    <p><strong>Phiên bản:</strong> {product.Size} / {product.Color}</p>
                                                </div>

                                                <div className="quantity-cart">
                                                    <div className="quantity-input">
                                                        <input className="quantity-input" type="text" value={product.Count} readOnly />
                                                    </div>

                                                </div>
                                                <div className='footer-card'>
                                                    <p className="price">{VND.format(product.Price_item)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bill-day">
                                <strong>Ngày đặt hàng:</strong> {bill.Time}
                            </div>

                            <div className="method">
                                <strong>Phương thức thanh toán:</strong> {bill.Pay_method}
                            </div>

                            <div className="address-order">
                                <strong>Địa chỉ giao hàng:</strong> {bill.Note}

                            </div>

                            <div className="total-money">
                                <p>
                                    <span className="total-money-title"><strong>Tổng tiền</strong></span>
                                    <span className="price total-money-main">{VND.format(bill.Total)}</span>
                                </p>


                            </div>
                        </div>
                    )}












                    {/* <div className="bill">
                        <div className='mobile-shoppingcart'>
                            <div className='mobile-shoppingcart-center'>
                                {dataShoppingCart.map((product) => (
                                    <div className='product-cart-shopping'>
                                        <div className="product-cart-shopping-img">
                                            <img src={`${product.data.image.filter(i => i.Main === 1)[0]?.Content}`} alt="" />
                                        </div>
                                        <div className="product-cart-shopping-detail">
                                            <h2 className="title">{product.data.Name}</h2>
                                            <div className='subtitle'>
                                                <p className="brand-name"><strong>Thương hiệu:</strong> {product.data.Album}</p>

                                                <p><strong>Phiên bản:</strong> {product.size} / {product.color}</p>
                                            </div>

                                            <div className="quantity-cart">
                                                <div className="quantity-input">


                                                    <input className="quantity-input" type="text" value={product.quantity} readOnly />

                                                </div>

                                            </div>
                                            <div className='footer-card'>
                                                <p className="price">{VND.format(product.data.Price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bill-day">
                            Ngày đặt hàng: 17/3/2023
                        </div>


                        <div className="total-money">
                            <p>
                                <span className="total-money-title">Tổng tiền</span>
                                <span className="price total-money-main">{VND.format(priceTotal())}</span>
                            </p>

                        </div>
                    </div> */}






                </div>





            </div>
        </div>
    )
}

export default OrderHistory