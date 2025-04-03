"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerTextField from "@/components/common/ControllerTextField";
import FormProvider from "@/components/common/FormProvider";
import { bookingSchema, menuSchema } from "@/schema/BookingSchema";
import Menu1 from "../../assets/images/menu1.png";
import Menu2 from "../../assets/images/menu2.png";
import Image from "next/image";
import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { API_ENDPOINT, MenuType, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import axios from "axios";
import Button from "../common/Button";
import Loader from "../common/loader/Loader";

const SelectMenuForm = ({
  setActiveTab,
  defaultValues,
  setDefaultValues,
  handleOnsubmit,
}) => {
  const methods = useForm({
    resolver: yupResolver(menuSchema),
    defaultValues,
    mode: "onBlur",
  });
  const [menu, setMenu] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const [subMenu, setSubMenu] = useState("All");
  const [menuType, setMenuType] = useState({ Menu_Type: "1" });
  const [selectIndex, setSelectIndex] = useState();
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const getMenuList = async (params) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_MENU_LIST}`,
        { ...params }
      );
      setLoading(false);
      return setMenuList(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const selectMenu = (data) => {
    setValue("price", data.price);
    setValue("id", data._id);
    setValue("menu_Name", data.menu_Name);
    setValue("menuType", data.menuType);
    setValue("subMenuType", data.subMenuType);
    setSelectIndex(data.menu_Name);
  };

  useEffect(() => {
    getMenuList({ ...menuType });
  }, [menuType]);

  const selectSubMenu = (item) => {
    setSubMenu(item);
    if (item === "All") {
      getMenuList({ ...menuType });
    } else if (item === "Veg") {
      setValue("subMenuType", "1");
      setMenuType({ ...menuType, Sub_Menu_Type: "1" });
    } else if (item === "NonVeg") {
      setValue("subMenuType", "2");
      setMenuType({ ...menuType, Sub_Menu_Type: "2" });
    } else if (item === "Drink") {
      setValue("subMenuType", "3");
      setMenuType({ ...menuType, Sub_Menu_Type: "3" });
    }
  };

  const onSubmit = async (data) => {
    const prevData = { ...defaultValues, ...data };
    handleOnsubmit(prevData);
    setActiveTab(3);
  };

  const PrevBtn = () => {
    setActiveTab(1);
  };

  return (
    <FormProvider
      className="booking-form"
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-2 items-center justify-center"
        style={{ display: "flex" }}
      >
        <Box
          onClick={() => {
            setMenu(true);
            setMenuType({ ...menuType, Menu_Type: "1" });
            setValue("menuType", "1");
          }}
          sx={{
            border: menu ? "5px solid red" : "2px solid #fff",
            padding: 1,
            borderRadius: 2,
            background: "#fff",
            width: 80,
            cursor: "pointer",
          }}
        >
          <Image src={Menu1} width={60} height={""} alt="Lovefool Img" />
        </Box>
        <Box
          onClick={() => {
            setMenu(false);
            setMenuType({ ...menuType, Menu_Type: "2" });
            setValue("menuType", "2");
          }}
          sx={{
            border: menu === false ? "5px solid red" : "2px solid #fff",
            padding: 1,
            borderRadius: 2,
            background: "#fff",
            width: 80,
            cursor: "pointer",
          }}
        >
          <Image src={Menu2} width={60} height={""} alt="Lovefool Img" />
        </Box>
      </div>
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-2 items-center justify-center"
        style={{ display: "flex" }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: menu ? "red !important" : "#fff !important",
              fontSize: "1rem",
            }}
          >
            Ala Cart
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: menu === false ? "red !important" : "#fff !important",
              fontSize: "1rem",
            }}
          >
            Set Menu
          </Typography>
        </Box>
      </div>
      <div
        className="grid grid-cols-4 gap-4 md:grid-cols-4 mb-2 items-center justify-center grid-menu-list"
        style={{ display: "flex" }}
      >
        {MenuType.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                borderRadius: 2,
                gap: 5,
                width: 50,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Typography
                onClick={() => selectSubMenu(item)}
                sx={{
                  color:
                    subMenu === item ? "red !important" : "#fff !important",
                  marginBottom: "0px !important",
                }}
              >
                {item}
              </Typography>
            </Box>
          );
        })}
      </div>
      {loading ? (
        <Loader marginTop="2rem" background="transparent" marginBottom="3rem" />
      ) : (
        <>
          <div className="flex items-center justify-center">
            {menuList.length === 0 && (
              <Typography
                sx={{
                  color: "#fff !important",
                  border: "1px solid #fff",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                No data found
              </Typography>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-2">
            {menuList?.map((item, index) => {
              return (
                <Box
                  key={index}
                  className={`flex items-center justify-center menuStyleBg grid-menustyle ${
                    (selectIndex ?? defaultValues.menu_Name) === item.menu_Name
                      ? "menuStyle activeBorder4"
                      : ""
                  } cursor-pointer`}
                  onClick={() => selectMenu(item)}
                >
                  <Box className="menuBox bg-white">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item?.photo}`}
                      width={30}
                      height={30}
                      alt="Lovefool Img"
                    />
                  </Box>
                  <Box sx={{ width: "100%" }} mt={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          borderBottom: "1px dashed #000",
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          zIndex: 0,
                          width: "100%",
                        }}
                      />
                      <Typography
                        sx={{
                          backgroundColor: "#000",
                          px: 1,
                          zIndex: 1,
                          color: "#fff !important",
                          position: "absolute",
                          left: 0,
                          top: -10,
                        }}
                      >
                        {item.menu_Name}
                      </Typography>
                      <Typography
                        sx={{
                          backgroundColor: "#000",
                          px: 1,
                          zIndex: 1,
                          color: "white !important",
                          position: "absolute",
                          right: 0,
                          top: -10,
                        }}
                      >
                        {item.price}
                      </Typography>
                    </Box>
                    <Typography color="#fff !important" mt={2}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </div>
        </>
      )}
      {errors?.menu_Name && (
        <h4 style={{ color: "red", textAlign: "center" }}>
          Please select the Menu
        </h4>
      )}
      <div className="flex items-center justify-center">
        <h5 className="note-text ">
          Note: Per Person 250 chargeble in advance
        </h5>
      </div>
      <br />
      <div className="flex justify-center space-x-4">
        <Button type="button" variant="bordered" onClick={PrevBtn}>
          Prev
        </Button>
        <Button type="submit">Next</Button>
      </div>
      <br />
      <br />
    </FormProvider>
  );
};

export default SelectMenuForm;
