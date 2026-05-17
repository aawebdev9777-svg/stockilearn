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
  <h2 className={`text-5xl font-black leading-tight mb-5 ${className}`} style={{ color: TEXT }}>{children}</h2>
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
    {emoji:"😰",stat:"67%",text:"of adults feel anxious about investing",color:"#ef4444"},
    {emoji:"📚",stat:"83%",text:"never learned finance in school",color:"#f97316"},
    {emoji:"💸",stat:"$1.2T",text:"sits idle in low-interest savings accounts",color:"#eab308"},
    {emoji:"📉",stat:"3 in 4",text:"new investors quit within 90 days",color:"#ef4444"},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-8" style={{background:BG}}>
      <div>
        <Chip>The Problem</Chip>
        <H>Most people are <span style={{color:"#ef4444"}}>financially frozen.</span></H>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {problems.map((p,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.12}}>
            <Card className="relative overflow-hidden p-7">
              <div className="absolute top-4 right-5 text-6xl opacity-8">{p.emoji}</div>
              <p className="text-6xl font-black" style={{color:p.color}}>{p.stat}</p>
              <p className="text-base mt-2 leading-snug" style={{color:MUTED}}>{p.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBigStat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden"
      style={{background:"#ffffff"}}>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 55% 55% at 50% 50%, ${G}18, transparent 70%)`}}/>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-sm font-black tracking-widest uppercase mb-4 relative z-10" style={{color:G}}>The Opportunity</motion.p>
      <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:80}} className="relative z-10">
        <p className="font-black leading-none" style={{fontSize:"min(20vw,160px)",color:TEXT}}>
          $4.8<span style={{color:G}}>B</span>
        </p>
      </motion.div>
      <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.5}}
        className="text-2xl mt-2 max-w-2xl relative z-10" style={{color:MUTED}}>
        Global financial education market — growing at <strong style={{color:TEXT}}>18% per year</strong>
      </motion.p>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="flex gap-12 mt-10 relative z-10">
        {[["40M+","Millennials with no investing experience"],["£850B","UK retail investment opportunity"],["2026","The year investing goes mainstream"]].map(([v,l])=>(
          <div key={v} className="text-center">
            <p className="text-4xl font-black" style={{color:G}}>{v}</p>
            <p className="text-xs mt-1 max-w-[120px] leading-relaxed" style={{color:MUTED2}}>{l}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideSolution() {
  const cards = [
    {icon:"🎓",title:"Structured Lessons",desc:"20+ bite-sized lessons across 5 units. From 'What is a stock?' to advanced portfolio strategy.",accent:{borderColor:"#3b82f620",background:"#eff6ff"}},
    {icon:"📈",title:"Paper Trading",desc:"£10,000 virtual money. Real market mechanics. No risk — but builds real intuition.",accent:{borderColor:`${G}30`,background:`${G}08`}},
    {icon:"🏆",title:"Gamification Engine",desc:"Streaks, XP, leagues, badges, daily missions. Retention baked in from day one.",accent:{borderColor:"#a855f730",background:"#faf5ff"}},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-8" style={{background:BG}}>
      <div>
        <Chip>The Solution</Chip>
        <H>We made investing <span style={{color:G}}>feel like a game.</span></H>
        <p className="text-lg -mt-2" style={{color:MUTED}}>Duolingo proved people form daily habits if you make learning fun. We're doing the same for finance.</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {cards.map((c,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.15}}>
            <Card className="p-7" style={c.accent}>
              <span className="text-5xl">{c.icon}</span>
              <h3 className="font-black text-xl mt-5 mb-2" style={{color:TEXT}}>{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{color:MUTED}}>{c.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideHowItWorks() {
  const steps = [
    {n:"01",icon:"🐣",title:"Onboard",desc:"Set your goal, experience level, and daily target. Personalised from minute one."},
    {n:"02",icon:"📚",title:"Learn",desc:"Interactive lessons with quizzes, scenarios, and Bruno the AI Bull as your tutor."},
    {n:"03",icon:"📈",title:"Trade",desc:"Apply knowledge in a real-feeling paper market. 50+ stocks, live simulated prices."},
    {n:"04",icon:"🏆",title:"Compete",desc:"Weekly leagues, leaderboards, and challenges with friends keep you coming back."},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-8" style={{background:BG}}>
      <div>
        <Chip>How It Works</Chip>
        <H>Four steps to <span style={{color:G}}>financial confidence.</span></H>
      </div>
      <div className="flex gap-4">
        {steps.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.13}} className="flex-1 relative">
            <Card className="p-6 overflow-hidden h-full">
              <span className="absolute -top-2 -right-1 text-8xl font-black leading-none select-none" style={{color:`${G}15`}}>{s.n}</span>
              <span className="text-4xl">{s.icon}</span>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{background:G}}/>
                <h3 className="font-black text-xl" style={{color:TEXT}}>{s.title}</h3>
              </div>
              <p className="text-sm leading-relaxed mt-2" style={{color:MUTED}}>{s.desc}</p>
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
    <div className="flex h-full px-20 items-center gap-16" style={{background:BG}}>
      <div className="flex-1">
        <Chip>{chip}</Chip>
        <H>{title}</H>
        <div className="space-y-4">
          {points.map(([icon,t,d])=>(
            <motion.div key={t} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
              className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                style={{background:`${G}15`,border:`1px solid ${G}30`}}>
                {icon}
              </div>
              <div>
                <p className="font-bold text-sm" style={{color:TEXT}}>{t}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{color:MUTED}}>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div initial={{opacity:0,x:50,scale:0.92}} animate={{opacity:1,x:0,scale:1}} transition={{delay:0.3}}>
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
    {icon:"🔥",title:"Daily Streaks",desc:"Miss a day, lose your streak. Users open the app to protect it.",c:"#f97316",bg:{background:"#fff7ed",borderColor:"#fed7aa"}},
    {icon:"⚡",title:"XP & Levels",desc:"50 levels from Market Newbie to Market Legend.",c:"#eab308",bg:{background:"#fefce8",borderColor:"#fde68a"}},
    {icon:"🏆",title:"Weekly Leagues",desc:"Compete vs 20 players. Top 5 promote. Bottom 5 demote.",c:"#3b82f6",bg:{background:"#eff6ff",borderColor:"#bfdbfe"}},
    {icon:"💎",title:"25+ Badges",desc:"From 'First Trade' to 'Wolf Badge'. Collectible. Shareable.",c:"#a855f7",bg:{background:"#faf5ff",borderColor:"#e9d5ff"}},
    {icon:"🎯",title:"Daily Missions",desc:"Randomised objectives drive variety, prevent boredom.",c:G,bg:{background:`${G}10`,borderColor:`${G}40`}},
    {icon:"❤️",title:"Hearts System",desc:"5 lives per day. Lose one on wrong answers. Creates stakes.",c:"#ef4444",bg:{background:"#fff1f2",borderColor:"#fecdd3"}},
    {icon:"💰",title:"Portfolio Milestones",desc:"XP rewards for 5%, 10%, 25%, 50%, 100% portfolio growth.",c:"#10b981",bg:{background:"#ecfdf5",borderColor:"#a7f3d0"}},
    {icon:"📊",title:"Portfolio Score",desc:"Live health score 0–100 grades diversification and risk.",c:"#06b6d4",bg:{background:"#ecfeff",borderColor:"#a5f3fc"}},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6" style={{background:BG}}>
      <div>
        <Chip>Retention Engine</Chip>
        <H>The same psychology that made<br/>Duolingo worth <span style={{color:G}}>$7 billion.</span></H>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((item,i)=>(
          <motion.div key={i} initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{delay:0.05+i*0.07}}
            className="border rounded-2xl p-4" style={item.bg}>
            <span className="text-3xl">{item.icon}</span>
            <p className="font-black text-sm mt-2 mb-1" style={{color:item.c}}>{item.title}</p>
            <p className="text-[11px] leading-snug" style={{color:MUTED}}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideTraction() {
  const items = [
    {icon:"📱",title:"Mobile-first generation",desc:"Gen Z and Millennials manage everything from their phone. Financial education needs to meet them there.",stat:"94%",statLabel:"of 18-35s own a smartphone"},
    {icon:"📰",title:"GameStop changed everything",desc:"Retail investing went mainstream. People WANT to understand markets — they need the right tool.",stat:"10M+",statLabel:"new retail investors since 2020"},
    {icon:"🤖",title:"AI makes it possible",desc:"LLMs can explain complex financial concepts in seconds. Bruno the Bull couldn't exist three years ago.",stat:"GPT-4",statLabel:"powering the AI tutor"},
    {icon:"🎯",title:"No real competitor",desc:"Bloomberg is for pros. YouTube is passive. Nothing gamified + interactive + comprehensive exists yet.",stat:"Zero",statLabel:"direct full-stack competitors"},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6" style={{background:BG}}>
      <div>
        <Chip>Why Now</Chip>
        <H>The moment has arrived.</H>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item,i)=>(
          <motion.div key={i} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.12}}>
            <Card className="p-6 flex gap-5">
              <span className="text-4xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-black text-base mb-1" style={{color:TEXT}}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{color:MUTED}}>{item.desc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-2xl" style={{color:G}}>{item.stat}</span>
                  <span className="text-xs" style={{color:MUTED2}}>{item.statLabel}</span>
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
    {icon:"🆓",tier:"Free",price:"£0/mo",style:{border:`2px solid ${BORDER}`,background:CARD},priceColor:MUTED,desc:"Core lessons, basic trading, 5 hearts/day, public league",highlight:false},
    {icon:"⚡",tier:"Pro",price:"£6.99/mo",style:{border:`2px solid ${G}`,background:`${G}08`},priceColor:G,desc:"Unlimited hearts, advanced lessons, analytics, AI tutor, ad-free",highlight:true},
    {icon:"👑",tier:"Premium",price:"£14.99/mo",style:{border:"2px solid #f59e0b",background:"#fffbeb"},priceColor:"#d97706",desc:"Everything in Pro + real broker integration, advisor access, team leagues",highlight:false},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6" style={{background:BG}}>
      <div>
        <Chip>Business Model</Chip>
        <H>Three clear revenue streams.</H>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {tiers.map((t,i)=>(
          <motion.div key={i} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.18}}
            className="relative rounded-3xl p-8 flex flex-col" style={t.style}>
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-black px-3 py-1 rounded-full" style={{background:G}}>
                MOST POPULAR
              </div>
            )}
            <span className="text-4xl mb-4">{t.icon}</span>
            <h3 className="font-black text-2xl" style={{color:TEXT}}>{t.tier}</h3>
            <p className="font-black text-3xl mt-1 mb-4" style={{color:t.priceColor}}>{t.price}</p>
            <p className="text-sm leading-relaxed flex-1" style={{color:MUTED}}>{t.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
        className="rounded-2xl px-6 py-3 flex items-center justify-between"
        style={{background:CARD,border:`1px solid ${BORDER}`}}>
        <span className="text-sm" style={{color:MUTED}}>Target: 100K users Year 1 · 15% Pro conversion = <strong style={{color:G}}>£1.05M ARR</strong></span>
        <span className="text-xs" style={{color:MUTED2}}>+B2B schools & corporate training pipeline</span>
      </motion.div>
    </div>
  );
}

function SlideVision() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden"
      style={{background:"#ffffff"}}>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 70% 60% at 50% 50%, ${G}15, transparent 70%)`}}/>
      <motion.div initial={{scale:0.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring"}}
        className="text-7xl mb-3 relative z-10">🌍</motion.div>
      <motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.3}} className="relative z-10">
        <Chip>The Vision</Chip>
        <h2 className="text-6xl font-black leading-tight mb-4" style={{color:TEXT}}>
          A generation that actually<br/>understands their money.
        </h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color:MUTED}}>
          In 10 years, we want every 18-year-old to start their financial life with Vstock.
          We won't just teach investing — we'll change people's relationship with money.
        </p>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="flex gap-16 mt-10 relative z-10">
        {[["Year 1","100K users","£1M ARR"],["Year 2","500K users","£5M ARR"],["Year 3","2M users","Launch US"]].map(([yr,u,r])=>(
          <div key={yr} className="text-center">
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{color:G}}>{yr}</p>
            <p className="font-black text-2xl" style={{color:TEXT}}>{u}</p>
            <p className="text-sm" style={{color:MUTED2}}>{r}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden"
      style={{background:"#ffffff"}}>
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(${G}15 1px,transparent 1px),linear-gradient(90deg,${G}15 1px,transparent 1px)`,
        backgroundSize:"80px 80px"
      }}/>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 70% 60% at 50% 50%, ${G}20, transparent 70%)`}}/>
      <motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="relative z-10">
        <Chip>The Ask</Chip>
        <h2 className="text-6xl font-black leading-tight mb-3" style={{color:TEXT}}>
          Join us in making the world<br/><span style={{color:G}}>financially literate.</span>
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{color:MUTED}}>
          We're raising <strong style={{color:TEXT}}>£500K seed</strong> to build the team, grow the user base, and launch the Pro tier.
        </p>
      </motion.div>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
        className="grid grid-cols-3 gap-5 mb-8 max-w-2xl w-full relative z-10">
        {[["🏗️","Product","Full curriculum, real broker integration, team leagues"],["🚀","Growth","Paid acquisition, influencer partnerships, school pilots"],["👥","Team","3 senior hires: CTO, Head of Content, Growth Lead"]].map(([icon,title,desc])=>(
          <div key={title} className="rounded-2xl p-5"
            style={{background:CARD,border:`1px solid ${BORDER}`,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
            <span className="text-3xl">{icon}</span>
            <p className="font-black text-sm mt-3" style={{color:TEXT}}>{title}</p>
            <p className="text-xs mt-1 leading-relaxed" style={{color:MUTED}}>{desc}</p>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.9}}
        className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-5xl font-black" style={{color:TEXT}}>Let's talk. <span style={{color:G}}>📈</span></div>
        <p className="text-sm" style={{color:MUTED2}}>hello@vstock.app · vstock.app</p>
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