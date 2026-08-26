import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const launch = new Date("2026-11-19T00:00:00-05:00");

const seedAccounts = [
  { name: "ExampleAFK_01", platform: "PS5", aim: "Free Aim", session: "Bad Sport", status: "ONLINE", updated: "32 seconds ago" },
  { name: "ViceCityAFK", platform: "Xbox Series", aim: "Assisted Aim", session: "Public", status: "WORKING", updated: "2 minutes ago" },
  { name: "LeonidaLobby", platform: "PS5", aim: "Free Aim", session: "Public", status: "OFFLINE", updated: "5 minutes ago" },
  { name: "SunsetSessions", platform: "Xbox Series", aim: "Free Aim", session: "Bad Sport", status: "ONLINE", updated: "1 minute ago" },
  { name: "OceanDriveAFK", platform: "PS5", aim: "Assisted Aim", session: "Public", status: "ONLINE", updated: "48 seconds ago" },
  { name: "LeonidaAFK", platform: "PS5", aim: "Free Aim", session: "Bad Sport", status: "WORKING", updated: "3 minutes ago" },
];

function Countdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = Math.max(0, launch.getTime() - now.getTime());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor(remaining / 3600000) % 24;
  const minutes = Math.floor(remaining / 60000) % 60;
  const seconds = Math.floor(remaining / 1000) % 60;

  return (
    <div className="countdown" aria-label="Countdown to November 19, 2026">
      {[[days, "DAYS"], [hours, "HRS"], [minutes, "MIN"], [seconds, "SEC"]].map(([value, label], index) => (
        <React.Fragment key={label}>
          {index > 0 && <i>:</i>}
          <div><b>{String(value).padStart(index === 0 ? 1 : 2, "0")}</b><span>{label}</span></div>
        </React.Fragment>
      ))}
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [accounts, setAccounts] = useState(seedAccounts);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rows = useMemo(() => accounts.filter((account) => {
    const matchesPlatform = filter === "All" || account.platform === filter;
    const matchesSearch = account.name.toLowerCase().includes(q.toLowerCase());
    return matchesPlatform && matchesSearch;
  }), [accounts, filter, q]);

  const online = accounts.filter((a) => a.status === "ONLINE").length;

  function submitAccount(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    setAccounts((current) => [{
      name,
      platform: form.get("platform"),
      aim: form.get("aim"),
      session: form.get("session"),
      status: "WORKING",
      updated: "just now",
    }, ...current]);
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main>
      <div className="grain" />
      <nav>
        <a className="brand" href="#top"><span>VI</span> COMMUNITY HUB</a>
        <div className="navlinks">
          <a href="#top">HOME</a><a href="#accounts">AFK ACCOUNTS</a><a href="#tools">TOOLS</a><a href="#guides">GUIDES</a>
          <a className="navbutton" href="https://discord.com/" target="_blank" rel="noreferrer">DISCORD ↗</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">WELCOME TO LEONIDA</p>
          <h1>THE WAIT<br /><em>IS ALMOST</em><br />OVER.</h1>
          <p className="sub">A community-built destination for GTA resources, AFK accounts, guides and tools — designed for the next chapter.</p>
          <div className="hero-actions"><a className="cta" href="#accounts">EXPLORE ACCOUNTS <span>→</span></a><a className="ghost" href="#tools">VIEW TOOLS</a></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="sun" /><div className="palm p1" /><div className="palm p2" /><div className="cityline" /><div className="silhouette">VI</div></div>
      </section>

      <section className="launch">
        <div><p className="eyebrow">GRAND THEFT AUTO VI</p><h2>NOVEMBER 19, 2026</h2><p>THE COUNTDOWN IS ON.</p></div>
        <Countdown />
      </section>

      <section id="accounts" className="content">
        <div className="section-head"><div><p className="eyebrow">COMMUNITY DIRECTORY</p><h2>AFK ACCOUNTS</h2></div><span className="live"><b>●</b> {online} ONLINE NOW</span></div>
        <div className="controls"><label className="search"><span>⌕</span><input aria-label="Search accounts" placeholder="Search account..." value={q} onChange={(e) => setQ(e.target.value)} /></label><div className="filters">{["All", "PS5", "Xbox Series"].map((x) => <button key={x} className={filter === x ? "active" : ""} onClick={() => setFilter(x)}>{x}</button>)}</div></div>
        <div className="cards">
          {rows.map((a) => <article className="card" key={a.name}>
            <div className={`status ${a.status.toLowerCase()}`}><span /> {a.status}</div><h3>{a.name}</h3>
            <div className="meta"><span>{a.platform}</span><span>{a.aim}</span><span>{a.session}</span></div>
            <footer><small>Last checked {a.updated}</small><button onClick={() => alert(`${a.name}\n${a.platform} • ${a.aim} • ${a.session}\nStatus: ${a.status}`)}>VIEW PROFILE →</button></footer>
          </article>)}
        </div>
        {rows.length === 0 && <div className="empty">No accounts match your search.</div>}
        <div className="notice"><div><b>BUILD THE DIRECTORY</b><span>Have an account you want listed? Submit it to the community directory.</span></div><button onClick={() => { setShowSubmit(true); setSubmitted(false); }}>SUBMIT ACCOUNT →</button></div>
      </section>

      <section id="tools" className="feature-strip"><div><p className="eyebrow">COMING NEXT</p><h2>COMMUNITY TOOLS</h2><p>Account utilities, GTA resources and more — all in one place.</p></div><div className="feature-grid"><article><strong>01</strong><h3>STATUS TRACKER</h3><p>Track community-listed accounts and their latest status.</p></article><article><strong>02</strong><h3>RESOURCE HUB</h3><p>Organize guides, tips and useful community links.</p></article><article id="guides"><strong>03</strong><h3>GUIDES</h3><p>Build a growing library for the GTA community.</p></article></div></section>

      <footer className="sitefoot"><span>VI COMMUNITY HUB</span><span>Fan-made community project • Not affiliated with Rockstar Games</span></footer>

      {showSubmit && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowSubmit(false)}><div className="modal">
        <button className="close" onClick={() => setShowSubmit(false)}>×</button>
        {!submitted ? <><p className="eyebrow">COMMUNITY SUBMISSION</p><h2>SUBMIT AN ACCOUNT</h2><p className="modal-copy">This demo adds the submission locally. Supabase can be connected next for permanent listings and moderation.</p>
          <form onSubmit={submitAccount}><input name="name" placeholder="Account / Gamertag" required /><select name="platform"><option>PS5</option><option>Xbox Series</option></select><select name="aim"><option>Free Aim</option><option>Assisted Aim</option></select><select name="session"><option>Public</option><option>Bad Sport</option></select><button className="cta submit" type="submit">SUBMIT LISTING →</button></form>
        </> : <div className="success"><div>✓</div><h2>LISTING ADDED</h2><p>Your demo listing is now visible in the directory.</p><button className="cta" onClick={() => setShowSubmit(false)}>DONE</button></div>}
      </div></div>}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
