import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { API_ENDPOINT, menuType, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import {
  convertTimeObjectToString,
  findSingleSelectedValueLabelOption,
  formatDate,
  formatDateForApi,
  generateOptions,
} from "@/utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const PaymentDetails = ({ setActiveTab, defaultValues, setDefaultValues }) => {

  const [tempObj, setTempObj] = useState(defaultValues)

  const [loading,setLoading] = useState(false)
  const PrevBtn = () => {setActiveTab(3)};
  const menuTypeSet = defaultValues.menuType
  const alaCarteMultiple = 500; // 500Rs advance per person
  const setMenuMultiple = 0.5; // 50% amaount advance
  const selectedQty= Number(defaultValues.quantity)
  const selectedPrice = Number(defaultValues.price)
  const selectedRoom = defaultValues.room
  const advanceBookingValue = menuTypeSet === "1" ? selectedQty*alaCarteMultiple : selectedPrice*setMenuMultiple
  const selectedMenuImgUrl = menuTypeSet === "1" ? "680fdbee09eb1799fb38980b-.jpg" : defaultValues.photo

  const filterMenu = (type, list) => {
    const getMenu = findSingleSelectedValueLabelOption(
      generateOptions(list, "id", "type"),
      type
    );
    return getMenu.label;
  };

  console.log("defaultValues", defaultValues)

  const BookingConfirm = async () => {
    setLoading(true)
    try {
      const data = new FormData();
      data.append("order_id", "ord_17402892217778888");
      data.append("amount", advanceBookingValue);
      data.append("payment_page_client_id", "hdfcmaster");
      data.append("currency", "INR");
      data.append(
        "redirect_url",
        `https://smartgatewayuat.hdfcbank.com/payment-page/order/ordeh_e8de090420e748b3ac62db969eadd72c`
      );
      console.log("data_1", data);      
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.PAYMENT_AUTH}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for FormData
          },
        }
      );

      console.log("data_2", data);  
      console.log("response",response)

      const payload = {
        orderId: response.data.orderId,
        emailId: defaultValues.email,
        mobileNo: defaultValues.mobile,
        receiptName: defaultValues.id,
        price: advanceBookingValue,
        date: formatDateForApi(defaultValues.date),
        time: convertTimeObjectToString(defaultValues.time),
        type: defaultValues.menuType,
        sub_type: defaultValues.subMenuType,
        room: defaultValues.room.value,
        table_number: defaultValues.table_number.value,
        paymentSuccess: false
      };

      console.log("data_3", payload)
  
      if (response.data) {
       const  res = await axios.post(
          `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.ADD_RECEIPT}`,
          payload
        );
        if(res.data){
          setLoading(false)
        }
        window.location.href = response.data.redict_url; // Redirect the user
      }
    } catch (error) {
      setLoading(false)
      console.log("BookingConfirm", error);
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
            <p className="payment-details-block-ttl">Date</p>
            <p className="payment-details-block-value">
              {formatDate(defaultValues.date)}{" "}
              {convertTimeObjectToString(defaultValues.time)}
            </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Table</p>
            <p className="payment-details-block-value">
              {defaultValues.table_number.label}
              {/* {selectedRoom} */}
            </p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">Menu Type</p>
            <p className="payment-details-block-value">
              {filterMenu(defaultValues.menuType, menuType)}
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
            <p className="payment-details-block-value">{`ABCDE12XXXX`}</p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">CGST</p>
            <p className="payment-details-block-value">{`XYZ12XXXX`}</p>
          </div>
          <div className="payment-details-block-items">
            <p className="payment-details-block-ttl">TOTAL</p>
            {menuTypeSet === "1" ? (
              <p className="payment-details-block-value">{`₹${alaCarteMultiple} x (${selectedQty}) = ₹${advanceBookingValue}`}</p>
            ) : (
              <p className="payment-details-block-value">{`₹${selectedPrice} x (${setMenuMultiple*100})% = ₹${advanceBookingValue}`}</p>
            )}            
          </div>
          <div className="payment-details-block-items last-item">
            <div className="payment-item">
              <p className="payment-details-block-ttl">Payment</p>
              <p className="payment-details-block-value">{`₹${advanceBookingValue}`}</p>
            </div>
          </div>
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
