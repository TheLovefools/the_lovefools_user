"use client";

import * as React from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Pagination,
  Skeleton,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import Image from "next/image";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import axios from "axios";
import Loader from "@/components/common/loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Gallery = () => {
  const [isPhoto, setIsPhoto] = React.useState(true);
  const [isVideo, setIsVideo] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);
  const [videoList, setVideoList] = React.useState([]);
  const [galleryInfo, setGalleryInfo] = React.useState(null);
  const [loadingGallery, setLoadingGallery] = React.useState(false);
  const [loadingCMS, setLoadingCMS] = React.useState(false);
  const [currentPagePhoto, setCurrentPagePhoto] = React.useState(1);
  const itemsPerPagePhoto = 10;
  const [totalPagesPhoto, setTotalPagesPhoto] = React.useState(1);
  const [currentPageVideo, setCurrentPageVideo] = React.useState(1);
  const itemsPerPageVideo = 10;
  const [totalPagesVideo, setTotalPagesVideo] = React.useState(1);

  const getGallery = async () => {
    try {
      setLoadingGallery(true);
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_GALLERY_LIST_BY_USER}`
      );
      const galleryData = response.data.data;
      const photos = galleryData.filter((item) => item.photo && !item.video);
      const videos = galleryData.filter((item) => item.video);

      setImageList(photos);
      setVideoList(videos);
      setTotalPagesPhoto(Math.ceil(photos.length / itemsPerPagePhoto));
      setTotalPagesVideo(Math.ceil(videos.length / itemsPerPageVideo));
      setLoadingGallery(false);
    } catch (error) {
      setLoadingGallery(false);
      console.error("Error fetching gallery data:", error);
    }
  };

  const getGalleryEvents = async () => {
    try {
      setLoadingCMS(true);
      const data = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_CMS}`
      );
      setGalleryInfo(data.data.data[2]);
      setLoadingCMS(false);
    } catch (error) {
      setLoadingCMS(false);
      console.error("Error fetching CMS data:", error);
    }
  };

  React.useEffect(() => {
    getGallery();
    getGalleryEvents();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  const handleFilterPhotos = () => {
    setIsPhoto(true);
    setIsVideo(false);
    setCurrentPagePhoto(1);
  };

  const handleFilterVideos = () => {
    setIsPhoto(false);
    setIsVideo(true);
    setCurrentPageVideo(1);
  };

  const handleChangePagePhoto = (event, value) => {
    setCurrentPagePhoto(value);
  };

  const handleChangePageVideo = (event, value) => {
    setCurrentPageVideo(value);
  };

  const indexOfLastPhoto = currentPagePhoto * itemsPerPagePhoto;
  const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPagePhoto;
  const currentPhotos = imageList.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const indexOfLastVideo = currentPageVideo * itemsPerPageVideo;
  const indexOfFirstVideo = indexOfLastVideo - itemsPerPageVideo;
  const currentVideos = videoList.slice(indexOfFirstVideo, indexOfLastVideo);

  if (loadingGallery || loadingCMS) {
    return <Loader />;
  }

  return (
    <section className="common-section hover-img bg-color" id="Gallery">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="info-wrap text-center">
              <Typography
                variant="h2"
                className={`common-heading-h2 ${
                  loadingCMS ? "" : "center-line"
                }`}
              >
                {loadingCMS ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "3rem", background: "#0000001c" }}
                  />
                ) : (
                  <span className="bg-color">{galleryInfo?.section_Name}</span>
                )}
              </Typography>
              {loadingCMS ? (
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              ) : (
                <Typography variant="h3" className="common-heading-h3">
                  {galleryInfo?.description}
                </Typography>
              )}
              <div className="filter-btn-wrap" style={{ marginTop: "20px" }}>
                <Button
                  onClick={handleFilterPhotos}
                  variant="contained"
                  className={`${
                    isPhoto ? "btn-primary" : "btn-secondary !bg-white"
                  } btn-sm`}
                  style={{ marginRight: "10px" }}
                >
                  Photos ({imageList.length})
                </Button>
                <Button
                  onClick={handleFilterVideos}
                  variant="contained"
                  className={`${
                    isVideo ? "btn-primary" : "btn-secondary !bg-white"
                  } btn-sm`}
                >
                  Videos ({videoList.length})
                </Button>
              </div>
            </div>
          </Grid>

          <Grid container item rowSpacing={3} spacing={3}>
            {isPhoto &&
              (currentPhotos.length > 0 ? (
                currentPhotos.map((item) => (
                  <Grid key={item._id} item xs={12} sm={6} md={3} lg={3}>
                    <Card className="gallery-card-w" style={{maxHeight:'180px'}}>
                      <Image
                        alt={item.event_Name}
                        src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item.photo}`}
                        width={500}
                        height={500}
                        className="gallery-thumbnail"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedImage(item.photo);
                          handleOpen();
                        }}
                      />
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    No Photos Available
                  </Typography>
                </Grid>
              ))}

            {isVideo &&
              (currentVideos.length > 0 ? (
                currentVideos.map((item) => (
                  <Grid key={item._id} item xs={12} sm={6} md={3} lg={3}>
                     <Card className="gallary-card-w">
                          <div
                            onClick={() => {
                              setSelectedVideo(item.video);
                              handleOpen();
                            }}
                          >
                            <Button className="play-icon-btn">
                              <PlayCircleOutlineIcon className="play-icon" />
                            </Button>
                            <Image
                              alt="Lovefools"
                              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${item.photo}`}
                              width={500}
                              height={500}
                              className="gallary-thumbnail"
                            />
                          </div>
                        </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    No Videos Available
                  </Typography>
                </Grid>
              ))}
          </Grid>

          <Box className="flex items-center justify-end w-full" paddingX={12}>
            <br />
            <br />
            {isPhoto && totalPagesPhoto > 1 && (
              <Pagination
              count={totalPagesPhoto} // Set the total number of pages
              page={currentPagePhoto} // Set the current page
              onChange={handleChangePagePhoto} // Fetch data for the selected page
            />
            )}
            {isVideo && totalPagesVideo > 1 && (
             
              <Pagination
              count={totalPagesVideo}
              page={currentPageVideo}
              onChange={handleChangePageVideo}
            />
            )}
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="gallery-modal-title"
            aria-describedby="gallery-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "39vw",
                height: "60vh",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background:'#fff !important',
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
              {selectedImage && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${selectedImage}`}
                  alt="Gallery Item"
                  layout="intrinsic"
                  width={500}
                  height={500}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              )}
              {selectedVideo && (
                <ReactPlayer
                  url={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${selectedVideo}`}
                  controls
                  width="100%"
                  height="100%"
                />
              )}
            </Box>
          </Modal>
        </Grid>
      </Container>
    </section>
  );
};

export default Gallery;
