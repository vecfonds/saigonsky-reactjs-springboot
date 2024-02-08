import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {  userSelector } from '../../store/features/userSlice';
import { addDataFavorite, deleteDataFavorite, favoriteSelector } from '../../store/features/FavoriteSlice';
import { productsSelector } from '../../store/features/productsSlice';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './FavoritesList.css'

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const FavoritesList = () => {
    const dispatch = useDispatch();
    const {
        dataFavorite
    } = useSelector(favoriteSelector);

    const {
        data
    } = useSelector(productsSelector);

    const {
        Name,
    } = useSelector(userSelector);


    const navLinkClass = ({ isActive }) => {
        return isActive ? "list-group-item activated" : "list-group-item";
    };

    function handleClickFavorite(props) {
        // console.log("e.id", props)
        if (dataFavorite.filter(item => item === props).length) {
            dispatch(deleteDataFavorite(props));
        }
        else {
            dispatch(addDataFavorite(props));
        }
    }

    return (
        <div id='favorites-list'>
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
                    <div className="product--details">
                        {data.filter(item => dataFavorite.includes(item.Id)).map(product =>
                            <div className="product-card" style={{ position: "relative" }}>
                                <StyledRating
                                    defaultValue={0}
                                    value={dataFavorite.filter(item => item === product.Id).length}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClickFavorite(product.Id);
                                    }}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={1}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    max={1}
                                    size="inherit"
                                    name="size-large"
                                    sx={{ position: "absolute", right: "10px", top: "10px", fontSize: "large", zIndex: 1000 }}

                                />
                                <Link to={`/sanpham/${product.Id}`} state={{ id: product.Id }} className="product-card-img">
                                    <img src={`${product.image.filter(i => i.Main === 1)[0]?.Content}`} alt="item" />
                                    <div className="product-card-body">
                                        <Link to={`/sanpham/${product.Id}`} state={{ id: product.Id }} className="btn">MUA NGAY</Link>
                                    </div>
                                </Link>

                                <div className="product-card-detail">
                                    <Link to={`/sanpham/${product.Id}`} state={{ id: product.Id }} className="name">{product.Name}</Link>
                                    <p className="price">Giá: {VND.format(product.Price)}</p>
                                </div>
                            </div>)}
                    </div >
                </div>
            </div>
        </div>
    )
}

export default FavoritesList