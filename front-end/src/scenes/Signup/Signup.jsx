import React, { useState } from 'react'
import './Signup.css'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (text) => toast.success(text, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
        fontSize: "16px"
    }
});

const notifyWarning = (text) => toast.warning(text, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
        fontSize: "16px"
    }
});

const validationSchema = z
    .object({
        fullname: z.string().min(1, { message: "Name is required" }),
        phonenumber: z.string().min(1, { message: "Phone number is required" }),
        address: z.string().min(1, { message: "Address is required" }),
        password: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
        terms: z.literal(true, {
            errorMap: () => ({ message: "You must accept Terms and Conditions" }),
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });

const Signup = () => {
    const navigate = useNavigate();

    const [hiddenPwd, setHiddenPwd] = useState(false);
    const [hiddenConfirmPwd, setHiddenConfirmPwd] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    // const [message, setMessage] = useState("");


    const onSubmit = (data) => {
        // console.log(data)

        axios
            .post(
                "http://localhost/LTW_BE-dev/Controllers/SignUpController.php",
                {
                    name: data.fullname,
                    phoneNumber: data.phonenumber,
                    address: data.address,
                    password: data.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                // console.log("ffsdff", res.data);
                // setMessage(res.data.message);
                if (res.data.isSuccess === true) {
                    notifySuccess(res.data.message);
                    setTimeout(() => { navigate("/dangnhap"); }, 2000)
                }
                else {
                    notifyWarning(res.data.message);
                }
            })
            .catch((err) => {
                // console.log("err", err);
            });


    }
    return (
        <div className="login-container">

            <div className="backgr">
                <ToastContainer />
                <div className="container">
                    <div className="container_left active-left">
                        <div className="image1"></div>
                    </div>
                    <div className="container_right">
                        <div className="logo">
                        </div>
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-inner">
                                <div className="welcome">
                                    <h1 className="text">Đăng ký</h1>
                                </div>

                                <div className="form-groupS">
                                    <div className="form-group">
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            id="fullname"
                                            placeholder=" "
                                            {...register("fullname")}
                                        />
                                        <label>Họ và tên</label>
                                    </div>
                                    {errors.fullname && (
                                        <p className="textDanger">
                                            {errors.fullname?.message}
                                        </p>
                                    )}
                                </div>

                                <div className="form-groupS">
                                    <div className="form-group">
                                        <input
                                            // autoComplete="off"
                                            type="number"
                                            name="phonenumber"
                                            placeholder=" "
                                            {...register("phonenumber")}
                                        />
                                        <label>Số điện thoại</label>
                                    </div>
                                    {errors.phonenumber && (
                                        <p className="textDanger">
                                            {errors.phonenumber?.message}
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

                                <div className="form-groupP">
                                    <div className="form-group2">
                                        <div className="pass-box">
                                            <input placeholder=" "
                                                type={hiddenPwd ? "text" : "password"}
                                                id="password"
                                                name="password"

                                                {...register("password")}
                                            />
                                            <label>Mật khẩu</label>
                                            <div className="eye" onClick={() => setHiddenPwd(!hiddenPwd)}>
                                                <i className={hiddenPwd ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                            </div>
                                        </div>

                                    </div>
                                    {errors.password && (
                                        <p className="textDanger">
                                            {errors.password?.message}
                                        </p>
                                    )}
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


                                <div className="remember">
                                    <div>
                                        <input type="checkbox"
                                            name="terms"
                                            {...register("terms")}
                                        /> <span>Đồng ý với điều khoản và chính sách bảo mật của chúng tôi</span>
                                    </div>

                                    {errors.terms && (
                                        <p className="textDanger">
                                            {errors.terms?.message}
                                        </p>
                                    )}

                                </div>

                            </div>


                            <button className="submit-btn" type="submit">Gửi</button>

                            <div className="line">
                            </div>
                            <div className="navigator">
                                Chưa có tài khoản? <Link to="/dangnhap">Đăng nhập</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default Signup;