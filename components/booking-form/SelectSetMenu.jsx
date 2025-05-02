import { memo, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { API_ENDPOINT, MenuType, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import Loader from "../common/loader/Loader";

const SelectSetMenu = ({ defaultValues, selectMenu, menuType, setMenuType, ...props }) => {  
  const { formState: { errors }, watch, setValue } = useFormContext();
  const [selectIndex, setSelectIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [subMenu, setSubMenu] = useState("All");
  const setCardLimit = "";

  const getEvent = (obj) => {
    // console.log("getEvent_", obj, selectIndex);
    setSelectIndex(obj.menu_Name);
    selectMenu(obj);
  };

  const getMenuList = async (params) => {
    try {
      // setLoading(true);
      const { data } = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_MENU_LIST}`,
        params
      );
      setMenuList(data.data);
    } catch (error) {
      console.error("Error fetching menu list:", error);
    } finally {
      // setLoading(false);
    }
  };

  const selectSubMenu = (item) => {
    setSubMenu(item);
    const subMenuMap = { Veg: "1", NonVeg: "2", Drink: "3" };
    const subMenuTypeCode = subMenuMap[item] || "";
    setValue("subMenuType", subMenuTypeCode); // ✅ update RHF form state
    setMenuType((prev) => {
      if (item === "All") {
        getMenuList({ ...prev, Sub_Menu_Type: "" });
        return { ...prev, Sub_Menu_Type: "" };
      }
      if (prev.Sub_Menu_Type !== subMenuTypeCode) {
        getMenuList({ ...prev, Sub_Menu_Type: subMenuTypeCode });
      }
      return { ...prev, Sub_Menu_Type: subMenuTypeCode };
    });    
    console.log("selectSubMenu()", item);
  };

  // emptying values here as on handleMenuClick it takes prev values from SelectAlaCarte component and passing it to selectMenu(tempObjSetMenu) 
  let settingDefaults = {
    "_id": null,
    "menu_Name": "",
    "description": "",
    "price": "",
    "menuType": "",
    "subMenuType": "",
    "created_date": "",
    "__v": "",
    "photo": ""
  }

  useEffect(() => {
    // console.log("props from selectmenu comp_", defaultValues);
    // selectMenu(tempObjSetMenu);
    setValue("menu_Name", "");
    setValue("menuType", "2");
    setValue("subMenuType", "");
  }, []);

  useEffect(() => {
    getMenuList(menuType) 
  }, [menuType]);

  // console.log("select menu rendered__");  

  return (
    <>
      {loading && <Loader />}
      {menuList.length === 0 ? (
        <div className="text-center text-white border p-2 rounded-lg no-data">
          No data found
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-6 mb-4 submenu-wrapper">
            {MenuType.map((item, index) => (
              <Typography
                key={index}
                onClick={() => selectSubMenu(item)}
                className={`submenu-item cursor-pointer ${
                  subMenu === item ? "active" : ""
                }`}
              >
                {item}
              </Typography>
            ))}
          </div>
          <p className="note-p">Note: Please select any one option</p>
          <div className="ala-carte-grid-items">
            <Grid container>
              <div
                container
                item
                rowSpacing={3}
                spacing={3}
                className="event-grid"
              >
                {menuList?.map((i, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    className={`flex items-center justify-center cursor-pointer box-item-grid`}
                    onClick={() => getEvent(i)}
                  >
                    <Box
                      className={`event-card hover-img alacart-item-grid ${
                        (selectIndex ?? defaultValues.menu_Name) === i.menu_Name
                          ? "activeBorder4"
                          : ""
                      }`}
                    >
                      <div className="alacart-item-img">
                        <Image
                          alt="Lovefools"
                          src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${i.photo}`}
                          className="event-img event-img-setmenu"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="event-body">
                        <Typography
                          variant="h3"
                          className="common-heading-h3"
                          sx={{ marginBottom: "5px !important" }}
                        >
                          {i.menu_Name}
                        </Typography>
                        <div className="d-flex-time">
                          <Typography className="p14">
                            {i.description}
                          </Typography>
                          <Button
                            className={`price-bttn ${
                              (selectIndex ?? defaultValues.menu_Name) ===
                                i.menu_Name && "active"
                            }`}
                          >
                            {`₹ ${i.price}`}
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </Grid>
                ))}
              </div>
            </Grid>
          </div>

          {errors?.menu_Name && (
            <p className="error text-center">Please select the Menu</p>
          )}
        </>
      )}
    </>
  );
};

export default memo(SelectSetMenu);
