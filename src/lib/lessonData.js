// Full curriculum data
export const UNITS = [
  {
    id: 1,
    title: "The Foundation",
    icon: "🌱",
    color: "#38BDF8",
    theme: "beginner",
    badge: { slug: "market_seedling", name: "Market Seedling", emoji: "🌱" },
  },
  {
    id: 2,
    title: "Understanding Companies",
    icon: "🏢",
    color: "#FFB800",
    theme: "city",
    badge: { slug: "company_analyst", name: "Company Analyst", emoji: "🏢" },
  },
  {
    id: 3,
    title: "Trading Mechanics",
    icon: "⚡",
    color: "#00FF87",
    theme: "trading",
    badge: { slug: "certified_trader", name: "Certified Trader", emoji: "⚡" },
  },
  {
    id: 4,
    title: "Portfolio Strategy",
    icon: "🧩",
    color: "#7C3AED",
    theme: "mountain",
    badge: { slug: "portfolio_architect", name: "Portfolio Architect", emoji: "🧩" },
  },
  {
    id: 5,
    title: "Advanced Concepts",
    icon: "🚀",
    color: "#FF4B4B",
    theme: "space",
    badge: { slug: "market_veteran", name: "Market Veteran", emoji: "🚀" },
  },
];

export const LESSONS = [
  // UNIT 1
  { id: "1.1", unit: 1, title: "What Is a Stock?", xp: 15, time: 4, teaser: "After this, you'll know what it means to 'own' a piece of Apple.", type: "story",
    slides: [
      { text: "Imagine you and your friends open a pizza shop called PizzaRocket 🍕", visual: "pizza" },
      { text: "The shop is worth $100,000 total. You split it into 1,000 equal pieces called shares.", visual: "shares" },
      { text: "Each share is worth $100. If someone buys one share, they own 0.1% of PizzaRocket.", visual: "ownership" },
      { text: "That's exactly what a stock is — a tiny ownership slice of a real company!", visual: "stock" },
    ],
    questions: [
      { type: "multiple_choice", q: "What is a stock?", options: ["A type of soup", "A small ownership piece of a company", "A loan to a company", "A government bond"], answer: 1 },
      { type: "multiple_choice", q: "If PizzaRocket has 1,000 shares and you own 10, what % do you own?", options: ["10%", "1%", "0.1%", "0.01%"], answer: 1 },
      { type: "true_false", q: "Owning a stock means you own part of a company.", answer: true },
      { type: "multiple_choice", q: "If PizzaRocket's value doubles, what happens to your shares?", options: ["Nothing", "They double in value too", "They lose value", "They stay the same"], answer: 1 },
      { type: "fill_blank", q: "A stock represents ___ in a company.", options: ["debt", "ownership", "a loan"], answer: 1 },
    ],
    summary: ["A stock is a small ownership piece of a company", "When the company grows, your stock value grows", "Stocks are traded on stock exchanges"],
  },
  { id: "1.2", unit: 1, title: "What Is the Stock Market?", xp: 15, time: 4, teaser: "Think of a farmers market, but instead of veggies, they sell company pieces.",
    slides: [
      { text: "The stock market is like a giant marketplace — but instead of fruit, people buy and sell pieces of companies.", visual: "market" },
      { text: "The New York Stock Exchange (NYSE) and NASDAQ are the two biggest markets.", visual: "exchanges" },
      { text: "Anyone can buy stocks through a broker — that's your ticket to enter the market.", visual: "broker" },
      { text: "Millions of trades happen every single day. Prices change every second!", visual: "trading" },
    ],
    questions: [
      { type: "multiple_choice", q: "What is the stock market?", options: ["A grocery store", "A place where stocks are bought and sold", "A government office", "A bank"], answer: 1 },
      { type: "true_false", q: "You need a broker to buy stocks.", answer: true },
      { type: "multiple_choice", q: "Which is a major stock exchange?", options: ["Amazon", "NYSE", "McDonald's", "Tesla"], answer: 1 },
    ],
    summary: ["The stock market is where stocks are bought and sold", "NYSE and NASDAQ are major exchanges", "You need a broker to trade"],
  },
  { id: "1.3", unit: 1, title: "Bulls, Bears, and What They Mean", xp: 15, time: 5, teaser: "Meet Bruno the Bull and Bella the Bear — they'll explain market trends.",
    slides: [
      { text: "When prices are going UP for a while, we call it a Bull Market 🐂. Bulls charge upward!", visual: "bull" },
      { text: "When prices DROP significantly, it's a Bear Market 🐻. Bears swipe downward!", visual: "bear" },
      { text: "A correction is when prices drop 10% from a peak. A crash is 20%+. Scary but normal!", visual: "correction" },
      { text: "Since 1928, the market has ALWAYS recovered from bear markets. Patience wins!", visual: "recovery" },
    ],
    questions: [
      { type: "multiple_choice", q: "A bull market means prices are...", options: ["Falling", "Rising", "Staying flat", "Crashing"], answer: 1 },
      { type: "multiple_choice", q: "A market correction is a drop of...", options: ["5%", "10%", "20%", "50%"], answer: 1 },
      { type: "true_false", q: "Bear markets mean prices are rising.", answer: false },
    ],
    summary: ["Bull market = prices rising", "Bear market = prices falling", "The market has always recovered historically"],
  },
  { id: "1.4", unit: 1, title: "How Prices Move: Supply and Demand", xp: 20, time: 5, teaser: "Why did that stock just jump 5%? It's all about buyers and sellers.",
    slides: [
      { text: "Stock prices move based on supply and demand — just like any marketplace.", visual: "supply_demand" },
      { text: "When MORE people want to buy than sell → price goes UP ⬆️", visual: "buyers" },
      { text: "When MORE people want to sell than buy → price goes DOWN ⬇️", visual: "sellers" },
      { text: "The price you see is where the last buyer and seller agreed to trade.", visual: "agreement" },
    ],
    questions: [
      { type: "multiple_choice", q: "What makes stock prices go up?", options: ["More sellers than buyers", "More buyers than sellers", "Government rules", "The weather"], answer: 1 },
      { type: "true_false", q: "Stock prices are determined by supply and demand.", answer: true },
      { type: "multiple_choice", q: "If everyone wants to sell a stock at once...", options: ["Price goes up", "Price stays same", "Price goes down", "Market closes"], answer: 2 },
    ],
    summary: ["More buyers = price rises", "More sellers = price falls", "Price = where buyers and sellers agree"],
  },
  { id: "1.5", unit: 1, title: "Reading a Stock Ticker", xp: 20, time: 4, teaser: "AAPL? TSLA? AMZN? Time to decode those mysterious letters.",
    slides: [
      { text: "Every stock has a ticker symbol — a short code. Apple = AAPL, Tesla = TSLA.", visual: "tickers" },
      { text: "A ticker shows: the symbol, current price, today's change ($), and change (%).", visual: "reading" },
      { text: "Green means the stock is UP today. Red means it's DOWN. Simple!", visual: "colors" },
      { text: "Volume tells you how many shares have been traded today — higher = more interest.", visual: "volume" },
    ],
    questions: [
      { type: "multiple_choice", q: "What does AAPL represent?", options: ["A type of fruit", "Apple's stock ticker", "An index fund", "A bond"], answer: 1 },
      { type: "true_false", q: "Green on a stock ticker means the price went up.", answer: true },
      { type: "multiple_choice", q: "Volume shows...", options: ["The stock's total value", "How many shares traded today", "The company's profit", "The dividend paid"], answer: 1 },
    ],
    summary: ["Every stock has a ticker symbol (e.g., AAPL)", "Green = up, Red = down", "Volume = number of shares traded"],
  },
  { id: "1.6", unit: 1, title: "What Are Indices?", xp: 15, time: 4, teaser: "The S&P 500 tracks 500 companies at once. Here's how.",
    slides: [
      { text: "An index is a basket of stocks that represents a slice of the market.", visual: "basket" },
      { text: "The S&P 500 tracks 500 of the largest US companies. It's the market's report card.", visual: "sp500" },
      { text: "NASDAQ focuses on tech stocks. The DOW tracks 30 huge blue-chip companies.", visual: "indices" },
      { text: "When people say 'the market is up' they usually mean the S&P 500 went up.", visual: "market_up" },
    ],
    questions: [
      { type: "multiple_choice", q: "What is a stock market index?", options: ["A single stock", "A basket of stocks", "A type of bond", "A trading fee"], answer: 1 },
      { type: "multiple_choice", q: "How many companies does the S&P 500 track?", options: ["50", "100", "500", "5000"], answer: 2 },
      { type: "true_false", q: "NASDAQ focuses mainly on technology stocks.", answer: true },
    ],
    summary: ["An index tracks a group of stocks", "S&P 500 = 500 largest US companies", "NASDAQ = tech-heavy, DOW = 30 blue chips"],
  },
  { id: "1.7", unit: 1, title: "How to Read a Basic Stock Chart", xp: 20, time: 5, teaser: "Those squiggly lines actually tell a story. Let's read it.",
    slides: [
      { text: "A stock chart shows price (Y-axis) over time (X-axis). Simple!", visual: "chart_basic" },
      { text: "Line charts connect closing prices. They show the big picture clearly.", visual: "line_chart" },
      { text: "Candlestick charts show open, close, high, and low for each period.", visual: "candle" },
      { text: "Volume bars at the bottom show how many shares were traded each day.", visual: "volume_bars" },
    ],
    questions: [
      { type: "multiple_choice", q: "The Y-axis on a stock chart shows...", options: ["Time", "Volume", "Price", "Company name"], answer: 2 },
      { type: "true_false", q: "Candlestick charts show more detail than line charts.", answer: true },
      { type: "multiple_choice", q: "Volume bars tell you...", options: ["The stock's price", "How many shares were traded", "The company's revenue", "Tomorrow's price"], answer: 1 },
    ],
    summary: ["Charts show price over time", "Line charts = simple, Candlestick = detailed", "Volume shows trading activity"],
  },
  { id: "1.8", unit: 1, title: "What Makes a Stock Go Up or Down?", xp: 20, time: 5, teaser: "Earnings, news, tweets, hype — lots of things move prices.",
    slides: [
      { text: "Company earnings beat expectations? Stock usually goes UP! 📈", visual: "earnings" },
      { text: "Bad news about a company — lawsuit, recall, scandal? Stock usually goes DOWN. 📉", visual: "bad_news" },
      { text: "Big economic events like interest rate changes affect ALL stocks at once.", visual: "macro" },
      { text: "Sometimes hype and emotion move prices more than facts. That's sentiment!", visual: "sentiment" },
    ],
    questions: [
      { type: "multiple_choice", q: "Good earnings usually make a stock...", options: ["Go down", "Go up", "Stay the same", "Get delisted"], answer: 1 },
      { type: "multiple_choice", q: "What is market sentiment?", options: ["A financial report", "The emotional mood of investors", "A type of stock order", "A trading fee"], answer: 1 },
      { type: "true_false", q: "Only company news can affect stock prices.", answer: false },
    ],
    summary: ["Earnings, news, and macro events move prices", "Sentiment = the mood of investors", "Many factors affect stock prices at once"],
  },
  // UNIT 2
  { id: "2.1", unit: 2, title: "Revenue, Profit, and Why They Matter", xp: 15, time: 4, teaser: "Revenue is vanity, profit is sanity. Let's learn why.",
    slides: [
      { text: "Revenue is ALL the money a company earns from selling stuff. It's the top line.", visual: "revenue" },
      { text: "Profit is what's LEFT after paying all expenses. Revenue minus costs = profit.", visual: "profit" },
      { text: "A company can have huge revenue but zero profit if costs are too high!", visual: "comparison" },
    ],
    questions: [
      { type: "multiple_choice", q: "Revenue is...", options: ["Money left after expenses", "Total money earned from sales", "A tax payment", "Shareholder money"], answer: 1 },
      { type: "true_false", q: "A company with high revenue always has high profit.", answer: false },
    ],
    summary: ["Revenue = total money earned", "Profit = revenue minus expenses", "High revenue doesn't guarantee profit"],
  },
  { id: "2.2", unit: 2, title: "What Are Earnings? EPS Explained", xp: 15, time: 4, teaser: "EPS is the most watched number in finance. Here's why it matters.",
    slides: [
      { text: "Earnings = profit. When companies report 'earnings', they mean how much they profited.", visual: "earnings" },
      { text: "EPS = Earnings Per Share. Total profit divided by number of shares.", visual: "eps" },
      { text: "If a company earns $10M and has 1M shares, EPS = $10. Higher is usually better!", visual: "calculation" },
    ],
    questions: [
      { type: "multiple_choice", q: "EPS stands for...", options: ["Extra Price Shares", "Earnings Per Share", "Equal Profit Split", "Equity Price Standard"], answer: 1 },
      { type: "fill_blank", q: "EPS = Total Earnings ÷ Number of ___", options: ["employees", "shares", "customers"], answer: 1 },
    ],
    summary: ["Earnings = profit", "EPS = profit per share", "Higher EPS is generally better"],
  },
  { id: "2.3", unit: 2, title: "Reading a Balance Sheet", xp: 20, time: 5, teaser: "Assets, liabilities, equity — sounds boring but it's actually like a health check.",
    slides: [
      { text: "A balance sheet is a snapshot of what a company OWNS and OWES at one point in time.", visual: "balance" },
      { text: "Assets = what the company owns (cash, buildings, equipment, patents).", visual: "assets" },
      { text: "Liabilities = what the company owes (loans, bills, debt).", visual: "liabilities" },
      { text: "Equity = Assets minus Liabilities. It's what shareholders actually own!", visual: "equity" },
    ],
    questions: [
      { type: "multiple_choice", q: "Assets minus Liabilities equals...", options: ["Revenue", "Equity", "Profit", "Dividends"], answer: 1 },
      { type: "true_false", q: "A balance sheet shows a company's performance over a year.", answer: false },
    ],
    summary: ["Balance sheet = snapshot of owns vs owes", "Assets - Liabilities = Equity", "It's a health check, not a performance review"],
  },
  { id: "2.4", unit: 2, title: "What Is Market Capitalisation?", xp: 15, time: 3, teaser: "It's how we measure a company's total value. Spoiler: some are worth trillions.",
    slides: [
      { text: "Market Cap = Share Price × Total Number of Shares. That's it!", visual: "market_cap" },
      { text: "If a stock is $100 and there are 1 billion shares, market cap = $100 billion.", visual: "calculation" },
      { text: "It tells you how much the entire company is worth according to the market.", visual: "valuation" },
    ],
    questions: [
      { type: "multiple_choice", q: "Market Cap equals...", options: ["Revenue times profit", "Share price times total shares", "EPS times revenue", "Assets minus liabilities"], answer: 1 },
      { type: "true_false", q: "Apple's market cap is over $1 trillion.", answer: true },
    ],
    summary: ["Market Cap = Price × Shares", "Shows total company value", "Used to compare company sizes"],
  },
  { id: "2.5", unit: 2, title: "Large Cap vs Mid Cap vs Small Cap", xp: 15, time: 4, teaser: "Size matters in stocks. Here's how companies are classified.",
    slides: [
      { text: "Large Cap = Market cap over $10 billion. Think Apple, Microsoft, Google.", visual: "large_cap" },
      { text: "Mid Cap = $2-10 billion. Growing companies with more room to expand.", visual: "mid_cap" },
      { text: "Small Cap = Under $2 billion. Higher risk but potentially higher reward.", visual: "small_cap" },
    ],
    questions: [
      { type: "multiple_choice", q: "A large-cap stock has a market cap of...", options: ["Under $1B", "$1-2B", "$2-10B", "Over $10B"], answer: 3 },
      { type: "true_false", q: "Small-cap stocks tend to be riskier than large-cap.", answer: true },
    ],
    summary: ["Large Cap > $10B, Mid Cap $2-10B, Small Cap < $2B", "Larger = more stable, Smaller = more volatile", "Diversifying across cap sizes reduces risk"],
  },
  // Checkpoint 1
  { id: "1.C", unit: 1, title: "The Basics Quiz", xp: 50, time: 5, type: "checkpoint",
    questions: [
      { type: "multiple_choice", q: "A stock represents...", options: ["Debt", "Ownership in a company", "A loan", "A tax"], answer: 1 },
      { type: "multiple_choice", q: "A bull market means prices are...", options: ["Falling", "Rising", "Flat", "Crashing"], answer: 1 },
      { type: "true_false", q: "The S&P 500 tracks 500 companies.", answer: true },
      { type: "multiple_choice", q: "Volume on a chart shows...", options: ["Price", "Shares traded", "Revenue", "Market cap"], answer: 1 },
      { type: "true_false", q: "More buyers than sellers pushes prices down.", answer: false },
    ],
    summary: ["You've mastered the fundamentals!", "Ready for the next level!", "🌱 Market Seedling badge earned!"],
  },
  // More Unit 2 lessons
  { id: "2.6", unit: 2, title: "Growth Stocks vs Value Stocks", xp: 15, time: 4, teaser: "Fast-growing tech darling or stable bargain? Two investing styles explained.",
    slides: [
      { text: "Growth stocks are companies growing fast — high potential but expensive. Think Tesla, NVIDIA.", visual: "growth" },
      { text: "Value stocks are underpriced gems — the market is sleeping on them. Think old-school banks.", visual: "value" },
      { text: "Growth = future potential. Value = current worth. Both have a place in a portfolio!", visual: "both" },
    ],
    questions: [
      { type: "multiple_choice", q: "Growth stocks typically have...", options: ["Low P/E ratios", "High growth potential", "Big dividends", "Low prices"], answer: 1 },
      { type: "true_false", q: "Value stocks are always bad investments.", answer: false },
    ],
    summary: ["Growth = high potential, usually expensive", "Value = underpriced relative to worth", "Both styles can be profitable"],
  },
  { id: "2.7", unit: 2, title: "Dividends — Getting Paid to Hold", xp: 15, time: 4, teaser: "Some stocks literally pay YOU just for owning them. Here's how.",
    slides: [
      { text: "A dividend is a payment companies make to shareholders from their profits.", visual: "dividends" },
      { text: "If you own 100 shares and the dividend is $1/share, you get $100! 💰", visual: "payment" },
      { text: "Dividend yield = annual dividend ÷ stock price. Higher yield = more income.", visual: "yield" },
    ],
    questions: [
      { type: "multiple_choice", q: "A dividend is...", options: ["A fee you pay", "A payment from the company to you", "A type of tax", "A stock split"], answer: 1 },
      { type: "true_false", q: "All stocks pay dividends.", answer: false },
    ],
    summary: ["Dividends = cash payments to shareholders", "Not all companies pay them", "Dividend yield measures the return"],
  },
  { id: "2.8", unit: 2, title: "P/E Ratio — Is It Expensive?", xp: 20, time: 5, teaser: "The P/E ratio is like a price tag that tells you if a stock is cheap or pricey.",
    slides: [
      { text: "P/E = Price per Share ÷ Earnings per Share. It shows how much you pay per $1 of profit.", visual: "pe" },
      { text: "A P/E of 15 means you pay $15 for every $1 the company earns. Lower = cheaper.", visual: "calculation" },
      { text: "But careful — a low P/E isn't always good, and a high P/E isn't always bad!", visual: "context" },
    ],
    questions: [
      { type: "multiple_choice", q: "P/E ratio equals...", options: ["Profit ÷ Expenses", "Price ÷ EPS", "Price ÷ Revenue", "EPS ÷ Price"], answer: 1 },
      { type: "true_false", q: "A lower P/E always means a better investment.", answer: false },
    ],
    summary: ["P/E = Price ÷ Earnings Per Share", "Lower P/E = relatively cheaper", "Context matters — compare within industries"],
  },
  // Unit 3 lessons
  { id: "3.1", unit: 3, title: "Market Orders vs Limit Orders", xp: 15, time: 4, teaser: "Two ways to buy: 'give me this now' vs 'only if the price is right.'",
    slides: [
      { text: "A Market Order says 'buy/sell NOW at whatever the current price is.' Fast but no price control.", visual: "market_order" },
      { text: "A Limit Order says 'buy/sell ONLY at this price or better.' You control the price!", visual: "limit_order" },
      { text: "Market orders fill instantly. Limit orders might not fill if the price never reaches your limit.", visual: "comparison" },
    ],
    questions: [
      { type: "multiple_choice", q: "A market order...", options: ["Sets a specific price", "Buys at the current price immediately", "Only works after hours", "Requires approval"], answer: 1 },
      { type: "true_false", q: "Limit orders always get filled.", answer: false },
    ],
    summary: ["Market order = instant at current price", "Limit order = only at your price or better", "Market = speed, Limit = price control"],
  },
  { id: "3.2", unit: 3, title: "Stop-Loss Orders", xp: 15, time: 4, teaser: "Your safety net. It automatically sells if things go wrong.",
    slides: [
      { text: "A stop-loss order automatically sells your stock if it drops to a certain price.", visual: "stoploss" },
      { text: "You set the trigger price. If the stock hits it, a sell order activates.", visual: "trigger" },
      { text: "It limits your downside. Think of it as an emergency exit for your investment!", visual: "safety" },
    ],
    questions: [
      { type: "multiple_choice", q: "A stop-loss order...", options: ["Buys more stock", "Sells automatically at a set price", "Locks in profits forever", "Cancels your order"], answer: 1 },
      { type: "true_false", q: "Stop-loss orders help limit your losses.", answer: true },
    ],
    summary: ["Stop-loss = automatic sell at a set price", "Protects against big losses", "Set it and forget it — your safety net"],
  },
];

export const BADGES = [
  { slug: "market_seedling", name: "Market Seedling", emoji: "🌱", description: "Complete Unit 1" },
  { slug: "company_analyst", name: "Company Analyst", emoji: "🏢", description: "Complete Unit 2" },
  { slug: "certified_trader", name: "Certified Trader", emoji: "⚡", description: "Complete Unit 3" },
  { slug: "portfolio_architect", name: "Portfolio Architect", emoji: "🧩", description: "Complete Unit 4" },
  { slug: "market_veteran", name: "Market Veteran", emoji: "🚀", description: "Complete Unit 5" },
  { slug: "week_warrior", name: "Week Warrior", emoji: "🔥", description: "7-day streak" },
  { slug: "month_master", name: "Month Master", emoji: "💪", description: "30-day streak" },
  { slug: "streak_legend", name: "Streak Legend", emoji: "🏆", description: "100-day streak" },
  { slug: "speed_demon", name: "Speed Demon", emoji: "⚡", description: "Lesson in under 60s" },
  { slug: "sharpshooter", name: "Sharpshooter", emoji: "🎯", description: "5 perfect quizzes in a row" },
  { slug: "first_trade", name: "First Trade", emoji: "💰", description: "Execute first paper trade" },
  { slug: "bull_rider", name: "Bull Rider", emoji: "📈", description: "Portfolio up 10%" },
  { slug: "to_the_moon", name: "To The Moon", emoji: "🚀", description: "Portfolio up 25%" },
  { slug: "diamond_hands", name: "Diamond Hands", emoji: "💎", description: "Hold a position 30 days" },
  { slug: "challenger", name: "Challenger", emoji: "🤝", description: "Win a friend challenge" },
  { slug: "league_champion", name: "League Champion", emoji: "🏅", description: "Finish #1 in league" },
  { slug: "news_junkie", name: "News Junkie", emoji: "📰", description: "Read 50 news briefings" },
  { slug: "genius", name: "Genius", emoji: "🧠", description: "100% on 10 quizzes" },
  { slug: "market_legend", name: "Market Legend", emoji: "👑", description: "Reach Level 50" },
  { slug: "contrarian", name: "Contrarian", emoji: "🎰", description: "Buy falling stock and profit" },
  { slug: "diversified", name: "Diversified", emoji: "📊", description: "Hold 10 different stocks" },
  { slug: "freeze_master", name: "Freeze Master", emoji: "❄️", description: "Use 10 streak freezes" },
  { slug: "global_thinker", name: "Global Thinker", emoji: "🌍", description: "Complete 5 different sectors" },
  { slug: "graduated", name: "Graduated", emoji: "🎓", description: "Pass all checkpoint exams" },
  { slug: "boss_slayer", name: "Boss Slayer", emoji: "🗡️", description: "Beat all Boss Battles" },
];

export const LEVEL_TITLES = [
  { min: 1, max: 4, title: "Market Newbie", emoji: "🐣" },
  { min: 5, max: 9, title: "Market Learner", emoji: "📖" },
  { min: 10, max: 14, title: "Junior Analyst", emoji: "🔍" },
  { min: 15, max: 19, title: "Stock Enthusiast", emoji: "📊" },
  { min: 20, max: 24, title: "Certified Trader", emoji: "⚡" },
  { min: 25, max: 29, title: "Senior Analyst", emoji: "💼" },
  { min: 30, max: 34, title: "Portfolio Pro", emoji: "🧩" },
  { min: 35, max: 39, title: "Market Expert", emoji: "🎯" },
  { min: 40, max: 49, title: "Wall Street Wizard", emoji: "🪄" },
  { min: 50, max: 50, title: "Market Legend", emoji: "👑" },
];

export const LEAGUE_TIERS = [
  { tier: 1, name: "Pebble League", emoji: "🪨" },
  { tier: 2, name: "Bronze League", emoji: "🥉" },
  { tier: 3, name: "Silver League", emoji: "🥈" },
  { tier: 4, name: "Gold League", emoji: "🥇" },
  { tier: 5, name: "Diamond League", emoji: "💎" },
  { tier: 6, name: "Sapphire League", emoji: "🔮" },
  { tier: 7, name: "Obsidian League", emoji: "🏆" },
];

export function getLevelTitle(level) {
  const entry = LEVEL_TITLES.find(l => level >= l.min && level <= l.max);
  return entry || LEVEL_TITLES[0];
}

export function getXpForLevel(level) {
  return level * 200;
}

export function getLevelFromXp(totalXp) {
  let level = 1;
  let xpNeeded = 0;
  while (level < 50) {
    xpNeeded += (level + 1) * 200;
    if (totalXp < xpNeeded) break;
    level++;
  }
  return level;
}

export function getLesson(lessonId) {
  return LESSONS.find(l => l.id === lessonId);
}

export function getLessonsForUnit(unitId) {
  return LESSONS.filter(l => l.unit === unitId);
}

export function getNextLesson(completedIds) {
  return LESSONS.find(l => !completedIds.includes(l.id));
}