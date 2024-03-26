import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import ImageGallery from 'react-image-gallery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { clearStateProduct, getListProductSimilar, getProduct, productsSelector } from '../../store/features/productsSlice';
import { addProductToFavourite, deleteDataFavourite, deleteProductInFavourite, favouriteSelector } from '../../store/features/favouriteSlice';
import { addProductToCart, clearState, getCart, shoppingCartSelector } from '../../store/features/shoppingCartSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyWarning } from '../../components/Toastify/Toastify';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function createData(name, describe) {
    return { name, describe };
}

function createDataSize(name, sizeS_02, sizeM_04, sizeL_06, sizeXL_08, size2XL_10, size3XL_12) {
    return { name, sizeS_02, sizeM_04, sizeL_06, sizeXL_08, size2XL_10, size3XL_12 };
}

const sizes = [
    createDataSize("VAI (cm)", 35, 36, 37, 38, 39, 40),
    createDataSize("NGỰC (cm)", 82, 86, 90, 94, 98, 102),
    createDataSize("EO (cm)", 66, 70, 75, 80, 84, 88),
    createDataSize("MÔNG (cm)", 86, 90, 94, 98, 102, 106),
    createDataSize("CÂN NẶNG (kg)", 45 - 50, 51 - 55, 56 - 60, 61 - 64, 65 - 68, 69 - 70),
    createDataSize("CHIỀU CAO (cm)", 150 - 160, 155 - 160, 155 - 160, 160 - 165, 160 - 165, 160 - 165),

]

const ProductDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        data,
        dataProductCurrent,
        isSuccessDataProductCurrent
    } = useSelector(productsSelector);

    const offscreen = { y: "1.5rem", opacity: 0 };
    const onscreen = {
        y: 0,
        opacity: 1,
        transition: {
            duration: 2,
            type: "spring",
            // delay: 0.5
        }
    }

    const [quantity, setQuantity] = useState(1);

    const [size, setSize] = useState("Size 4");

    const [color, setColor] = useState("Vàng");

    function handleChange(e) {
        var value = e.target.value.replace(/[^0-9]/, '');
        value = (value === '' ? 1 : value);
        value = parseInt(value);

        setQuantity(value);
    }

    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });

    const {
        dataFavourite
    } = useSelector(favouriteSelector);

    const {
        dataShoppingCart,
        messageShoppingCart,
        isSuccessAddShoppingCart,
    } = useSelector(shoppingCartSelector);

    useEffect(() => {
        // dispatch(getListProductByCategory({ pageNumber: 0, pageSize:8, sortBy:"createAt", sortOrder:"des", categoryId: data.filter(product => product.id === Number(params.productId))[0].category.id }));
        dispatch(getProduct({ productId: params.productId }));
        dispatch(getCart());
    }, []);

    useEffect(() => {
        // dispatch(getListProductByCategory({ pageNumber: 0, pageSize:8, sortBy:"createAt", sortOrder:"des", categoryId: data.filter(product => product.id === Number(params.productId))[0].category.id }));
        if (isSuccessDataProductCurrent) {
            dispatch(getListProductSimilar({ pageNumber: 0, pageSize: 8, sortBy: "createAt", sortOrder: "des", categoryId: dataProductCurrent?.category?.id }));
            dispatch(clearStateProduct());
        }
    }, [isSuccessDataProductCurrent, dataProductCurrent]);

    useEffect(() => {
        if (messageShoppingCart === "Full authentication is required to access this resource") {
            dispatch(clearState());
            navigate("/dangnhap");
        }
        else if (messageShoppingCart) {
            notifyWarning(messageShoppingCart);
            dispatch(clearState());
        }
        else if (isSuccessAddShoppingCart) {
            dispatch(clearState());
            navigate("/giohang");
        }
    }, [messageShoppingCart, isSuccessAddShoppingCart]);

    function handleClickFavorite() {
        if (dataFavourite.filter(item => item?.id === Number(params.productId)).length) {
            dispatch(deleteProductInFavourite({ productId: params.productId }));
            dispatch(deleteDataFavourite(Number(params.productId)));
        }
        else {
            dispatch(addProductToFavourite({ productId: params.productId }));
        }
    }

    const rows = [
        createData('Chất liệu', dataProductCurrent.material),
        createData('Kiểu dáng', dataProductCurrent.style),
        createData('Sản phẩm thuộc dòng sản phẩm', dataProductCurrent.album),
        createData('Thông tin người mẫu', dataProductCurrent.model),
        createData('Sản phẩm kết hợp', dataProductCurrent.connect),
    ];

    function handleAddCart() {
        if (dataShoppingCart.filter(item => item.product.id === dataProductCurrent.id && item.color === color && item.size === size).length) {
            notifyWarning("Sản phẩm "+dataProductCurrent.name+" với màu " +color +", " + size +" này đã có trong giỏ hàng!");
        }
        else {
            dispatch(addProductToCart({ productId: dataProductCurrent.id, quantity, size, color }));
        }
    }

    function handlePayment() {
        if (dataShoppingCart.filter(item => item.product.id === dataProductCurrent.id && item.color === color && item.size === size).length) {
            notifyWarning("Sản phẩm "+dataProductCurrent.name+" với màu " +color +", " + size +" này đã có trong giỏ hàng!");
        }
        else {
            dispatch(addProductToCart({ productId: dataProductCurrent.id, quantity, size, color }));
            navigate("/thanhtoan");
        }
    }

    const images = [
        {
            original: `${dataProductCurrent?.images?.filter(i => i.main === 1)[0]?.content}`,
            thumbnail: `${dataProductCurrent?.images?.filter(i => i.main === 1)[0]?.content}`,

        },
        {
            original: `${dataProductCurrent?.images?.filter(i => i.main === 0)[0]?.content}`,
            thumbnail: `${dataProductCurrent?.images?.filter(i => i.main === 0)[0]?.content}`,

        },
        {
            original: `${dataProductCurrent?.images?.filter(i => i.main === 0)[1]?.content}`,
            thumbnail: `${dataProductCurrent?.images?.filter(i => i.main === 0)[1]?.content}`,

        },
    ];

    return (
        <div className='productdetail'>
            <input type="checkbox" hidden name="" id="instruction-popup" checked={checked} readOnly />
            <ToastContainer />

            {checked &&
                <TableContainer component={Paper}
                    style={{
                        padding: '2rem 1rem 1rem',
                        zIndex: '10001',
                    }}
                    className='table-instruction'
                >
                    <HighlightOffIcon
                        style={{ position: 'absolute', right: '5', top: '5' }}
                        onClick={handleChecked}
                    />
                    <div className="headeri">HƯỚNG DẪN CHỌN SIZE</div>

                    <Table sx={{ minWidth: 350 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>SIZE</strong></TableCell>
                                <TableCell align="center"><strong>S - 02</strong></TableCell>
                                <TableCell align="center"><strong>M - 04</strong></TableCell>
                                <TableCell align="center"><strong>L - 06</strong></TableCell>
                                <TableCell align="center"><strong>XL - 08</strong></TableCell>
                                <TableCell align="center"><strong>2XL - 10</strong></TableCell>
                                <TableCell align="center"><strong>3XL - 12</strong></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sizes.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        <strong>{row.name}</strong>
                                    </TableCell>
                                    <TableCell align="center">{row.sizeS_02}</TableCell>
                                    <TableCell align="center">{row.sizeM_04}</TableCell>
                                    <TableCell align="center">{row.sizeL_06}</TableCell>
                                    <TableCell align="center">{row.sizeXL_08}</TableCell>
                                    <TableCell align="center">{row.size2XL_10}</TableCell>
                                    <TableCell align="center">{row.size3XL_12}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <label htmlFor="instruction-popup" className="instruction__overlay" onClick={handleChecked}></label>

            <div className='productdetail-main'>
                <div className="productdetail-left">
                    <ImageGallery items={images}
                        thumbnailPosition="left"
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={false}
                        fullscreen
                    />
                </div>

                <div className="productdetail-right">
                    <motion.div
                        initial={offscreen}
                        whileInView={onscreen}
                        viewport={{ once: true }}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                        <h2 className="title">
                            {dataProductCurrent.name}
                        </h2>
                        <StyledRating
                            defaultValue={0}
                            value={dataFavourite.filter(item => item?.id === Number(params.productId)).length}
                            onClick={handleClickFavorite}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            icon={<FavoriteIcon fontSize="large" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="large" />}
                            max={1}
                            size="large"
                            name="size-large"
                        />

                    </motion.div>

                    <div className='subtitle'>
                        <p className="brand-name"><strong>Thương hiệu:</strong> {dataProductCurrent?.album}</p>
                        <p className="product-code"><strong>Mã SP:</strong> {Number(params.productId)}</p>
                    </div>

                    <p className="price">{VND.format(dataProductCurrent?.price)}</p>

                    <div className="size">
                        <p><strong>Kích thước:</strong> {size}</p>

                        <div className='select-size'>
                            <div className={size === "Size 4" && "size-checked"} onClick={() => setSize("Size 4")}>Size 4
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />
                            </div>
                            <div className={size === "Size 6" && "size-checked"} onClick={() => setSize("Size 6")}>Size 6
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />

                            </div>
                            <div className={size === "Size 8" && "size-checked"} onClick={() => setSize("Size 8")}>Size 8
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />

                            </div>
                        </div>
                    </div>
                    <div className="color">
                        <p><strong>Màu sắc:</strong> {color}</p>
                        <div className='select-color'>
                            <div className={color === "Vàng" && "color-checked"} onClick={() => setColor("Vàng")}>Vàng
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />
                            </div>
                            <div className={color === "Trắng" && "color-checked"} onClick={() => setColor("Trắng")}>Trắng
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />
                            </div>
                            <div className={color === "Hồng" && "color-checked"} onClick={() => setColor("Hồng")}>Hồng
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />
                            </div>
                            <div className={color === "Đen" && "color-checked"} onClick={() => setColor("Đen")}>Đen
                                <img src="/assets/images/checked.jpg" alt="" className="img-checked" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-size" onClick={handleChecked}>HƯỚNG DẪN CHỌN SIZE</div>

                    <div className="quantity">
                        <p><strong>Số lượng</strong></p>
                        <div className="quantity-input">
                            <ArrowBackIosIcon fontSize='small' onClick={() => setQuantity(curr => curr > 1 ? curr - 1 : 1)} sx={{ cursor: "pointer" }} />
                            <input className="quantity-input" type="text" value={quantity} onChange={(e) => handleChange(e)} />
                            <ArrowForwardIosIcon fontSize='small' onClick={() => setQuantity(curr => curr + 1)} sx={{ cursor: "pointer" }} />
                        </div>
                    </div>

                    <div className="btn" onClick={handleAddCart}>THÊM VÀO GIỎ HÀNG</div>
                    <div className="btn" onClick={handlePayment}>MUA NGAY</div>

                    <TableContainer component={Paper}>
                        <Table >
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <strong>{row.name}</strong>
                                        </TableCell>
                                        <TableCell align="left">{row.describe}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* <div className='line'></div>

            <div className='similar-product'>
                <motion.div
                initial={offscreen}
                whileInView={onscreen}
                viewport={{ once: true }}
                >
                    <div className="headeri">SẢN PHẨM TƯƠNG TỰ</div>
                </motion.div>

                <motion.div
                initial={{ position: "relative", opacity: 0 }}
                whileInView={{
                    opacity: 1,
                    transition: {
                        duration: 2,
                        type: "spring",
                        delay: 1.5
                    }
                }}
                viewport={{ once: true }}
                >
                    <Slider {...settings}
                        className='similar-product-slider'
                    >
                        {dataProductSimilar.filter(x => x.id !== Number(params.productId)).map(product =>
                            <div className="product-card" key={product.id}
                                onClick={()=>dispatch(getProduct({ productId: params.productId }))}
                            >
                                <Link to={`/sanpham/${product.id}`} state={{ id: product.id }} className="product-card-img">
                                    <img src={`${product.images.filter(i => i.main === 1)[0]?.content}`} alt="item" />
                                    <StyledRating
                                        // name="customized-color"
                                        defaultValue={0}
                                        // value={dataFavourite.filter(item => item.id === product.id).length}
                                        value={dataFavourite.filter(item => item?.id === product.id).length}
                                        readOnly
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        precision={1}
                                        icon={<FavoriteIcon fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                        sx={{ position: "absolute", right: "10px", top: "10px", fontSize: "large" }}
                                        max={1}
                                        size="inherit"
                                        name="size-large"
                                    />
                                    <div className="product-card-body">
                                        <Link to={`/sanpham/${product.id}`} state={{ id: product.id }} className="btn">MUA NGAY</Link>
                                    </div>
                                </Link>

                                <div className="product-card-detail">
                                    <Link to={`/sanpham/${product.id}`} state={{ id: product.id }} className="name">{product.name}</Link>
                                    <p className="price">Giá: {VND.format(product?.price)}</p>
                                </div>
                            </div>)}
                    </Slider>
                </motion.div>
            </div> */}
        </div>
    )
}

export default ProductDetail