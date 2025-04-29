import * as Yup from "yup";

export const upcomingEventSchema = Yup.object().shape({
  event_name: Yup.string()
    .required("Full Name is required"),
  event_description: Yup.string().required("Message is required"),
  event_date: Yup.date(),
  event_time: Yup.string().required("Time is required"),
  event_mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
  event_email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  event_enquiry_option: Yup.object({
    label: Yup.string().required(),
    value: Yup.string().required(),
  })
    .test('not-empty', 'Please select an option', value => !!value?.value)
    .required('Please select an option'),
});

// event_Name: eventData.event_name,
// event_Description: eventData.event_description,
// event_Date: event_date,
// event_Time: eventData.event_time,
// event_Type: eventData.event_type.value,
// event_Mobile: eventData.event_mobile,
// event_Email: eventData.event_email,
// event_Enquiry_Option: eventData.event_enquiry_option.value,

// export const upcomingEventSchema = Yup.object().shape({
//   date: Yup.date(),
//   time: Yup.string().required("Time is required"),
//   event_name: Yup.string()
//     .required("Full Name is required"),
//   mobile: Yup.string()
//     .required("Mobile number is required")
//     .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   enquirydd: Yup.object({
//     label: Yup.string().required(),
//     value: Yup.string().required(),
//   })
//     .test('not-empty', 'Please select an option', value => !!value?.value)
//     .required('Please select an option'),
//   message: Yup.string().required("Message is required"),
// });