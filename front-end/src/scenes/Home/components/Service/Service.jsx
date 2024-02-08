import React from 'react'
import './Service.css'
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import Replay30SharpIcon from '@mui/icons-material/Replay30Sharp';
import FingerprintSharpIcon from '@mui/icons-material/FingerprintSharp';
import { motion } from "framer-motion"


const Service = () => {
    return (
        <div id='service'>
            <div className="service">

                <motion.div
                    initial={{ left: "-10rem", opacity: 0 }}
                    whileInView={{ left: "0rem", opacity: 1 }}
                    transition={{
                        duration: 3,
                        type: "spring",
                        delay: 1.5

                    }}
                    viewport={{ once: true }}
                    className="service_child"
                >
                    <div className="service-icon">
                        <LocalShippingSharpIcon sx={{ color: "var(--primary-colorBlue1)" }} />
                    </div>
                    <div className="service-main">
                        <div className="service-title">Miễn phí giao hàng</div>
                        <div className="service-content">Tận hưởng giao hàng miễn phí cho tất cả các đơn hàng trên 500.000VNĐ</div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ left: "-20rem", opacity: 0 }}
                    whileInView={{ left: "0rem", opacity: 1 }}
                    transition={{
                        duration: 3,
                        type: "spring",
                        delay: 0.7
                    }}
                    viewport={{ once: true }}
                    className="service_child"

                >
                    <AccessTimeSharpIcon sx={{ color: "var(--primary-colorBlue1)" }} />
                    <div className="service-main">
                        <div className="service-title">Hõ trợ 24/7</div>
                        <div className="service-content">Nhóm hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn giải đáp thắc mắc</div>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ right: "-20rem", opacity: 0 }}
                    whileInView={{ right: "0rem", opacity: 1 }}
                    transition={{
                        duration: 3,
                        type: "spring",
                        delay: 0.7


                    }}
                    viewport={{ once: true }}
                    className="service_child"

                >
                    <Replay30SharpIcon sx={{ color: "var(--primary-colorBlue1)" }} />
                    <div className="service-main">
                        <div className="service-title">đổi trả trong vòng 30 ngày</div>
                        <div className="service-content">Đơn giản chỉ cần trả lại nó trong vòng 30 ngày để trao đổi.</div>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ right: "-10rem", opacity: 0 }}
                    whileInView={{ right: "0rem", opacity: 1 }}
                    transition={{
                        duration: 3,
                        type: "spring",
                        delay: 1.5

                    }}
                    viewport={{ once: true }}
                    className="service_child"

                >

                    <FingerprintSharpIcon sx={{ color: "var(--primary-colorBlue1)" }} />
                    <div className="service-main">
                        <div className="service-title">THANH TOÁN AN TOÀN 100%</div>
                        <div className="service-content">Các khoản thanh toán của chúng tôi được bảo mật bằng mã hóa.</div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default Service