import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import {SITE_ORIGIN,og,organization,jsonLd} from "@/lib/seo";
const iconBase=process.env.NEXT_PUBLIC_BASE_PATH ?? "/IP-6";
export const metadata: Metadata = {
 metadataBase:new URL(SITE_ORIGIN),
 title:{default:"IP-6 Research | Advancing the science of IP6 & Inositol",template:"%s | IP-6 Research"},
 description:"Explore the research in inositol hexaphosphate and inositol, from molecular mechanisms and experimental studies to early clinical evidence. IP-6 Research, Inc., Lutherville, Maryland.",
 icons:{icon:[{url:`${iconBase}/ip6-icon.svg`,type:"image/svg+xml"},{url:`${iconBase}/ip6-icon-32.png`,type:"image/png",sizes:"32x32"}],shortcut:`${iconBase}/favicon.ico`,apple:[{url:`${iconBase}/apple-touch-icon.png`,sizes:"180x180",type:"image/png"}]},
 alternates:{canonical:"/"},
 openGraph:og("/"),
 twitter:{card:"summary"},
 robots:{index:true,follow:true}
};
const site={"@graph":[organization,{"@type":"WebSite","@id":`${SITE_ORIGIN}/#website`,url:`${SITE_ORIGIN}/`,name:"IP-6 Research",description:"Research on inositol hexaphosphate (IP6) and inositol.",inLanguage:"en",publisher:{"@id":`${SITE_ORIGIN}/#organization`}}]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(site)}/><a className="skip-link" href="#main-content">Skip to content</a><Navbar/><main id="main-content">{children}</main><Footer/></body></html>}
