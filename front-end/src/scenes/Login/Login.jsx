import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import '../Signup/Signup.css'
import { ToastContainer } from 'react-toastify';
import { authenticationSelector, clearState, loginUser } from '../../store/features/authenticationSlice';
import { getUser } from '../../store/features/userSlice';

const validationSchema = z
  .object({
    phoneNumber: z.string().min(10, { message: "Số điện thoại gồm 10 chữ số" }),

    password: z
      .string()
      .min(6, { message: "Mật khẩu phải ít nhất 6 chữ số" }),
  })
  ;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hiddenPwd, setHiddenPwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { isSuccess, isError, message } = useSelector(
    authenticationSelector
  );

  useEffect(() => {
    dispatch(clearState());
}, [dispatch]);

useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      dispatch(getUser());
      navigate("/sanpham");
    }
    if (isError) {
        setTimeout(() => dispatch(clearState()), 5000);
    }
}, [isSuccess, isError, navigate, dispatch]);

  const onSubmit = (data) => {
    const { phoneNumber, password } = data;
    dispatch(loginUser({ phoneNumber, password }));
  };

  return (
    <div className="login-container">
      <div className="backgr">
      <ToastContainer />
        <div className="container">
          <div className="container_left active-left">
            <div className="image1"></div>
          </div>
          <div className="container_right">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-inner">
                <div className="welcome">
                  <h1 className="text">Đăng nhập</h1>
                </div>

                <div className="form-groupS">
                  <div className="form-group">
                    <input
                      // autoComplete="off"
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
