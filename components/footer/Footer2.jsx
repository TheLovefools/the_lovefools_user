import { Divider, Grid, Typography, Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "../../assets/images/logo2.png";
import { AuthContextProvider } from "@/authcontext/AuthContext";
import { useRouter } from "next/navigation";

const navItems = [
  // "Home",
  "About us",
  // "Receipt",
  // "History",
  "Event",
  "Gallery",
  "Testimonial",
  "Contact us",
  "Privacy policy",
  "Terms & Conditions"
];

const Footer2 = () => {
  const router = useRouter();
  const { id, setId, setEnquiryName } = React.useContext(AuthContextProvider);

  return (
    <footer className="common-footer">
      <Container className="footer-container">
        <Grid container display="flex" alignItems="center" justifyContent="center">
          {/* <Grid item xs={12} md={12}>
            <Image src={logo} width={150} height={50} alt="Company Logo" />
          </Grid> */}
          <Grid item xs={12} md={3}>
          <Image src={logo} width={150} height={50} alt="Company Logo" />
            {/* <Typography>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography> */}
          </Grid>

          <Grid item xs={12} md={12} lg={9}>
            <div className="footer-menu">
              {navItems.map((i, index) => {
                return (
                  <div key={index} onClick={() => {
                    if(i === "Privacy policy"){
                      return router.push("/privacy-policy")
                    }else if(i === "Terms & Conditions"){
                      return router.push("/terms&conditions")
                    }else{
                      return setId(i)
                    }
                  }}>
                    <a href={`#${id}`} >
                      {i}
                    </a>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
        {/* <Divider className="common-divider" />
        <Grid container alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography>© 2024 Lovefools. All Rights Reserved.</Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={7}>
            <div className="footer-menu">
              <Facebook />
              <Twitter />
              <Instagram />
            </div>
          </Grid>
        </Grid> */}
      </Container>
    </footer>
  );
};

export default Footer2;
