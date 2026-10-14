import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
const iconBase=process.env.NEXT_PUBLIC_BASE_PATH ?? "/IP-6";
export const metadata: Metadata = {
 metadataBase:new URL(process.env.SITE_URL || "https://taandrews.github.io/IP-6/"),
 title:{default:"IP-6 Research | Advancing the science of IP6 & Inositol",template:"%s | IP-6 Research"},
 description:"Explore the research in inositol hexaphosphate and inositol, from molecular mechanisms and experimental studies to early clinical evidence. IP-6 Research, Inc., Lutherville, Maryland.",
 icons:{icon:[{url:`${iconBase}/ip6-icon.svg`,type:"image/svg+xml"},{url:`${iconBase}/ip6-icon-32.png`,type:"image/png",sizes:"32x32"}],shortcut:`${iconBase}/favicon.ico`,apple:[{url:`${iconBase}/apple-touch-icon.png`,sizes:"180x180",type:"image/png"}]}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Navbar/><main id="main-content">{children}</main><Footer/></body></html>}
