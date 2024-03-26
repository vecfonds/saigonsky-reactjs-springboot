import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {  useDispatch, useSelector } from 'react-redux';
import {  changePassword, clearState, userSelector } from '../../store/features/userSlice';
import './ChangePassword.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from '../../components/Toastify/Toastify';

const validationSchema = z
    .object({
        oldPassword: z
            .string()
            .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
        password: z
            .string()
            .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Xác nhận mật khẩu là bắt buộc" }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Mật khẩu không khớp",
    });


const ChangePassword = () => {
    const dispatch = useDispatch();

    const [hiddenOldPwd, setHiddenOldPwd] = useState(false);
    const [hiddenPwd, setHiddenPwd] = useState(false);
    const [hiddenConfirmPwd, setHiddenConfirmPwd] = useState(false);

    const {
        username,
        message,
        isSuccessChangePassword,
        isError
    } = useSelector(userSelector);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        if(isSuccessChangePassword){
            notifySuccess(message);
            dispatch(clearState());
        }
        else if(isError){
            notifyError(message);
            dispatch(clearState());
        }
    }, [message, isSuccessChangePassword, isError]);

    const onSubmit = (data) => {
        dispatch(changePassword({
            currentPassword: data.oldPassword,
            newPassword: data.password,
            confirmationPassword: data.confirmPassword
        }));
    }

    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };


    return (
        <div id='change-password'>
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


                            <div className="form-groupP">
                                <div className="form-group2">
                                    <div className="pass-box">
                                        <input placeholder=" "
                                            type={hiddenOldPwd ? "text" : "password"}
                                            id="oldPassword"
                                            name="oldPassword"

                                            {...register("oldPassword")}
                                        />
                                        <label>Mật khẩu cũ</label>
                                        <div className="eye" onClick={() => setHiddenOldPwd(!hiddenOldPwd)}>
                                            <i className={hiddenOldPwd ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                        </div>
                                    </div>

                                </div>
                                {
                                    errors.password && (
                                        <p className="textDanger">
                                            {errors.password?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div className="form-groupP">
                                <div className="form-group2">
                                    <div className="pass-box">
                                        <input placeholder=" "
                                            type={hiddenPwd ? "text" : "password"}
                                            id="password"
                                            name="password"

                                            {...register("password")}
                                        />
                                        <label>Mật khẩu mới</label>
                                        <div className="eye" onClick={() => setHiddenPwd(!hiddenPwd)}>
                                            <i className={hiddenPwd ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                        </div>
                                    </div>

                                </div>
                                {
                                    errors.password && (
                                        <p className="textDanger">
                                            {errors.password?.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div className="form-groupP">
                                <div className="form-group2">
                                    <div className="pass-box">
                                        <input placeholder=" "
                                            type={hiddenConfirmPwd ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            {...register("confirmPassword")}
                                        />
                                        <label>Xác nhận mật khẩu</label>
                                        <div className="eye" onClick={() => setHiddenConfirmPwd(!hiddenConfirmPwd)}>
                                            <i className={hiddenConfirmPwd ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                        </div>
                                    </div>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="textDanger">
                                        {errors.confirmPassword?.message}
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

export default ChangePassword