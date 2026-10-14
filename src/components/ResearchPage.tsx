import Link from "next/link";
import ArticleContents from "@/components/ArticleContents";
import {ArrowUpRight,FileText} from "lucide-react";
import {asset} from "@/lib/site";
import inventory from "../../content/source/inventory.json";
export type Section={id:string;title:string;label?:string;paragraphs:string[];refs?:string[]};
export function PageHero({eyebrow,title,description,dark=false}:{eyebrow:string;title:string;description:string;dark?:boolean}){return <section className={`page-hero ${dark?"dark":""}`}><div className="wrap"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div><p className="eyebrow">{eyebrow}</p><h1>{title.replace(/IP-6/g,"IP\u20116")}</h1><p className="lede">{description}</p></div></section>}
export function EvidenceNote(){return <aside className="evidence-note"><strong>Understanding the evidence</strong>Much of this research comes from cell cultures and animal models. Early clinical observations can guide further investigation, but do not establish disease prevention or treatment. Follow each reference for the study design and its limitations.</aside>}
export function Sections({sections}:{sections:Section[]}){return <>{sections.map(s=><section className="article-section" id={s.id} key={s.id}>{s.label&&<span className="tag">{s.label}</span>}<h2>{s.title}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{s.refs&&<div className="inline-refs">{s.refs.map(id=><a key={id} href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`} target="_blank" rel="noopener noreferrer">PubMed · {id} ↗</a>)}</div>}</section>)}</>}
export function ArticleNav({sections,extra=[]}:{sections:Section[];extra?:[string,string][]}){
 return <ArticleContents links={[...sections.map(s=>({id:s.id,title:s.title})),...extra.map(([id,title])=>({id,title})),{id:"references",title:"Sources & references"}]}/>;
}
const labels:Record<string,string>={
"20191364":"Low-phytate crops and genetic engineering","20335626":"Low-phytate maize, zinc, and infant growth","22093370":"Low-phytic-acid crop research",
"9891450":"IP6 in experimental human liver cancer","16124063":"IP6 and natural killer cell activity","20127021":"IP6 and inositol in colorectal carcinoma cell lines",
"18255213":"Neuroprotection in a Parkinson’s disease cell model","20930278":"IP6 in experimental Alzheimer’s disease models","40429940":"IP6, iron, dopamine oxidation, and alpha-synuclein aggregation (2025)","17127264":"Phytate and kidney stone formation",
"18508720":"Phytate and cardiovascular calcification","10625941":"IP6 and platelet aggregation","1929656":"IP6 and myocardial reperfusion injury",
"18941459":"IP6 and proteasome inhibition in prostate cancer cells","12028025":"IP6 in human myeloid leukemia cells","12837755":"IP6 and insulin secretion in pancreatic cells",
"15999878":"Dietary phytic acid and blood glucose in rats","20664725":"IP6 and glucose metabolism in mice","16373499":"Inositol and experimental diabetic complications",
"17627956":"IP6 binding of uranium","16206557":"Citric acid and phytate phosphorus utilization in poultry","15779219":"Phytate and dental erosion",
"22905230":"IP6 and bone cell research","19053869":"Dietary phytate and bone mineral density","22614760":"Phytate and bone outcomes in postmenopausal women",
"16356133":"Antioxidants and oxidative DNA damage","12846414":"IP6 with adriamycin and tamoxifen in breast cancer cells","19887199":"IP6 and pterostilbene in melanoma cells",
"1655041":"Inositol phosphates and neutrophil activity","9042302":"IP6 and differentiation of breast cancer cells","21077672":"IP6 interactions with FGF1",
"21154115":"Epigenetic regulation in a mouse lung model","7812349":"Research on colon cancer screening","8033605":"Colon cancer screening research in China",
"7805025":"Gal-GalNAc as a cancer-associated marker","8762480":"Lung cancer screening research","15197795":"Breast cancer marker research",
"7767964":"IP6 and inositol in experimental colon cancer","2766453":"IP6, inositol, and natural killer cells",
};
export type ExtraReference={title:string;url:string;type:string};
export function References({source,extra=[]}:{source:string;extra?:ExtraReference[]}){
 const page=inventory.pages.find(p=>p.path===source);
 const refs=new Map<string,{title:string;url:string;type:string}>();
 for(const r of extra)refs.set(r.url,r);
 for(const link of page?.links||[]){const u=new URL(link.url);const pm=u.pathname.match(/\/pubmed\/(\d+)/);const pmc=u.pathname.match(/(PMC\d+)/);
 if(pm){const id=pm[1];refs.set(id,{title:labels[id]||`Research publication ${id}`,url:`https://pubmed.ncbi.nlm.nih.gov/${id}/`,type:`PubMed · PMID ${id}`})}
 else if(pmc){refs.set(pmc[1],{title:`Full-text research article · ${pmc[1]}`,url:`https://pmc.ncbi.nlm.nih.gov/articles/${pmc[1]}/`,type:"PubMed Central"})}
 else if(u.hostname.includes("ncbi.nlm.nih.gov")&&u.searchParams.has("term")){const term=u.searchParams.get("term")!;refs.set(term,{title:term,url:`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(term)}`,type:"PubMed literature search"})}
 else if(["www.nejm.org","www.jbc.org","carcin.oxfordjournals.org","clincancerres.aacrjournals.org","www.medical-hypotheses.com"].includes(u.hostname)){refs.set(link.url,{title:link.label.replace(/&[^;]+;/g," ").replace(/^["\[]|["\]]$/g,""),url:link.url.replace(/^http:/,"https:"),type:"Original journal reference"})}
 }
 return <section className="reference-section" id="references"><h2>Sources & references</h2><p className="muted" style={{fontSize:".9rem",marginBottom:20}}>{extra.length?"Explore the publications cited in the original IP-6 Research collection, together with more recent research added to this page. ":"Explore the publications cited in the original IP-6 Research collection. "}Some older journal links may redirect or require access through a library.</p>{Array.from(refs.values()).map(r=><a className="reference-item" key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"><span>{r.title}<small>{r.type}</small></span><ArrowUpRight size={17}/></a>)}</section>
}
export function Documents({items}:{items:[string,string,string][]}){return <div className="documents">{items.map(([name,title,detail])=><a className="document-link" href={asset(`/source/${name}`)} key={name} target="_blank" rel="noopener noreferrer"><span>{title}<small>{detail} · PDF</small></span><FileText size={22}/></a>)}</div>}
export function Figures({items}:{items:[string,string][]}){return <details className="source-gallery" id="figures"><summary>Explore original research figures ({items.length})</summary><p>Historical figures preserved from ip-6.net. Read alongside the original publications for methods, experimental conditions, and interpretation. Select an image to view it at its original resolution.</p><div className="figures">{items.map(([name,caption])=><figure key={name}><a href={asset(`/source/${name}`)} target="_blank" rel="noopener noreferrer"><img src={asset(`/source/${name}`)} alt={caption} loading="lazy"/></a><figcaption>{caption}</figcaption></figure>)}</div></details>}
