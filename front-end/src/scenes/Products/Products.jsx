import React, { useEffect, useState } from 'react'
import './Products.css'
import { motion } from "framer-motion"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Pagination, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getListProduct, getListProductByCategory, getListProductByKeyword, productsSelector } from '../../store/features/productsSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { favouriteSelector, getFavourite } from '../../store/features/favouriteSlice';
import { categorySelector, getListCategory } from '../../store/features/categorySlice';


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
        dataFavourite
    } = useSelector(favouriteSelector);


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

    const {
        totalElements,
        totalPages,
        data,
        message
    } = useSelector(productsSelector);

    const {
        dataCategory
    } = useSelector(categorySelector);

    const [pageNumber, setpageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [sortBy, setSortBy] = useState("price");
    const [sortOrder, setSortOrder] = useState("des");

    useEffect(() => {
        dispatch(getListProduct({ pageNumber, pageSize, sortBy, sortOrder }));
        dispatch(getFavourite());
        dispatch(getListCategory());
    }, []);

    const [searchParam, setSearchParam] = useState("");
    const [categoryParam, setCategoryParam] = useState(0);

    const handleSearch = (e) => {
        setSearchParam(e.target.value);
        setpageNumber(0);
        if (categoryParam !== 0) {
            setCategoryParam(0);
        }
        if (e.target.value.trim() === "") {
            dispatch(getListProduct({ pageNumber: 0, pageSize, sortBy, sortOrder }));
        }
        else {
            dispatch(getListProductByKeyword({ pageNumber: 0, pageSize, sortBy, sortOrder, keyword: e.target.value }));
        }
    }

    const handleFilterByCategory = (e) => {
        setCategoryParam(e.target.value);
        setSearchParam("");
        setpageNumber(0);
        if (e.target.value) {
            dispatch(getListProductByCategory({ pageNumber: 0, pageSize, sortBy, sortOrder, categoryId: e.target.value }));
        }
        else{
            dispatch(getListProduct({ pageNumber: 0, pageSize, sortBy, sortOrder }));
        }
    }

    const handleSortByAndOrder = (e) => {
        setCategoryParam(0);
        setSortOrder(e.target.value.split(",")[0]);
        setSortBy(e.target.value.split(",")[1]);
        setpageNumber(0);
        dispatch(getListProduct({ pageNumber: 0, pageSize, sortBy: e.target.value.split(",")[1], sortOrder: e.target.value.split(",")[0] }));
    }

    const handleChangePageNumber = (event, value) => {
        setpageNumber(value - 1);
        if (searchParam) {
            dispatch(getListProductByKeyword({ pageNumber: value - 1, pageSize, sortBy, sortOrder, keyword: searchParam }));
        }
        else if (categoryParam) {
            dispatch(getListProductByCategory({ pageNumber: value - 1, pageSize, sortBy, sortOrder, categoryId: categoryParam }));
        }
        else {
            dispatch(getListProduct({ pageNumber: value - 1, pageSize, sortBy, sortOrder }));
        }
    };

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

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
                <div className='sub-tilte'>({totalElements} sản phẩm)</div>
            </motion.div>

            <div className="filter_products">
                <div className="filter_products-left">

                    <div className="form-input">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            id="filter"
                            placeholder="Tìm kiếm"
                            value={searchParam}
                            onChange={handleSearch}
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
                                value={categoryParam}
                                onChange={handleFilterByCategory}
                                // onChange={(e) => {
                                //     setCategoryParam(e.target.value);
                                //     // dispatch(getListProductByCategory({ categoryId: e.target.value }));
                                // }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={0}>
                                    <em>Tất cả</em>
                                </MenuItem>
                                {
                                    dataCategory.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                                }
                                {/* <MenuItem value={1}>Quần</MenuItem>
                                <MenuItem value={2}>Áo</MenuItem> */}
                                {/* <MenuItem value={"Đầm"}>Đầm</MenuItem>
                                <MenuItem value={"Quần Dài"}>Quần Dài</MenuItem>
                                <MenuItem value={"Chân váy"}>Chân váy</MenuItem>
                                <MenuItem value={"Quần Short"}>Quần Short</MenuItem>
                                <MenuItem value={"Set bộ"}>Set bộ</MenuItem>
                                <MenuItem value={"Áo Dài"}>Áo Dài</MenuItem>
                                <MenuItem value={"Quần Jeans"}>Quần Jeans</MenuItem> */}
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
                                value={`${[sortOrder, sortBy]}`}
                                onChange={handleSortByAndOrder}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={`${["asc", "price"]}`}>Giá tăng dần</MenuItem>
                                <MenuItem value={`${["des", "price"]}`}>Giá giảm dần</MenuItem>
                                <MenuItem value={`${["des", "createAt"]}`}>Mới nhất</MenuItem>
                                <MenuItem value={`${["asc", "createAt"]}`}>Cũ nhất</MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                </div>

            </div>


            <div className="product--details">
                {
                    data.map(product =>
                        <div className="product-card" key={product.id}
                        // onClick={()=>dispatch(getListProductSimilar({ pageNumber: 0, pageSize, sortBy, sortOrder, categoryId: product.category.id }))}
                        >
                            <Link to={`${product.id}`} state={{ id: product.id }} className="product-card-img">

                                <img src={`${product.images.filter(i => i.main === 1)[0]?.content}`} alt={product.name} />

                                <StyledRating
                                    // name="customized-color"
                                    defaultValue={0}
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
                                    <Link to={`${product.id}`} state={{ id: product.id }} className="btn">MUA NGAY</Link>
                                </div>
                            </Link>

                            <div className="product-card-detail">
                                <Link to={`${product.id}`} state={{ id: product.id }} className="name">{product.name}</Link>
                                <p className="price">Giá: {VND.format(product?.price)}</p>
                            </div>
                        </div>)
                }
            </div >

            {
                message ?
                    <div className="message-warning">
                        <img src="/assets/images/meo.png" alt="meo" />
                        {/* <img src="https://khanhkhiem.com/wp-content/uploads/2022/10/meme-meo-bua-8.jpg" alt="meo" /> */}
                        <div>{message}</div>
                    </div>
                    : <div className="pagination">
                        <Pagination count={totalPages} page={pageNumber + 1} onChange={handleChangePageNumber} onClick={goToTop} />
                    </div>
            }
        </div>

    )
}

export default Products




