'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/main.css";
import "../styles/globals.scss";
import AuthContext from "@/authcontext/AuthContext";
import Header from "@/components/layout/index";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer2 from "@/components/footer/Footer2";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional, custom CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <title>LOVEFOOLS HOSPITALITY PRIVATE LIMITED</title>
        <meta name="keywords" content="keywords: LOVEFOOLS HOSPITALITY PRIVATE LIMITED," />
        <meta property="og:type"content="website" />
        <meta property="og:url"content="http://thelovefools.in" />
        <meta property="og:image"content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/assets/meta-og.png" />
        <meta property="og:image:secure_url"content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/assets/meta-og.png" />
        <meta property="og:image:width"content="1200" />
        <meta property="og:image:height"content="630" />
        <meta property="og:image:alt"content="http://thelovefools.in" />
        <meta property="og:image:type"content="image/png" />
        <meta name="twitter:card"content="summary_large_image" />
        <meta name="twitter:image"content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/assets/meta-og.png" />
        <meta name="twitter:image:secure_url"content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/assets/meta-og.png" />
        <meta property="og:title"content="LOVEFOOLS HOSPITALITY PRIVATE LIMITED" />
        <meta name="twitter:title"content="LOVEFOOLS HOSPITALITY PRIVATE LIMITED" />
        <meta name="description"content="Traditional Thali Festival - flavors from every corner of India on a single plate." />
        <meta property="og:description"content="Traditional Thali Festival - flavors from every corner of India on a single plate." />
        <meta name="twitter:description"content="Traditional Thali Festival - flavors from every corner of India on a single plate." />
        <link rel="canonical"href="http://thelovefools.in"></link>



        
      </head>
      <body className="lovefools-body">
        <AuthContext>
          <Header />
          {children}
          <Footer2 />
          <ToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
