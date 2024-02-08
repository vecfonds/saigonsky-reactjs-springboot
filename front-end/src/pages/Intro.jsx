import React from 'react'
import Introduce from '../components/Introduce/Introduce'
import BrandStory from '../components/BrandStory/BrandStory'
import Brands from '../components/Brands/Brands'
import Slider from '../components/Slider/Slider'
import { Link } from 'react-router-dom'

const Lin = () => {
    return (
        <Link to='/lienhe' className="btn-shop">Liên Hệ Ngay</Link>
    )
}
const Intro = () => {
    return (
        <>
            <Slider Lin={Lin} />
            <Introduce seeMore={false} />
            <BrandStory />
            <Brands />
        </>
    )
}

export default Intro

