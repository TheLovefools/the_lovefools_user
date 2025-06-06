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

  const [tempObj, setTempObj] = useState(defaultValues)

  const [loading,setLoading] = useState(false)
  const PrevBtn = () => {setActiveTab(3)};
  const menuTypeSet = defaultValues.menuType
  const alaCarteMultiple = 500; // 500Rs advance per person
  const setMenuMultiple = 0.5; // 50% amaount advance
  const selectedQty= Number(defaultValues.quantity)
  const selectedPrice = Number(defaultValues.price)
  const selectedRoom = defaultValues.room.label
  const advanceBookingValue = menuTypeSet === "1" ? selectedQty*alaCarteMultiple : selectedPrice*setMenuMultiple
  const selectedMenuImgUrl = menuTypeSet === "1" ? "680fdbee09eb1799fb38980b-.jpg" : defaultValues.photo
  const newUniqueId = generateUniqueId();
  const [resOrderId, setResOrderId] = useState("")
  const [resReceiptName, setResReceiptName] = useState("")

  const filterMenu = (type, list) => {
    const getMenu = findSingleSelectedValueLabelOption(
      generateOptions(list, "id", "type"),
      type
    );
    return getMenu.label;
  };
  
  const BookingConfirm = async () => {
    setLoading(true)
    try {
      const data = new FormData();
      data.append("order_id", newUniqueId);
      data.append("customer_id", "customer_"+newUniqueId);
      data.append("amount", advanceBookingValue);
      data.append("customer_email", defaultValues.email);
      data.append("customer_phone", defaultValues.mobile);
      data.append("first_name", "John");
      data.append("last_name", "Doe");
      data.append("payment_page_client_id", "hdfcmaster");
      data.append("currency", "INR");
      data.append("udf6", defaultValues.room.label);
      data.append("udf7", defaultValues.table_number.label);
      data.append("udf8", formatDateForApi(defaultValues.date));
      data.append("udf9", convertToAmPm(convertTimeObjectToString(defaultValues.time)));
      data.append("udf10", defaultValues.menu_Name);
      data.append(
        "redirect_url", `https://api.thelovefools.in/api/user/handlePaymentResponse`
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
      console.log("response_1", response)
      setResOrderId(response?.data ? response.data.orderId : "nores_"+newUniqueId)
      setResReceiptName(response?.data ? "receiptNo_"+response.data.orderId : "receiptNo_nores_"+newUniqueId)

      const payload = {
        orderId: response?.data ? response.data.orderId : "nores_"+newUniqueId,
        emailId: defaultValues.email,
        mobileNo: defaultValues.mobile,
        receiptName: response?.data ? "receiptNo_"+response.data.orderId : "receiptNo_nores_"+newUniqueId,
        price: advanceBookingValue,
        date: formatDateForApi(defaultValues.date),
        time: convertTimeObjectToString(defaultValues.time),
        type: defaultValues.menuType,
        sub_type: defaultValues.subMenuType,
        room: defaultValues.room.label,
        table_number: defaultValues.table_number.label,
        orderStatus: "new",
        paymentSuccess: false,
      };

      // email,mobile,receiptName,date,time,price,menuType,subMenuType,room,table_number

      console.log("payload_1", payload)
  
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


  const payload2 = {
    orderId: resOrderId,
    emailId: defaultValues.email,
    mobileNo: defaultValues.mobile,
    receiptName: resReceiptName,
    price: advanceBookingValue,
    date: formatDateForApi(defaultValues.date),
    time: convertTimeObjectToString(defaultValues.time),
    type: defaultValues.menuType,
    sub_type: defaultValues.subMenuType,
    room: defaultValues.room.label,
    table_number: defaultValues.table_number.label,
    orderStatus: "new",
    paymentSuccess: false,
  };

  useEffect(()=>{
    console.log("defaultData_1", defaultValues, "payload_2", payload2);
  }, [])
 
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
