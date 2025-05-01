"use client";
import React, { lazy, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { Box, Button, Skeleton } from "@mui/material";
import axios from "axios";
import Loadable from "@/components/common/loader/Loadable";
import { API_ENDPOINT, items, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import PopupModal from "@/components/common/PopupModal";
import UpcomingEventForm from "@/components/Upcoming-form/UpcomingForm";
import { toast } from "react-toastify";
import AboutUs from "@/components/about/AboutUs";
import Events from "@/components/events/Events";
import Gallery from "@/components/gallery/Gallery";
import Testimonial from "@/components/testimonial/Testimonial";
import Contact from "@/components/contact/Contact";
import Footer2 from "@/components/footer/Footer2";
import zIndex from "@mui/material/styles/zIndex";
import Loader from "@/components/common/loader/Loader";

const Page = () => {
  const [upcomimgEvent, setUpcomimgEvent] = useState([]);
  const [mergeEvent, setMergeEvent] = useState(items);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultValues = useRef({
    id: null,
    event_date: null,
    event_time: null,
    event_name: "",
    event_mobile: "",
    event_email: "",
    event_enquiry_option: null,
    event_description: "",
  });

  const getUpcomingEvent = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_UPCOMING_EVENT}`
      );
      setLoading(false);
      setUpcomimgEvent(data.data.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpcomingEvent();
  }, []);

  const mergeArrays = () => {
    setMergeEvent((prevItems1) => [...upcomimgEvent]);
  };

  useEffect(() => {
    mergeArrays();
  }, [upcomimgEvent]);

  const toggleUpcomingEventFormModal = (value) => {
    defaultValues.current = {      
      id: null,
      event_date: new Date(value?.date ? value?.date : ""),
      event_time: null,
      event_name: "",
      event_mobile: "",
      event_email: "",
      event_enquiry_option: null,
      event_description: "",
    };
    if (!value.viveBtn) {
      setShowModal((prev) => !prev);
    }
  };

  const onSubmit = async (eventData) => {
    
    const payload = {
      // description: eventData.message,
      // date: eventData.date,
      // time: eventData.time,
      // event_type: "2",
      // event_mobile: eventData.mobile,
      // event_email: eventData.email,
      // event_enquiry_option: eventData.enquirydd,

      event_Name: eventData.event_name,
      event_Description: eventData.event_description,
      event_Date: eventData.event_date,
      event_Time: eventData.event_time,
      // event_Type: eventData.event_type.value,
      // event_Type: eventData.event_type,
      event_Type: "2",
      event_Mobile: eventData.event_mobile,
      event_Email: eventData.event_email,
      event_Enquiry_Option: eventData.event_enquiry_option.value,
    }
    
    console.log("UpcomingEventForm payload_", eventData, payload);
    
    try {
      await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.ADD_ENQUIRY}`,
        payload
      );
      
      console.log("UpcomingEventForm payload_success", payload);
      setShowModal(false);
      toast.success("Update Event Enquiry sent Successfully");
    } catch (error) {
      console.error("UpcomingEventForm error", error);
    }

  };

  return (
    <>
      <Box className="home-banner-section bg-white">
        {loading ? (
          <Loader marginTop="0" paddingTop="40vh" paddingBottom="40vh" background="#000" variant="rectangular" />
        ) : (
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            showStatus={false}
            showThumbs={false}
          >
            {mergeEvent.map((item, index) => {
              return (
                <div key={index}>
                  <h2 className="carousel-title common-heading-h1">
                    <span style={{ fontWeight: "600" }}>{item.event_Name}</span>
                    <br /> {item.description}
                    <div className="" style={{height: '20px'}}></div>
                    <Button
                      variant="contained"
                      className="btn-primary btn-sm"
                      onClick={() => toggleUpcomingEventFormModal(item)}
                    >
                      {item.viveBtn ? item.viveBtn : "Enquiry Now"}
                    </Button>
                  </h2>
                  <Image
                          alt="Lovefools"
                          src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item.photo}`}
                          className="event-img"
                          width={500}
                          height={500}
                        />
                        <div className="banner-overlay"></div>
                </div>
              );
            })}
          </Carousel>
        )}
        <AboutUs />
        <Events />
        <Gallery />
        <Testimonial />
        <Contact />
        {/* <Footer2 /> */}
      </Box>

      <PopupModal
        isOpen={showModal}
        header={"Enquiry"}
        onOpenChange={toggleUpcomingEventFormModal}
      >
        <UpcomingEventForm
          handleClose={toggleUpcomingEventFormModal}
          handleUpcomingEventSubmit={onSubmit}
          defaultValues={defaultValues.current}
        />
      </PopupModal>
    </>
  );
};

export default Page;
