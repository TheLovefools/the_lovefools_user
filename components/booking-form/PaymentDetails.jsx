import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { API_ENDPOINT, menuType, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import {
  convertTimeObjectToString,
  convertToAmPm,
  findSingleSelectedValueLabelOption,
  formatDate,
  formatDateForApi,
  generateOptions,
  generateUniqueId,
} from "@/utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const PaymentDetails = ({ setActiveTab, defaultValues, setDefaultValues }) => {
  const [loading, setLoading] = useState(false);

  const PrevBtn = () => setActiveTab(3);

  // === Local client-side price calculation ===
  const menuTypeSet = defaultValues.menuType;
  const alaCarteMultiple = 500; // 500 Rs per person for Ala Carte
  const setMenuMultiple = 0.5;  // 50% for Set Menu
  const selectedQty = Number(defaultValues.quantity);
  const selectedPrice = Number(defaultValues.price);
  const advanceBookingValue = menuTypeSet === "1"
    ? selectedQty * alaCarteMultiple
    : selectedPrice * setMenuMultiple;

  const selectedRoom = defaultValues.room.label;
  const selectedMenuImgUrl = menuTypeSet === "1"
    // ? "680fdbee09eb1799fb38980b-.jpg"
    ? "veg-dish-1.jpg"
    : defaultValues.photo;

  const newUniqueId = generateUniqueId();

  const BookingConfirm = async () => {
    setLoading(true);
    try {
      // Build clean, secure payload (send ONLY menu_id)
      const payload = {
        order_id: newUniqueId,
        receiptName: "receiptNo_" + newUniqueId,
        emailId: defaultValues.email,
        mobileNo: defaultValues.mobile,
        room: defaultValues.room.label,
        room_id: defaultValues.room.value,
        table_number: defaultValues.table_number.label,
        table_id: defaultValues.table_number.value,
        date: formatDateForApi(defaultValues.date),
        bookingDate: formatDateForApi(defaultValues.bookingDate),
        time: convertTimeObjectToString(defaultValues.time),
        bookingSlot: defaultValues.bookingSlot.value,

        // SECURE: pass only the menu_id (from admin DB)
        menu_id: defaultValues.menu_id,
        menuType: defaultValues.menuType,
        subMenuType: defaultValues.subMenuType,
        quantity: selectedQty, // needed for ala carte

        customer_email: defaultValues.email,
        customer_phone: defaultValues.mobile,
        first_name: "John",
        last_name: "Doe",
        udf6: defaultValues.room.label,
        udf7: defaultValues.table_number.label,
        udf8: formatDateForApi(defaultValues.bookingDate),
        udf9: defaultValues.bookingSlot["label"],
        udf10: defaultValues.menu_Name,
      };
      
      console.log("Creating booking & initiating payment:", payload);

      // Call new unified backend API
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.ADD_BOOKING_INITIATE_PAYMENT}`,
        payload
      );

      console.log("Backend response:", response.data);

      if (response.data && response.data.redict_url) {
        window.location.href = response.data.redict_url;
      } else {
        toast.error("Failed to get payment link.");
        setLoading(false);
      }

    } catch (error) {
      console.error("BookingConfirm error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="payment-details-wrap">
        <div className="payment-details-img-block">
          <div className="payment-details-img-wrap">
            <img className="payment-details-img" src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${selectedMenuImgUrl}`} alt="img" />
            {/* <picture className="payment-details-img">
              <source srcSet={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${selectedMenuImgUrl}`} type="image/png" />
              <source srcSet={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${selectedMenuImgUrl}`} type="image/jpeg" />
              <img src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${selectedMenuImgUrl}`} alt="Image" />
            </picture> */}
          </div>
          <h4 className="payment-selected-menu">
            <em>Selected Menu ~ </em>
            {defaultValues.menu_Name}
          </h4>
        </div>
        <div className="payment-details-block">
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Mobile No</p>
          <p className="payment-details-block-value">
            {defaultValues.mobile}
          </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Email ID</p>
            <p className="payment-details-block-value">{defaultValues.email}</p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Booking Date & Time Slot</p>
            <p className="payment-details-block-value">
              {formatDate(defaultValues.bookingDate)}{" "}
            {defaultValues.bookingSlot["label"]}
            </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Table No.</p>
            <p className="payment-details-block-value">
              {defaultValues.table_number.label}
              {/* {selectedRoom} */}
            </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Room</p>
            <p className="payment-details-block-value">
              {/* {filterMenu(defaultValues.menuType, menuType)} */}
              {selectedRoom}
            </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Menu</p>
          <p className="payment-details-block-value">
            {defaultValues.menu_Name}
          </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">SGST</p>
            <p className="payment-details-block-value">{`2.5%`}</p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">CGST</p>
            <p className="payment-details-block-value">{`2.5%`}</p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">TOTAL</p>
            {menuTypeSet === "1" ? (
              <p className="payment-details-block-value">
                <span className="price-pill">{`₹${alaCarteMultiple}`}</span> x 
                <span className="price-pill">{` (${selectedQty})`}</span> = 
                <span className="price-pill">{` ₹${advanceBookingValue}`}</span>
              </p>
            ) : (
              <p className="payment-details-block-value">
                <span className="price-pill">{`₹${selectedPrice}`}</span> x 
                <span className="price-pill">{` (${setMenuMultiple*100})`}%</span> = 
                <span className="price-pill">{` ₹${advanceBookingValue}`}</span>
              </p>
            )}
          </div>
          {/* <div className="payment-details-block-items last-item hide-desktop">
            <div className="payment-item">
              <p className="payment-details-block-ttl">Payment</p>
              <p className="payment-details-block-value">{`₹${advanceBookingValue}`}</p>
            </div>
          </div> */}
        </div>
      </div>
        <div className="flex justify-center space-x-4 next-prev-bttn">
          <Button type="button" variant="bordered" onClick={PrevBtn}>
            Prev
          </Button>
          <LoadingButton
            onClick={BookingConfirm}
            className="btn-submit btn-pay"
            loading={loading}
            loadingPosition="start"
            variant="contained"
          >
            Pay Now
          </LoadingButton>
        {/* <Button type="submit" onClick={BookingConfirm}>
          Confirm
        </Button> */}
      </div>
    </div>
  );
};

export default PaymentDetails;
