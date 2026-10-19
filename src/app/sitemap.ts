import type {MetadataRoute} from "next";
import {SITE_ORIGIN} from "@/lib/seo";
export default function sitemap():MetadataRoute.Sitemap{const origin=SITE_ORIGIN;return ["","about","science","benefits","scientist","news","faq","contact"].map(path=>({url:`${origin}/${path?path+"/":""}`,changeFrequency:"monthly",priority:path?0.7:1,lastModified:new Date()}))}