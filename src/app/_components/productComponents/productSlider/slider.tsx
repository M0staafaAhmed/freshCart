"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import styles from './slider.module.css'; // استيراد الموديول

// استيراد ستايلات سويبر الأساسية (ضروري جداً)
import 'swiper/css';
import 'swiper/css/pagination';


export default function ProductImageSlider({ images }: { images: string[] | undefined }) {
    if (!images) return null;

    return (
        /* نستخدم styles.sliderWrapper لكي تعمل الـ :global بداخلها */
        <div className={styles.sliderWrapper}>
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className}"><img src="${images[index]}" loading="lazy" /></span>`;
                    },
                }}
                loop
                slidesPerView={1}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt="product" className="w-full" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}