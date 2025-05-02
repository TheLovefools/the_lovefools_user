"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerTextField from "@/components/common/ControllerTextField";
import Button from "@/components/common/Button";
import FormProvider from "@/components/common/FormProvider";
import { dateSchema } from "@/schema/BookingSchema";
import ControllerDateTimePicker from "../common/ControllerDateTimePicker";
import ControllerDatePicker from "../common/ControllerDatePicker";
import { useEffect } from "react";
import Loader from "../common/loader/Loader";

const DateForm = ({ setActiveTab, handleClose, defaultValues, handleOnsubmit, setDefaultValues}) => {
  const methods = useForm({
    resolver: yupResolver(dateSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, formState: { errors } } = methods;

  useEffect(() => {
    if (defaultValues.date && !(defaultValues.date instanceof Date)) {
      const now = new Date();
      setDefaultValues((prev) => ({
        ...prev,
        date: new Date(defaultValues.date),
        time: now.toISOString(),
      }));
    }
    console.log("defaultValues @ DateForm", defaultValues);    
  }, [defaultValues.date]);

  const onSubmit = async (data) => {
    const prevData = {...defaultValues,...data}
    handleOnsubmit(prevData)
    setActiveTab(1);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to 00:00:00

  useEffect(()=> {
    console.log("errors_1", errors);    
  }, [])  

  return (
    <>
      <div className="flex items-center justify-center adj-input-box-outer">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="container mx-auto sm:w-[524px] adj-input-box">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <div className="w-full mx-auto mobile-width">
                  <ControllerDatePicker
                    placeholder="Enter date"
                    name="date"
                    label="Date"
                    minDate={today}
                  />
                </div>
                <div className="w-full mx-auto mobile-width date-custom">
                  <ControllerDateTimePicker
                    placeholder="Enter time"
                    name="time"
                    label="Time"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button type="submit">
                Next
                </Button>
                <br />
                <br />
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default DateForm;
