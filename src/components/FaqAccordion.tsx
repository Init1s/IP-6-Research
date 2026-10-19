"use client";
import * as Accordion from "@radix-ui/react-accordion";
import {Plus} from "lucide-react";
import {faqs} from "@/lib/faqs";
export default function FaqAccordion(){return <Accordion.Root type="single" collapsible>{faqs.map((f,i)=><Accordion.Item key={f.q} value={`faq-${i}`} className="faq-item"><Accordion.Header><Accordion.Trigger className="faq-trigger">{f.q}<Plus size={23}/></Accordion.Trigger></Accordion.Header><Accordion.Content className="faq-answer">{f.a.map(p=><p key={p}>{p}</p>)}{f.links.length>0&&<div className="inline-refs" style={{marginTop:22}}>{f.links.map(([title,href])=><a href={href} key={href} target="_blank" rel="noopener noreferrer">{title} ↗</a>)}</div>}</Accordion.Content></Accordion.Item>)}</Accordion.Root>}