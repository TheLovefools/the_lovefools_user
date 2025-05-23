import { memo, useEffect, useState } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { EyeIcon } from '@heroicons/react/24/outline';
import CustomButton from '@/components/common/Button';
import { Tooltip } from '@nextui-org/react';
import { ObjectId } from "bson";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import Loader from "../common/loader/Loader";

const SelectAlaCarte = ({ defaultValues, selectMenu, menuType, ...props }) => {
  const { formState: { errors }, watch, setValue } = useFormContext();
  // const menuType = watch("menuType");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [loading, setLoading] = useState(true);
  const [eventObj, setEventObj] = useState({});
  // const [alaCarteList, setAlaCarteList] = useState([]);
  const setCardLimit = "";
  const newUniqueId = new ObjectId().toHexString();
  const [alaCarteList, setAlaCarteList] = useState([]);

  // const [alaCarteMenuType, setAlaCarteMenuType] = useState({
  //   Menu_Type: "1",
  //   Sub_Menu_Type: "",
  //   limit: setCardLimit,
  // });

  const getEvent = (obj) => {
    console.log("getEvent", obj);
    setEventObj(obj);
    handleOpenModal();
  };

  const getAlaCarteList = async (params) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_ALACARTE_LIST}`,
        params
      );
      await setAlaCarteList(data.data);
      await console.log("getAlaCarteList()", alaCarteList);      
    } catch (error) {
      console.error("Error fetching AlaCarte list:", error);
    } finally {
      setLoading(false);
    }
  };

  let tempObj = {
    "_id": newUniqueId,
    "menu_Name": "Ala Carte Menu",
    "description": "Ala Carte Menu",
    "price": 500,
    "menuType": "1",
    "subMenuType": "1",
    "created_date": new Date().toISOString(),
    "__v": 0,
    "photo": newUniqueId
  }

  useEffect(() => {
    selectMenu(tempObj);
    // getAlaCarteList(alaCarteMenuType);
    console.log("props form alacarte comp_", defaultValues);
    // console.log("newId_", newUniqueId);
    // console.log("tempObj_", tempObj);
    // setValue()
  }, []);

  useEffect(() => {
    getAlaCarteList(menuType) 
  }, [menuType]);

  console.log("select ala carte rendered__");  

  return (
    <>
      {loading && <Loader />}
      {alaCarteList.length === 0 ? (
        <div className="text-center text-white border p-2 rounded-lg no-data">
          No data found
        </div>
      ) : (
        <>
          <div className="ala-carte-grid-items">
            <Grid container>
              <div
                container
                item
                rowSpacing={3}
                spacing={3}
                className="event-grid"
              >
                {alaCarteList?.map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    className="box-item-grid"
                  >
                    <Box className="event-card hover-img alacart-item-grid">
                      <div className="alacart-item-img">
                        <Image
                          alt="Lovefools"
                          src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item.photo}`}
                          className="event-img"
                          width={500}
                          height={500}
                        />
                        <CustomButton
                          isIconOnly
                          type="button"
                          size="sm"
                          variant="light"
                          color="default"
                          className="btn-view"
                          onClick={() => getEvent(item)}
                        >
                          <Tooltip content="View Menu">
                            <EyeIcon className="h-5 w-5" />
                          </Tooltip>
                        </CustomButton>
                      </div>
                      <div className="event-body">
                        {/* <p className="">{item.photo}</p> */}
                        {/* <p className="">{`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item.photo}`}</p> */}
                        <Typography
                          variant="h3"
                          className="common-heading-h3"
                          sx={{ marginBottom: "5px !important" }}
                        >
                          {item.ala_menu_Name}
                        </Typography>
                        <div className="d-flex-time">
                          <Typography className="p14">
                            {item.ala_menu_Description}
                          </Typography>
                          {/* <Button
                            className="read-more-btn"
                            onClick={() => getEvent(item)}
                          >
                            View Menu
                          </Button> */}
                        </div>
                      </div>
                    </Box>
                  </Grid>
                ))}
              </div>
            </Grid>
          </div>
        </>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        BackdropProps={{ style: { pointerEvents: "none" } }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="alacartmenu-modal">
          <div className="alacartmenu-modal-wrap">
            <IconButton onClick={handleCloseModal} className="modal-close-icon">
              <CloseIcon />
            </IconButton>
            <div className="alacartmenu-modal-body">
              {/* <p className="alacartmenu-modal-ttl">{eventObj.ala_menu_Name}</p> */}
              {/* <p className="alacartmenu-modal-desc">{eventObj.ala_menu_Description}</p> */}
              <div className="alacartmenu-menuimg-wrap">
                <Image
                  alt="Lovefools"
                  src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${eventObj.photo}`}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(SelectAlaCarte);
