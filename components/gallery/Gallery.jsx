"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Grid, Modal, Skeleton } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import Image from "next/image";
import { API_ENDPOINT, NEXT_PUBLIC_API_URL } from "@/utils/constant";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";

const Gallery = () => {
  const [video, setVideo] = React.useState(false);
  const [photo, setPhoto] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [view, setView] = React.useState(12);
  const [videObj, setVideoObj] = React.useState({});
  const [imageList, setImageList] = React.useState([]);
  const [videoList, setVideoList] = React.useState([]);
  const [videoIFrameList, setVideoIframeList] = React.useState([]);
  const [galleryObj, setGalleryObj] = React.useState(null);
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const router = useRouter()

  const [videosIFrame, setVideosIFrame] = React.useState([]);

  const handleView = () => {
   router.push('/view-more-gallery')
  };

  const Styles = video ? "gallery-video" : "gallery-img";

  const getGallery = async () => {
    try {
      setLoading1(true);
      const data = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_GALLERY_LIST_BY_USER}`
      );
      const response = data.data.data;
      console.log("getGallery_", response);      
      const getPhoto = response.filter((res) => res.photo && !res.video);
      const getVideo = response.filter((res) => res.photo && res.video);
      const getVideoIFrame = response.filter((res) => res.youtube_iframe);
      setImageList(getPhoto);
      setVideoList(getVideo);
      setVideoIframeList(getVideoIFrame);
      setLoading1(false);
    } catch (error) {
      setLoading1(false);

      console.error("Unexpected error:", error);
      // setError('Unexpected error occurred');
    }
  };

  React.useEffect(() => {
    getGallery();
  }, []);

  const getGalleryEvents = async () => {
    try {
      setLoading2(true);
      const data = await axios.post(
        `${NEXT_PUBLIC_API_URL}${API_ENDPOINT.GET_CMS}`
      );
      setLoading2(false);

      return setGalleryObj(data.data.data[2]);
    } catch (error) {
      setLoading2(false);

      console.log(error);
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  React.useEffect(() => {
    getGalleryEvents();
  }, []);

  React.useEffect(() => {
    const videosWithId = videoIFrameList.map((item) => {
      if (!item.youtube_iframe) return { ...item, videoId: null, thumbnailUrl: null, videoUrl: null};  
      // Decode the iframe string first
      const decodedIframe = decodeHtml(item.youtube_iframe);  
      const parser = new DOMParser();
      const doc = parser.parseFromString(decodedIframe, "text/html");
      const iframe = doc.querySelector("iframe");  
      if (iframe) {
        const src = iframe.getAttribute("src");
        console.log("SRC:", src); // ✅ debug check  
        const match = src.match(/youtube\.com\/embed\/([^\?&"]+)/);
        if (match && match[1]) {
          const id = match[1];
          return {
            ...item,
            videoId: id,
            thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${id}`,
          };
        }
      }  
      return { ...item, videoId: null, thumbnailUrl: null };
    });  
    setVideosIFrame(videosWithId);
    console.log("videosWithId_", videosWithId);    
  }, [videoIFrameList]);

  return (
    <section className="gallery-section common-section hover-img" id="Gallery">
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="info-wrap text-center sm:md-[60px] md-[40px]">
              <Typography
                variant="h2"
                className={`common-heading-h2 ${loading2 ? "" : "center-line"}`}
              >
                {loading2 ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "3rem", background: "#0000001c" }}
                  />
                ) : (
                  <span>{galleryObj?.section_Name}</span>
                )}
              </Typography>
              {loading2 ? (
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              ) : (
                <Typography variant="h3" className="common-heading-h3">
                  {galleryObj?.description}
                </Typography>
              )}

              <div className="filter-btn-wrap">
                {imageList.length !== 0 && (
                  <Button
                    onClick={() => {
                      setPhoto(true);
                      setVideo(false);
                    }}
                    variant="contained"
                    className={`${
                      photo ? "btn-primary" : "btn-secondary"
                    } btn-sm`}
                  >
                    Photo
                  </Button>
                )}
                {/* {videoList.length !== 0 && ( */}
                {videoIFrameList.length !== 0 && (
                  <Button
                    onClick={() => {
                      setVideo(true);
                      setPhoto(false);
                    }}
                    variant="contained"
                    className={`${
                      video ? "btn-primary" : "btn-secondary"
                    } btn-sm`}
                  >
                    Video
                  </Button>
                )}
              </div>
            </div>
          </Grid>
          <Grid container item rowSpacing={3} spacing={3}>
            {photo && loading1 ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
                      <div>
                        <Skeleton variant="rounded" width={250} height={220} />
                      </div>
                    </Grid>
                  );
                })}
              </>
            ) : (
              <>
                {photo &&
                  imageList.length > 0 &&
                  imageList?.slice(0, 8).map((i, index) => {
                    return (
                      <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
                        <Card className="gallary-card-w">
                          <Image
                            alt="Lovefools"
                            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${i.photo}`}
                            width={500}
                            height={500}
                            className="gallary-thumbnail"
                            onClick={() => {
                              handleOpen();
                              setImage(
                                `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${i.photo}`
                              );
                            }}
                          />
                        </Card>
                      </Grid>
                    );
                  })}
              </>
            )}
            {video && loading1 ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
                      <Skeleton variant="rounded" width={250} height={220} />
                    </Grid>
                  );
                })}
              </>
            ) : (
              <>
                {video &&
                  // videoList.length > 0 && videoList?.slice(0, 8).map((i, index) => {
                  videoIFrameList.length > 0 &&
                  videoIFrameList?.slice(0, 8).map((i, index) => {
                    return (
                      <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
                        <Card className="gallary-card-w">
                          <div
                            onClick={() => {
                              handleOpen();
                              // setVideoObj(
                              //   `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${i.video}`
                              // );
                              setVideoObj(videosIFrame[index].videoUrl)
                            }}
                          >
                            <Button className="play-icon-btn">
                              <PlayCircleOutlineIcon className="play-icon" />
                            </Button>
                            <Image
                              alt="Lovefools"
                              // src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${i.photo}`}
                              src={videosIFrame[index].thumbnailUrl}
                              width={500}
                              height={500}
                              className={`gallary-thumbnail iframe`}
                            />
                          </div>
                        </Card>
                      </Grid>
                    );
                  })}
              </>
            )}
          </Grid>
          <Grid
            className="text-center view-more-btn-outer"
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            {photo && imageList.length > 8 && (
              <Button
                onClick={handleView}
                variant="contained"
                className="btn-primary mt40"
              >
                View More
              </Button>
            )}
            {/* {video && videoList.length > 8 && ( */}
            {video && videoIFrameList.length > 8 && (
              <Button
                onClick={handleView}
                variant="contained"
                className="btn-primary mt40"
              >
                View More
              </Button>
            )}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="backdrop-modal"
          >
            <Box className={Styles}>
              <IconButton
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 10,
                  backgroundColor: "#fff",
                  color: "white",
                }}
              >
                <CloseIcon />
              </IconButton>
              {video ? (
                <div className="yt-player-wrapper" >
                  <ReactPlayer
                    style={{ borderRadius: "8px", position: "relative" }}
                    url={videObj}
                    className="react-player"
                    width="100%"
                    height="100%"
                    controls={true}
                  />
                  {/* <ReactPlayer
                    style={{ borderRadius: "8px", position: "relative" }}
                    url={videObj}
                    // playing
                    controls={true}
                    width="100%"
                    height="100%"
                  /> */}
                </div>
              ) : (
                <Image
                  src={image}
                  alt="Gallery"
                  style={{ borderRadius: "8px", width: "100%" }}
                  width={500}
                  height={500}
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
