import React from 'react'
import './Introduce.css'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'


const Introduce = ({ seeMore }) => {
    const offscreen = { y: "1.5rem", opacity: 0 };
    const onscreen = {
        y: 0,
        opacity: 1,
        transition: {
            duration: 2,
            type: "spring",
            delay: 1
        }
    }

    return (
        <div id="introducei">
            <div className="introducei">
                <motion.div
                    className="contenti"
                    initial={{ left: "-20rem", opacity: 0 }}
                    whileInView={{ left: "0rem", opacity: 1 }}
                    transition={{
                        duration: 3,
                        type: "spring",
                    }}
                    viewport={{ once: true }}

                >


                    <motion.div
                        initial={offscreen}
                        whileInView={onscreen}
                        viewport={{ once: true }}

                    >
                        <div className="headeri">GIỚI THIỆU</div>
                    </motion.div>
                    <div>
                        Được thành lập từ năm 2022, SaiGon Sky là nhà cung cấp các giải pháp toàn diện về nội thất phòng tắm và thiết bị an ninh cao cấp hàng đầu tại Việt Nam với hơn 10 thương hiệu nổi tiếng toàn thế giới, trải dài từ đẳng cấp siêu sang (Jörger) đến phân khúc 5 sao (Brizo, Delta, Axent, Bagnodesign, Bette, Innoci, Aliseo…). Đa phong cách, đa thương hiệu, đa phân khúc – luôn có nhiều hơn một giải pháp tối ưu cho từng sự lựa chọn riêng biệt tại SaiGon Sky.                    </div>


                    {seeMore &&
                        <motion.div
                            initial={offscreen}
                            whileInView={onscreen}
                            viewport={{ once: true }}

                        >
                            <Link to='/gioithieu' className="button_about_us">
                                Xem thêm
                            </Link>
                        </motion.div>}


                </motion.div>

                <motion.div
                    className='introducei_img'
                    initial={{ right: "-20rem", opacity: 0 }}
                    whileInView={{ right: "0rem", opacity: 1 }}
                    transition={{
                        duration: 3,
                        type: "spring",
                    }}
                    viewport={{ once: true }}
                >
                    <img src="/assets/images/logo-white-removebg-preview.png" alt="Logo" />
                </motion.div>
            </div>
        </div>
    )
}

export default Introduce