import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroMolecule from "@/components/HeroMolecule";
import { asset } from "@/lib/site";

const topics = [
  ["Molecular mechanisms", "Iron binding, cell signaling, differentiation, and epigenetic regulation.", "/science"],
  ["Cancer biology", "Proliferation, apoptosis, and tumor development in experimental models.", "/about#oncology"],
  ["Clinical investigations", "Human studies, study design, and the limits of the available evidence.", "/about#clinical"],
  ["Immunology", "Natural killer cell activity and experimental immune responses.", "/about#immunity"],
  ["Metabolism & mineral biology", "Glucose metabolism, mineral crystallization, and cardiovascular research.", "/benefits"],
  ["Neuroscience", "Oxidative stress and neuroprotection in preclinical models.", "/benefits#neuroscience"],
];
const chapters: [string, string, string, string][] = [
  ["What IP6 is", "A phosphate-rich molecule found in cereal grains, legumes, and seeds, and present in human cells.", "/science", "Read the molecular science"],
  ["How it is studied", "Cell cultures, animal experiments, and human studies each answer a different kind of question.", "/faq", "Learn how to read a study"],
  ["What has been reported", "Findings across cancer biology, immunology, metabolism, and neuroscience, with their limits.", "/benefits", "Browse the research areas"],
  ["Where the research began", "Experiments started at the University of Maryland School of Medicine in 1985.", "/scientist", "Meet the scientist"],
];
const papers = [
  {
    pmid: "20152024", type: "Human study", year: "2010",
    title: "IP6 + inositol during breast cancer chemotherapy",
    citation: "Bacic I, et al. Journal of Experimental & Clinical Cancer Research. 2010;29:12.",
    design: "Randomized, placebo-controlled pilot study; 14 participants.",
    summary: "The investigators reported differences in quality of life, functional status, and blood-count outcomes during chemotherapy. The small sample limits the conclusions.",
    doi: "10.1186/1756-9966-29-12", fullText: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2829500/",
  },
  {
    pmid: "20127021", type: "Cell study", year: "2010",
    title: "Proliferation and apoptosis in colorectal cancer cell lines",
    citation: "Schroterova L, et al. Oncology Reports. 2010;23(3):787-793.",
    design: "Human colorectal carcinoma cell lines: HT-29, SW-480, and SW-620.",
    summary: "IP6 and inositol were studied individually and in combination. Effects varied with concentration and cell line; inositol enhanced apoptosis-related activity with IP6 in the tested models.",
    doi: "", fullText: "",
  },
  {
    pmid: "2752519", type: "Animal study", year: "1989",
    title: "Inositol phosphates and tumor formation in CD-1 mice",
    citation: "Shamsuddin AM, Ullah A, Chakravarthy AK. Carcinogenesis. 1989;10(8):1461-1463.",
    design: "Experimental study in CD-1 mice.",
    summary: "An early University of Maryland investigation of inositol and IP6 in cell proliferation and tumor formation. Animal experiments provide biological evidence; they do not establish efficacy in people.",
    doi: "10.1093/carcin/10.8.1461", fullText: "",
  },
];

