"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Container } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Textarea from "@mui/joy/Textarea";
import { Email, Person, PhoneAndroid } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  API_ENDPOINT,
  ERROR_MESSAGES,
  NEXT_PUBLIC_API_URL,
} from "@/utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContextProvider } from "@/authcontext/AuthContext";
import DatePicker from "../common/DatePicker";
import DateTimePicker from "../common/DateTimePicker";
import { convertTimeObjectToString } from "@/utils/utils";
import { useRouter } from "next/navigation";

const Contact = () => {
  const { id, enquiryName, eventName, eventType, eventDate, setEnquiryName } =
    React.useContext(AuthContextProvider);
  const [contact, setContact] = React.useState({
    name: "",
    mobile_no: "",
    email_id: "",
    message: "",
    date: null,
    time: null,
  });
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    setContact((prev) => ({
      ...prev,
      date: eventDate ? new Date(eventDate) : null,
    }));
  }, [eventDate]);
  const handleSubmit = async () => {
    const payload = {
      mobile_number: contact.mobile_no,
      name: contact.name,
      email: contact.email_id,
      message: contact.message,
    };

    const payload2 = {
      event_Name: eventName,
      description: contact.message,
      date: contact.date,
      time: convertTimeObjectToString(contact.time),
      event_type: eventType,
    };

    if (enquiryName) {
      if (
        contact.date === "" ||
        contact.time === "" ||
        contact.mobile_no === "" ||
        contact.email_id === "" ||
        contact.message === ""
      ) {
        setErrorMessage(true);
      } else {
        try {
          setLoading(true);
          const data = await axios.post(
            `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.ADD_ENQUIRY}`,
            payload2
          );
          if (data) {
            setLoading(false);
            setEnquiryName("");
            toast.success(`${enquiryName} sent Successfully`);
            setContact({
              date: null,
              time: null,
              mobile_no: "",
              email_id: "",
              message: "",
            });
            router.push("/");
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    } else if (
      contact.name === "" ||
      contact.mobile_no === "" ||
      contact.email_id === "" ||
      contact.message === ""
    ) {
      setErrorMessage(true);
    } else {
      setLoading(true);
      await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.ADD_CONTACT}`,
        payload
      );
      setLoading(false);
      setContact({ name: "", mobile_no: "", email_id: "", message: "" });
      setErrorMessage(false);
      toast.success("Contact form submitted successfully");
    }
  };

  return (
    <section className="contact-us-section common-section" id="Contact us">
      <Container>
        <Grid container className="contact-us-container">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="info-wrap text-center">
              <Typography
                variant="h2"
                className="common-heading-h2 center-line"
              >
                <span> Contact</span>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className="google-map-col">
            <Box className="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29997.5144180167!2d73.78490183476559!3d19.9795645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726309757748!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box className="contact-form">
              <Typography variant="h3" className="common-heading-h3">
                {enquiryName ? enquiryName : "Contact Us"}
              </Typography>
              {enquiryName ? (
                <>
                  <DatePicker
                    className="form-groups"
                    value={contact.date} // Will be null if eventDate is not set
                    isDisabled={!!eventDate} // Disable if eventDate exists
                    onChange={(date) =>
                      setContact((prev) => ({ ...prev, date }))
                    }
                  />
                   {errorMessage && contact.date === null && (
                <div>
                  <Typography className="error">{ERROR_MESSAGES}</Typography>
                </div>
              )}
                  <DateTimePicker
                    className="form-groups"
                    width="w-full"
                    onChange={(time) => setContact({ ...contact, time: time })}
                  />
                </>
              ) : (
                <OutlinedInput
                  className="form-groups"
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  placeholder="Name"
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton aria-label="person icon" edge="start">
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}

              {errorMessage && (contact.name === "" || contact.time === null)  && (
                <div>
                  <Typography className="error">{ERROR_MESSAGES}</Typography>
                </div>
              )}

              <OutlinedInput
                className="form-groups"
                type="number"
                value={contact.mobile_no}
                onChange={(e) =>
                  setContact({ ...contact, mobile_no: e.target.value })
                }
                placeholder="Mobile No"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="phone icon" edge="start">
                      <PhoneAndroid />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errorMessage && contact.mobile_no === "" && (
                <div>
                  <Typography className="error">{ERROR_MESSAGES}</Typography>
                </div>
              )}
              <OutlinedInput
                className="form-groups"
                type="email"
                value={contact.email_id}
                onChange={(e) =>
                  setContact({ ...contact, email_id: e.target.value })
                }
                placeholder="Email ID"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="email icon" edge="start">
                      <Email />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errorMessage && contact.email_id === "" && (
                <div>
                  <Typography className="error">{ERROR_MESSAGES}</Typography>
                </div>
              )}
              <Textarea
                className="form-groups"
                minRows={5}
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                placeholder="Message"
              />
              {errorMessage && contact.message === "" && (
                <div>
                  <Typography className="error">{ERROR_MESSAGES}</Typography>
                </div>
              )}
              <LoadingButton
                onClick={handleSubmit}
                className="btn-primary"
                loading={loading}
                loadingPosition="start"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Contact;
