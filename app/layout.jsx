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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional, custom CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>LOVEFOOLS HOSPITALITY PRIVATE LIMITED</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thelovefools.in" />
        <meta
          property="og:image"
          content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/67507d2e7218dcbcba25e5ef-.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/67507d2e7218dcbcba25e5ef-.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="https://thelovefools.in" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/67507d2e7218dcbcba25e5ef-.jpg"
        />
        <meta
          name="twitter:image:secure_url"
          content="https://the-lovefools.s3.eu-north-1.amazonaws.com/uploads/67507d2e7218dcbcba25e5ef-.jpg"
        />
        <meta
          property="og:title"
          content="LOVEFOOLS HOSPITALITY PRIVATE LIMITED"
        />
        <meta
          name="twitter:title"
          content="LOVEFOOLS HOSPITALITY PRIVATE LIMITED"
        />
        <meta
          name="keywords"
          content="keywords: digital,design/development studio, ui/ux studio, ux studio,development studio,design and development studio,product design and development studio,growth hacks for startups,growth strategies in marketing"
        />
        <meta
          name="description"
          content="og:description : LOVEFOOLS HOSPITALITY PRIVATE LIMITED "
        />
        <meta
          property="og:description"
          content="og:description : LOVEFOOLS HOSPITALITY PRIVATE LIMITED "
        />
        <meta
          name="twitter:description"
          content="og:description : LOVEFOOLS HOSPITALITY PRIVATE LIMITED "
        />
      </head>
      <body className="lovefools-body">
        <AuthContext>
          <Header />
          {children}
          <ToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
