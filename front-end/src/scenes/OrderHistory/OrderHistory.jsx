import React, { useEffect, useState } from 'react'
import './OrderHistory.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/features/userSlice';
import { billSelector, getListBillUser } from '../../store/features/billSlice';
import { Pagination } from '@mui/material';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const OrderHistory = () => {
    const dispatch = useDispatch();

    const {
        username,
    } = useSelector(userSelector);

    const {
        billData,
        totalPages,
    } = useSelector(billSelector);

    const [pageNumber, setpageNumber] = useState(0);

    useEffect(() => {
        dispatch(getListBillUser({ pageNumber }));
    }, [])

    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };

    const handleChangePageNumber = (event, value) => {
        setpageNumber(value - 1);
        dispatch(getListBillUser({ pageNumber: value - 1 }));
    };

    return (
        <div id='order-history'>
            <div className="headeri">Xin chào {username}</div>
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

                    {billData?.map(bill =>
                        <div className="bill" key={bill.id}>
                            <div className='mobile-shoppingcart'>
                                <div className='mobile-shoppingcart-center'>
                                    {bill.billDetails?.map((billDetail) => (
                                        <div className='product-cart-shopping' key={billDetail.id}>
                                            <div className="product-cart-shopping-img">
                                                <img src={`${billDetail.product.images.filter(i => i.main === 1)[0]?.content}`} alt={`${billDetail.product.name}`} />
                                            </div>
                                            <div className="product-cart-shopping-detail">
                                                <h2 className="title">{billDetail.product.name}</h2>
                                                <div className='subtitle'>
                                                    <p className="brand-name"><strong>Thương hiệu:</strong> {billDetail.product.album}</p>
                                                    <p><strong>Phiên bản:</strong> {billDetail.size} / {billDetail.color}</p>
                                                </div>

                                                <div className="quantity-cart">
                                                    <div className="quantity-input">
                                                        <input className="quantity-input" type="text" value={billDetail.quantity} readOnly />
                                                    </div>

                                                </div>
                                                <div className='footer-card'>
                                                    <p className="price">{VND.format(billDetail.product.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bill-day">
                                <strong>Ngày đặt hàng:</strong> {`${bill.createAt[3]}:${bill.createAt[4]}:${bill.createAt[5]} ${bill.createAt[2]}/${bill.createAt[1]}/${bill.createAt[0]}`}
                            </div>

                            <div className="method">
                                <strong>Phương thức thanh toán:</strong> {bill.payMethod}
                            </div>

                            <div className="address-order">
                                <strong>Địa chỉ giao hàng:</strong> {bill.address}

                            </div>

                            <div className="total-money">
                                <p>
                                    <span className="total-money-title"><strong>Tổng tiền</strong></span>
                                    <span className="price total-money-main">{VND.format(bill.total)}</span>
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






                    {billData.length!==0&&<div className="pagination">
                        <Pagination count={totalPages} page={pageNumber + 1} onChange={handleChangePageNumber} />
                    </div>}
                </div>




            </div>
        </div>
    )
}

export default OrderHistory