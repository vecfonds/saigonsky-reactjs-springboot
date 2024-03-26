import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import './Payment.css'
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/features/userSlice';
import { FormControl, MenuItem, Select } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearDataShoppingCart, getCart, shoppingCartSelector } from '../../store/features/shoppingCartSlice';
import { addBill, billSelector, clearDataBill } from '../../store/features/billSlice';
import {notifySuccess, notifyWarning} from "./../../components/Toastify/Toastify";

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const validationSchema = z
    .object({
        username: z.string().min(1, { message: "Name is required" }),
        phoneNumber: z.string().min(10, { message: "Số điện thoại gồm 10 chữ số" }),
        address: z.string().min(1, { message: "Name is required" }),
    })
    ;

const Payment = () => {
    const dispatch = useDispatch();

    const {
        username,
        phoneNumber,
        address,
    } = useSelector(userSelector);


    const {
        isSuccessAddBill
    } = useSelector(billSelector);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        dispatch(getCart());
    }, [])

    useEffect(() => {
        setValue("username", username);
        setValue("phoneNumber", phoneNumber);
        setValue("address", address);
    }, [username, phoneNumber, address])

    useEffect(() => {
        if(isSuccessAddBill){
            dispatch(clearDataBill());
            dispatch(clearDataShoppingCart());
            notifySuccess("Đặt hàng thành công!");
        }
    }, [isSuccessAddBill]);

    const [method, setMethod] = useState("Phương thức thanh toán");

    const {
        dataShoppingCart
    } = useSelector(shoppingCartSelector);

    const onSubmit = (data) => {
        if (method === "Phương thức thanh toán") {
            notifyWarning("Bạn cần chọn phương thức thanh toán");

        } else {
            dispatch(addBill({payMethod:method}));
        }

    }

    const priceTotal = () => {
        var sum = 0;

        for (var i = 0; i < dataShoppingCart?.length; ++i) {
            sum += dataShoppingCart[i]?.product.price * dataShoppingCart[i]?.quantity;
        }

        return sum;
    }

    return (
        <div id='payment'>
            <div className="payment-main">
                <ToastContainer />

                <div className="payment-main-left">
                    <div className="headeri">THÔNG TIN THANH TOÁN</div>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-inner">
                            <div className="form-groupS">
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        id="username"
                                        placeholder=" "
                                        {...register("username")}
                                        disabled
                                        className="not-allowed"
                                    // value={Name}
                                    />
                                    <label>Họ và tên</label>
                                </div>
                                {errors.username && (
                                    <p className="textDanger">
                                        {errors.username?.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-groupS">
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder=" "
                                        {...register("phoneNumber")}
                                        disabled
                                        className="not-allowed"
                                        // value={Phone_number}
                                    />
                                    <label>Số điện thoại</label>
                                </div>
                                {errors.phoneNumber && (
                                    <p className="textDanger">
                                        {errors.phoneNumber?.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-groupS">
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        name="address"
                                        placeholder=" "
                                        {...register("address")}
                                        disabled
                                        className="not-allowed"
                                        // value={Address}
                                    />
                                    <label>Địa chỉ giao hàng</label>
                                </div>
                                {errors.address && (
                                    <p className="textDanger">
                                        {errors.address?.message}
                                    </p>
                                )}
                            </div>

                        </div>
                        <div className="form-sort">
                            <FormControl sx={{
                                m: 1, width: "100%", padding: 0, margin: 0,
                                borderColor: "var(--main-3)!important",
                                height: "48.8px"
                            }}
                                className='form-select'
                            >
                                <Select
                                    sx={{
                                        height: 48.4, padding: 0, margin: 0,
                                        borderColor: "var(--main-3)!important",
                                    }}
                                    value={method}
                                    onChange={(e) => {
                                        setMethod(e.target.value);
                                    }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={"Phương thức thanh toán"}>
                                        <em>Phương thức thanh toán</em>
                                    </MenuItem>
                                    <MenuItem value={"Tiền mặt"}>Tiền mặt</MenuItem>
                                    <MenuItem value={"Momo"}>Momo</MenuItem>
                                    <MenuItem value={"ZaloPay"}>ZaloPay</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <button className="submit-btn" type="submit">
                            Thanh toán
                        </button>
                    </form>
                </div>

                <div className="payment-main-line">
                </div>

                <div className="payment-main-right">
                    <div className='mobile-shoppingcart'>
                        <div className='mobile-shoppingcart-center'>
                            {dataShoppingCart.map((cartItem) => (
                                <div className='product-cart-shopping'
                                    key={`${cartItem.product.id}-${cartItem.color}-${cartItem.size}`}>
                                    <div className="product-cart-shopping-img">
                                        <img src={`${cartItem.product.images.filter(i => i.main === 1)[0]?.content}`} alt="" />
                                    </div>
                                    <div className="product-cart-shopping-detail">
                                        <h2 className="title">{cartItem.product.name}</h2>
                                        <div className='subtitle'>
                                            <p className="brand-name"><strong>Thương hiệu:</strong> {cartItem.product.album}</p>
                                            <p><strong>Phiên bản:</strong> {cartItem.size} / {cartItem.color}</p>
                                        </div>
                                        <div className="quantity-cart">
                                            <div className="quantity-input">
                                                <input className="quantity-input" type="text" value={cartItem.quantity} readOnly />
                                            </div>
                                        </div>
                                        <div className='footer-card'>
                                            <p className="price">{VND.format(cartItem.product.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="total-money">
                            <p>
                                <span className="total-money-title">Tổng tiền</span>
                                <span className="price total-money-main">{VND.format(priceTotal())}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment