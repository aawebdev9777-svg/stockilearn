/**
 * Daily Challenge System
 * Generates a fresh rotating challenge each day from a seeded pool.
 */

export const DAILY_QUESTIONS = [
  {
    id: "dq_1",
    q: "If you invest £100/month for 30 years at 8% annual return, roughly how much would you have?",
    options: ["£36,000", "£75,000", "£149,000", "£230,000"],
    answer: 2,
    explanation: "Compound interest is powerful! £100/month × 12 × 30 = £36K contributed, but compounding at 8% grows it to ~£149K. Time is your greatest asset.",
    topic: "compound",
    xp: 30,
  },
  {
    id: "dq_2",
    q: "What does 'diversification' mean in investing?",
    options: ["Buying one great stock", "Spreading investments across many assets", "Only buying index funds", "Avoiding the stock market"],
    answer: 1,
    explanation: "Diversification = don't put all your eggs in one basket. Spreading across sectors, geographies, and asset types reduces your risk.",
    topic: "portfolio",
    xp: 25,
  },
  {
    id: "dq_3",
    q: "What does 'buy the dip' mean?",
    options: ["Buy food while investing", "Purchase stocks when prices temporarily fall", "Avoid buying stocks", "Buy at all-time highs"],
    answer: 1,
    explanation: "Buying the dip = purchasing stocks during a temporary price decline. If the company is fundamentally strong, a short-term drop can be a great entry point.",
    topic: "psychology",
    xp: 25,
  },
  {
    id: "dq_4",
    q: "The S&P 500 has historically returned about ___ per year on average.",
    options: ["2-3%", "5-6%", "10-11%", "20-25%"],
    answer: 2,
    explanation: "The S&P 500 has averaged ~10% annual returns since 1926. Adjusted for inflation, that's about 7%. This is why long-term index investing is so powerful.",
    topic: "market_basics",
    xp: 30,
  },
  {
    id: "dq_5",
    q: "What is 'inflation'?",
    options: ["When stocks go up", "The general rise in prices over time", "A type of tax", "When interest rates fall"],
    answer: 1,
    explanation: "Inflation is the rate at which prices rise over time, reducing your money's purchasing power. UK target is 2%. Investing helps beat inflation.",
    topic: "economics",
    xp: 20,
  },
  {
    id: "dq_6",
    q: "What is an ETF?",
    options: ["A type of bond", "A basket of stocks traded like a single share", "A savings account", "A government fund"],
    answer: 1,
    explanation: "An ETF (Exchange-Traded Fund) is a basket of stocks or assets you can buy and sell like a single share. Great for diversification at low cost.",
    topic: "etfs",
    xp: 25,
  },
  {
    id: "dq_7",
    q: "True or False: You need a lot of money to start investing.",
    options: ["True — minimum £10,000", "False — you can start with very little", "True — minimum £1,000", "Depends on the broker"],
    answer: 1,
    explanation: "False! Many platforms let you start with £1-10. Fractional shares mean you can own a piece of Apple or Amazon for pocket money. Start early, start small.",
    topic: "basics",
    xp: 20,
  },
  {
    id: "dq_8",
    q: "What does P/E ratio tell you?",
    options: ["How profitable a company is", "How much you pay per £1 of earnings", "The company's debt level", "The stock's dividend"],
    answer: 1,
    explanation: "P/E (Price-to-Earnings) = Share Price ÷ EPS. A P/E of 20 means you're paying £20 for every £1 the company earns annually. It's a valuation metric.",
    topic: "valuation",
    xp: 30,
  },
  {
    id: "dq_9",
    q: "Which is generally the RISKIEST type of investment?",
    options: ["Government bonds", "Blue-chip stocks", "Small-cap penny stocks", "S&P 500 index fund"],
    answer: 2,
    explanation: "Small-cap and penny stocks are highly volatile with thin trading volumes. They can rise explosively but also crash to zero. Higher risk = higher potential reward AND loss.",
    topic: "risk",
    xp: 25,
  },
  {
    id: "dq_10",
    q: "What is dollar-cost averaging (DCA)?",
    options: ["Investing all your money at once", "Investing a fixed amount regularly regardless of price", "Only buying when markets fall", "Converting pounds to dollars"],
    answer: 1,
    explanation: "DCA means investing the same amount at regular intervals (e.g. £50/month). You buy more shares when prices are low and fewer when high — smoothing out timing risk.",
    topic: "strategy",
    xp: 30,
  },
  {
    id: "dq_11",
    q: "What is a stock market 'correction'?",
    options: ["A clerical error in stock prices", "A 10%+ fall from a recent high", "A 50%+ crash", "When a stock hits its all-time high"],
    answer: 1,
    explanation: "A correction = 10-19% decline from a peak. They happen roughly once a year and are completely normal. A 20%+ fall is a bear market.",
    topic: "stocks",
    xp: 25,
  },
  {
    id: "dq_12",
    q: "What is compound interest sometimes called?",
    options: ["The eighth wonder of the world", "The rule of 70", "The golden rule", "The snowball effect only"],
    answer: 0,
    explanation: "Albert Einstein (reportedly) called compound interest 'the eighth wonder of the world'. It's when your interest earns interest — creating exponential growth over time.",
    topic: "compound",
    xp: 20,
  },
  {
    id: "dq_13",
    q: "If inflation is 5% and your savings account pays 2%, your money is...",
    options: ["Growing in real terms", "Losing real purchasing power", "Breaking even", "Keeping up with inflation"],
    answer: 1,
    explanation: "If inflation outpaces your return, you're losing real purchasing power. Your £100 could buy less stuff next year. This is why investing matters more than just saving.",
    topic: "economics",
    xp: 25,
  },
  {
    id: "dq_14",
    q: "What happens to bond prices when interest rates rise?",
    options: ["Bond prices rise", "Bond prices fall", "Bond prices stay the same", "Bonds become riskier"],
    answer: 1,
    explanation: "When interest rates rise, existing bond prices fall. New bonds pay more interest, making old bonds less attractive. Inverse relationship = important concept!",
    topic: "advanced",
    xp: 35,
  },
];

// Get today's challenge using date as a seed
export function getTodaysChallenge() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}`;
  const seed = parseInt(dateStr) % DAILY_QUESTIONS.length;
  return DAILY_QUESTIONS[seed];
}

// Get a pool of 3 daily missions based on date
export function getTodaysMissions(seed = new Date().getDay()) {
  const allMissions = [
    { id: "m_lesson", icon: "⚡", title: "Complete a lesson", xp: 15, type: "lesson" },
    { id: "m_quiz",   icon: "🎯", title: "Pass a quiz",       xp: 10, type: "quiz" },
    { id: "m_trade",  icon: "📈", title: "Make a trade",      xp: 10, type: "trade" },
    { id: "m_streak", icon: "🔥", title: "Keep your streak",  xp: 5,  type: "streak" },
    { id: "m_watch",  icon: "👁️", title: "Add to watchlist",  xp: 5,  type: "watchlist" },
    { id: "m_daily",  icon: "📰", title: "Answer daily Q",    xp: 20, type: "daily" },
    { id: "m_perfect",icon: "💯", title: "Get 100% on quiz",  xp: 25, type: "perfect_quiz" },
  ];
  // Rotate 3 missions each day
  const start = seed % allMissions.length;
  return [
    allMissions[start % allMissions.length],
    allMissions[(start + 2) % allMissions.length],
    allMissions[(start + 4) % allMissions.length],
  ];
}