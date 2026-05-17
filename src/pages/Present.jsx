import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Slide definitions ────────────────────────────────────────
const SLIDES = [
  { id: "title",        type: "title",        duration: 60,  label: "Opening" },
  { id: "problem",      type: "problem",      duration: 90,  label: "The Problem" },
  { id: "stat",         type: "bigstat",      duration: 60,  label: "Market Size" },
  { id: "solution",     type: "solution",     duration: 90,  label: "The Solution" },
  { id: "how",          type: "howitworks",   duration: 90,  label: "How It Works" },
  { id: "demo_home",    type: "demo",         duration: 60,  label: "Demo: Home" },
  { id: "demo_learn",   type: "demo2",        duration: 60,  label: "Demo: Learn" },
  { id: "demo_trade",   type: "demo3",        duration: 60,  label: "Demo: Markets" },
  { id: "ai",           type: "aiconvo",      duration: 90,  label: "AI Tutor" },
  { id: "gamification", type: "gamification", duration: 90,  label: "Gamification" },
  { id: "traction",     type: "traction",     duration: 60,  label: "Why Now" },
  { id: "biz",          type: "bizmodel",     duration: 60,  label: "Business Model" },
  { id: "vision",       type: "vision",       duration: 60,  label: "Vision" },
  { id: "cta",          type: "cta",          duration: 60,  label: "The Ask" },
];
const TOTAL_SECONDS = SLIDES.reduce((s, sl) => s + sl.duration, 0);

// ─── Design tokens (light mode) ───────────────────────────────
const G = "#00C96B";          // brand green (slightly deeper for light bg)
const BG = "#f8f9fb";         // slide background
const CARD = "#ffffff";       // card background
const BORDER = "#e4e7ec";     // card border
const TEXT = "#0f172a";       // primary text
const MUTED = "#64748b";      // secondary text
const MUTED2 = "#94a3b8";     // tertiary

