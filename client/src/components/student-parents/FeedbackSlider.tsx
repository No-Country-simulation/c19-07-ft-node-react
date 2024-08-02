import { Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./FeedbackSlider.css";

import { Pagination } from "swiper/modules";

interface FeedbackSliderProps {
  comments: string[];
}

export const FeedbackSlider = ({ comments }: FeedbackSliderProps) => {
  return (
    <Swiper slidesPerView={1} watchOverflow={true} modules={[Pagination]}>
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
