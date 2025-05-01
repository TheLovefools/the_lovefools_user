import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { convertTimeObjectToString, formatDate } from "@/utils/utils";
import axios from "axios";
import { API_ENDPOINT, MenuType, NEXT_PUBLIC_API_URL } from "@/utils/constant";

const SelectSetMenu = ({
  menuList,
  defaultValues,
  selectMenu,
  selectSubMenu,
  subMenu,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [selectIndex, setSelectIndex] = useState();
  const setCardLimit = "";
  // const [subMenu, setSubMenu] = useState("All");

  const [menuType, setMenuType] = useState({
    Menu_Type: "2",
    Sub_Menu_Type: "",
    limit: setCardLimit
  });

  const getEvent = (obj) => {
    console.log("getEvent_", obj, selectIndex );
    setSelectIndex(obj.menu_Name)
    selectMenu(obj)
  };

  let tempObjSetMenu = {
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
    console.log("props from selectmenu comp_", defaultValues);
    selectMenu(tempObjSetMenu)
  }, []);

  return (
    <>
      {/* Submenu Filter */}
      {menuType.Menu_Type === "2" && (
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
      )}
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
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Grid key={index} item xs={12} sm={12} md={4} lg={4} className={`flex items-center justify-center cursor-pointer box-item-grid`}>
                    <Box className="event-card hover-img alacart-item-grid">
                      <Skeleton variant="rounded" width={340} height={220} />
                    </Box>
                  </Grid>
                ))
              : menuList?.map((i, index) => (
                  <Grid key={index} item xs={12} sm={12} md={4} lg={4} className={`flex items-center justify-center cursor-pointer box-item-grid`}  onClick={() => getEvent(i)}>
                    <Box className={`event-card hover-img alacart-item-grid ${(selectIndex ?? defaultValues.menu_Name) === i.menu_Name ? "activeBorder4" : ""}`}>
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
                            className={`price-bttn ${(selectIndex ?? defaultValues.menu_Name) === i.menu_Name && "active"}`}
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
    </>
  );
};

export default SelectSetMenu;
