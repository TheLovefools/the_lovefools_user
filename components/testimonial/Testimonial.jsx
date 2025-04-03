"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Grid, Modal, Skeleton } from "@mui/material";
import Image1 from "../../assets/images/testimonial.png";
import Image from "next/image";
import Slider from "react-slick";
import quoteIcon from "../../assets/images/quotation.svg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import { AuthContextProvider } from "@/authcontext/AuthContext";
import avatar from "../../assets/images/avatar.svg";
import doubleQuate from "../../assets/images/double-quate.svg";
import axios from "axios";
const Item = [
  { image: Image1 },
  { image: Image1 },
  { image: Image1 },
  { image: Image1 },
  { image: Image1 },
];

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .slick-prev, & .slick-next": {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  "& .slick-prev": {
    left: 10,
    zIndex: 1,
  },
  "& .slick-next": {
    right: 10,
    zIndex: 1,
  },
}));

const getSliderSettings = (slidesToShow = 3, testimonialList) => ({
  dots: testimonialList.length > 3 ? true : false, // Enable dots navigation
  infinite: false,
  arrows: false, // Hide arrows
  speed: 500,
  slidesToShow, // Default number of slides to show
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024, // For medium devices like tablets
      settings: {
        slidesToShow: slidesToShow > 3 ? 3 : slidesToShow, // Show up to 3 slides
      },
    },
    {
      breakpoint: 768, // For smaller devices like smartphones
      settings: {
        slidesToShow: slidesToShow > 2 ? 2 : slidesToShow, // Show up to 2 slides
      },
    },
    {
      breakpoint: 480, // For very small devices
      settings: {
        slidesToShow: 1, // Show 1 slide
      },
    },
  ],
});

const Testimonial = () => {
  const [testimonialList, setTestimonialList] = React.useState([]);
  const [testimonialObj, setTestimonialObj] = React.useState(null);
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const getTestimonials = async () => {
    try {
      setLoading1(true)
      const response = await axiosInstance.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_TESTIMONIAL_LIST}`
      );
      setLoading1(false)
      setTestimonialList(response.data.data);
    } catch (error) {
      setLoading1(false)
      console.error(error);
    }
  };

  const getTestimonialsSection = async () => {
    try {
      setLoading2(true)
      const data = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_CMS}`
      );
      setLoading2(false)
      return setTestimonialObj(data.data.data[3]);
    } catch (error) {
      setLoading2(false)
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTestimonials();
    getTestimonialsSection();
  }, []);

  return (
    <section className="testimonial-section common-section" id="Testimonial">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className="info-wrap text-center">
              <Typography
                variant="h2"
                className={`common-heading-h2 ${loading2 ? "" : "center-line"}`}
              >
                {loading2 ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "3rem", background: "#0000001c" }}
                  />
                ) : (
                  <span>{testimonialObj?.section_Name}</span>
                )}
              </Typography>
              {loading2 ? (
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              ) : (
              <Typography variant="h3" className="common-heading-h3">
                {testimonialObj?.description}
              </Typography>
              )}
            </div>
          </Grid>
          {loading1 ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={12} md={4} lg={4}>
                        <Skeleton variant="rounded" width={340} height={220} />
                    </Grid>
                  );
                })}
              </>
            ) : (
          <Grid item xs={12}>
        
            <StyledSlider {...getSliderSettings(3, testimonialList)}>
              {testimonialList.map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-img">
                    <Image src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item.photo}`} alt="avatar" width={100} height={100} />
                  </div>
                  <div className="testimonial-body">
                    <Image src={doubleQuate} alt="double-quate" />
                    <p className="p16">{item.description}</p>
                  </div>
                </div>
              ))}
            </StyledSlider>
          </Grid>
            )}
        </Grid>
      </Container>
    </section>
  );
};

export default Testimonial;
