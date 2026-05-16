import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Slide definitions ────────────────────────────────────────
const SLIDES = [
  { id: "title",       type: "title",       duration: 60,  label: "Opening" },
  { id: "problem",     type: "problem",     duration: 90,  label: "The Problem" },
  { id: "stat",        type: "bigstat",     duration: 60,  label: "Market Size" },
  { id: "solution",    type: "solution",    duration: 90,  label: "The Solution" },
  { id: "how",         type: "howitworks",  duration: 90,  label: "How It Works" },
  { id: "demo_home",   type: "demo",        duration: 60,  label: "Demo: Home" },
  { id: "demo_learn",  type: "demo2",       duration: 60,  label: "Demo: Learn" },
  { id: "demo_trade",  type: "demo3",       duration: 60,  label: "Demo: Markets" },
  { id: "ai",          type: "aiconvo",     duration: 90,  label: "AI Tutor" },
  { id: "gamification",type: "gamification",duration: 90,  label: "Gamification" },
  { id: "traction",    type: "traction",    duration: 60,  label: "Why Now" },
  { id: "biz",         type: "bizmodel",    duration: 60,  label: "Business Model" },
  { id: "vision",      type: "vision",      duration: 60,  label: "Vision" },
  { id: "cta",         type: "cta",         duration: 60,  label: "The Ask" },
];
const TOTAL_SECONDS = SLIDES.reduce((s, sl) => s + sl.duration, 0);

// ─── Shared helpers ───────────────────────────────────────────
const G = "#00FF87"; // brand green
const Chip = ({ children }) => (
  <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border mb-4"
    style={{ color: G, borderColor: `${G}40`, background: `${G}10` }}>
    {children}
  </span>
);
const H = ({ children, className = "" }) => (
  <h2 className={`text-5xl font-black text-white leading-tight mb-5 ${className}`}>{children}</h2>
);

// ─── Phone mockup ─────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div className="relative shrink-0" style={{ width: 240, height: 490 }}>
      <div className="absolute inset-0 rounded-[38px] border-[5px] border-white/20 bg-[#0d0f1e] overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" />
        <div className="pt-5 h-full overflow-hidden">{children}</div>
      </div>
      {/* side buttons */}
      <div className="absolute right-[-7px] top-20 w-1.5 h-10 bg-white/20 rounded-full" />
      <div className="absolute left-[-7px] top-16 w-1.5 h-8 bg-white/20 rounded-full" />
      <div className="absolute left-[-7px] top-28 w-1.5 h-8 bg-white/20 rounded-full" />
    </div>
  );
}

