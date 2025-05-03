"use client";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { menuSchema } from "@/schema/BookingSchema";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormProvider from "@/components/common/FormProvider";
import Button from "../common/Button";
import Loader from "../common/loader/Loader";
import SelectAlaCarte from "./SelectAlaCarte";
import SelectSetMenu from "./SelectSetMenu";

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

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch
  } = methods;

  // const [menuList, setMenuList] = useState([]);
  // const [alaCarteList, setAlaCarteList] = useState([]);
  // const [subMenu, setSubMenu] = useState("All");
  // const [selectIndex, setSelectIndex] = useState();
  const [loading, setLoading] = useState(false);
  const setCardLimit = ""

  const [menuType, setMenuType] = useState({
    Menu_Type: "1",
    Sub_Menu_Type: "",
    limit: setCardLimit
  });

  const menuTypeNew = watch("menuType");

  // Memoized boolean flag
  const isAlaCarte = useMemo(() => menuTypeNew === "1", [menuTypeNew]);
  // const filteredMenuList = useMemo(() => filterSomehow(menuList), [menuList]);
  
  const handleMenuClick = (type) => {
    if (type !== menuTypeNew) {
      const updatedMenuType = {
        Menu_Type: type,
        Sub_Menu_Type: "",
        limit: setCardLimit
      };
      setValue("menuType", type);
      setMenuType(updatedMenuType);
      // setSubMenu("All"); // reset submenu filter
    }
  };

  const selectMenu = (data) => {
    setValue("price", data.price);
    setValue("id", data._id);
    setValue("menu_Name", data.menu_Name);
    setValue("menuType", data.menuType);
    setValue("subMenuType", data.subMenuType);
    setValue("photo", data.photo);
    // setSelectIndex(data.menu_Name);
    console.log("selectMenu_", data);    
  };

  const onSubmit = (data) => {
    const mergedData = { ...defaultValues, ...data };
    handleOnsubmit(mergedData);
    setActiveTab(3);
  };

  const PrevBtn = () => setActiveTab(1);

    // Memoized handlers to prevent recreation
    const handleSelectMenu = useCallback(
      (item) => selectMenu(item),
      [selectMenu]
    );
  
    // const handleSelectSubMenu = useCallback(
    //   (item) => selectSubMenu(item),
    //   [selectSubMenu]
    // );
  
  
  // useEffect(() => {

  //   // if (menuType.Menu_Type) {
  //   // }
  //   // getMenuList(menuType);
  //   // getAlaCarteList(menuType)
  //   // setValue("menuType", type);
  //   // console.log("getMenuList", menuList);    
  //   // console.log("getAlaCarteList", alaCarteList);    
  //   // console.log("[menuType]", menuType);    
  // }, [menuType]);

  useEffect(() => {
    setValue("menuType", "1");
  }, [])

  console.log("select menu form__", menuTypeNew);  

  return (
    <FormProvider
      className="booking-form"
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Menu Type Selection */}
      <div className="flex gap-4 justify-center mb-4 menu-select-icons">
        <Box
          onClick={() => handleMenuClick("1")}
          className={`menu-select-icon ${menuTypeNew === "1" ? "active" : ""}`}
        >
          {/* <Image src={Menu1} width={60} height={60} alt="Menu 1" /> */}
          <svg
            width="64"
            height="57"
            viewBox="0 0 64 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.68275 18.7568L10.5095 51.0869H53.4902L57.3169 18.7568L45.3844 26.6597L31.9998 8.04225L18.6152 26.6597L6.68275 18.7568ZM4.62656 10.2863L17.1214 18.5647L29.5776 1.2392C29.8529 0.855938 30.2163 0.543536 30.6376 0.327993C31.0589 0.112451 31.5259 0 31.9998 0C32.4737 0 32.9407 0.112451 33.362 0.327993C33.7833 0.543536 34.1468 0.855938 34.422 1.2392L46.8782 18.5647L59.376 10.2863C59.849 9.97362 60.4022 9.80202 60.9702 9.79176C61.5383 9.7815 62.0974 9.93302 62.5815 10.2284C63.0656 10.5238 63.4545 10.9507 63.7022 11.4587C63.9499 11.9666 64.0461 12.5345 63.9794 13.095L59.0904 54.3894C59.0051 55.1085 58.6571 55.7716 58.1125 56.2528C57.5678 56.734 56.8644 56.9999 56.1355 57H7.86409C7.13525 56.9999 6.43179 56.734 5.88714 56.2528C5.34248 55.7716 4.99452 55.1085 4.90925 54.3894L0.0202098 13.0921C-0.0458503 12.5317 0.0508151 11.9643 0.298795 11.4568C0.546774 10.9493 0.935715 10.5229 1.4197 10.2279C1.90369 9.93293 2.46252 9.78168 3.03022 9.79202C3.59793 9.80236 4.1508 9.97386 4.62358 10.2863H4.62656ZM31.9998 39.2606C30.4214 39.2606 28.9077 38.6376 27.7916 37.5287C26.6755 36.4198 26.0485 34.9157 26.0485 33.3475C26.0485 31.7792 26.6755 30.2752 27.7916 29.1663C28.9077 28.0573 30.4214 27.4344 31.9998 27.4344C33.5782 27.4344 35.092 28.0573 36.2081 29.1663C37.3241 30.2752 37.9512 31.7792 37.9512 33.3475C37.9512 34.9157 37.3241 36.4198 36.2081 37.5287C35.092 38.6376 33.5782 39.2606 31.9998 39.2606Z"
              fill={menuTypeNew === "1" ? "#ED1C24" : "#999999"}
            />
          </svg>
          <em>Ala Carte</em>
        </Box>
        <Box
          onClick={() => handleMenuClick("2")}
          className={`menu-select-icon ${menuTypeNew === "2" ? "active" : ""}`}
        >
          {/* <Image src={Menu2} width={60} height={60} alt="Menu 2" /> */}
          <svg
            width="52"
            height="57"
            viewBox="0 0 52 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9688 16.4062V3.09374C11.9688 2.50529 12.2025 1.94094 12.6186 1.52484C13.0347 1.10875 13.5991 0.874988 14.1875 0.874988C14.776 0.874988 15.3403 1.10875 15.7564 1.52484C16.1725 1.94094 16.4063 2.50529 16.4063 3.09374V16.4062C16.4063 16.9947 16.1725 17.559 15.7564 17.9751C15.3403 18.3912 14.776 18.625 14.1875 18.625C13.5991 18.625 13.0347 18.3912 12.6186 17.9751C12.2025 17.559 11.9688 16.9947 11.9688 16.4062ZM51.9063 3.09374V54.125C51.9063 54.7134 51.6725 55.2778 51.2564 55.6939C50.8403 56.11 50.276 56.3437 49.6875 56.3437C49.0991 56.3437 48.5347 56.11 48.1186 55.6939C47.7025 55.2778 47.4688 54.7134 47.4688 54.125V40.8125H34.1563C33.5678 40.8125 33.0035 40.5787 32.5874 40.1626C32.1713 39.7465 31.9375 39.1822 31.9375 38.5937C32.0406 33.2789 32.7118 27.9904 33.9399 22.8184C36.6524 11.5888 41.7943 4.06167 48.8139 1.05526C49.1513 0.910739 49.5193 0.852174 49.8848 0.884816C50.2504 0.917459 50.6022 1.04029 50.9087 1.2423C51.2151 1.44431 51.4667 1.71919 51.6408 2.04231C51.8149 2.36543 51.9061 2.7267 51.9063 3.09374ZM47.4688 6.94882C38.5466 13.7632 36.7994 30.3622 36.4582 36.375H47.4688V6.94882ZM25.2508 2.73042C25.2073 2.43908 25.1063 2.15931 24.9536 1.90743C24.8008 1.65555 24.5995 1.4366 24.3613 1.26335C24.1231 1.0901 23.8527 0.966017 23.566 0.898342C23.2794 0.830666 22.9821 0.820752 22.6915 0.869178C22.401 0.917603 22.123 1.0234 21.8737 1.18039C21.6245 1.33739 21.409 1.54244 21.2399 1.78359C21.0707 2.02473 20.9513 2.29715 20.8885 2.58494C20.8257 2.87274 20.8209 3.17015 20.8743 3.45983L23.0625 16.581C23.0625 18.9348 22.1275 21.1922 20.4631 22.8565C18.7987 24.5209 16.5413 25.456 14.1875 25.456C11.8337 25.456 9.57633 24.5209 7.91195 22.8565C6.24756 21.1922 5.31252 18.9348 5.31252 16.581L7.49799 3.45983C7.55137 3.17015 7.54654 2.87274 7.48377 2.58494C7.421 2.29715 7.30156 2.02473 7.1324 1.78359C6.96324 1.54244 6.74776 1.33739 6.49853 1.18039C6.24929 1.0234 5.97129 0.917603 5.68074 0.869178C5.39019 0.820752 5.0929 0.830666 4.80622 0.898342C4.51954 0.966017 4.2492 1.0901 4.01098 1.26335C3.77276 1.4366 3.57142 1.65555 3.41871 1.90743C3.26599 2.15931 3.16496 2.43908 3.1215 2.73042L0.902755 16.0429C0.883772 16.1631 0.874497 16.2846 0.875021 16.4062C0.879454 19.5508 1.99526 22.5926 4.02528 24.9941C6.0553 27.3956 8.86885 29.0022 11.9688 29.5301V54.125C11.9688 54.7134 12.2025 55.2778 12.6186 55.6939C13.0347 56.11 13.5991 56.3437 14.1875 56.3437C14.776 56.3437 15.3403 56.11 15.7564 55.6939C16.1725 55.2778 16.4063 54.7134 16.4063 54.125V29.5301C19.5062 29.0022 22.3197 27.3956 24.3498 24.9941C26.3798 22.5926 27.4956 19.5508 27.5 16.4062C27.4996 16.2845 27.4894 16.163 27.4695 16.0429L25.2508 2.73042Z"
              fill={menuTypeNew === "2" ? "#ED1C24" : "#999999"}
            />
          </svg>
          <em>Set Menu</em>
        </Box>
      </div>

      {/* Menu List */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAlaCarte ? (
            <SelectAlaCarte
              defaultValues={defaultValues}
              selectMenu={handleSelectMenu}
              menuType={menuType}
              // alaCarteList={alaCarteList}
            />
          ) : (
            <SelectSetMenu
              defaultValues={defaultValues}
              selectMenu={handleSelectMenu}
              menuType={menuType}
              setMenuType={setMenuType}
              // menuList={menuList}
              // selectSubMenu={handleSelectSubMenu}
              // subMenu={subMenu}
              // getMenuList={getMenuList}
            />
          )}
          {/* {menuType.Menu_Type === "1" && (
            <SelectAlaCarte
              alaCarteList={alaCarteList}
              defaultValues={defaultValues}
              selectMenu={handleSelectMenu}
            />
          )}
          {menuType.Menu_Type === "2" && (
            <SelectSetMenu
              menuList={menuList}
              selectIndex={selectIndex}
              defaultValues={defaultValues}
              selectMenu={selectMenu}
              selectSubMenu={selectSubMenu}
              subMenu={subMenu}
            />
          )} */}
        </>
      )}

      <div className="text-center text-white mt-2">
        {menuTypeNew === "1" ? (
          <p>Note: Per Person ₹500 chargeable in advance</p>
        ) : (
          <p>Note: 50% chargeable in advance</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6 next-prev-bttn">
        <Button type="button" variant="bordered" onClick={PrevBtn}>
          Prev
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </FormProvider>
  );
};

export default SelectMenuForm;
