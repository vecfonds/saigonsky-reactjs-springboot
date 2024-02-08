import React from 'react'
import './SubNews.css'
import { motion } from "framer-motion"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

const ChildNews = () => {
    const offscreen = { y: "1.5rem", opacity: 0 };
    const onscreen = {
        y: 0,
        opacity: 1,
        transition: {
            duration: 2,
            type: "spring",
            delay: 0.5
        }
    }

    const slides = [
        {
            img: "/assets/images/news/1.jpg"
        },
        {
            img: "/assets/images/news/2.jpg"
        },
        {
            img: "/assets/images/news/3.jpg"
        },


        {
            img: "/assets/images/news/1.jpg"
        },
        {
            img: "/assets/images/news/2.jpg"
        },
        {
            img: "/assets/images/news/3.jpg"
        },

    ];

    return (
        <div className='subnews'>

            <div className="main_subnews">
                <div className="subnews_left">
                    <motion.div
                        initial={offscreen}
                        whileInView={onscreen}
                        viewport={{ once: true }}

                    >
                        <div className="headeri">KHÁM PHÁ 4 HỌA TIẾT ĐANG THỐNG LĨNH HÈ 2023</div>
                    </motion.div>

                    <hr />

                    <div>13/04/2023</div>
                    <hr />



                    <div className="subnews_left-content">
                        <p>Nếu thiếu vắng sự xuất hiện của những họa tiết sống động đóng vai trò như người khuấy động bầu không khí thì mọi cuộc vui thời trang cũng không thể trọn vẹn. Trong âm vang tưng bừng của mùa mốt mới và hy vọng mới, các nhà thiết kế của NEM đã quyết định sử dụng những hình họa bắt mắt cùng cách kết hợp độc đáo với màu sắc, chất liệu và thiết kế vào Bộ sưu tập Hè 2023. Từ họa tiết hoa lá nữ tính đến họa tiết nanh sói cá tính, tất cả đều được biến tấu thành vô số items sành điệu.

                        </p>
                        <p>Cùng NEM khám phá 4 họa tiết đang thống lĩnh làng mốt Hè 2023 nhé!</p>

                        <h2>1. Họa tiết hoa lá tươi mới</h2>
                        <p>Họa tiết hoa vốn đã chẳng còn xa lạ với mỗi mùa Xuân Hè, tuy nhiên "vườn hoa nhiệt đới" năm nay được đốt phá hơn khi kết hợp cùng những cá tính đối lập như kẻ sọc, caro,.. Và đặc biệt hơn là sự xuất hiện của những loài hoa trừu tượng. Họa tiết hoa mềm mại thường được gắn liền với những thiết kế có nét nữ tính tương đồng, nhưng khi đưa vào thiết kế mới mẻ hơn lại cho ra đời những items đầy cá tính. </p>
                        <div className="subnews_left-img">
                            <img src="/assets/images/products/1.jpg" alt="" />
                        </div>

                        <h3>2. Họa tiết kẻ thời thượng</h3>
                        <p>Họa tiết hoa vốn đã chẳng còn xa lạ với mỗi mùa Xuân Hè, tuy nhiên "vườn hoa nhiệt đới" năm nay được đốt phá hơn khi kết hợp cùng những cá tính đối lập như kẻ sọc, caro,.. Và đặc biệt hơn là sự xuất hiện của những loài hoa trừu tượng. Họa tiết hoa mềm mại thường được gắn liền với những thiết kế có nét nữ tính tương đồng, nhưng khi đưa vào thiết kế mới mẻ hơn lại cho ra đời những items đầy cá tính. </p>

                        <div className="subnews_left-img">
                            <img src="/assets/images/products/2.jpg" alt="" />
                        </div>
                    </div>

                </div>
                <div className="subnews_right">
                    <div className='news-new'>TIN TỨC MỚI</div>
                    {slides.map((slide, index) => {
                        return (
                            <div key={index}>

                                <Card sx={{ maxWidth: 350, margin: "0 auto" }} className="setting-mobile-card">
                                    <CardMedia
                                        component="img"
                                        // height="255"
                                        width="350"
                                        image={slide.img}
                                        alt={`slide${index}`}


                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            KHÁM PHÁ 4 HỌA TIẾT ĐANG THỐNG LĨNH HÈ 2023
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        );
                    })}

                </div>

            </div>
            <Outlet />

        </div>
    )
}

export default ChildNews