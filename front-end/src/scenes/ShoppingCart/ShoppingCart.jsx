import React, { useState } from 'react'
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
import { deleteShoppingCart, setQuantityProduct, shoppingCartSelector } from '../../store/features/shoppingCartSlice';
import { motion } from "framer-motion"

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const ShoppingCart = () => {
    const dispatch = useDispatch();

    const {
        dataShoppingCart
    } = useSelector(shoppingCartSelector);

    // console.log("dataShoppingCart", dataShoppingCart);

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
            sum += dataShoppingCart[i]?.data.Price * dataShoppingCart[i]?.quantity;
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
                            {dataShoppingCart.map((product) => (
                                <TableRow
                                    key={`${product.data.Id}-${product.color}-${product.size}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center" >
                                        <div className='product-cart-shopping'>
                                            <div className="product-cart-shopping-img">
                                                <img src={`${product.data.image.filter(i => i.Main === 1)[0]?.Content}`} alt="" />
                                            </div>
                                            <div className="product-cart-shopping-detail">
                                                <h2 className="title">{product.data.Name}</h2>
                                                <div className='subtitle'>
                                                    <p className="brand-name"><strong>Thương hiệu:</strong> {product.data.Album}</p>
                                                    <p className="product-code"><strong>Mã SP:  </strong> {product.data.Id}</p>

                                                    <p><strong>Phiên bản:</strong> {product.size} / {product.color}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </TableCell>
                                    <TableCell align="center">{VND.format(product.data.Price)}</TableCell>
                                    <TableCell align="center">
                                        <div className="quantity-cart">
                                            <div className="quantity-input">
                                                <ArrowBackIosIcon fontSize='small' onClick={() => { dispatch(setQuantityProduct({ data: product, quantity: product.quantity > 1 ? product.quantity - 1 : 1 })) }} sx={{ cursor: "pointer" }} />
                                                <input className="quantity-input" type="text" value={product.quantity} readOnly />
                                                <ArrowForwardIosIcon fontSize='small' onClick={() => { dispatch(setQuantityProduct({ data: product, quantity: product.quantity + 1 })) }} sx={{ cursor: "pointer" }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">{VND.format(product.data.Price * product.quantity)}</TableCell>
                                    <TableCell align="center">
                                        <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => dispatch(deleteShoppingCart(product))} />
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <div className='mobile-shoppingcart'>
                    <div className='mobile-shoppingcart-center'>
                        {dataShoppingCart.map((product) => (
                            <div className='product-cart-shopping'
                                key={`${product.data.Id}-${product.color}-${product.size}`}>
                                <div className="product-cart-shopping-img">
                                    <img src={`${product.data.image.filter(i => i.Main === 1)[0]?.Content}`} alt="" />
                                </div>
                                <div className="product-cart-shopping-detail">
                                    <h2 className="title">{product.data.Name}</h2>
                                    <div className='subtitle'>
                                        <p className="brand-name"><strong>Thương hiệu:</strong> {product.data.Album}</p>
                                        <p><strong>Phiên bản:</strong> {product.size} / {product.color}</p>
                                    </div>

                                    <div className="quantity-cart">
                                        <div className="quantity-input">

                                            <ArrowBackIosIcon fontSize='small' onClick={() => { dispatch(setQuantityProduct({ data: product, quantity: product.quantity > 1 ? product.quantity - 1 : 1 })) }} sx={{ cursor: "pointer" }} />

                                            <input className="quantity-input" type="text" value={product.quantity} readOnly />

                                            <ArrowForwardIosIcon fontSize='small' onClick={() => { dispatch(setQuantityProduct({ data: product, quantity: product.quantity + 1 })) }} sx={{ cursor: "pointer" }} />
                                        </div>

                                    </div>
                                    <div className='footer-card'>

                                        <p className="price">{VND.format(product.data.Price * product.quantity)}</p>

                                        <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => dispatch(deleteShoppingCart(product))} />
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