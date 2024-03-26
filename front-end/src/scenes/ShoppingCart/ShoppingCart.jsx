import React, { useEffect } from 'react'
import './ShoppingCart.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductInCart, deleteShoppingCart, getCart, shoppingCartSelector, updateProductQuantityInCart } from '../../store/features/shoppingCartSlice';
import { motion } from "framer-motion"

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const ShoppingCart = () => {
    const dispatch = useDispatch();

    const {
        dataShoppingCart,
    } = useSelector(shoppingCartSelector);

    useEffect(() => {
        dispatch(getCart());
    }, []);

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

    const priceTotal = () => {
        var sum = 0;

        for (var i = 0; i < dataShoppingCart?.length; ++i) {
            sum += dataShoppingCart[i]?.product.price * dataShoppingCart[i]?.quantity;
        }

        return sum;
    }

    return (
        <div id="shopping-cart">
            <motion.div
                initial={offscreen}
                whileInView={onscreen}
                viewport={{ once: true }}

            >
                <div className="headeri">GIỎ HÀNG</div>

            </motion.div>

            <motion.div
                initial={{ y: "1.5rem", opacity: 0 }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 2,
                        type: "spring",
                        delay: 0.5
                    }
                }
                }
                viewport={{ once: true }}

            >
                <div className='sub-tilte'>({dataShoppingCart.length} sản phẩm)</div>
            </motion.div>

            <div className="shopping-cart-main">

                <TableContainer component={Paper}
                    style={{
                        zIndex: '10001',
                    }}

                    className='destop-shoppingcart'
                >
                    <Table sx={{ minWidth: 350 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sản phẩm</TableCell>
                                <TableCell align="center">Giá</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="center">Thành tiền</TableCell>
                                <TableCell align="center">Xóa</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataShoppingCart.map((cartItem) => (
                                <TableRow
                                    key={`${cartItem.id}-${cartItem.color}-${cartItem.size}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center" >
                                        <div className='product-cart-shopping'>
                                            <div className="product-cart-shopping-img">
                                                <img src={`${cartItem.product.images.filter(i => i.main === 1)[0]?.content}`} alt={`${cartItem.product.name}`} />
                                            </div>
                                            <div className="product-cart-shopping-detail">
                                                <h2 className="title">{cartItem.product.name}</h2>
                                                <div className='subtitle'>
                                                    <p className="brand-name"><strong>Thương hiệu:</strong> {cartItem.product.album}</p>
                                                    <p className="product-code"><strong>Mã SP:  </strong> {cartItem.product.id}</p>

                                                    <p><strong>Phiên bản:</strong> {cartItem.size} / {cartItem.color}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </TableCell>
                                    <TableCell align="center">{VND.format(cartItem.product.price)}</TableCell>
                                    <TableCell align="center">
                                        <div className="quantity-cart">
                                            <div className="quantity-input">
                                                {/* <ArrowBackIosIcon fontSize='small' onClick={() => { dispatch(updateProductQuantityInCart({ data: cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1 })) }} sx={{ cursor: "pointer" }} /> */}
                                                <ArrowBackIosIcon fontSize='small' onClick={() => { dispatch(updateProductQuantityInCart({ productId: cartItem.product.id, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1, size: cartItem.size, color: cartItem.color })) }} sx={{ cursor: "pointer" }} />
                                                <input className="quantity-input" type="text" value={cartItem.quantity} readOnly />
                                                {/* <ArrowForwardIosIcon fontSize='small' onClick={() => { dispatch(setQuantityProduct({ data: cartItem, quantity: cartItem.quantity + 1 })) }} sx={{ cursor: "pointer" }} /> */}
                                                <ArrowForwardIosIcon fontSize='small' onClick={() => { dispatch(updateProductQuantityInCart({ productId: cartItem.product.id, quantity: cartItem.quantity + 1, size: cartItem.size, color: cartItem.color })) }} sx={{ cursor: "pointer" }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">{VND.format(cartItem.product.price * cartItem.quantity)}</TableCell>
                                    <TableCell align="center">
                                        <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => {
                                            dispatch(deleteProductInCart({ productId: cartItem.product.id, size: cartItem.size, color: cartItem.color }));
                                            dispatch(deleteShoppingCart(cartItem));
                                        }
                                        } />
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <div className='mobile-shoppingcart'>
                    <div className='mobile-shoppingcart-center'>
                        {dataShoppingCart.map((cartItem) => (
                            <div className='product-cart-shopping'
                                key={`${cartItem.id}-${cartItem.color}-${cartItem.size}`}>
                                <div className="product-cart-shopping-img">
                                    <img src={`${cartItem.product.images.filter(i => i.main === 1)[0]?.content}`} alt="" />
                                </div>
                                <div className="product-cart-shopping-detail">
                                    <h2 className="title">{cartItem.product.name}</h2>
                                    <div className='subtitle'>
                                        <p className="brand-name"><strong>Thương hiệu:</strong> {cartItem.product.album}</p>
                                        <p><strong>Phiên bản:</strong> {cartItem.size} / {cartItem.color}</p>
                                    </div>

                                    <div className="quantity-cart">
                                        <div className="quantity-input">

                                            <ArrowBackIosIcon fontSize='small' onClick={() => { dispatch(updateProductQuantityInCart({ productId: cartItem.product.id, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1, size: cartItem.size, color: cartItem.color })) }} sx={{ cursor: "pointer" }} />

                                            <input className="quantity-input" type="text" value={cartItem.quantity} readOnly />

                                            <ArrowForwardIosIcon fontSize='small' onClick={() => { dispatch(updateProductQuantityInCart({ productId: cartItem.product.id, quantity: cartItem.quantity + 1, size: cartItem.size, color: cartItem.color })) }} sx={{ cursor: "pointer" }} />
                                        </div>

                                    </div>
                                    <div className='footer-card'>

                                        <p className="price">{VND.format(cartItem.product.price * cartItem.quantity)}</p>

                                        <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => {
                                            dispatch(deleteProductInCart({ productId: cartItem.product.id, size: cartItem.size, color: cartItem.color }));
                                            dispatch(deleteShoppingCart(cartItem));
                                        }
                                        } />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className='line'></div>

            <div className="total-money">
                <p>
                    <span className="total-money-title">Tổng tiền</span>
                    <span className="price total-money-main">{VND.format(priceTotal())}</span>
                </p>

                <div className="total-money-button">
                    <Link to='/thanhtoan' className="thanhtoan">THANH TOÁN</Link>

                </div>
            </div>
        </div>
    )
}

export default ShoppingCart