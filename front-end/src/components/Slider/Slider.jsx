import React, { useEffect } from 'react'
import './Slider.css'
import { motion } from "framer-motion"

import { Slideshow, SlideshowItem } from "./slideshow";
import { Link } from 'react-router-dom';

const Slider = ({ Lin }) => {
    return (
        <div className="slider">
            <ul className="slideshow">
                <li><span>Image 01</span></li>
                <li><span>Image 02</span></li>
                {/* <li><span>Image 03</span><div><h3>3</h3></div></li>
                <li><span>Image 04</span><div><h3>4</h3></div></li>
                <li><span>Image 05</span><div><h3>5</h3></div></li>
                <li><span>Image 06</span><div><h3>6</h3></div></li> */}

                <div className="mobile_slider">
                    <div className="content_image">
                        <motion.div
                            // style={{ top: 0, left: -500, position: 'relative' }}
                            // animate={{ left: 0 }}
                            // transition={{
                            //     duration: 4,
                            //     type: "spring",
                            //     delay: 1.5
                            // }}
                            // initial={style = "ccc"}
                            // className='init-btn'

                            initial={{ top: 0, left: -270, position: 'relative', opacity: 0 }}
                            whileInView={{
                                left: 0,
                                opacity: 1,
                                transition: {
                                    duration: 4,
                                    type: "spring",
                                    delay: 3
                                }
                            }}
                            viewport={{ once: true }}
                        >
                            {/* <Link to='sanpham' className="btn-shop">Shop Now</Link> */}
                            {/* <Lin /> */}
                            {<Lin />}
                            {/* <img className="img_lock" src="/assets/images/slider/sliderlock.png" alt="lock" /> */}
                        </motion.div>
                    </div>



                    <div className="content">
                        <motion.div
                            animate={{ scale: [0.5, 1], opacity: [0, 1] }}
                            transition={{
                                duration: 2.7,
                                delay: 1.5

                            }}//times: [0, 1]
                        >
                            <h2>SaiGon Sky</h2>
                            <p>Đón đầu xu hướng, định hình phong cách</p>
                        </motion.div>
                    </div>

                </div>

            </ul>
        </div>
    )
}

export default Slider


