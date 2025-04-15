"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Container, Modal, Skeleton, Pagination } from "@mui/material";
import gallayIcon from "../../assets/images/gallay-icon.svg";
import Image from "next/image";
import axios from "axios";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { convertTimeObjectToString, formatDate } from "@/utils/utils";

const Events = () => {
  const [view, setView] = React.useState(6);
  const [eventList, setEventList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [eventObj, setEventObj] = React.useState({});
  const [oldEventObj, setOldEventObj] = React.useState(null);
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [page, setPage] = React.useState(1); // Current page state
  const [totalPages, setTotalPages] = React.useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const startRecord = React.useMemo(() => {
    return Math.min((page - 1) * 10 + 1, totalPages);
  }, [page, totalPages]);

  const getEvent = (obj) => {
    setEventObj(obj);
    handleOpen();
  };
  const getEvents = async (page = 1) => {
    try {
      setLoading1(true);
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_EVENTS}`,
        { page } // Pass the page as a parameter
      );
      const { data, pageData } = response.data;
  
      setEventList(data);
      setCurrentPage(page);
      setTotalPages(Math.ceil(pageData.total / pageData.limit)); // Calculate total pages
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
      console.error("Unexpected error:", error);
      setError("Unexpected error occurred");
    }
  };
  React.useEffect(() => {
    getEvents(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value); // Update the current page state
  };

  const getOldEvents = async () => {
    try {
      setLoading2(true);
      const data = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_CMS}`
      );
      setLoading2(false);
      setOldEventObj(data.data.data[1]);
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    getOldEvents();
  }, []);

  return (
    <section className="events-section common-section" id="Event">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className="info-wrap text-center">
              <Typography
                variant="h2"
                className={`common-heading-h2 ${loading2 ? "" : "center-line"}`}
              >
                {loading2 ? (
                  <Skeleton variant="text" sx={{ fontSize: "3rem", background: "#0000001c" }} />
                ) : (
                  <span>{oldEventObj?.section_Name}</span>
                )}
              </Typography>
              {loading2 ? (
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              ) : (
                <p className="p16">{oldEventObj?.description}</p>
              )}
            </div>
          </Grid>

          <Grid container item rowSpacing={3} spacing={3} className="event-grid">
            {loading1 ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Grid key={index} item xs={12} sm={12} md={4} lg={4}>
                  <div className="event-card hover-img">
                    <Skeleton variant="rounded" width={340} height={220} />
                  </div>
                </Grid>
              ))
            ) : (
              eventList?.map((i, index) => (
                <Grid key={index} item xs={12} sm={12} md={4} lg={4}>
                  <Box className="event-card hover-img">
                    <Image
                      alt="Lovefools"
                      src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${i.photo}`}
                      className="event-img"
                      width={500}
                      height={500}
                    />
                    <div className="event-body">
                      <Typography variant="h3" className="common-heading-h3" sx={{ marginBottom: "5px !important" }}>
                        {i.event_Name}
                      </Typography>
                      <div className="d-flex-time">
                        <Typography className="p14">
                          {formatDate(i.date)}-{i.time}
                        </Typography>
                        <Button className="read-more-btn" onClick={() => getEvent(i)}>
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { pointerEvents: "none" } }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="event-modal">
          <Grid container>
            <Grid item xs={12} sx={{ display: { md: "none" } }}>
              <CloseIcon className="close-icon" onClick={handleClose} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="event-img-box" onClick={handleClose}>
                <Image
                  alt="Lovefools"
                  src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${eventObj.photo}`}
                  width={500}
                  height={500}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="event-img-box">
                <div className="event-body">
                  <Typography variant="h3" className="common-heading-h3">
                    {eventObj.event_Name}
                  </Typography>
                  <Typography className="common-heading-h5">
                    {eventObj.description}
                  </Typography>
                  <br />
                  <br />
                  <div className="d-flex-time">
                    <Typography className="p14">
                      {formatDate(eventObj.date)}-{convertTimeObjectToString(eventObj.time)}
                    </Typography>
                  </div>
                </div>
              </Box>
            </Grid>
            <Grid item md={1} sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }}>
              <CloseIcon className="close-icon" onClick={handleClose} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <br />
      <br />
      <Box className="flex items-center justify-end" paddingX={12}>
  <Pagination
    count={totalPages} // Set the total number of pages
    page={currentPage} // Set the current page
    onChange={(event, page) => getEvents(page)} // Fetch data for the selected page
  />
</Box>
    </section>
  );
};

export default Events;

