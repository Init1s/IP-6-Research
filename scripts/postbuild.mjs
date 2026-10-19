import fs from 'node:fs/promises';
const base=process.env.SITE_TARGET === 'sites' ? '' : (process.env.NEXT_PUBLIC_BASE_PATH ?? '/IP-6');
// Canonical links and the sitemap always name the public site, whichever host serves this copy.
const origin='https://www.ip-6.net';
const legacy={'about-us.html':'about','other-benefits.html':'benefits','what-s-new-.html':'news','The_Science.html':'science','the-scientist.html':'scientist','faq.html':'faq','contact-us.html':'contact'};
for(const [old,route] of Object.entries(legacy)){
 const target=`${base}/${route}/`;
 await fs.writeFile(`out/${old}`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${origin}/${route}/"><title>Page moved | IP-6 Research</title></head><body><p>This page has moved. <a href="${target}">Continue to IP-6 Research</a>.</p></body></html>`);
}
await fs.writeFile('out/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Prepared ${Object.keys(legacy).length} legacy page redirects and deployment-specific robots.txt.`);
