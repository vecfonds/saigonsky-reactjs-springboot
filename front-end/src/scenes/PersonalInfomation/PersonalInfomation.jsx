import React, { useEffect } from 'react'
import './PersonalInfomation.css'
import {  NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from 'react-redux';
import { clearState, updateUser, userSelector } from '../../store/features/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess } from '../../components/Toastify/Toastify';

const validationSchema = z
    .object({
        username: z.string().min(1, { message: "Tên là bắt buộc" }),
        phoneNumber: z.string().min(10, { message: "Số điện thoại gồm 10 chữ số" }),
        address: z.string().min(1, { message: "Địa chỉ là bắt buộc" }),
    })
    ;

const PersonalInfomation = () => {
    const dispatch = useDispatch();

    const {
        username,
        phoneNumber,
        address,
        isSuccessUpdateUser,
    } = useSelector(userSelector);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        setValue("username", username);
        setValue("phoneNumber", phoneNumber);
        setValue("address", address);
    }, [username, phoneNumber, address])

    useEffect(() => {
        if(isSuccessUpdateUser){
            dispatch(clearState());
            notifySuccess("Cập nhật thông tin thành công!");
        }
    }, [isSuccessUpdateUser]);


    const onSubmit = (data) => {
        dispatch(updateUser({
            username: data.username,
            phoneNumber: data.phoneNumber,
            address: data.address
        }));
    }

    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };

    return (
        <div id='personal-information'>
            <ToastContainer />
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
                                        type="number"
                                        name="phoneNumber"
                                        placeholder=" "
                                        {...register("phoneNumber")}
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
                                    />
                                    <label>Địa chỉ</label>
                                </div>
                                {errors.address && (
                                    <p className="textDanger">
                                        {errors.address?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button className="submit-btn" type="submit">
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfomation