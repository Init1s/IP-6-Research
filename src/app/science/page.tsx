import type {Metadata} from "next";
import {og} from "@/lib/seo";
import {PageHero,ArticleNav,Sections,References,Figures,EvidenceNote} from "@/components/ResearchPage";
import data from "../../../content/research.json";
export const metadata:Metadata={title:"The science",description:"Investigate the molecular mechanisms of IP6 and inositol: antioxidant chemistry, cell differentiation, signaling, angiogenesis, and epigenetics.",alternates:{canonical:"/science/"},openGraph:og("/science/")};
export default function Science(){return <><PageHero dark eyebrow="The science" title="The molecular science of IP6." description="Explore the mechanisms studied in IP6 and inositol research, from iron-binding chemistry to the regulation of cellular behavior."/><div className="wrap article-layout"><ArticleNav sections={data.science} extra={[["figures","Research figures"]]}/><div><EvidenceNote/><Sections sections={data.science}/><a className="button" href="https://pubmed.ncbi.nlm.nih.gov/?term=inositol+hexaphosphate" target="_blank" rel="noopener noreferrer" style={{marginBottom:40}}>Explore IP6 on PubMed ↗</a><Figures items={[
["41621582_scaled_352x256.jpg","Antioxidant chemistry figure from the original Science page."],
["41488084_scaled_384x288.jpg","Conceptual illustration of cancer cell growth inhibition, from the original Science page."],
["41488085_scaled_384x288.jpg","Conceptual illustration of differentiation of malignant cells, from the original Science page."],
["41521094_scaled_384x288.jpg","Breast cancer cell experiment, including lactalbumin measurements."],
["41526241_scaled_383x230.jpg","Overview of biological mechanisms in the original research collection."],
["41489178_scaled_384x288.jpg","Cell signaling illustration from the original Science page."],
["41488312_scaled_512x384.jpg","Molecular pathways figure from the original Science page."]
]}/><References source="The_Science.html"/></div></div></>}