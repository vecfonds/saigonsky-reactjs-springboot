import React from 'react'
import './News.css'
import { motion } from "framer-motion"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';

const News = () => {
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
        <div className="news">
            <motion.div
                initial={offscreen}
                whileInView={onscreen}
                viewport={{ once: true }}

            >
                <div className="headeri">TIN TỨC</div>
            </motion.div>

            <div className="main_news">

                <div className="news_right">
                    {slides.map((slide, index) => {
                        return (
                            <Link to='/tintuc/subnews' key={index}>
                                <Card className="news_card">
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        // width="430"
                                        image={slide.img}
                                        alt={`slide${index}`}
                                    />
                                    <CardContent className="news_card-content">
                                        <div>
                                            <Typography gutterBottom variant="h5" component="div">
                                                KHÁM PHÁ 4 HỌA TIẾT ĐANG THỐNG LĨNH HÈ 2022
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </div>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <Outlet />

        </div>
    )
}

export default News