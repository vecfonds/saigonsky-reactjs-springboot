import React from 'react'
import './BrandStory.css'
import DiamondIcon from '@mui/icons-material/Diamond';
import { motion } from "framer-motion"


const BrandStory = () => {
    const offscreen = { y: "1.5rem", opacity: 0 };
    const onscreen = {
        y: 0,
        opacity: 1,
        transition: {
            duration: 2,
            type: "spring",
            // delay: 1
        }
    }
    return (
        <div id='brandstory'>
            <motion.div
                initial={offscreen}
                whileInView={onscreen}
                viewport={{ once: true }}

            >
                <div className="headeri">CÂU CHUYỆN THƯƠNG HIỆU</div>
            </motion.div>
            <div className="card-effect1">
                <motion.div
                    className="card"
                    initial={{ x: "-15rem", opacity: 0, zIndex: 1, textShadow: "none" }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                        textShadow: "-5px 3px 4px rgba(0, 0, 0, 0.431)",

                        transition: {
                            duration: 1,
                            type: "spring",
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <h2>TẦM NHÌN</h2>
                    <p>
                        <i className="far fa-gem"></i> Trở thành đơn vị Phân Phối Vật Liệu
                        TrangTrí Nội Thất xây dựng hàng đầu tại Việt Nam.
                        <br />
                        <i className="far fa-gem"></i> Luôn thuộc nhóm các công ty dẫn đầu
                        trong lĩnh vực mà Saigon Sky tham gia.
                    </p>
                </motion.div>
                <motion.div
                    className="card"
                    initial={{ opacity: 0, x: "10rem", zIndex: 10, textShadow: 'none' }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        rotateZ: 10,
                        textShadow: "-5px 3px 4px rgba(0, 0, 0, 0.431)",

                        transition: {
                            duration: 1,
                            type: "spring",
                            delay: 1.5
                        }
                    }}

                    viewport={{ once: true }}
                >
                    <h2>SỨ MỆNH</h2>
                    <p>
                        <i className="far fa-gem"></i> Cung cấp sản phẩm, dịch vụ làm hài
                        lòng khách hàng.
                        <br />
                        <i className="far fa-gem"></i> Luôn quan tâm đến nhu cầu sử dụng
                        của từng phân khúc khách hàng, để từ đó lựa chọn và phân phối
                        những mẫu sản phẩm phù hợp nhất đến cho từng đối tượng khách hàng
                        khác nhau.
                        <br />
                        <i className="far fa-gem"></i> Trở thành nơi làm việc lý tưởng để
                        nâng cao kỹ năng, phát triển bản thân cũng như mang đến sự hài
                        lòng cho mỗi nhân viên với tâm niệm con người là tài sản vô giá.
                    </p>
                </motion.div>

                <motion.div
                    className="card"
                    initial={{ opacity: 0, x: "10rem", zIndex: 100, textShadow: "none" }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        rotateZ: 10,
                        textShadow: "-5px 3px 4px rgba(0, 0, 0, 0.431)",

                        transition: {
                            duration: 1,
                            type: "spring",
                            delay: 3
                        }
                    }}

                    viewport={{ once: true }}
                >
                    <h2>TRIẾT LÝ KINH DOANH</h2>
                    <p>
                        <i className="far fa-gem"></i> Uy tín xây dựng thương hiệu, chất
                        lượng tạo nên uy tín.
                    </p>
                </motion.div>

                <motion.div
                    className="card"
                    initial={{ opacity: 0, x: "10rem", zIndex: 1000 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        rotateZ: 10,

                        transition: {
                            duration: 1,
                            type: "spring",
                            delay: 4.5
                        }
                    }}

                    viewport={{ once: true }}
                >
                    <h2>GIÁ TRỊ CỐT LÕI</h2>
                    <p>
                        <i className="far fa-gem"></i> S – Special: Sản phẩm đặc biệt.
                        <br />
                        <i className="far fa-gem"></i> G – Good: Chất lượng tốt, dịch vụ
                        tốt, hậu mãi tốt.
                        <br />
                        <i className="far fa-gem"></i> S – Smart: Công nghệ thông minh.
                    </p>
                </motion.div>
            </div>
        </div >
    )
}

export default BrandStory
