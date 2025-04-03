"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../../assets/images/logo.png";
import logo1 from "../../assets/images/logo1.png";
import Image from "next/image";
import AboutUs from "../about/AboutUs";
import { AuthContextProvider } from "@/authcontext/AuthContext";
import { useRouter } from "next/navigation";

const drawerWidth = 240;
const navItems = [
  // "Home",
  "About us",
  // "Receipt",
  // "History",
  "Event",
  "Gallery",
  "Testimonial",
  "Contact us",
];

export default function Header(props) {
  const [scrolling, setScrolling] = React.useState(false);
  const { id, setId ,setEnquiryName} = React.useContext(AuthContextProvider);
  const [bgColor, setBgColor] = React.useState('transparent')
  const router = useRouter();

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      // Check if window is defined before accessing properties
      if (typeof window !== "undefined") {
        if (window.scrollY > 0) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      }
    };

    // Explicitly assert the type of window as Window
    const currentWindow = window;

    // Check if window is defined before adding the event listener
    if (typeof currentWindow !== "undefined") {
      currentWindow.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      // Check if window is defined before removing the event listener
      if (typeof currentWindow !== "undefined") {
        currentWindow.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6">
        <Image
          src={logo1}
          alt="Lovefools"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                if (window.location.pathname === "/booking") {
                  return router.push("/");
                } else {
                  return setId(item);
                }
              }}
            >
              <a href={`#${id}`}>
                <ListItemText primary={item} />
              </a>
            </ListItemButton>
          </ListItem>
        ))}
         <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push("/booking");
              }}
            >
            
                <ListItemText primary="Booking" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

    
    React.useEffect(() => {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/booking" || scrolling) {
          setBgColor("#000000");
        } else {
          setBgColor("transparent");
        }
      }
    }, [scrolling]);
  return (
    <>
      <header className="common-header" >
        <Box className="header-container">
          <CssBaseline />
          <AppBar component="nav" className="common-nav shadow-none" style={{background:bgColor, boxShadow:'none'}}>
            <Toolbar>
              <Typography>
                <Image
                  src={logo}
                  alt="lovefools"
                  className="logo-img"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push("/")}
                />
              </Typography>

              <Box className="common-nav-inner">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      if (window.location.pathname=== "/booking") {
                        
                        return router.push("/");
                      } else {
                        if(item === 'Contact us'){
                          setEnquiryName('')
                        }
                        return setId(item);
                      }
                    }}
                  >
                    <a href={`#${id}`}>
                      <Typography
                        variant="body1"
                        className={id === item ? "color-red" : ""}
                      >
                        {item}
                      </Typography>
                    </a>
                  </Button>
                ))}
                <Button
                  variant="contained"
                  className="btn-primary btn-sm"
                  onClick={() => router.push("/booking")}
                >
                  Book Table
                </Button>
              </Box>

              <IconButton
                className="mobile-menu-btn"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              className="common-header-drawer"
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div className="common-header-inner">{drawer}</div>
            </Drawer>
          </nav>
        </Box>
      </header>
    </>
  );
}
