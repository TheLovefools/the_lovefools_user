import * as Yup from "yup";

// Date Schema - Changed to Yup.date()
export const dateSchema = Yup.object().shape({
  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date format"),
  time: Yup.object().required("Time is required"),
});

// Table Schema
export const tableSchema = Yup.object().shape({
  room: Yup.object({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).required("Room is required"),
  table_number: Yup.object({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).required("Table Number is required"),
  quantity:Yup.string()
});

// Menu Schema - Adjusted price to be a number, fixed validation message for receiptName
export const menuSchema = Yup.object().shape({
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  menu_Name: Yup.string().required("Receipt name is required"),
  id: Yup.string().required("Id is required"),
  menuType: Yup.string().required("Menu type is required"),
  subMenuType: Yup.string().required("Sub Menu Type is required"),
});

// Verification Schema - Fixed mobile validation message
export const verificationSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});
