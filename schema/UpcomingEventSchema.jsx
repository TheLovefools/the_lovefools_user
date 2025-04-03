import * as Yup from 'yup';

export const upcomingEventSchema = Yup.object().shape({
  date: Yup.date(),
  time: Yup.string().required('Time is required'),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: Yup.string()
  .email("Invalid email format")
  .required("Email is required"),
  message: Yup.string().required('Message is required')
});
