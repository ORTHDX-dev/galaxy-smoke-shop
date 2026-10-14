import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import './style.css';
import site from '../content/site.json';
import home from '../content/home.json';
import products from '../content/products.json';
import theme from '../content/theme.json';

const FILES={'content/site.json':site,'content/home.json':home,'content/products.json':products,'content/theme.json':theme};
const safeUrl=(u)=>/^(https?:|mailto:|tel:|\/|#)/i.test(String(u||''))?u:'#';
const spot=(file,path)=>({'data-spot':`${file}#${path}`});
const money=(p)=>p===''||p==null?'':`$${Number(p).toFixed(2)}`;
function App(){
 const [age,setAge]=useState(()=>sessionStorage.getItem('galaxy-age')==='yes');
 const [draft,setDraft]=useState(FILES); const s=draft['content/site.json'],h=draft['content/home.json'],p=draft['content/products.json'],t=draft['content/theme.json'];
 useEffect(()=>{document.documentElement.style.setProperty('--brand',t.brand||'#d8ff62');document.documentElement.style.setProperty('--brand-text',t.brandText||'#0a0b0d');document.documentElement.style.setProperty('--radius',`${Number(t.radius)||0}px`)},[t]);
 useEffect(()=>{if(!new URLSearchParams(location.search).has('orthdx-preview')||window.parent===window)return;const origin=/^https:\/\/(orthdx-os\.vercel\.app|orthdx-[\\w-]+-orthdx\.vercel\.app)$/;const at=(obj,path)=>String(path||'').split('.').filter(Boolean).reduce((o,x)=>o?.[x],obj);const on=(e)=>{if(!origin.test(e.origin)||e.data?.type!=='orthdx:draft')return;const next=structuredClone(FILES);for(const patch of e.data.patches||[]){const doc=next[patch.file],node=doc&&(patch.path?at(doc,patch.path):doc);if(!node||typeof node!=='object')continue;if(patch.values)Object.assign(node,patch.values);if(Array.isArray(node)&&Array.isArray(patch.add))node.push(...patch.add)}setDraft(next);};window.addEventListener('message',on);window.parent.postMessage({type:'orthdx:ready'},'*');return()=>window.removeEventListener('message',on)},[]);
 const reveal={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.7,ease:[.2,.8,.2,1]}}}; const categories=h.categories||[]; const visible=(p.items||[]).filter(x=>x.visibility!=='hidden'); const accept=()=>{sessionStorage.setItem('galaxy-age','yes');setAge(true)};
 return <div className="site">
  {!age&&<div className="age" role="dialog" aria-modal="true"><div className="age-mark">✦</div><h2>Are you 21 or older?</h2><p>This site contains tobacco, nicotine, and smoke-shop product information. Please enter only if you are of legal age.</p><button className="btn primary" onClick={accept}>Yes, I am 21+</button></div>}
  <header className="nav"><a className="wordmark" href="#top" {...spot('content/site.json','business')}><span className="orbit">✦</span>{s.business.name}</a><nav><a href="#shelf">Shelf</a><a href="#visit">Visit</a><a className="nav-call" href={`tel:${s.business.phone}`}>Call</a></nav></header>
  <main id="top">
   <section className="hero" {...spot('content/home.json','hero')}><div className="orb orb-a"/><div className="orb orb-b"/><motion.div className="hero-copy" variants={reveal} initial="hidden" animate="show"><p className="age-line">21+ only · Hanover Park</p><h1>{h.hero.heading}</h1><p className="lede">{h.hero.subheading}</p><div className="hero-actions"><a className="btn primary" href={safeUrl(h.hero.primary.url)} {...spot('content/home.json','hero.primary')}>{h.hero.primary.label}</a><a className="text-link" href={`tel:${s.business.phone}`}>{s.business.phone}</a></div></motion.div><div className="hero-rail"><span>2000 Irving Park Rd</span><span>Open daily</span></div></section>
   <section className="intro"><motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}><p className="section-no">01</p><h2>What you came for, without the hunt.</h2></motion.div><div className="intro-note"><p>Vapes, glass, smoking accessories, and hookah supplies at the Hanover Park counter.</p><a href="#shelf" className="text-link">See shelf examples ↗</a></div></section>
   <section className="categories"><div className="category-head"><p className="section-no">02</p><h2>On the shelves</h2></div><div className="category-list">{categories.map((c,i)=><motion.a href="#shelf" className="category" key={c.id} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:i*.08}}><span className="category-num">0{i+1}</span><span><strong>{c.name}</strong><small>{c.description}</small></span><span className="arrow">↗</span></motion.a>)}</div></section>
   <section className="shelf" id="shelf"><div className="category-head"><p className="section-no">03</p><h2>Today's shelf examples</h2><p className="section-note">Prices and availability may vary by location.</p></div><div className="product-list">{visible.map((item,i)=><motion.div className="product" key={item.id} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:i*.06}} {...spot('content/products.json',`items[id=${item.id}]`)}><div><span className="product-cat">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div><strong>{money(item.price)}</strong></motion.div>)}</div></section>
   <section className="visit" id="visit" {...spot('content/site.json','business')}><div><p className="section-no">04</p><h2>Visit Hanover Park</h2><p className="address">{s.business.address}</p><p className="hours">{s.business.hours}<br/>{s.business.lateHours}</p></div><div className="visit-actions"><a className="btn primary" href={safeUrl(s.business.mapsUrl)}>Get directions</a><a className="text-link" href={`tel:${s.business.phone}`}>Call {s.business.phone}</a></div></section>
   <section className="cta" {...spot('content/home.json','cta')}><div><p className="section-no">05</p><h2>{h.cta.heading}</h2></div><a className="btn secondary" href={safeUrl(h.cta.button.url)} {...spot('content/home.json','cta.button')}>{h.cta.button.label}</a></section>
  </main>
  <footer className="footer"><div><span className="wordmark"><span className="orbit">✦</span>{s.business.name}</span><p>21+ only. Valid ID required.</p></div><div className="footer-right"><span>{s.business.address}</span><a href={`mailto:${s.business.email}`}>{s.business.email}</a><a href={safeUrl(s.footer.contact.url)} {...spot('content/site.json','footer.contact')}>{s.footer.contact.label} ↗</a></div></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
