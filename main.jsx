import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const launch = new Date("2026-11-19T00:00:00-05:00");

function Countdown(){
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[]);
  const d=Math.max(0, launch-now);
  const days=Math.floor(d/86400000), hrs=Math.floor(d/3600000)%24, mins=Math.floor(d/60000)%60, secs=Math.floor(d/1000)%60;
  return <div className="countdown"><div><b>{days}</b><span>DAYS</span></div><i>:</i><div><b>{String(hrs).padStart(2,"0")}</b><span>HRS</span></div><i>:</i><div><b>{String(mins).padStart(2,"0")}</b><span>MIN</span></div><i>:</i><div><b>{String(secs).padStart(2,"0")}</b><span>SEC</span></div></div>
}

const accounts=[
 {name:"ExampleAFK_01",platform:"PS5",aim:"Free Aim",session:"Bad Sport",status:"ONLINE",updated:"32 seconds ago"},
 {name:"ViceCityAFK",platform:"Xbox Series",aim:"Assisted Aim",session:"Public",status:"WORKING",updated:"2 minutes ago"},
 {name:"LeonidaLobby",platform:"PS5",aim:"Free Aim",session:"Public",status:"OFFLINE",updated:"5 minutes ago"},
];

function App(){
 const [filter,setFilter]=useState("All"), [q,setQ]=useState("");
 const rows=accounts.filter(a=>(filter==="All"||a.platform===filter)&&a.name.toLowerCase().includes(q.toLowerCase()));
 return <main>
  <div className="grain"/>
  <nav><div className="brand"><span>VI</span> COMMUNITY HUB</div><div className="navlinks"><a>HOME</a><a href="#accounts">AFK ACCOUNTS</a><a>TOOLS</a><a>GUIDES</a><button>DISCORD</button></div></nav>
  <header>
   <div className="hero-copy"><p className="eyebrow">WELCOME TO LEONIDA</p><h1>THE WAIT<br/><em>IS ALMOST</em><br/>OVER.</h1><p className="sub">Community-powered GTA resources, account listings and tools — built for the next chapter.</p><a className="cta" href="#accounts">EXPLORE ACCOUNTS <span>→</span></a></div>
   <div className="hero-art"><div className="sun"/><div className="palm p1"/><div className="palm p2"/><div className="silhouette">VI</div></div>
  </header>
  <section className="launch"><div><p className="eyebrow">GRAND THEFT AUTO VI</p><h2>NOVEMBER 19, 2026</h2><p>Official release date confirmed by Rockstar Games.</p></div><Countdown/></section>
  <section id="accounts" className="content"><div className="section-head"><div><p className="eyebrow">COMMUNITY DIRECTORY</p><h2>AFK ACCOUNTS</h2></div><span className="live">● LIVE DIRECTORY</span></div>
   <div className="controls"><input placeholder="Search account..." value={q} onChange={e=>setQ(e.target.value)}/><div className="filters">{["All","PS5","Xbox Series"].map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div></div>
   <div className="cards">{rows.map(a=><article className="card"><div className={"status "+a.status.toLowerCase()}><span/> {a.status}</div><h3>{a.name}</h3><div className="meta"><span>{a.platform}</span><span>{a.aim}</span><span>{a.session}</span></div><footer>Last checked {a.updated}<button>VIEW PROFILE →</button></footer></article>)}</div>
   <div className="notice"><b>BUILD YOUR DIRECTORY</b><span>Submit an account for community listing. Connect your backend later to make this directory fully live.</span><button>SUBMIT ACCOUNT</button></div>
  </section>
  <footer className="sitefoot"><span>VI COMMUNITY HUB</span><span>Fan-made community project • Not affiliated with Rockstar Games</span></footer>
 </main>
}
createRoot(document.getElementById("root")).render(<App/>);