export default function HomePage() {
  return <div className="research-home">
    <section className="research-hero" aria-labelledby="home-title">
      <div className="hero-animation"><HeroMolecule/></div>
      <div className="research-introduction wrap">
        <div className="introduction-copy">
          <p className="eyebrow">Molecular science. Published evidence.</p>
          <h1 id="home-title">IP6 <span>&amp; inositol.</span></h1>
          <p className="introduction-lede">Molecular mechanisms, experimental findings, and human studies. Explore the science of IP6 and inositol.</p>
        </div>

        <div className="hero-overview">
          <a className="button hero-research-link" href="#papers">Explore the research <ArrowRight size={18}/></a>
        </div>
      </div>
      <div className="hero-foundation wrap"><span>IP6 research since 1985</span><div className="hero-figure-caption"><p><strong>Figure 1.</strong> Inositol hexaphosphate, C<sub>6</sub>H<sub>18</sub>O<sub>24</sub>P<sub>6</sub>: six phosphate groups bonded to a six-carbon inositol ring.</p><div className="atom-key" aria-label="Atom colors"><span><i className="carbon"/>Carbon</span><span><i className="hydrogen"/>Hydrogen</span><span><i className="oxygen"/>Oxygen</span><span><i className="phosphorus"/>Phosphorus</span></div></div></div>
    </section>
    <nav className="research-jump-nav wrap" aria-label="Research collection"><a href="#guide">Start here</a><a href="#topics">Research topics</a><a href="#papers">Selected papers</a><a href="#background">Key terms</a></nav>

    <section className="study-guide wrap" id="guide" aria-labelledby="guide-title">
      <div className="study-guide-intro"><h2 id="guide-title">A guided introduction</h2><p>New to the subject? Read these four chapters in order. Each one opens a page of the collection.</p></div>
      <ol className="study-chapters">{chapters.map(([title, description, href, action]) => <li key={title}><h3><Link href={href}>{title}</Link></h3><p>{description}</p><Link href={href} className="chapter-link">{action} <ArrowRight size={15}/></Link></li>)}</ol>
    </section>

    <div className="wrap research-reading-grid">
      <div className="research-main-column">
        <section className="topic-index" id="topics" aria-labelledby="topics-title">
          <div className="index-heading"><h2 id="topics-title">Research topics</h2><Link href="/benefits">All topics <ArrowRight size={16}/></Link></div>
          <div className="topic-list">{topics.map(([title, description, href]) => <Link href={href} className="topic-entry" key={title}><div><h3>{title}</h3><p>{description}</p></div><ArrowRight size={18}/></Link>)}</div>
        </section>
        <section className="primary-literature" id="papers" aria-labelledby="papers-title">
          <div className="index-heading"><h2 id="papers-title">Selected primary literature</h2></div>
          <p className="section-description">Studies from the research collection. Publication dates refer to the original papers.</p>
          <div className="paper-list">{papers.map(paper => <article className="paper-record" key={paper.pmid}>
            <div className="paper-classification"><span>{paper.type}</span><span>{paper.year}</span><span>PMID: {paper.pmid}</span></div>
            <h3><a href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`} target="_blank" rel="noopener noreferrer">{paper.title}</a></h3>
            <p className="paper-citation">{paper.citation}</p>
            <p className="paper-design"><strong>Study design</strong> {paper.design}</p>
            <p className="paper-summary">{paper.summary}</p>
            <div className="paper-links"><a href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`} target="_blank" rel="noopener noreferrer">PubMed abstract <ArrowUpRight size={15}/></a>{paper.fullText && <a href={paper.fullText} target="_blank" rel="noopener noreferrer">Full text <ArrowUpRight size={15}/></a>}{paper.doi && <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">DOI <ArrowUpRight size={15}/></a>}</div>
          </article>)}</div>
          <div className="literature-more"><Link href="/news">Explore the research archive <ArrowRight size={17}/></Link><a href="https://pubmed.ncbi.nlm.nih.gov/?term=inositol+hexaphosphate" target="_blank" rel="noopener noreferrer">Find further literature on PubMed <ArrowUpRight size={16}/></a></div>
        </section>
      </div>
      <aside className="research-reference-column" aria-label="Scientific context">
        <section className="reference-block" id="background"><h2>Key terms</h2>
<dl className="molecule-definitions"><div><dt>IP6</dt><dd>Inositol hexaphosphate: an inositol ring carrying six phosphate groups. Also written InsP6 or inositol hexakisphosphate.</dd></div><div><dt>Phytic acid, phytate</dt><dd>The names used for IP6 in food and nutrition research. Phytate is its salt form.</dd></div><div><dt>Inositol</dt><dd>The six-carbon ring at the center of IP6. Myo-inositol is the common form in cells.</dd></div><div><dt>In vitro, in vivo</dt><dd>In vitro means in a dish or test tube. In vivo means in a living animal or person.</dd></div></dl><Link href="/science">Molecular mechanisms <ArrowRight size={16}/></Link></section>
        <section className="reference-block"><h2>Reading the evidence</h2><p>Each kind of study answers a different question. Evidence builds from the bottom up.</p><ol className="evidence-ladder"><li><strong>Human studies</strong><span>Do effects appear in people? Sample size and design decide how much a result can show.</span></li><li><strong>Animal studies</strong><span>Does the effect occur in a living organism?</span></li><li><strong>Cell studies</strong><span>What happens at the molecular level, and by what mechanism?</span></li></ol><Link href="/faq">Research questions &amp; answers <ArrowRight size={16}/></Link></section>
        <section className="reference-block research-founder"><h2>Research origins</h2><div className="founder-reference"><img src={asset("/source/119434971.jpg")} alt="Professor AbulKalam M. Shamsuddin" width="250" height="320" loading="lazy"/><div><h3>AbulKalam M. Shamsuddin</h3><p>M.B., B.S., PhD</p></div></div><p>Shamsuddin began investigating IP6 and inositol at the University of Maryland School of Medicine in 1985.</p><Link href="/scientist">Scientific biography <ArrowRight size={16}/></Link></section>
      </aside>
    </div>
    <section className="research-contact wrap"><div><h2>Research correspondence</h2><p>For questions about a publication or the research collection.</p></div><Link href="/contact">Contact IP-6 Research <ArrowRight size={18}/></Link></section>
  </div>;
}
