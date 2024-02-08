import React, { useEffect } from 'react'
import './PersonalInfomation.css'
import { Link, NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from 'react-redux';
import { editDataUser, userSelector } from '../../store/features/userSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (text) => toast.success(text, {
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
        fullname: z.string().min(1, { message: "Name is required" }),
        phonenumber: z.string().min(10, { message: "Số điện thoại phải ít nhất 10 chữ số" }),
        address: z.string().min(1, { message: "Name is required" }),
    })
    ;


const PersonalInfomation = () => {
    const dispatch = useDispatch();

    const {
        Address,
        Birthday,
        Email,
        Gender,
        Id,
        Is_active,
        Name,
        Phone_number,
        Role,
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
        setValue("fullname", Name);
        setValue("phonenumber", Phone_number);
        setValue("address", Address);

    }, [])


    const onSubmit = (data) => {
        const configData = {
            id: Id,
            isActive: Is_active,
            name: data.fullname,
            phoneNumber: data.phonenumber,
            email: Email,
            gender: Gender,
            role: Role,
            address: data.address,
            birthday: Birthday
        }
        // console.log(data);


        axios
            .post(
                "http://localhost/LTW_BE-dev/Controllers/EditCustomerController.php",
                configData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                // console.log("ffsdff", res.data);
                if (res.data.isSuccess === true) {
                    // console.log("dispatch");
                    dispatch(editDataUser(data));
                    notify("Cập nhật thông tin thành công!");
                }
            })
            .catch((err) => {
                // console.log("err", err)
            });

    }

    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };


    return (
        <div id='personal-information'>
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
                            <div className="form-groupS">
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        id="fullname"
                                        placeholder=" "
                                        {...register("fullname")}
                                    // value={Name}
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
                                        autoComplete="off"
                                        type="number"
                                        name="phonenumber"
                                        placeholder=" "
                                        {...register("phonenumber")}
                                    // value={Phone_number}
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
                                    // value={Address}
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