// ─── Screen mocks ─────────────────────────────────────────────
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
          <circle cx="22" cy="22" r="18" fill="none" stroke={G} strokeWidth="4"
            strokeDasharray="113" strokeDashoffset="40" strokeLinecap="round" transform="rotate(-90 22 22)"/>
          <text x="22" y="26" textAnchor="middle" fontSize="9" fill="white" fontWeight="900">65%</text>
        </svg>
        <div><p className="text-[9px] text-white/40">Daily Goal</p><p className="text-xs font-black">13 / 20 XP</p></div>
      </div>
      <div className="bg-[#00FF87]/10 border border-[#00FF87]/20 rounded-2xl p-2.5">
        <p className="text-[8px] font-black" style={{color:G}}>CONTINUE</p>
        <p className="text-[11px] font-black mt-0.5">What Is a P/E Ratio?</p>
        <div className="w-full bg-white/10 rounded-full h-1 mt-1.5"><div className="h-1 rounded-full w-2/3" style={{background:G}}/></div>
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
        {[["SPX","5,248","+0.6%","green"],["NDX","18,290","+1.1%","green"],["FTSE","8,312","-0.2%","red"]].map(([t,v,c,col])=>(
          <div key={t} className="flex-1 bg-white/5 rounded-xl p-1.5">
            <p className="text-[7px] text-white/30">{t}</p>
            <p className="text-[9px] font-black">{v}</p>
            <p className={`text-[7px] font-bold ${col==="green"?"text-green-400":"text-red-400"}`}>{c}</p>
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
          const offsets=[0,50,-40,30,-20];
          return (
            <div key={i} className="w-full flex" style={{justifyContent: i%2===0?"center":offsets[i]>0?"flex-end":"flex-start"}}>
              <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 ${
                node.s==="complete"?"bg-[#00FF87]/20 border border-[#00FF87]/40":
                node.s==="active"?"text-black":"bg-white/5 border border-white/10"
              }`} style={node.s==="active"?{background:G}:{}}>
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
        {[["AAPL","+1.2%","green"],["NVDA","+3.4%","green"],["TSLA","-1.8%","red"]].map(([t,c,col])=>(
          <div key={t} className="flex-1 bg-white/5 rounded-xl p-1.5 text-center">
            <p className="text-[9px] font-black">{t}</p>
            <p className={`text-[8px] font-bold ${col==="green"?"text-green-400":"text-red-400"}`}>{c}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[{t:"Apple",s:"AAPL",sh:"10",v:"$1,894",p:"+3.8%",up:true},{t:"NVIDIA",s:"NVDA",sh:"4",v:"$1,981",p:"+8.2%",up:true},{t:"Tesla",s:"TSLA",sh:"5",v:"$1,242",p:"-1.4%",up:false}].map((h)=>(
          <div key={h.s} className={`flex items-center gap-2 rounded-xl p-2 ${h.up?"bg-green-500/5 border border-green-500/15":"bg-red-500/5 border border-red-500/15"}`}>
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
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden">
      {/* animated grid bg */}
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(${G}18 1px,transparent 1px),linear-gradient(90deg,${G}18 1px,transparent 1px)`,
        backgroundSize:"80px 80px"
      }}/>
      {/* radial glow */}
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 60% 50% at 50% 50%, ${G}15, transparent 70%)`}}/>
      <motion.div initial={{scale:0.4,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1,type:"spring",stiffness:120}}
        className="text-8xl mb-4 relative z-10">📈</motion.div>
      <motion.h1 initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.35}}
        className="text-[96px] font-black leading-none relative z-10" style={{letterSpacing:"-4px"}}>
        <span className="text-white">V</span><span style={{color:G}}>stock</span>
      </motion.h1>
      <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.55}}
        className="text-2xl text-white/60 mt-3 mb-8 relative z-10">
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
    {emoji:"😰",stat:"67%",text:"of adults feel anxious about investing",color:"text-red-400"},
    {emoji:"📚",stat:"83%",text:"never learned finance in school",color:"text-orange-400"},
    {emoji:"💸",stat:"$1.2T",text:"sits idle in low-interest savings accounts",color:"text-yellow-400"},
    {emoji:"📉",stat:"3 in 4",text:"new investors quit within 90 days",color:"text-red-400"},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-8">
      <div>
        <Chip>The Problem</Chip>
        <H>Most people are <span className="text-red-400">financially frozen.</span></H>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {problems.map((p,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.12}}
            className="relative overflow-hidden rounded-3xl p-7 bg-white/5 border border-white/8">
            <div className="absolute top-4 right-5 text-6xl opacity-10">{p.emoji}</div>
            <p className={`text-6xl font-black ${p.color}`}>{p.stat}</p>
            <p className="text-white/60 text-base mt-2 leading-snug">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBigStat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 50% 60% at 50% 50%, ${G}12, transparent 70%)`}}/>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-sm font-black tracking-widest uppercase mb-4 relative z-10" style={{color:G}}>The Opportunity</motion.p>
      <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:80}} className="relative z-10">
        <p className="font-black text-white leading-none" style={{fontSize:"min(20vw,160px)"}}>
          $4.8<span style={{color:G}}>B</span>
        </p>
      </motion.div>
      <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.5}}
        className="text-2xl text-white/60 mt-2 max-w-2xl relative z-10">
        Global financial education market — growing at <span className="text-white font-bold">18% per year</span>
      </motion.p>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="flex gap-12 mt-10 relative z-10">
        {[["40M+","Millennials with no investing experience"],["£850B","UK retail investment opportunity"],["2026","The year investing goes mainstream"]].map(([v,l])=>(
          <div key={v} className="text-center">
            <p className="text-4xl font-black" style={{color:G}}>{v}</p>
            <p className="text-white/40 text-xs mt-1 max-w-[120px] leading-relaxed">{l}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideSolution() {
  const cards = [
    {icon:"🎓",title:"Structured Lessons",desc:"20+ bite-sized lessons across 5 units. From 'What is a stock?' to advanced portfolio strategy.",accent:"border-blue-500/30 bg-blue-500/5"},
    {icon:"📈",title:"Paper Trading",desc:"£10,000 virtual money. Real market mechanics. No risk — but builds real intuition.",accent:"border-green-500/30 bg-green-500/5"},
    {icon:"🏆",title:"Gamification Engine",desc:"Streaks, XP, leagues, badges, daily missions. Retention baked in from day one.",accent:"border-purple-500/30 bg-purple-500/5"},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-8">
      <div>
        <Chip>The Solution</Chip>
        <H>We made investing <span style={{color:G}}>feel like a game.</span></H>
        <p className="text-white/50 text-lg -mt-2">Duolingo proved people form daily habits if you make learning fun. We're doing the same for finance.</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {cards.map((c,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.15}}
            className={`rounded-3xl p-7 border ${c.accent}`}>
            <span className="text-5xl">{c.icon}</span>
            <h3 className="text-white font-black text-xl mt-5 mb-2">{c.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
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
    <div className="flex flex-col h-full px-20 justify-center gap-8">
      <div>
        <Chip>How It Works</Chip>
        <H>Four steps to <span style={{color:G}}>financial confidence.</span></H>
      </div>
      <div className="flex gap-4">
        {steps.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.13}}
            className="flex-1 relative bg-white/5 border border-white/8 rounded-3xl p-6 overflow-hidden">
            <span className="absolute -top-2 -right-1 text-8xl font-black text-white/5 leading-none select-none">{s.n}</span>
            <span className="text-4xl">{s.icon}</span>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full" style={{background:G}}/>
              <h3 className="text-white font-black text-xl">{s.title}</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mt-2">{s.desc}</p>
            {i < steps.length-1 && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-2xl" style={{color:G}}>›</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DemoSlide({chip,title,points,mock}) {
  return (
    <div className="flex h-full px-20 items-center gap-16">
      <div className="flex-1">
        <Chip>{chip}</Chip>
        <H>{title}</H>
        <div className="space-y-4">
          {points.map(([icon,t,d])=>(
            <motion.div key={t} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
              className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl" style={{background:`${G}15`,border:`1px solid ${G}30`}}>
                {icon}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{t}</p>
                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{d}</p>
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

function SlideDemo() {
  return <DemoSlide
    chip="App Demo · Home"
    title={<>Your daily dashboard.<br/>Built for <span style={{color:G}}>engagement.</span></>}
    points={[
      ["🔥","Streak Flame","Animated daily streak — identical psychology to Duolingo"],
      ["⚡","XP + Daily Goal Ring","Visual progress ring resets daily, drives return visits"],
      ["📰","Live Market Pulse","Real-feeling index cards with sparklines and news feed"],
      ["🎯","Daily Missions","Randomised daily objectives. Different every day."],
    ]}
    mock={<HomeMock/>}
  />;
}
function SlideDemo2() {
  return <DemoSlide
    chip="App Demo · Learn"
    title={<>A curriculum that<br/><span style={{color:G}}>actually sticks.</span></>}
    points={[
      ["🌱","5 Units, 25+ Lessons","Scaffolded from absolute basics to advanced strategy"],
      ["❓","Interactive Quizzes","Multiple choice, true/false, fill-the-blank — instant feedback"],
      ["🏁","Checkpoint Exams","Boss battles to test unit mastery before unlocking next unit"],
      ["💡","Context-first Teaching","Every concept taught with a real-world story, not textbook theory"],
    ]}
    mock={<LearnMock/>}
  />;
}
function SlideDemo3() {
  return <DemoSlide
    chip="App Demo · Markets"
    title={<>A paper market that<br/><span style={{color:G}}>feels completely real.</span></>}
    points={[
      ["📊","50+ Stocks","US + UK markets, real sector data, P/E, EPS, dividends, beta"],
      ["💰","£10K Starting Balance","Persistent forever. No resets. Real portfolio building."],
      ["📉","Interactive Charts","6 time ranges, portfolio health scoring, sector allocation"],
      ["🔔","Watchlist + Alerts","Follow stocks and get notified when price targets hit"],
    ]}
    mock={<TradeMock/>}
  />;
}

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
    <div className="flex h-full px-20 items-center gap-16">
      <div className="flex-1">
        <Chip>Bruno the Bull · AI Tutor</Chip>
        <H>Finance explained the way<br/><span style={{color:G}}>your smartest friend would.</span></H>
        <p className="text-white/50 text-lg mb-6">Powered by GPT-4. Plain English. Never condescending. Always encouraging.</p>
        <div className="flex gap-5">
          {[["🧠","Explains any concept"],["📈","Analyses your portfolio"],["🎯","Personalised tips"]].map(([e,t])=>(
            <div key={t} className="flex items-center gap-2 bg-white/5 rounded-2xl px-4 py-2.5">
              <span className="text-xl">{e}</span>
              <span className="text-white/70 text-sm font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
      <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:0.3}}
        className="w-80 shrink-0 rounded-3xl border border-white/10 overflow-hidden flex flex-col bg-[#111827]"
        style={{height:420}}>
        <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10 bg-white/5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{background:`${G}20`}}>🐂</div>
          <div><p className="text-white font-black text-xs">Bruno the Bull</p><p className="text-[10px]" style={{color:G}}>● Online</p></div>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-hidden flex flex-col justify-end">
          {msgs.map((m,i)=>(
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.5+i*0.12}}
              className={`flex ${m.from==="user"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                m.from==="user"?"text-black font-medium":"bg-white/10 text-white/90"
              }`} style={m.from==="user"?{background:G}:{}}>
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
    {icon:"🔥",title:"Daily Streaks",desc:"Miss a day, lose your streak. Users open the app to protect it.",c:"text-orange-400",bg:"bg-orange-500/10 border-orange-500/20"},
    {icon:"⚡",title:"XP & Levels",desc:"50 levels from Market Newbie to Market Legend.",c:"text-yellow-400",bg:"bg-yellow-500/10 border-yellow-500/20"},
    {icon:"🏆",title:"Weekly Leagues",desc:"Compete vs 20 players. Top 5 promote. Bottom 5 demote.",c:"text-blue-400",bg:"bg-blue-500/10 border-blue-500/20"},
    {icon:"💎",title:"25+ Badges",desc:"From 'First Trade' to 'Wolf Badge'. Collectible. Shareable.",c:"text-purple-400",bg:"bg-purple-500/10 border-purple-500/20"},
    {icon:"🎯",title:"Daily Missions",desc:"Randomised objectives drive variety, prevent boredom.",c:"text-green-400",bg:"bg-green-500/10 border-green-500/20"},
    {icon:"❤️",title:"Hearts System",desc:"5 lives per day. Lose one on wrong answers. Creates stakes.",c:"text-red-400",bg:"bg-red-500/10 border-red-500/20"},
    {icon:"💰",title:"Portfolio Milestones",desc:"XP rewards for 5%, 10%, 25%, 50%, 100% portfolio growth.",c:"text-emerald-400",bg:"bg-emerald-500/10 border-emerald-500/20"},
    {icon:"📊",title:"Portfolio Score",desc:"Live health score 0–100 grades diversification and risk.",c:"text-cyan-400",bg:"bg-cyan-500/10 border-cyan-500/20"},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6">
      <div>
        <Chip>Retention Engine</Chip>
        <H>The same psychology that made<br/>Duolingo worth <span style={{color:G}}>$7 billion.</span></H>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((item,i)=>(
          <motion.div key={i} initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{delay:0.05+i*0.07}}
            className={`border rounded-2xl p-4 ${item.bg}`}>
            <span className="text-3xl">{item.icon}</span>
            <p className={`font-black text-sm mt-2 mb-1 ${item.c}`}>{item.title}</p>
            <p className="text-white/45 text-[11px] leading-snug">{item.desc}</p>
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
    <div className="flex flex-col h-full px-20 justify-center gap-6">
      <div>
        <Chip>Why Now</Chip>
        <H>The moment has arrived.</H>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item,i)=>(
          <motion.div key={i} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.12}}
            className="bg-white/5 border border-white/8 rounded-3xl p-6 flex gap-5">
            <span className="text-4xl shrink-0">{item.icon}</span>
            <div>
              <h3 className="text-white font-black text-base mb-1">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-3">{item.desc}</p>
              <div className="flex items-baseline gap-2">
                <span className="font-black text-2xl" style={{color:G}}>{item.stat}</span>
                <span className="text-white/30 text-xs">{item.statLabel}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBizModel() {
  const tiers = [
    {icon:"🆓",tier:"Free",price:"£0/mo",color:"border-white/15",dot:"bg-white/30",desc:"Core lessons, basic trading, 5 hearts/day, public league",highlight:false},
    {icon:"⚡",tier:"Pro",price:"£6.99/mo",color:"border-[#00FF87]/50",dot:"bg-[#00FF87]",desc:"Unlimited hearts, advanced lessons, analytics, AI tutor, ad-free",highlight:true},
    {icon:"👑",tier:"Premium",price:"£14.99/mo",color:"border-amber-400/40",dot:"bg-amber-400",desc:"Everything in Pro + real broker integration, advisor access, team leagues",highlight:false},
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6">
      <div>
        <Chip>Business Model</Chip>
        <H>Three clear revenue streams.</H>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {tiers.map((t,i)=>(
          <motion.div key={i} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.18}}
            className={`relative border-2 rounded-3xl p-8 flex flex-col ${t.color} ${t.highlight?"bg-[#00FF87]/5":"bg-white/3"}`}>
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-black text-[10px] font-black px-3 py-1 rounded-full" style={{background:G}}>
                MOST POPULAR
              </div>
            )}
            <div className={`w-3 h-3 rounded-full ${t.dot} mb-5`}/>
            <span className="text-4xl mb-2">{t.icon}</span>
            <h3 className="text-white font-black text-2xl">{t.tier}</h3>
            <p className={`font-black text-3xl mt-1 mb-4 ${t.highlight?"":"text-white/50"}`} style={t.highlight?{color:G}:{}}>{t.price}</p>
            <p className="text-white/45 text-sm leading-relaxed flex-1">{t.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
        className="bg-white/5 rounded-2xl px-6 py-3 flex items-center justify-between">
        <span className="text-white/50 text-sm">Target: 100K users Year 1 · 15% Pro conversion = <span className="font-bold" style={{color:G}}>£1.05M ARR</span></span>
        <span className="text-white/30 text-xs">+B2B schools & corporate training pipeline</span>
      </motion.div>
    </div>
  );
}

function SlideVision() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 70% 60% at 50% 50%, ${G}10, transparent 70%)`}}/>
      <motion.div initial={{scale:0.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring"}}
        className="text-7xl mb-3 relative z-10">🌍</motion.div>
      <motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.3}} className="relative z-10">
        <Chip>The Vision</Chip>
        <h2 className="text-6xl font-black text-white leading-tight mb-4">
          A generation that actually<br/>understands their money.
        </h2>
        <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
          In 10 years, we want every 18-year-old to start their financial life with Vstock.
          We won't just teach investing — we'll change people's relationship with money.
        </p>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="flex gap-16 mt-10 relative z-10">
        {[["Year 1","100K users","£1M ARR"],["Year 2","500K users","£5M ARR"],["Year 3","2M users","Launch US"]].map(([yr,u,r])=>(
          <div key={yr} className="text-center">
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{color:G}}>{yr}</p>
            <p className="text-white font-black text-2xl">{u}</p>
            <p className="text-white/40 text-sm">{r}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(${G}10 1px,transparent 1px),linear-gradient(90deg,${G}10 1px,transparent 1px)`,
        backgroundSize:"80px 80px"
      }}/>
      <div className="absolute inset-0" style={{background:`radial-gradient(ellipse 70% 60% at 50% 50%, ${G}18, transparent 70%)`}}/>
      <motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="relative z-10">
        <Chip>The Ask</Chip>
        <h2 className="text-6xl font-black text-white leading-tight mb-3">
          Join us in making the world<br/><span style={{color:G}}>financially literate.</span>
        </h2>
        <p className="text-xl text-white/55 mb-8 max-w-2xl mx-auto">
          We're raising <span className="text-white font-bold">£500K seed</span> to build the team, grow the user base, and launch the Pro tier.
        </p>
      </motion.div>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
        className="grid grid-cols-3 gap-5 mb-8 max-w-2xl w-full relative z-10">
        {[["🏗️","Product","Full curriculum, real broker integration, team leagues"],["🚀","Growth","Paid acquisition, influencer partnerships, school pilots"],["👥","Team","3 senior hires: CTO, Head of Content, Growth Lead"]].map(([icon,title,desc])=>(
          <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-3xl">{icon}</span>
            <p className="text-white font-black text-sm mt-3">{title}</p>
            <p className="text-white/40 text-xs mt-1 leading-relaxed">{desc}</p>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.9}}
        className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-5xl font-black text-white">Let's talk. <span style={{color:G}}>📈</span></div>
        <p className="text-white/30 text-sm">hello@vstock.app · vstock.app</p>
      </motion.div>
    </div>
  );
}

// ─── Renderer ─────────────────────────────────────────────────
function renderSlide(slide) {
  switch (slide.type) {
    case "title": return <SlideTitle/>;
    case "problem": return <SlideProblem/>;
    case "bigstat": return <SlideBigStat/>;
    case "solution": return <SlideSolution/>;
    case "howitworks": return <SlideHowItWorks/>;
    case "demo": return <SlideDemo/>;
    case "demo2": return <SlideDemo2/>;
    case "demo3": return <SlideDemo3/>;
    case "aiconvo": return <SlideAiConvo/>;
    case "gamification": return <SlideGamification/>;
    case "traction": return <SlideTraction/>;
    case "bizmodel": return <SlideBizModel/>;
    case "vision": return <SlideVision/>;
    case "cta": return <SlideCta/>;
    default: return null;
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

  const slideTimeLimit = SLIDES[current].duration;
  const totalElapsed = SLIDES.slice(0, current).reduce((s,sl)=>s+sl.duration, 0);
  const slideElapsedSec = Math.max(0, elapsed - totalElapsed);
  const overTime = slideElapsedSec > slideTimeLimit;
  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const totalProgress = (elapsed / TOTAL_SECONDS) * 100;

  return (
    <div className="fixed inset-0 bg-[#06080f] flex flex-col select-none overflow-hidden"
      style={{fontFamily:"Inter, sans-serif"}}
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
      <div className="h-0.5 bg-white/5">
        <motion.div className="h-full" style={{background:G}} animate={{width:`${totalProgress}%`}} transition={{duration:0.5}}/>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showNav && (
          <motion.div initial={{y:60}} animate={{y:0}} exit={{y:60}}
            className="bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center gap-4"
            onClick={e=>e.stopPropagation()}>

            {/* Nav */}
            <div className="flex items-center gap-2">
              <button onClick={goPrev} disabled={current===0}
                className="w-8 h-8 rounded-full bg-white/10 disabled:opacity-20 text-white flex items-center justify-center hover:bg-white/20">
                ←
              </button>
              <span className="text-white/50 text-xs font-mono w-14 text-center">{current+1} / {SLIDES.length}</span>
              <button onClick={goNext} disabled={current===SLIDES.length-1}
                className="w-8 h-8 rounded-full bg-white/10 disabled:opacity-20 text-white flex items-center justify-center hover:bg-white/20">
                →
              </button>
            </div>

            {/* Label */}
            <div className="flex-1">
              <span className="text-xs font-black" style={{color:G}}>{SLIDES[current].label}</span>
              <span className="text-white/25 text-xs ml-2 font-mono">~{SLIDES[current].duration}s</span>
            </div>

            {/* Dots */}
            <div className="flex gap-1 overflow-x-auto max-w-xs items-center">
              {SLIDES.map((sl,i)=>(
                <button key={i} onClick={()=>setCurrent(i)}
                  className={`shrink-0 h-1.5 rounded-full transition-all ${i===current?"w-5":"w-1.5"} ${i<current?"bg-white/40":i===current?"":"bg-white/15"}`}
                  style={i===current?{background:G}:{}}/>
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2">
              <span className={`font-mono text-sm font-bold ${elapsed>TOTAL_SECONDS*0.9?"text-red-400":overTime?"text-amber-400":"text-white"}`}>
                {formatTime(elapsed)}<span className="text-white/25"> / {formatTime(TOTAL_SECONDS)}</span>
              </span>
              <button onClick={()=>setTimerActive(t=>!t)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${timerActive?"bg-red-500/20 text-red-400":"bg-[#00FF87]/20 text-[#00FF87]"}`}>
                {timerActive?"⏸ Pause":"▶ Start"}
              </button>
              <button onClick={()=>{setElapsed(0);setTimerActive(false);}}
                className="text-xs font-bold px-2 py-1.5 rounded-full bg-white/5 text-white/30">↺</button>
            </div>

            <button onClick={()=>document.documentElement.requestFullscreen?.()}
              className="text-[10px] text-white/20 hover:text-white/50 ml-1">⛶ F</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}