"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerTextField from "@/components/common/ControllerTextField";
import Button from "@/components/common/Button";
import FormProvider from "@/components/common/FormProvider";
import ControllerSelect from "../common/ControllerSelect";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import {
  convertTimeObjectToString,
  formatDateForApi,
  generateOptions,
} from "@/utils/utils";
import axios from "axios";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import { tableSchema } from "@/schema/BookingSchema";

const TableListForm = ({
  setActiveTab,
  setDefaultValues,
  defaultValues,
  handleOnsubmit,
}) => {
  const methods = useForm({
    resolver: yupResolver(tableSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const [roomList, setRoomList] = useState([]);
  const [unBookTableList, setUnBookTableList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch room list only once
  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const { data } = await axios.post(
          `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_ROOM_LIST}`
        );
        setRoomList(data.data);
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    fetchRoomList();
  }, []);

  // Fetch unbooked tables when date, time, or room changes
  const fetchUnBookList = async (params) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_BOOK_LIST}`,
        params
      );
      setUnBookTableList(data.available);
    } catch (error) {
      console.error("Error fetching unbooked tables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedRoom = watch("room")?.value;
    if (defaultValues?.date && defaultValues?.time && selectedRoom) {
      fetchUnBookList({
        date: formatDateForApi(defaultValues.date),
        time: convertTimeObjectToString(defaultValues.time),
        roomID: selectedRoom,
      });
    }
  }, [defaultValues?.date, defaultValues?.time, watch("room")]);

  // Update quantity based on table selection
  useEffect(() => {
    const selectedTable = watch("table_number")?.value;
    if (selectedTable) {
      const selectedTableData = unBookTableList.find(
        (table) => table._id === selectedTable
      );
      if (selectedTableData) {
        setValue("quantity", selectedTableData.seatCount);
        setDefaultValues({
          ...defaultValues,
          quantity: selectedTableData.seatCount,
        });
      }
    }
  }, [watch("table_number"), unBookTableList]);

  const onSubmit = (data) => {
    const prevData = { ...defaultValues, ...data };
    handleOnsubmit(prevData);
    setActiveTab(2);
  };

  const handleImageClick = (table) => {
    setValue("table_number", { value: table._id, label: table.table_number });
  };

  const PrevBtn = () => {
    setActiveTab(0);
  };

  return (
    <div className="flex items-center justify-center">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto w-[524px]">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
             <div className="max-w-[250px] w-full mx-auto">
                <ControllerSelect
                  options={generateOptions(roomList, "_id", "room_name")}
                  placeholder="Select room"
                  name="room"
                  label="Room"
                />
              </div>
              {/* Table Selector */}
             <div className="max-w-[250px] w-full mx-auto">
                <ControllerSelect
                  options={generateOptions(
                    unBookTableList,
                    "_id",
                    "table_number"
                  )}
                  placeholder="Select table"
                  name="table_number"
                  label="Table"
                  isInvalid={errors.table_number}
                  isDisabled={
                    watch("room")?.label === "Courtyard" ? false : true
                  }
                />
              </div>
            </div>

            {/* Table Grid */}
            {watch("room") && watch("room")?.label !== "Courtyard" && (
              <div>
                <div className="grid gap-1 mb-2 items-center justify-center text-center lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2">
                  {loading
                    ? Array.from({ length: 2 }).map((_, index) => (
                        <Box key={index} className="m-auto">
                          <Skeleton
                            variant="rounded"
                            width={120}
                            height={120}
                            sx={{ background: "#fff" }}
                          />
                        </Box>
                      ))
                    : unBookTableList.map((table) => (
                        <Box className="m-auto table-graphic"
                          key={table._id}
                          onClick={() => handleImageClick(table)}
                          sx={{
                            border:
                              watch("table_number")?.value === table._id
                                ? "3px solid red"
                                : "1px solid #ccc",
                            padding: 1,
                            borderRadius: 2,
                            background: "#fff",
                            width: 120,
                            cursor: "pointer",
                            tooltip:watch("table_number")?.value
                          }}
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${table.photo}`}
                            width={100}
                            height={100}
                            alt="Table"
                            className="table-img"
                          />
                        </Box>
                      ))}
                </div>
                {errors.table_number && (
                  <h4 style={{ color: "red", textAlign: "center" }}>
                    Please select a table
                  </h4>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4">
              <Button type="button" variant="bordered" onClick={PrevBtn}>
                Prev
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default TableListForm;
