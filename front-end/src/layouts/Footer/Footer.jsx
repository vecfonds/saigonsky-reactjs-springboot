import React, { useEffect } from "react";
import './Footer.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categorySelector, getListCategory } from "../../store/features/categorySlice";

function Footer() {
    const dispatch = useDispatch();
    const {
        dataCategory
    } = useSelector(categorySelector);

    useEffect(() => {
        dispatch(getListCategory());
    }, []);
    
    return (
        <div className="footer">
            <div className="conn-social">
                <div className="conn-text">Get connected with us on social networks:</div>
                <div className="wrapper">
                    <Link to='https://www.facebook.com/pknguyen.vecfonds/' className="icon facebook">
                        <i className="fab fa-facebook-f"></i>
                        <span className="tooltip">Facebook</span>
                    </Link>
                    <Link to='https://github.com/vecfonds' className="icon github">
                        <i className="fab fa-github"></i>
                        <span className="tooltip">Github</span>
                    </Link>
                    <Link to='' className="icon twitter">
                        <i className="fab fa-twitter"></i>
                        <span className="tooltip">Twitter</span>
                    </Link>
                    <Link to='' className="icon instagram">
                        <i className="fab fa-instagram"></i>
                        <span className="tooltip">Instagram</span>
                    </Link>
                    <Link to='' className="icon youtube">
                        <i className="fab fa-youtube"></i>
                        <span className="tooltip">Youtube</span>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="footer-main">
                <div className="footer-component">
                    <h6 className="">
                        <i className="fas fa-star-and-crescent"></i>&nbsp;&nbsp;&nbsp;SAIGON SKY CO., LTD
                    </h6>
                    <p>
                        Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                        amet, consectetur adipisicing elit.
                    </p>
                </div>

                <div className="footer-component">
                    <h6 className="">Products</h6>
                    {
                        dataCategory.map(item =>
                            <p key={item.id}>
                                <a href="#!" className="text-reset">{item.name}</a>
                            </p>
                        )
                    }
                </div>

                <div className="footer-component">
                    <h6 className="">Useful links</h6>
                    <p>
                        <a href="/" className="text-reset">Trang chủ</a>
                    </p>
                    <p>
                        <a href="/gioithieu" className="text-reset">Giới thiệu</a>
                    </p>
                    <p>
                        <a href="/sanpham" className="text-reset">Sản phẩm</a>
                    </p>
                    <p>
                        <a href="/tintuc" className="text-reset">Tin tức</a>
                    </p>
                    <p>
                        <a href="/lienhe" className="text-reset">Liên hệ</a>
                    </p>
                </div>

                <div className="footer-component">
                    <h6 className="">Contact</h6>
                    <p>
                        <i className="fas fa-home me-3"></i>&nbsp;&nbsp;&nbsp;Tầng 08,Tòa nhà Pearl Plaza, số 561A Điện Biên Phủ,
                        Phường 25, Quận Bình Thạnh, Thành Phố Hồ Chí Minh
                    </p>
                    <p>
                        <i className="fas fa-envelope me-3"></i>&nbsp;&nbsp;&nbsp;info@saigonsky.com.vn
                    </p>
                    <p>
                        <i className="fas fa-envelope me-3"></i>&nbsp;&nbsp;&nbsp;thaonguyen@saigonsky.com.vn
                    </p>
                    <p><i className="fas fa-phone me-3"></i>&nbsp;&nbsp;&nbsp;+ 84 988 571 839</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;


