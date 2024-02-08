import React from 'react'
import Slider from '../components/Slider/Slider'
import Introduce from '../components/Introduce/Introduce'
import Service from '../components/Service/Service'
import NewProducts from '../components/NewProducts/NewProducts'
import NewsHome from '../components/NewsHome/NewsHome'
import { Link } from 'react-router-dom'

const Lin = () => {
    return (
        <Link to='/sanpham' className="btn-shop">Mua Ngay</Link>
    )
}

const Home = () => {
    return (
        <>
            <Slider Lin={Lin} />
            <Introduce seeMore={true} />
            <Service />
            <NewProducts />
            <NewsHome />
        </>
    )
}

export default Home