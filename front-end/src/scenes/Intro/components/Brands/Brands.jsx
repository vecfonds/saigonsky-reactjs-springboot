import React from 'react'
import './Brands.css'
import { motion } from "framer-motion"

const Brands = () => {
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

  const offbrand = { scale: 0 };
  const onbrand = {
    scale: 1, transition: {
      duration: 0.8,
      type: "spring",
      times: [0, 1],
      delay: 0.5
    }
  }

  return (
    <div id="brandsi">
      <div className="brandsi">
        <motion.div
          initial={offscreen}
          whileInView={onscreen}
          viewport={{ once: true }}
        >
          <div className="headeri">KINH DOANH CÁC THƯƠNG HIỆU NỔI TIẾNG</div>
        </motion.div>

        <div className="content-brandsi">
          <motion.div
            initial={offbrand}
            whileInView={onbrand}
            viewport={{ once: true }}
          >
            <img src="/assets/images/brands/chic_land.jpg" alt="chic_land-Logo" />
          </motion.div>

          <motion.div
            initial={offbrand}
            whileInView={onbrand}
            viewport={{ once: true }}
          >
            <img src="/assets/images/brands/kk.jpg" alt="kk-Logo" />
          </motion.div>

          <motion.div
            initial={offbrand}
            whileInView={onbrand}
            viewport={{ once: true }}
          >
            <img src="/assets/images/brands/sevenam.jpg" alt="SevenAM-Logo" />
          </motion.div>

          <motion.div
            initial={offbrand}
            whileInView={onbrand}
            viewport={{ once: true }}
          >
            <img src="/assets/images/brands/nem.jpg" alt="NEM-Logo" />
          </motion.div>

          <motion.div
            initial={offbrand}
            whileInView={onbrand}
            viewport={{ once: true }}
          >
            <img src="/assets/images/brands/ivymoda.jpg" alt="ivymoda-Logo" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Brands