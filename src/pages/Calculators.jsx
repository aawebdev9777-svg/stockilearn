import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, TrendingUp, Repeat, Flame } from "lucide-react";

function CompoundCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(8);

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const principalGrowth = principal * Math.pow(1 + r, n);
    const monthlyGrowth = monthly * ((Math.pow(1 + r, n) - 1) / r);
    const totalContributed = principal + monthly * n;
    const totalValue = Math.round(principalGrowth + monthlyGrowth);
    const interestEarned = totalValue - totalContributed;
    return { totalValue, totalContributed, interestEarned };
  }, [principal, monthly, years, rate]);

  return (
    <div className="space-y-4">
      <InputRow label="Initial Investment" value={principal} onChange={setPrincipal} prefix="£" step={100} />
      <InputRow label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="£" step={10} />
      <InputRow label="Years Invested" value={years} onChange={setYears} suffix="yrs" step={1} />
      <InputRow label="Expected Annual Return" value={rate} onChange={setRate} suffix="%" step={0.5} />

      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Final Value</p>
        <p className="text-3xl font-black text-foreground">£{result.totalValue.toLocaleString()}</p>
        <div className="flex gap-4 mt-3">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">You Invested</p>
            <p className="text-sm font-black text-foreground">£{result.totalContributed.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Interest Earned</p>
            <p className="text-sm font-black text-primary">£{result.interestEarned.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DripCalculator() {
  const [investment, setInvestment] = useState(5000);
  const [yieldPct, setYieldPct] = useState(4);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    const annualYield = yieldPct / 100;
    const withDrip = Math.round(investment * Math.pow(1 + annualYield, years));
    const withoutDrip = Math.round(investment + investment * annualYield * years);
    const dripBonus = withDrip - withoutDrip;
    return { withDrip, withoutDrip, dripBonus };
  }, [investment, yieldPct, years]);

  return (
    <div className="space-y-4">
      <InputRow label="Initial Investment" value={investment} onChange={setInvestment} prefix="£" step={500} />
      <InputRow label="Dividend Yield" value={yieldPct} onChange={setYieldPct} suffix="%" step={0.5} />
      <InputRow label="Years Held" value={years} onChange={setYears} suffix="yrs" step={1} />

      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-400/10 to-blue-400/5 border border-blue-400/20">
        <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2">DRIP vs No DRIP</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">With DRIP (reinvested)</span>
            <span className="text-lg font-black text-foreground">£{result.withDrip.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">Without DRIP (cash)</span>
            <span className="text-sm font-bold text-muted-foreground">£{result.withoutDrip.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-blue-400/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-500">DRIP Bonus</span>
              <span className="text-lg font-black text-blue-500">+£{result.dripBonus.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InflationCalculator() {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(20);
  const [inflation, setInflation] = useState(3);

  const result = useMemo(() => {
    const futureCost = Math.round(amount * Math.pow(1 + inflation / 100, years));
    const purchasingPower = Math.round(amount / Math.pow(1 + inflation / 100, years));
    const lostValue = amount - purchasingPower;
    return { futureCost, purchasingPower, lostValue };
  }, [amount, years, inflation]);

  return (
    <div className="space-y-4">
      <InputRow label="Today's Amount" value={amount} onChange={setAmount} prefix="£" step={500} />
      <InputRow label="Years From Now" value={years} onChange={setYears} suffix="yrs" step={1} />
      <InputRow label="Inflation Rate" value={inflation} onChange={setInflation} suffix="%" step={0.5} />

      <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-400/10 to-red-400/5 border border-orange-400/20">
        <p className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">Inflation Impact</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">What £{amount.toLocaleString()} becomes</span>
            <span className="text-lg font-black text-foreground">£{result.purchasingPower.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">Same goods will cost</span>
            <span className="text-sm font-bold text-foreground">£{result.futureCost.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-orange-400/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-destructive">Purchasing Power Lost</span>
              <span className="text-lg font-black text-destructive">-£{result.lostValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
          This is why keeping all your money in cash is risky. Investing aims to beat inflation and grow your real wealth.
        </p>
      </div>
    </div>
  );
}

function InputRow({ label, value, onChange, prefix, suffix, step }) {
  return (
    <div>
      <label className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-sm font-black text-muted-foreground">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-bold focus:outline-none focus:border-primary transition-colors"
        />
        {suffix && <span className="text-sm font-black text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

const TABS = [
  { id: "compound", label: "Compound", icon: TrendingUp, component: CompoundCalculator },
  { id: "drip", label: "DRIP", icon: Repeat, component: DripCalculator },
  { id: "inflation", label: "Inflation", icon: Flame, component: InflationCalculator },
];

export default function Calculators() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("compound");
  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 pt-safe-area-top select-none">
        <button onClick={() => navigate(-1)} className="text-foreground select-none">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-foreground">Calculators</h2>
      </div>

      <div className="px-4 pb-4 max-w-lg mx-auto">
        <div className="mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Tools</p>
          <h1 className="text-2xl font-black text-foreground mt-0.5">Investment Calculators</h1>
          <p className="text-xs text-muted-foreground mt-1">See the math behind investing — instantly.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-card border border-border rounded-2xl p-1 mb-5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}