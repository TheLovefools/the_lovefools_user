"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/common/Button";
import FormProvider from "@/components/common/FormProvider";
import { appointmentSchema } from "@/schema/BookingSchema";
import { useEffect, useState } from "react";
import ControllerCalendar from "../common/ControllerCalendar";
import ControllerSelect from "../common/ControllerSelect";
import { generateOptions } from "@/utils/utils";
import { API_ENDPOINT, bookingSlotOptions, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import axios from "axios";

const DateForm = ({ setActiveTab, handleClose, defaultValues, handleOnsubmit, setDefaultValues}) => {
  const methods = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const [bookedDatesList, setBookedDatesList] = useState([]);
  const [bookedData, setBookedData] = useState([]);

  // useEffect(() => {
  //   if (defaultValues.date && !(defaultValues.date instanceof Date)) {
  //     const now = new Date();
  //     setDefaultValues((prev) => ({
  //       ...prev,
  //       date: new Date(defaultValues.date),
  //       time: now.toISOString(),
  //     }));
  //   }
  //   console.log("defaultValues @ DateForm", defaultValues);
  // }, [defaultValues.date]);

  useEffect(() => {
    if (
      defaultValues.bookingDate &&
      !(defaultValues.bookingDate instanceof Date)
    ) {
      const now = new Date();
      setDefaultValues((prev) => ({
        ...prev,
        date: new Date(defaultValues.bookingDate),
        bookingDate: new Date(defaultValues.bookingDate),
        time: now.toISOString(),
      }));
    }
    console.log("defaultValues @ DateForm", defaultValues);
  }, [defaultValues.bookingDate]);

  const onSubmit = async (data) => {
    console.log("defaultValues @ DateForm data_", data);
    const prevData = { ...defaultValues, ...data };
    handleOnsubmit(prevData);
    setActiveTab(1);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to 00:00:00

  // Fetch Booked Dates Once
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.post(
          `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_BOOKING_DATES_LIST}`
        );
        setBookedData(data.data);
        const formattedDates = data.data.map(item =>
          new Date(item.party_Date).toISOString().split('T')[0]
        );
        setBookedDatesList(formattedDates); // Save just the dates
        console.log("fetched Booked Dates", data.data, data.data.party_Date);
      } catch (error) {
        console.error("Error fetching Booked Dates:", error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    console.log("errors_1", errors);
  }, []);

  useEffect(() => {
    console.log("bookedDatesList_", bookedData, bookedDatesList);
  }, [bookedDatesList]);

  return (
    <>
      <div className="flex items-center justify-center adj-input-box-outer">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="container mx-auto sm:w-[524px] adj-input-box">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <div className="w-full mx-auto mobile-width">
                  <ControllerCalendar
                    name="bookingDate"
                    label="Booking Date"
                    // bookedDates={["2025-06-17", "2025-06-18"]}
                    bookedDates={bookedDatesList}
                    disabledWeekdays={[1]}
                    popperClassName="adj-input-box-outer"
                    minDate={new Date()} // optional
                  />
                </div>
                <div className="w-full mx-auto mobile-width date-custom">
                  <ControllerSelect
                    options={generateOptions(
                      bookingSlotOptions,
                      "value",
                      "slot"
                    )}
                    placeholder="Select table"
                    name="bookingSlot"
                    label="Booking Slot"
                    isInvalid={errors.bookingSlot}
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button type="submit">Next</Button>
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
