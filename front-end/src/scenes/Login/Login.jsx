import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { loadDataUser, } from '../../store/features/userSlice';
import '../Signup/Signup.css'

const validationSchema = z
  .object({
    phonenumber: z.string().min(10, { message: "Số điện thoại phải ít nhất 10 chữ số" }),

    password: z
      .string()
      .min(6, { message: "Mật khẩu phải ít nhất 6 chữ số" }),
  })
  ;


function Login() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [hiddenPwd, setHiddenPwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const [message, setMessage] = useState("");

  // const onSubmit = (data) => {
  //   axios
  //     .post(
  //       "http://localhost/LTW_BE-dev/Controllers/LoginController.php",
  //       {
  //         phoneNumber: data.phonenumber,
  //         password: data.password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("ffsdff", res.data);
  //       setMessage(res.data.message);
  //       if (res.data.isSuccess === true) {
  //         dispatch(loadDataUser(res.data));
  //         navigate("/sanpham");
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log("err", err)
  //     });
  // };

  return (
    <div className="login-container">
      <div className="backgr">
        <div className="container">
          <div className="container_left active-left">
            <div className="image1"></div>
          </div>
          <div className="container_right">
            <form className="form" onSubmit={handleSubmit()}>
              <div className="form-inner">
                <div className="welcome">
                  <h1 className="text">Đăng nhập</h1>
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
              </div>
              {message &&
                <p className="textDanger" style={{ textAlign: "center" }}>
                  {message}
                </p>}

              <button className="submit-btn" type="submit">
                Đăng nhập
              </button>
              <div className="line">
              </div>

              <div className="navigator">
                Chưa có tài khoản? <Link to="/dangky">Đăng ký</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
