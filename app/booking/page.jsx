"use client";
import React, { useRef, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import CustomizedSteppers from "@/components/stepper/Stepper";
import DateForm from "@/components/booking-form/DateForm";
import TableForm from "@/components/booking-form/SelectTableForm";
import SelectMenuForm from "@/components/booking-form/SelectMenuForm";
import MobileVerificationForm from "@/components/booking-form/MobileVerification";
import PaymentDetails from "@/components/booking-form/PaymentDetails";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import axios from "axios";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { error, isLoading, Razorpay } = useRazorpay();
  const [defaultValues, setDefaultValues] = useState({
    id:null,
    email: "",
    menu_Name: "",
    room: null,
    table_number: null,
    mobile: "",
    date: null,
    time: null,
    price: "",
    menuType: '',
    subMenuType: '',
    quantity:'',
    otp: "",
  });

  
  const handleSubmit = (data) => {
   setDefaultValues(data)
  }

  return (
    <section
      className="about-section common-section overflow-auto"
      style={{ background: "#000000", height: "100vh", overflow: "auto" }}
    >
      <Box className="booking-banner-section flex justify-center overflow-auto mb-30">
        <Box sx={{ width: "90%", border: "1px solid #fff",borderRadius:'8px' }} className="mt-36">
          <br />
          <br />
          <CustomizedSteppers activeTab={activeTab} />
          <Container sx={{ width: "80%" }} className="mt-10">
            {activeTab === 0 && (
              <DateForm
                defaultValues={defaultValues}
                setActiveTab={setActiveTab}
                handleOnsubmit={handleSubmit}
                setDefaultValues={setDefaultValues}
              />
            )}
            {activeTab === 1 && (
              <TableForm
                defaultValues={defaultValues}
                setActiveTab={setActiveTab}
                setDefaultValues={setDefaultValues}
                handleOnsubmit={handleSubmit}
              />
            )}
            {activeTab === 2 && (
              <SelectMenuForm
                defaultValues={defaultValues}
                setDefaultValues={setDefaultValues}
                setActiveTab={setActiveTab}
                handleOnsubmit={handleSubmit}
              />
            )}
            {activeTab === 3 && (
              <MobileVerificationForm
                defaultValues={defaultValues}
                setDefaultValues={setDefaultValues}
                setActiveTab={setActiveTab}
                handleOnsubmit={handleSubmit}
              />
            )}
            {activeTab === 4 && (
              <PaymentDetails
                defaultValues={defaultValues}
                setDefaultValues={setDefaultValues}
                setActiveTab={setActiveTab}
              />
            )}         
          </Container>
        </Box>
      </Box>
    </section>
  );
};

export default Page;
