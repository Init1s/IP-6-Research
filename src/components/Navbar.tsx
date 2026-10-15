"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {asset} from "@/lib/site";
import {usePathname} from "next/navigation";
import {ArrowUpRight,Menu,X} from "lucide-react";
const links=[["About Us","/about"],["The Science","/science"],["Research Areas","/benefits"],["Our Scientist","/scientist"],["Insights","/news"],["FAQ","/faq"]];
export default function Navbar(){
 const [open,setOpen]=useState(false);const pathname=usePathname();
 useEffect(()=>{setOpen(false)},[pathname]);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);document.getElementById("menu-toggle")?.focus()}};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[open]);
 return <header className="site-header"><div className="wrap header-inner"><Link href="/" className="brand" aria-label="IP-6 Research home"><img className="brand-logo" src={asset("/images/ip6-brand-logo.png")} alt="" width="90" height="60"/><span className="brand-wordmark"><strong>IP-6 Research</strong></span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</nav><Link className="header-contact" href="/contact">Get in touch <ArrowUpRight size={16}/></Link><button id="menu-toggle" className="menu-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button></div>{open&&<nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[["Home","/"],...links,["Get in touch","/contact"]].map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</nav>}</header>;
}