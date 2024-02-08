import React, { useEffect, useState } from 'react'
import './Products.css'
import { motion } from "framer-motion"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadDataProducts, productsSelector } from '../../store/features/productsSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { favoriteSelector } from '../../store/features/FavoriteSlice';


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


const Products = () => {
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

                    console.log("res.data.", res.data.data);
                    localStorage.clear();
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

    // console.log("data", data)

    const [q, setQ] = useState("");
    const [searchParam] = useState(["Name", "Type"]);
    const [filterParam, setFilterParam] = useState("Tất cả");
    const [sortParam, setSortParam] = useState("Tùy chọn");

    const dataFilter = Object.values(data);

    function search(items) {
        if (sortParam !== "Tùy chọn") {
            function sortByIdThenName(a, b) {
                if (sortParam === "Giá tăng dần") {
                    const n = a.Price - b.Price;
                    // sort by listId
                    if (n !== 0) {
                        return n;
                    }
                }
                else {
                    const n = b.Price - a.Price;
                    // sort by listId
                    if (n !== 0) {
                        return n;
                    }
                }
                // if listId is equal then sort by name
                return a.Name.localeCompare(b.Name);
            }

            return items.sort(sortByIdThenName).filter((item) => {
                if (item.Name === filterParam) {
                    return searchParam.some((newItem) => {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(q.toLowerCase()) > -1
                        );
                    });
                }
                else if (item.Type === filterParam) {
                    return searchParam.some((newItem) => {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(q.toLowerCase()) > -1
                        );
                    });
                }
                else if (filterParam === "Tất cả") {
                    return searchParam.some((newItem) => {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(q.toLowerCase()) > -1
                        );
                    });
                }
            });
        }

        return items.filter((item) => {
            if (item.Name === filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
            else if (item.Type === filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
            else if (filterParam === "Tất cả") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }






    return (
        <div id="products">
            <motion.div
                initial={offscreen}
                whileInView={onscreen}
                viewport={{ once: true }}

            >
                <div className="headeri">Top Sản Phẩm Mới Nhất</div>

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
                <div className='sub-tilte'>({search(dataFilter).length} sản phẩm)</div>
            </motion.div>

            <div className="filter_products">
                <div className="filter_products-left">

                    <div className="form-input">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            id="filter"
                            placeholder="Tìm kiếm"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />

                    </div>
                </div>

                <div className="filter_products-right">
                    <div className="form-sort">
                        <p>Sản phẩm:</p>
                        <FormControl sx={{ m: 1, minWidth: 150, padding: 0, margin: 0 }}
                            className='form-select'
                        >
                            <Select
                                sx={{ height: 40, padding: 0, margin: 0 }}
                                value={filterParam}
                                onChange={(e) => {
                                    setFilterParam(e.target.value);
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"Tất cả"}>
                                    <em>Tất cả</em>
                                </MenuItem>
                                <MenuItem value={"Áo sơ mi"}>Áo sơ mi</MenuItem>
                                <MenuItem value={"Jumpsuit"}>Jumpsuit</MenuItem>
                                <MenuItem value={"Đầm"}>Đầm</MenuItem>
                                <MenuItem value={"Quần Dài"}>Quần Dài</MenuItem>
                                <MenuItem value={"Chân váy"}>Chân váy</MenuItem>
                                <MenuItem value={"Quần Short"}>Quần Short</MenuItem>
                                <MenuItem value={"Set bộ"}>Set bộ</MenuItem>
                                <MenuItem value={"Áo Dài"}>Áo Dài</MenuItem>
                                <MenuItem value={"Quần Jeans"}>Quần Jeans</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="form-sort">
                        <p>Sắp xếp theo:</p>
                        <FormControl sx={{ m: 1, minWidth: 150, padding: 0, margin: 0 }}
                            className='form-select'
                        >
                            <Select
                                sx={{ height: 40 }}
                                value={sortParam}
                                onChange={(e) => {
                                    setSortParam(e.target.value);
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"Tùy chọn"}>
                                    <em>Tùy chọn</em>
                                </MenuItem>
                                <MenuItem value={"Giá tăng dần"}>Giá tăng dần</MenuItem>
                                <MenuItem value={"Giá giảm dần"}>Giá giảm dần</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

            </div>


            <div className="product--details">
                {search(dataFilter).map(product =>
                    <div className="product-card" key={product.Id}>
                        <Link to={`${product.Id}`} state={{ id: product.Id }} className="product-card-img">

                            <img src={`${product.image.filter(i => i.Main === 1)[0]?.Content}`} alt={product.Name} />

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
                                <Link to={`${product.Id}`} state={{ id: product.Id }} className="btn">MUA NGAY</Link>
                            </div>
                        </Link>

                        <div className="product-card-detail">
                            <Link to={`${product.Id}`} state={{ id: product.Id }} className="name">{product.Name}</Link>
                            <p className="price">Giá: {VND.format(product?.Price)}</p>
                        </div>
                    </div>)}
            </div >
        </div>

    )
}

export default Products


