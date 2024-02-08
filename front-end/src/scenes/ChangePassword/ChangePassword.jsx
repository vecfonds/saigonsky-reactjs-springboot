import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {  useSelector } from 'react-redux';
import {  userSelector } from '../../store/features/userSlice';
import axios from 'axios';
import './ChangePassword.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (text) => toast.success(text, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const notifyError = (text) => toast.error(text, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});


const validationSchema = z
    .object({
        oldPassword: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters" }),
        password: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });


const ChangePassword = () => {
    const [hiddenOldPwd, setHiddenOldPwd] = useState(false);
    const [hiddenPwd, setHiddenPwd] = useState(false);
    const [hiddenConfirmPwd, setHiddenConfirmPwd] = useState(false);

    const {
        Address,
        Name,
        Phone_number,
    } = useSelector(userSelector);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        setValue("fullname", Name);
        setValue("phonenumber", Phone_number);
        setValue("address", Address);

    }, [])

    // const [message, setMessage] = useState("");

    const onSubmit = (data) => {
        axios
            .post(
                "http://localhost/LTW_BE-dev/Controllers/ChangePassword.php",
                {
                    phoneNumber: Phone_number,
                    oldPassword: data.oldPassword,
                    newPassword: data.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                // setMessage(res.data.message);
                if (res.data.isSuccess === true) {
                    // console.log("ok", res.data.isSuccess);
                    notifySuccess(res.data.message);
                }
                else {
                    notifyError(res.data.message);
                }
            })
            .catch((err) => {
                // console.log("err", err);
            });


    }

    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };


    return (
        <div id='change-password'>
            <ToastContainer />
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
                            {/* {message &&
                                <p className="textDanger" style={{ textAlign: "center" }}>
                                    {message}
                                </p>} */}

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