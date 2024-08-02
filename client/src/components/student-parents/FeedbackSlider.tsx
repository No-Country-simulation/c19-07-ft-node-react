import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./FeedbackSlider.css";

import { Pagination } from "swiper/modules";
import { Typography } from "@mui/material";

interface FeedbackSliderProps {
  comments: string[];
}

export const FeedbackSlider = ({ comments }: FeedbackSliderProps) => {
  return (
    <Swiper
      height={100}
      width={400}
      spaceBetween={30}
      slidesPerView={3}
      modules={[Pagination]}
    >
      {comments.map((comment, index) => (
        <SwiperSlide key={index}>
          <Typography fontStyle="italic" sx={{ userSelect: "none" }}>
            {comment}
          </Typography>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
