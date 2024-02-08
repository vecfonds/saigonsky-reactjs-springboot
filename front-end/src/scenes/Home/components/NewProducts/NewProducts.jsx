import React, { useEffect } from 'react';
import { motion } from "framer-motion"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './NewProducts.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadDataProducts, productsSelector } from '../../../../store/features/productsSlice';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { favoriteSelector } from '../../../../store/features/FavoriteSlice';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});


const NewProducts = () => {
    const dispatch = useDispatch();
    const {
        dataFavorite
    } = useSelector(favoriteSelector);

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

    useEffect(() => {
        axios
            .get(
                "http://localhost/LTW_BE-dev/Controllers/ShowProduct.php",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                // console.log("ffsdff", res.data);
                if (res.data.isSuccess === true) {
                    // console.log("res.data.", res.data.data);
                    dispatch(loadDataProducts(res.data.data));
                }
            })
            .catch((err) => {
                // console.log("err", err);
            });

    }, [])

    const {
        data
    } = useSelector(productsSelector);


    const slides = [
        {
            img: "/assets/images/products/1.jpg"
        },
        {
            img: "/assets/images/products/2.jpg"
        },
        {
            img: "/assets/images/products/3.jpg"
        },
        {
            img: "/assets/images/products/4.jpg"
        },

        {
            img: "/assets/images/products/1.jpg"
        },
        {
            img: "/assets/images/products/2.jpg"
        },
        {
            img: "/assets/images/products/3.jpg"
        },
        {
            img: "/assets/images/products/4.jpg"
        },
    ];

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true

                }
            }
        ]
    };

    return (
        <div className="new_products">
            <motion.div
                initial={offscreen}
                whileInView={onscreen}
                viewport={{ once: true }}

            >
                <div className="headeri">SẢN PHẨM MỚI</div>

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
                <div className='sub-tilte'>Đón đầu xu hướng, định hình phong cách</div>
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
                <Slider {...settings}>
                    {data.slice(0, 8).map(product =>//-8
                        <div className="product-card">
                            <Link to={`/sanpham/${product.Id}`} state={{ id: product.Id }} className="product-card-img">

                                <img src={`${product.image.filter(i => i.Main === 1)[0]?.Content}`} alt="item" />
                                <StyledRating
                                    // name="customized-color"
                                    defaultValue={0}
                                    value={dataFavorite.filter(item => item === product.Id).length}
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
                                    <Link to={`/sanpham/${product.Id}`} state={{ id: product.Id }} className="btn">MUA NGAY</Link>
                                </div>
                            </Link>
                        </div>)}
                </Slider>
            </motion.div>

        </div>
    )
}

export default NewProducts
