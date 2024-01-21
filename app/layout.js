import { Inter } from "next/font/google";
import "../styles/main.scss";
import Navbar from "@/components/Navbar";
import CustomSessionProvider from "@/components/SessionProvider";
// import CookieConsent from "@/components/CookieConsent";
// import NextTopLoader from "nextjs-toploader";
// import Providers from "./providers";

// const inter = Inter({ subsets: ["latin"] });

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
      <body>
        {/* <body className={inter.className}> */}
        {/* <NextTopLoader color="#7F00FF" /> */}
        <CustomSessionProvider>
          <Navbar children={children} />
          {/* <CookieConsent /> */}
        </CustomSessionProvider>
      </body>
    </html>
  );
}