// ─── Shared helpers ───────────────────────────────────────────
const Chip = ({ children }) => (
  <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border mb-4"
    style={{ color: G, borderColor: `${G}50`, background: `${G}15` }}>
    {children}
  </span>
);
const H = ({ children, className = "" }) => (
  <h2 className={`text-6xl font-black leading-tight mb-4 ${className}`} style={{ color: TEXT }}>{children}</h2>
);
const Card = ({ children, className = "", style = {} }) => (
  <div className={`rounded-3xl border ${className}`}
    style={{ background: CARD, borderColor: BORDER, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", ...style }}>
    {children}
  </div>
);

// ─── Phone mockup ─────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div className="relative shrink-0" style={{ width: 240, height: 490 }}>
      <div className="absolute inset-0 rounded-[38px] overflow-hidden shadow-2xl"
        style={{ border: "5px solid #cbd5e1", background: "#0d0f1e" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" />
        <div className="pt-5 h-full overflow-hidden">{children}</div>
      </div>
      <div className="absolute right-[-7px] top-20 w-1.5 h-10 bg-slate-300 rounded-full" />
      <div className="absolute left-[-7px] top-16 w-1.5 h-8 bg-slate-300 rounded-full" />
      <div className="absolute left-[-7px] top-28 w-1.5 h-8 bg-slate-300 rounded-full" />
    </div>
  );
}

// ─── Screen mocks (phone screens stay dark — it's the app) ────
function HomeMock() {
  return (
    <div className="px-3 py-2 space-y-2 text-white h-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div><p className="text-[9px] text-white/40">Good morning 👋</p><p className="text-sm font-black">Alex</p></div>
        <div className="flex items-center gap-1 bg-orange-500/20 rounded-full px-2 py-0.5">
          <span className="text-sm">🔥</span><span className="text-xs font-black text-orange-400">14</span>
        </div>
      </div>
      <div className="bg-white/5 rounded-2xl p-2.5 flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
          <circle cx="22" cy="22" r="18" fill="none" stroke="#00FF87" strokeWidth="4"
            strokeDasharray="113" strokeDashoffset="40" strokeLinecap="round" transform="rotate(-90 22 22)"/>
          <text x="22" y="26" textAnchor="middle" fontSize="9" fill="white" fontWeight="900">65%</text>
        </svg>
        <div><p className="text-[9px] text-white/40">Daily Goal</p><p className="text-xs font-black">13 / 20 XP</p></div>
      </div>
      <div className="bg-[#00FF87]/10 border border-[#00FF87]/20 rounded-2xl p-2.5">
        <p className="text-[8px] font-black text-[#00FF87]">CONTINUE</p>
        <p className="text-[11px] font-black mt-0.5">What Is a P/E Ratio?</p>
        <div className="w-full bg-white/10 rounded-full h-1 mt-1.5"><div className="h-1 rounded-full w-2/3 bg-[#00FF87]"/></div>
      </div>
      <div className="space-y-1">
        {[{e:"⚡",t:"Complete a lesson",d:"15 XP",done:true},{e:"📈",t:"Make a trade",d:"10 XP",done:false}].map((m,i)=>(
          <div key={i} className={`flex items-center gap-2 rounded-xl p-2 ${m.done?"bg-[#00FF87]/10":"bg-white/5"}`}>
            <span className="text-sm">{m.e}</span>
            <span className="text-[9px] flex-1 font-medium">{m.t}</span>
            <span className={`text-[8px] font-bold ${m.done?"text-[#00FF87]":"text-white/30"}`}>{m.d}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {[["SPX","5,248","+0.6%",true],["NDX","18,290","+1.1%",true],["FTSE","8,312","-0.2%",false]].map(([t,v,c,up])=>(
          <div key={t} className="flex-1 bg-white/5 rounded-xl p-1.5">
            <p className="text-[7px] text-white/30">{t}</p>
            <p className="text-[9px] font-black">{v}</p>
            <p className={`text-[7px] font-bold ${up?"text-green-400":"text-red-400"}`}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function LearnMock() {
  return (
    <div className="px-3 py-2 text-white">
      <p className="text-[9px] text-white/40 mb-3 font-bold tracking-widest">UNIT 1 · THE FOUNDATION</p>
      <div className="flex flex-col items-center gap-2">
        {[{s:"complete",l:"1.1",t:"What Is a Stock?"},{s:"complete",l:"1.2",t:"The Market"},{s:"active",l:"1.3",t:"Bulls & Bears"},{s:"locked",l:"1.4",t:"Supply & Demand"},{s:"locked",l:"1.5",t:"Reading Tickers"}].map((node,i)=>{
          const aligns=["center","flex-end","flex-start","flex-end","center"];
          return (
            <div key={i} className="w-full flex" style={{justifyContent:aligns[i]}}>
              <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 ${
                node.s==="complete"?"bg-[#00FF87]/20 border border-[#00FF87]/40":
                node.s==="locked"?"bg-white/5 border border-white/10":""
              }`} style={node.s==="active"?{background:"#00FF87"}:{}}>
                <span className="text-base">{node.s==="complete"?"✅":node.s==="active"?"⚡":"🔒"}</span>
                <div>
                  <p className={`text-[10px] font-black ${node.s==="active"?"text-black":"text-white"}`}>{node.t}</p>
                  <p className={`text-[8px] ${node.s==="active"?"text-black/50":"text-white/30"}`}>{node.l}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function TradeMock() {
  return (
    <div className="px-3 py-2 text-white space-y-2">
      <div className="bg-white/5 rounded-2xl p-2.5">
        <p className="text-[8px] text-white/30">PORTFOLIO VALUE</p>
        <p className="text-xl font-black">$12,847</p>
        <p className="text-[9px] font-bold text-green-400">▲ +$2,847 (+28.47%)</p>
      </div>
      <div className="flex gap-1.5">
        {[["AAPL","+1.2%",true],["NVDA","+3.4%",true],["TSLA","-1.8%",false]].map(([t,c,up])=>(
          <div key={t} className="flex-1 bg-white/5 rounded-xl p-1.5 text-center">
            <p className="text-[9px] font-black">{t}</p>
            <p className={`text-[8px] font-bold ${up?"text-green-400":"text-red-400"}`}>{c}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[{t:"Apple",s:"AAPL",sh:"10",v:"$1,894",p:"+3.8%",up:true},{t:"NVIDIA",s:"NVDA",sh:"4",v:"$1,981",p:"+8.2%",up:true},{t:"Tesla",s:"TSLA",sh:"5",v:"$1,242",p:"-1.4%",up:false}].map((h)=>(
          <div key={h.s} className={`flex items-center gap-2 rounded-xl p-2 ${h.up?"bg-green-500/10":"bg-red-500/10"}`}>
            <div className={`w-1 self-stretch rounded-full ${h.up?"bg-green-400":"bg-red-400"}`}/>
            <div className="flex-1"><p className="text-[9px] font-black">{h.t}</p><p className="text-[7px] text-white/30">{h.sh} shares</p></div>
            <div className="text-right"><p className="text-[9px] font-black">{h.v}</p><p className={`text-[7px] font-bold ${h.up?"text-green-400":"text-red-400"}`}>{h.p}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide components ─────────────────────────────────────────
function SlideTitle() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden"
      style={{ background: "#ffffff" }}>
      {/* subtle grid */}
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(${G}18 1px,transparent 1px),linear-gradient(90deg,${G}18 1px,transparent 1px)`,
        backgroundSize:"80px 80px"
      }}/>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 60% 50% at 50% 50%, ${G}20, transparent 70%)`}}/>
      <motion.div initial={{scale:0.4,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1,type:"spring",stiffness:120}}
        className="text-8xl mb-4 relative z-10">📈</motion.div>
      <motion.h1 initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.35}}
        className="font-black leading-none relative z-10" style={{fontSize:96,letterSpacing:"-4px",color:TEXT}}>
        V<span style={{color:G}}>stock</span>
      </motion.h1>
      <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.55}}
        className="text-2xl mt-3 mb-8 relative z-10" style={{color:MUTED}}>
        The Duolingo of investing. Turn confusion into confidence.
      </motion.p>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.85}}
        className="flex items-center gap-4 relative z-10">
        <div className="h-px w-24" style={{background:`linear-gradient(90deg,transparent,${G}60)`}}/>
        <span className="text-xs font-black tracking-[0.25em] uppercase" style={{color:G}}>Investor Pitch · 2026</span>
        <div className="h-px w-24" style={{background:`linear-gradient(90deg,${G}60,transparent)`}}/>
      </motion.div>
    </div>
  );
}

function SlideProblem() {
  const problems = [
    {emoji:"😰",stat:"67%",text:"of adults feel anxious or paralysed about investing",sub:"FINRA Financial Capability Study, 2023",color:"#ef4444"},
    {emoji:"📚",stat:"83%",text:"of people never received any financial education in school",sub:"OECD Financial Literacy Survey, 2022",color:"#f97316"},
    {emoji:"💸",stat:"$4.6T",text:"sits idle in zero-interest current accounts globally",sub:"McKinsey Global Banking Report, 2024",color:"#eab308"},
    {emoji:"📉",stat:"78%",text:"of new retail investors quit within their first 90 days",sub:"Robinhood & Schwab user cohort data",color:"#ef4444"},
    {emoji:"🧠",stat:"42%",text:"of millennials can't answer basic compound interest questions",sub:"S&P Global FinLit Survey",color:"#a855f7"},
    {emoji:"🏦",stat:"£850B",text:"in UK savings earning below inflation — wealth quietly eroding",sub:"Bank of England, Q1 2025",color:"#3b82f6"},
  ];
  return (
    <div className="flex flex-col h-full px-16 justify-center gap-6" style={{background:BG}}>
      <div>
        <Chip>The Problem</Chip>
        <H>Most people are <span style={{color:"#ef4444"}}>financially frozen.</span></H>
        <p className="text-xl -mt-1 mb-0" style={{color:MUTED}}>The knowledge gap is real — and it's costing people everything.</p>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1 max-h-72">
        {problems.map((p,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.1}} className="h-full">
            <Card className="relative overflow-hidden p-5 h-full flex flex-col justify-between">
              <div className="absolute top-3 right-4 text-6xl opacity-[0.07]">{p.emoji}</div>
              <div>
                <p className="text-5xl font-black leading-none" style={{color:p.color}}>{p.stat}</p>
                <p className="text-sm mt-2 leading-snug font-medium" style={{color:TEXT}}>{p.text}</p>
              </div>
              <p className="text-[11px] mt-2" style={{color:MUTED2}}>{p.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBigStat() {
  return (
    <div className="flex h-full relative overflow-hidden" style={{background:"#ffffff"}}>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 55% 55% at 50% 50%, ${G}15, transparent 70%)`}}/>
      {/* Big number centred */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 px-8">
        <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-sm font-black tracking-widest uppercase mb-2" style={{color:G}}>Total Addressable Market</motion.p>
        <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:80}}>
          <p className="font-black leading-none" style={{fontSize:"min(22vw,180px)",color:TEXT}}>
            $4.8<span style={{color:G}}>B</span>
          </p>
        </motion.div>
        <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.5}}
          className="text-2xl mt-1 max-w-xl" style={{color:MUTED}}>
          Global financial education market —<br/><strong style={{color:TEXT}}>CAGR 18.3% through 2030</strong>
        </motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
          className="flex gap-3 mt-5">
          {[{v:"$1.2B",l:"North America",c:"#6366f1"},{v:"£420M",l:"United Kingdom",c:"#f59e0b"},{v:"€680M",l:"Europe",c:"#22c55e"}].map(({v,l,c})=>(
            <div key={l} className="rounded-2xl px-4 py-2 text-center" style={{background:CARD,border:`1px solid ${BORDER}`}}>
              <p className="text-xl font-black" style={{color:c}}>{v}</p>
              <p className="text-xs" style={{color:MUTED}}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Right stats column */}
      <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.7}}
        className="w-80 flex flex-col justify-center gap-3 pr-12 relative z-10">
        {[
          {v:"40M+",l:"Millennials in UK/US with zero investing knowledge",c:"#6366f1"},
          {v:"£850B",l:"UK retail investment opportunity currently untapped",c:"#f59e0b"},
          {v:"2.5Bn",l:"Global adults underserved by any financial education",c:"#ef4444"},
          {v:"3×",l:"Duolingo's revenue growth after adding premium tier",c:G},
          {v:"$7.7B",l:"Duolingo's market cap — our closest comparable exit",c:"#a855f7"},
          {v:"0",l:"Direct full-stack gamified investing education competitors",c:"#06b6d4"},
        ].map(({v,l,c})=>(
          <div key={v} className="rounded-2xl p-3" style={{background:CARD,border:`1px solid ${BORDER}`}}>
            <p className="text-3xl font-black" style={{color:c}}>{v}</p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{color:MUTED}}>{l}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideSolution() {
  const cards = [
    {icon:"🎓",title:"Structured Curriculum",desc:"40+ bite-sized lessons across 5 units — from 'What is a stock?' to advanced portfolio strategy. Quizzes, boss battles, and real-world case studies baked in.",accent:{borderColor:"#3b82f620",background:"#eff6ff"},stat:"5 Units · 40+ Lessons"},
    {icon:"📈",title:"Paper Trading Simulator",desc:"£10,000 virtual capital. Real-time market data. 50+ US & UK stocks. Order types: market, limit, stop-loss. Portfolio health scoring and analytics.",accent:{borderColor:`${G}30`,background:`${G}08`},stat:"50+ Stocks · Real Prices"},
    {icon:"🤖",title:"Bruno the Bull — AI Tutor",desc:"GPT-4o powered AI tutor on every screen. Explains concepts in plain English, analyses your portfolio, gives personalised tips. Never condescending.",accent:{borderColor:"#f59e0b30",background:"#fffbeb"},stat:"GPT-4o · Always Available"},
    {icon:"🏆",title:"Gamification Engine",desc:"Streaks, XP, 50 levels, 7-tier leagues, 25+ badges, daily missions, hearts system, streak freezes, gems currency. Retention baked in from day one.",accent:{borderColor:"#a855f730",background:"#faf5ff"},stat:"50 Levels · 25+ Badges"},
  ];
  return (
    <div className="flex flex-col h-full px-16 justify-center gap-5" style={{background:BG}}>
      <div>
        <Chip>The Solution</Chip>
        <H>We made investing <span style={{color:G}}>feel like a game.</span></H>
        <p className="text-xl -mt-1" style={{color:MUTED}}>Duolingo proved people form daily habits if you make learning fun. We're doing the same for finance.</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((c,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.12}}>
            <Card className="p-6 flex flex-col" style={c.accent}>
              <span className="text-5xl">{c.icon}</span>
              <h3 className="font-black text-lg mt-4 mb-2" style={{color:TEXT}}>{c.title}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{color:MUTED}}>{c.desc}</p>
              <div className="mt-3 text-[11px] font-black px-2 py-1 rounded-full w-fit" style={{background:`rgba(0,0,0,0.06)`,color:MUTED}}>{c.stat}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideHowItWorks() {
  const steps = [
    {n:"01",icon:"🐣",title:"Onboard",desc:"Set your goal, experience level, and daily XP target. Personalised curriculum from minute one.",sub:"2 minutes to set up"},
    {n:"02",icon:"📚",title:"Learn",desc:"Interactive lessons with quizzes, real examples, and Bruno the AI Bull as your personal tutor.",sub:"~4 mins per lesson"},
    {n:"03",icon:"📈",title:"Trade",desc:"Apply knowledge immediately in a real-feeling paper market. 50+ stocks, real sector data.",sub:"£10,000 virtual capital"},
    {n:"04",icon:"🏆",title:"Compete",desc:"Weekly leagues, leaderboards, and daily missions keep you returning. Identical to Duolingo's loop.",sub:"Lose your streak? You'll be back"},
  ];
  return (
    <div className="flex flex-col h-full px-16 justify-center gap-6" style={{background:BG}}>
      <div>
        <Chip>How It Works</Chip>
        <H>Four steps to <span style={{color:G}}>financial confidence.</span></H>
      </div>
      <div className="flex gap-4 flex-1 max-h-64">
        {steps.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.13}} className="flex-1 relative">
            <Card className="p-6 overflow-hidden h-full flex flex-col">
              <span className="absolute -top-2 -right-1 text-9xl font-black leading-none select-none" style={{color:`${G}12`}}>{s.n}</span>
              <span className="text-4xl mb-3">{s.icon}</span>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 rounded-full shrink-0" style={{background:G}}/>
                <h3 className="font-black text-xl" style={{color:TEXT}}>{s.title}</h3>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{color:MUTED}}>{s.desc}</p>
              <p className="text-xs font-bold mt-3 px-2 py-1 rounded-full w-fit" style={{background:`${G}15`,color:G}}>{s.sub}</p>
            </Card>
            {i < steps.length-1 && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-2xl font-black" style={{color:MUTED2}}>›</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DemoSlide({chip,title,points,mock}) {
  return (
    <div className="flex h-full px-16 items-center gap-12" style={{background:BG}}>
      <div className="flex-1">
        <Chip>{chip}</Chip>
        <H>{title}</H>
        <div className="space-y-3 mt-2">
          {points.map(([icon,t,d])=>(
            <motion.div key={t} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
              className="flex items-start gap-4 rounded-2xl p-3"
              style={{background:CARD,border:`1px solid ${BORDER}`}}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                style={{background:`${G}15`,border:`1px solid ${G}30`}}>
                {icon}
              </div>
              <div>
                <p className="font-black text-sm" style={{color:TEXT}}>{t}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{color:MUTED}}>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div initial={{opacity:0,x:50,scale:0.92}} animate={{opacity:1,x:0,scale:1}} transition={{delay:0.3}}
        className="shrink-0">
        <Phone>{mock}</Phone>
      </motion.div>
    </div>
  );
}

function SlideDemo()  { return <DemoSlide chip="App Demo · Home" title={<>Your daily dashboard.<br/>Built for <span style={{color:G}}>engagement.</span></>} points={[["🔥","Streak Flame","Animated daily streak — identical psychology to Duolingo"],["⚡","XP + Daily Goal Ring","Visual progress ring resets daily, drives return visits"],["📰","Live Market Pulse","Real-feeling index cards with sparklines and news feed"],["🎯","Daily Missions","Randomised daily objectives. Different every day."]]} mock={<HomeMock/>}/>; }
function SlideDemo2() { return <DemoSlide chip="App Demo · Learn" title={<>A curriculum that<br/><span style={{color:G}}>actually sticks.</span></>} points={[["🌱","5 Units, 25+ Lessons","Scaffolded from absolute basics to advanced strategy"],["❓","Interactive Quizzes","Multiple choice, true/false, fill-the-blank — instant feedback"],["🏁","Checkpoint Exams","Boss battles to test unit mastery before unlocking next unit"],["💡","Context-first Teaching","Every concept taught with a real-world story, not textbook theory"]]} mock={<LearnMock/>}/>; }
function SlideDemo3() { return <DemoSlide chip="App Demo · Markets" title={<>A paper market that<br/><span style={{color:G}}>feels completely real.</span></>} points={[["📊","50+ Stocks","US + UK markets, real sector data, P/E, EPS, dividends, beta"],["💰","£10K Starting Balance","Persistent forever. No resets. Real portfolio building."],["📉","Interactive Charts","6 time ranges, portfolio health scoring, sector allocation"],["🔔","Watchlist + Alerts","Follow stocks and get notified when price targets hit"]]} mock={<TradeMock/>}/>; }

function SlideAiConvo() {
  const msgs = [
    {from:"user",text:"What even is a P/E ratio? My mate keeps mentioning it."},
    {from:"ai",text:"P/E = Price ÷ Earnings per share. If Apple's P/E is 30, you're paying £30 for every £1 it earns. Think of it as the market's confidence score. 📊"},
    {from:"user",text:"So lower is always better?"},
    {from:"ai",text:"Not always! Low P/E can mean a bargain OR a dying business. High P/E often means investors expect big future growth. Context is everything. Want a real example? 🚀"},
    {from:"user",text:"Yes please!"},
    {from:"ai",text:"Nvidia (P/E 61×) sounds expensive — but it's growing 200% a year. A bank at P/E 8× is 'cheap' but slow. Both can be great buys for different reasons! 💡"},
  ];
  return (
    <div className="flex h-full px-20 items-center gap-16" style={{background:BG}}>
      <div className="flex-1">
        <Chip>Bruno the Bull · AI Tutor</Chip>
        <H>Finance explained the way<br/><span style={{color:G}}>your smartest friend would.</span></H>
        <p className="text-lg mb-6" style={{color:MUTED}}>Powered by GPT-4. Plain English. Never condescending. Always encouraging.</p>
        <div className="flex gap-4">
          {[["🧠","Explains any concept"],["📈","Analyses your portfolio"],["🎯","Personalised tips"]].map(([e,t])=>(
            <div key={t} className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
              style={{background:CARD,border:`1px solid ${BORDER}`}}>
              <span className="text-xl">{e}</span>
              <span className="text-sm font-medium" style={{color:MUTED}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:0.3}}
        className="w-80 shrink-0 rounded-3xl overflow-hidden flex flex-col"
        style={{height:420,background:CARD,border:`1px solid ${BORDER}`,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div className="px-4 py-3 flex items-center gap-3" style={{borderBottom:`1px solid ${BORDER}`}}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{background:`${G}20`}}>🐂</div>
          <div><p className="font-black text-xs" style={{color:TEXT}}>Bruno the Bull</p><p className="text-[10px]" style={{color:G}}>● Online</p></div>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-hidden flex flex-col justify-end">
          {msgs.map((m,i)=>(
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.5+i*0.12}}
              className={`flex ${m.from==="user"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed`}
                style={m.from==="user"
                  ?{background:G,color:"#fff",fontWeight:500}
                  :{background:"#f1f5f9",color:TEXT}}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SlideGamification() {
  const items = [
    {icon:"🔥",title:"Daily Streaks",desc:"Miss a day, lose it. Users open the app just to protect their streak.",c:"#f97316",bg:{background:"#fff7ed",borderColor:"#fed7aa"}},
    {icon:"⚡",title:"XP & 50 Levels",desc:"From Market Newbie → Market Legend. Each level = more features unlocked.",c:"#eab308",bg:{background:"#fefce8",borderColor:"#fde68a"}},
    {icon:"🏆",title:"Weekly Leagues",desc:"7 tiers. Compete vs 20 players. Top 5 promote. Bottom 5 demote.",c:"#3b82f6",bg:{background:"#eff6ff",borderColor:"#bfdbfe"}},
    {icon:"💎",title:"25+ Badges",desc:"First Trade, Bull Rider, Diamond Hands, Market Legend. All collectible.",c:"#a855f7",bg:{background:"#faf5ff",borderColor:"#e9d5ff"}},
    {icon:"🎯",title:"Daily Missions",desc:"3 fresh objectives every day. Drives variety, prevents boredom.",c:G,bg:{background:`${G}10`,borderColor:`${G}40`}},
    {icon:"❤️",title:"Hearts System",desc:"5 lives per day. Wrong answer = lose a heart. Creates real stakes.",c:"#ef4444",bg:{background:"#fff1f2",borderColor:"#fecdd3"}},
    {icon:"🔮",title:"Streak Freezes",desc:"Spend gems to protect your streak on off days. Converts loss aversion to purchase.",c:"#7c3aed",bg:{background:"#faf5ff",borderColor:"#e9d5ff"}},
    {icon:"📊",title:"Portfolio Score",desc:"Live health score 0–100 grades diversification, risk, and performance.",c:"#06b6d4",bg:{background:"#ecfeff",borderColor:"#a5f3fc"}},
  ];
  return (
    <div className="flex flex-col h-full px-16 pt-8 pb-4 gap-5" style={{background:BG}}>
      <div>
        <Chip>Retention Engine</Chip>
        <H>The same psychology that made<br/>Duolingo worth <span style={{color:G}}>$7 billion.</span></H>
      </div>
      <div className="grid grid-cols-4 gap-3 flex-1">
        {items.map((item,i)=>(
          <motion.div key={i} initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{delay:0.05+i*0.07}}
            className="border rounded-2xl p-4 flex flex-col" style={item.bg}>
            <span className="text-4xl mb-2">{item.icon}</span>
            <p className="font-black text-base mb-1" style={{color:item.c}}>{item.title}</p>
            <p className="text-xs leading-snug flex-1" style={{color:MUTED}}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideTraction() {
  const items = [
    {icon:"📱",title:"Mobile-first generation",desc:"Gen Z and Millennials manage everything from their phone. 68% say they prefer learning via an app over books or courses. Financial education must meet them there.",stat:"94%",statLabel:"of 18-35s own a smartphone"},
    {icon:"📰",title:"GameStop & Crypto changed everything",desc:"Retail investing went mainstream overnight. 10M new accounts opened in 2021 alone. People desperately WANT to understand markets — but have no trusted place to learn.",stat:"10M+",statLabel:"new retail investors since 2020"},
    {icon:"🤖",title:"AI makes personalised tutoring possible",desc:"LLMs can explain complex financial concepts conversationally in seconds. A personal finance tutor would cost £80/hr. Vstock delivers that for £6.99/month.",stat:"GPT-4o",statLabel:"powering Bruno the Bull"},
    {icon:"🎯",title:"Zero direct full-stack competitors",desc:"Bloomberg = pros. YouTube = passive. Khan Academy = dry. Nothing gamified + interactive + AI-powered + paper trading + comprehensive curriculum exists today.",stat:"$0",statLabel:"in VC funding for direct competitors"},
    {icon:"📈",title:"Duolingo proved the model works",desc:"Duolingo went from 0 to 500M users with the same gamified daily habit loop. Financial literacy is bigger, more urgent, and more monetisable than language learning.",stat:"$7.7B",statLabel:"Duolingo's market cap — our blueprint"},
    {icon:"🏫",title:"Schools are actively seeking solutions",desc:"UK government mandated financial education in schools in 2024. Schools have budgets but no good digital tools. B2B pipeline opportunity from day one.",stat:"8.9M",statLabel:"UK secondary school students in need"},
  ];
  return (
    <div className="flex flex-col h-full px-16 justify-center gap-5" style={{background:BG}}>
      <div>
        <Chip>Why Now</Chip>
        <H>The moment has arrived.<br/><span style={{color:G}}>Three tailwinds converging.</span></H>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1 max-h-80">
        {items.map((item,i)=>(
          <motion.div key={i} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.1}} className="h-full">
            <Card className="p-4 flex gap-3 h-full">
              <span className="text-3xl shrink-0 mt-1">{item.icon}</span>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-sm mb-1" style={{color:TEXT}}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{color:MUTED}}>{item.desc}</p>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-black text-2xl" style={{color:G}}>{item.stat}</span>
                  <span className="text-[10px]" style={{color:MUTED2}}>{item.statLabel}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBizModel() {
  const tiers = [
    {icon:"🆓",tier:"Free",price:"£0/mo",style:{border:`2px solid ${BORDER}`,background:CARD},priceColor:MUTED,features:["Core lessons (Units 1–2)","Basic paper trading","5 hearts/day","Public league","Bruno AI (limited)"],highlight:false},
    {icon:"⚡",tier:"Pro",price:"£6.99/mo",style:{border:`2px solid ${G}`,background:`${G}06`},priceColor:G,features:["All 5 units + advanced content","Unlimited hearts","Full Bruno AI tutor","Advanced analytics","Ad-free"],highlight:true},
    {icon:"👑",tier:"Premium",price:"£14.99/mo",style:{border:"2px solid #f59e0b",background:"#fffbeb"},priceColor:"#d97706",features:["Everything in Pro","Real broker integration","Financial advisor access","Team leagues","Family plan (5 users)"],highlight:false},
  ];
  return (
    <div className="flex flex-col h-full px-16 justify-center gap-5" style={{background:BG}}>
      <div>
        <Chip>Business Model</Chip>
        <H>Freemium → Pro conversion.<br/><span style={{color:G}}>Proven playbook.</span></H>
      </div>
      <div className="grid grid-cols-3 gap-5 flex-1 max-h-72">
        {tiers.map((t,i)=>(
          <motion.div key={i} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.18}}
            className="relative rounded-3xl p-6 flex flex-col" style={t.style}>
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-black px-3 py-1 rounded-full" style={{background:G}}>MOST POPULAR</div>
            )}
            <span className="text-3xl mb-3">{t.icon}</span>
            <h3 className="font-black text-xl" style={{color:TEXT}}>{t.tier}</h3>
            <p className="font-black text-3xl mt-0.5 mb-3" style={{color:t.priceColor}}>{t.price}</p>
            <ul className="space-y-1 flex-1">
              {t.features.map(f=>(
                <li key={f} className="flex items-center gap-2 text-xs" style={{color:MUTED}}>
                  <span style={{color:t.highlight?G:"#94a3b8"}}>✓</span>{f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
        className="rounded-2xl px-6 py-4 flex items-center justify-between gap-4"
        style={{background:CARD,border:`1px solid ${BORDER}`}}>
        <div className="flex items-center gap-6">
          <div><span className="text-xs font-bold" style={{color:MUTED}}>Year 1 Target</span><p className="font-black text-lg" style={{color:G}}>£1.05M ARR</p><p className="text-xs" style={{color:MUTED}}>100K users · 15% Pro</p></div>
          <div className="w-px h-10" style={{background:BORDER}}/>
          <div><span className="text-xs font-bold" style={{color:MUTED}}>LTV / CAC</span><p className="font-black text-lg" style={{color:TEXT}}>8.4×</p><p className="text-xs" style={{color:MUTED}}>£251 LTV · £30 CAC</p></div>
          <div className="w-px h-10" style={{background:BORDER}}/>
          <div><span className="text-xs font-bold" style={{color:MUTED}}>Monthly Churn Target</span><p className="font-black text-lg" style={{color:TEXT}}>&lt;3%</p><p className="text-xs" style={{color:MUTED}}>vs 6–8% industry avg</p></div>
          <div className="w-px h-10" style={{background:BORDER}}/>
          <div><span className="text-xs font-bold" style={{color:MUTED}}>Payback Period</span><p className="font-black text-lg" style={{color:TEXT}}>4.3 mo</p><p className="text-xs" style={{color:MUTED}}>Below 6mo benchmark</p></div>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full font-bold shrink-0" style={{background:"#ecfdf5",color:"#059669"}}>+ B2B schools pipeline</span>
      </motion.div>
    </div>
  );
}

function SlideVision() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16 relative overflow-hidden"
      style={{background:"#ffffff"}}>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 70% 60% at 50% 50%, ${G}15, transparent 70%)`}}/>
      <motion.div initial={{scale:0.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring"}}
        className="text-8xl mb-2 relative z-10">🌍</motion.div>
      <motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.3}} className="relative z-10">
        <Chip>The Vision</Chip>
        <h2 className="text-7xl font-black leading-tight mb-4" style={{color:TEXT}}>
          A generation that actually<br/>understands their money.
        </h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color:MUTED}}>
          In 10 years, every 18-year-old starts their financial life with Vstock.
          We won't just teach investing — we'll <strong style={{color:TEXT}}>change people's relationship with money.</strong>
        </p>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="flex gap-5 mt-10 relative z-10">
        {[
          {yr:"Year 1",u:"100K",label:"users",r:"£1M ARR",extra:"🇬🇧 UK launch · B2B pilots",detail:"15% Pro conversion · 3 school partnerships"},
          {yr:"Year 2",u:"500K",label:"users",r:"£5M ARR",extra:"🇪🇺 EU expansion",detail:"Germany, France, Netherlands · Series A"},
          {yr:"Year 3",u:"2M",label:"users",r:"£18M ARR",extra:"🇺🇸 US market entry",detail:"Corporate wellness + school districts · Series B"},
          {yr:"Year 5",u:"10M",label:"users",r:"$100M ARR",extra:"🌍 Global platform",detail:"Real broker integration · IPO / strategic acquisition"},
        ].map(({yr,u,label,r,extra,detail})=>(
          <div key={yr} className="text-center rounded-2xl px-5 py-4 flex-1" style={{background:CARD,border:`1px solid ${BORDER}`}}>
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{color:G}}>{yr}</p>
            <p className="font-black leading-none" style={{fontSize:36,color:TEXT}}>{u}</p>
            <p className="text-xs font-medium mb-1" style={{color:MUTED}}>{label}</p>
            <p className="text-base font-black" style={{color:G}}>{r}</p>
            <p className="text-xs mt-1 font-bold" style={{color:MUTED}}>{extra}</p>
            <p className="text-[10px] mt-1" style={{color:MUTED2}}>{detail}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="flex h-full relative overflow-hidden" style={{background:"#ffffff"}}>
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(${G}12 1px,transparent 1px),linear-gradient(90deg,${G}12 1px,transparent 1px)`,
        backgroundSize:"80px 80px"
      }}/>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 60% 80% at 30% 50%, ${G}18, transparent 65%)`}}/>
      {/* Left panel */}
      <motion.div initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:0.1}}
        className="flex-1 flex flex-col justify-center px-16 relative z-10">
        <Chip>The Ask</Chip>
        <h2 className="text-7xl font-black leading-tight mb-4" style={{color:TEXT}}>
          Let's make the<br/>world <span style={{color:G}}>financially<br/>literate.</span>
        </h2>
        <p className="text-xl mb-8 max-w-lg" style={{color:MUTED}}>
          Raising <strong style={{color:TEXT,fontSize:"1.3em"}}>£500K seed</strong> to build the team, grow users, and launch Pro.
        </p>
        <div className="flex flex-col items-start gap-2">
          <div className="text-3xl font-black" style={{color:TEXT}}>Let's talk. <span style={{color:G}}>📈</span></div>
          <p className="text-base" style={{color:MUTED2}}>hello@vstock.app · vstock.app</p>
        </div>
      </motion.div>
      {/* Right panel */}
      <motion.div initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:0.3}}
        className="w-96 flex flex-col justify-center px-8 gap-4 relative z-10">
        {[
          {icon:"🏗️",title:"Product",pct:"40%",desc:"Full curriculum (Units 3–5), real broker API integration, boss battle exams, Android & iOS native apps, offline mode"},
          {icon:"🚀",title:"Growth",pct:"35%",desc:"Paid social acquisition (TikTok, Instagram), 10 school pilots, 20 influencer partnerships, referral engine, PR launch"},
          {icon:"👥",title:"Team",pct:"25%",desc:"CTO (£90K), Head of Content (£65K), Growth Lead (£70K) — 3 senior hires to hit Year 1 milestones"},
        ].map(({icon,title,pct,desc})=>(
          <div key={title} className="rounded-3xl p-5"
            style={{background:CARD,border:`1px solid ${BORDER}`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{icon}</span>
                <p className="font-black text-lg" style={{color:TEXT}}>{title}</p>
              </div>
              <p className="font-black text-2xl" style={{color:G}}>{pct}</p>
            </div>
            <div className="w-full h-1.5 rounded-full mb-2" style={{background:"#f1f5f9"}}>
              <div className="h-full rounded-full" style={{width:pct,background:G}}/>
            </div>
            <p className="text-xs leading-relaxed" style={{color:MUTED}}>{desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Renderer ─────────────────────────────────────────────────
function renderSlide(slide) {
  switch (slide.type) {
    case "title":        return <SlideTitle/>;
    case "problem":      return <SlideProblem/>;
    case "bigstat":      return <SlideBigStat/>;
    case "solution":     return <SlideSolution/>;
    case "howitworks":   return <SlideHowItWorks/>;
    case "demo":         return <SlideDemo/>;
    case "demo2":        return <SlideDemo2/>;
    case "demo3":        return <SlideDemo3/>;
    case "aiconvo":      return <SlideAiConvo/>;
    case "gamification": return <SlideGamification/>;
    case "traction":     return <SlideTraction/>;
    case "bizmodel":     return <SlideBizModel/>;
    case "vision":       return <SlideVision/>;
    case "cta":          return <SlideCta/>;
    default:             return null;
  }
}

// ─── Main ─────────────────────────────────────────────────────
export default function Present() {
  const [current, setCurrent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let id;
    if (timerActive) id = setInterval(() => setElapsed(e => e+1), 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  const goNext = useCallback(() => setCurrent(c => Math.min(c+1, SLIDES.length-1)), []);
  const goPrev = useCallback(() => setCurrent(c => Math.max(c-1, 0)), []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key==="ArrowRight"||e.key===" ") goNext();
      if (e.key==="ArrowLeft") goPrev();
      if (e.key==="f"||e.key==="F") document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const totalElapsed = SLIDES.slice(0, current).reduce((s,sl)=>s+sl.duration, 0);
  const slideElapsedSec = Math.max(0, elapsed - totalElapsed);
  const overTime = slideElapsedSec > SLIDES[current].duration;
  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const totalProgress = (elapsed / TOTAL_SECONDS) * 100;

  return (
    <div className="fixed inset-0 flex flex-col select-none overflow-hidden"
      style={{fontFamily:"Inter, sans-serif", background: BG}}
      onClick={() => setShowNav(n=>!n)}>

      {/* Slide */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{opacity:0,x:80}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-80}}
            transition={{duration:0.3,ease:"easeInOut"}}
            className="absolute inset-0">
            {renderSlide(SLIDES[current])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="h-0.5" style={{background:BORDER}}>
        <motion.div className="h-full" style={{background:G}} animate={{width:`${totalProgress}%`}} transition={{duration:0.5}}/>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showNav && (
          <motion.div initial={{y:60}} animate={{y:0}} exit={{y:60}}
            className="px-6 py-3 flex items-center gap-4"
            style={{background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderTop:`1px solid ${BORDER}`}}
            onClick={e=>e.stopPropagation()}>

            {/* Nav */}
            <div className="flex items-center gap-2">
              <button onClick={goPrev} disabled={current===0}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-slate-100 transition-colors"
                style={{border:`1px solid ${BORDER}`,color:TEXT}}>
                ←
              </button>
              <span className="text-xs font-mono w-14 text-center" style={{color:MUTED}}>{current+1} / {SLIDES.length}</span>
              <button onClick={goNext} disabled={current===SLIDES.length-1}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-slate-100 transition-colors"
                style={{border:`1px solid ${BORDER}`,color:TEXT}}>
                →
              </button>
            </div>

            {/* Label */}
            <div className="flex-1">
              <span className="text-xs font-black" style={{color:G}}>{SLIDES[current].label}</span>
              <span className="text-xs ml-2 font-mono" style={{color:MUTED2}}>~{SLIDES[current].duration}s</span>
            </div>

            {/* Dots */}
            <div className="flex gap-1 overflow-x-auto max-w-xs items-center">
              {SLIDES.map((sl,i)=>(
                <button key={i} onClick={()=>setCurrent(i)}
                  className="shrink-0 h-1.5 rounded-full transition-all"
                  style={{
                    width: i===current ? 20 : 6,
                    background: i===current ? G : i<current ? "#94a3b8" : "#e2e8f0"
                  }}/>
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2">
              <span className={`font-mono text-sm font-bold`}
                style={{color: elapsed>TOTAL_SECONDS*0.9?"#ef4444":overTime?"#f59e0b":TEXT}}>
                {formatTime(elapsed)}<span style={{color:MUTED2}}> / {formatTime(TOTAL_SECONDS)}</span>
              </span>
              <button onClick={()=>setTimerActive(t=>!t)}
                className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                style={timerActive
                  ?{background:"#fee2e2",color:"#ef4444"}
                  :{background:`${G}20`,color:G}}>
                {timerActive?"⏸ Pause":"▶ Start"}
              </button>
              <button onClick={()=>{setElapsed(0);setTimerActive(false);}}
                className="text-xs font-bold px-2 py-1.5 rounded-full"
                style={{background:"#f1f5f9",color:MUTED}}>↺</button>
            </div>

            <button onClick={()=>document.documentElement.requestFullscreen?.()}
              className="text-[10px] ml-1" style={{color:MUTED2}}>⛶ F</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}