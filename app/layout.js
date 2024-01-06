import { Inter } from "next/font/google";
import "../styles/main.scss";
import Navbar from "@/components/Navbar";
import CustomSessionProvider from "@/components/SessionProvider";
// import CookieConsent from "@/components/CookieConsent";
import NextTopLoader from "nextjs-toploader";
// import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WaveMaxx Dashboard",
  description:
    "Thunderfast your web development with built-in copy-paste Tailwind CSS components",
  image: "https://i.imgur.com/9uX1Xqj.png",
  url: "./logo.png",
  type: "website",
  siteName: "WaveMaxx Dashboard",
  // twitterUsername: "@wavemaxx",
  // date: "2021-06-01",
  keywords: [
    "ui",
    "components",
    "react",
    "nextjs",
    "tailwindcss",
    "wavemaxx",
    "components",
  ],
};

export default function RootLayout({ children }) {
  // const categories = await getData("categories");

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NextTopLoader
          color="#7F00FF" 
          // initialPosition={0.08}
          // crawlSpeed={200}
          // height={3}
          // crawl={true}
          // showSpinner={true}
          // easing="ease"
          // speed={200}
          // shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          // template='<div className="bar" role="bar"><div className="peg"></div></div>
          // <div className="spinner" role="spinner"><div className="spinner-icon"></div></div>'
          // zIndex={1600}
          // showAtBottom={false}
        />*/}
        <CustomSessionProvider>
          <Navbar children={children} />
          {/* <CookieConsent /> */}
        </CustomSessionProvider>
      </body>
    </html>
  );
}
