import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "@/components/common/FormProvider";
import Button from "@/components/common/Button";
import ControllerTextField from "../common/ControllerTextField";
import { verificationSchema } from "@/schema/BookingSchema";
import axios from "axios";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";

const DateForm = ({
  setActiveTab,
  handleClose,
  defaultValues,
  handleOnsubmit,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Send OTP");
  const [timer, setTimer] = useState(0);
  const [genOtp, setGenOtp] = useState("");
  const [showNextPrev, setShowNextPrev] = useState(false);

  const methods = useForm({
    resolver: yupResolver(verificationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, setValue, setError, watch, trigger } = methods;

  const sendWhatsAppMessages = async () => {
    console.log("sendWhatsAppMessages", "clicked");
    // if (watch("mobile").length !== 10) {
    //   setError("mobile", {
    //     type: "manual",
    //     message: "Mobile number must be valid ",
    //   })
    // }

    const isValid = await trigger(["mobile", "email"]); // validate these fields
    if (!isValid) {
      return
    } else {
      console.log("Validation passed");
    }
    if (watch("mobile").length === 10) {
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      setGenOtp(otp); // Store OTP in state
      const payload = {
        "mobile": `${watch("mobile")}`,
        "otp":`${otp}`
      };
      try {
        axios.post(`${NEXT_PUBLIC_API_URL}${API_ENDPOINT.WHATSAPP_OTP}`, payload)
        setIsButtonDisabled(true);
        setButtonText("Resend OTP");
        setTimer(60); // 30 seconds timer
        // return data;
        setShowNextPrev(true)
        setValue("otp", "")
        return
      } catch (error) {
        setShowNextPrev(false)
        console.log("sendWhatsAppMessages", error);
      }
    }    
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isButtonDisabled) {
      setIsButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, isButtonDisabled]);

  const onSubmit = async (data) => {
    const prevData = { ...defaultValues, ...data };
    if (parseInt(data.otp) !== genOtp) {
      setError("otp", {
        type: "manual",
        message: "OTP does not match", // This message will appear in the form error
      });
    } else {
      handleOnsubmit(prevData);
      setActiveTab(4);
    }
  };

  const prevBtn = () => {
    setActiveTab(2);
  };

  useEffect(()=>{
    console.log("defaultValues mobile_", defaultValues);
    
  },[])

  return (
    <div className="flex items-center justify-center">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto mobile-verification">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="max-w-[250px] w-full mx-auto mobile-verification-mobile">
                <ControllerTextField
                  placeholder="Enter mobile no"
                  name="mobile"
                  label="Whatsapp mobile no."
                />
              </div>
              <div className="max-w-[250px] w-full mx-auto mobile-verification-email">
                <ControllerTextField
                  placeholder="Enter email"
                  name="email"
                  label="Email Id"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className={`max-w-[250px] w-full mx-auto text-center next-prev-bttn ${isButtonDisabled ? "btn-disabled" : ""}`}>
                <Button
                  onClick={sendWhatsAppMessages}
                  disabled={isButtonDisabled}
                >
                  {buttonText}
                  {isButtonDisabled && timer > 0 && ` (${timer}s)`}
                </Button>
              </div>
            </div>
            {genOtp && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6">
                <div className="max-w-[250px] w-full mx-auto mobile-verification-otp">
                  <ControllerTextField
                    type="text"
                    placeholder="Enter otp"
                    name="otp"
                    label="OTP"
                    maxLength="6"
                  />
                </div>
              </div>
            )}

            {true && (
              <div className="flex justify-center space-x-4 next-prev-bttn">
                <Button type="button" variant="bordered" onClick={prevBtn}>
                  Prev
                </Button>
                <Button type="submit">Next</Button>
              </div>
            )}

            <br />
            <br />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default DateForm;
