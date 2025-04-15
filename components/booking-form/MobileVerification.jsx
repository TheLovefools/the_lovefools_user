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
  const [buttonText, setButtonText] = useState("Send");
  const [timer, setTimer] = useState(0);
  const [genOtp, setGenOtp] = useState("");

  const methods = useForm({
    resolver: yupResolver(verificationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, setError, watch } = methods;

  const sendWhatsAppMessages = async () => {
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
        setButtonText("Resend");
        setTimer(60); // 30 seconds timer
        return data;
      } catch (error) {
        console.log(error);
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

  return (
    <div className="flex items-center justify-center">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="max-w-[250px] w-full mx-auto">
                <ControllerTextField
                  placeholder="Enter mobile no"
                  name="mobile"
                  label="Mobile no"
                />
              </div>
              <div className="max-w-[250px] w-full mx-auto">
                <ControllerTextField
                  placeholder="Enter email"
                  name="email"
                  label="Email Id"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="max-w-[250px] w-full mx-auto text-center">
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
                <div className="max-w-[250px] w-full mx-auto">
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

            <div className="flex justify-center space-x-4">
              <Button type="button" variant="bordered" onClick={prevBtn}>
                Prev
              </Button>
              <Button type="submit">Next</Button>
            </div>
            <br />
            <br />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default DateForm;
