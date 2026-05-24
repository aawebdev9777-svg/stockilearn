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
      { text: "Imagine you and your friends open a pizza shop called PizzaRocket 🍕", visual: "pizza", detail: "You all put in money and hard work to get it started. Now the question is — who owns what?", example: "Apple started in a garage in 1976 with just 3 people. Today it's worth over $3 trillion — split into billions of tiny pieces." },
      { text: "The shop is worth $100,000 total. You split it into 1,000 equal pieces called shares.", visual: "shares", detail: "Each piece represents an equal fraction of the whole business — including its profits, assets, and future value.", example: "When companies like Airbnb went public, they created millions of shares so anyone could own a small piece." },
      { text: "Each share is worth $100. If someone buys one share, they own 0.1% of PizzaRocket.", visual: "ownership", detail: "That 0.1% means you're entitled to 0.1% of profits, and you get to vote on big company decisions!", example: "If you own 1 Apple share (~$180), you legally own a tiny fraction of iPhones, Macs, and all of Apple's profits." },
      { text: "That's exactly what a stock is — a tiny ownership slice of a real company!", visual: "stock", detail: "When you buy stock, you become a shareholder — a real part-owner. If the company grows, so does your investment.", example: "If you had bought $1,000 of Amazon stock in 2001, it would be worth over $600,000 today. Ownership compounds!" },
    ],
    questions: [
      { type: "multiple_choice", q: "What is a stock?", options: ["A type of soup", "A small ownership piece of a company", "A loan to a company", "A government bond"], answer: 1, explanation: "A stock represents a small ownership slice of a company. When you buy stock, you become a shareholder — a real part-owner!" },
      { type: "multiple_choice", q: "If PizzaRocket has 1,000 shares and you own 10, what % do you own?", options: ["10%", "1%", "0.1%", "0.01%"], answer: 1, explanation: "10 ÷ 1,000 = 0.01 = 1%. Ownership percentage = your shares ÷ total shares × 100." },
      { type: "true_false", q: "Owning a stock means you own part of a company.", answer: true, explanation: "Correct! Every shareholder is a part-owner of the company, with rights to a proportional share of profits and assets." },
      { type: "multiple_choice", q: "If PizzaRocket's value doubles, what happens to your shares?", options: ["Nothing", "They double in value too", "They lose value", "They stay the same"], answer: 1, explanation: "Your shares represent a fixed % of the company, so if the total value doubles, every share doubles too. That's the magic of equity!" },
      { type: "fill_blank", q: "A stock represents ___ in a company.", options: ["debt", "ownership", "a loan"], answer: 1, explanation: "Stocks = ownership. Bonds = debt (lending). This is the key difference between equity and debt investing." },
    ],
    summary: ["A stock is a small ownership piece of a company", "When the company grows, your stock value grows", "Stocks are traded on stock exchanges"],
  },
  { id: "1.2", unit: 1, title: "What Is the Stock Market?", xp: 15, time: 4, teaser: "Think of a farmers market, but instead of veggies, they sell company pieces.",
    slides: [
      { text: "The stock market is like a giant marketplace — but instead of fruit, people buy and sell pieces of companies.", visual: "market", detail: "Just like eBay connects buyers and sellers of goods, the stock market connects investors who want to buy or sell company shares.", example: "On a typical day, over $400 billion in stocks change hands on US exchanges alone." },
      { text: "The New York Stock Exchange (NYSE) and NASDAQ are the two biggest markets.", visual: "exchanges", detail: "NYSE is the classic floor-based exchange on Wall Street. NASDAQ was the first fully electronic exchange, founded in 1971.", example: "Tesla, Apple, and Amazon are listed on NASDAQ. Coca-Cola and JP Morgan are on NYSE." },
      { text: "Anyone can buy stocks through a broker — that's your ticket to enter the market.", visual: "broker", detail: "Brokers act as middlemen between you and the exchange. Modern apps like Robinhood, Fidelity, or eToro are all brokers.", example: "You can open a brokerage account in 10 minutes and buy your first stock with as little as $1 on some platforms!" },
      { text: "Millions of trades happen every single day. Prices change every second!", visual: "trading", detail: "Markets are open Monday–Friday, 9:30am–4pm Eastern Time. Outside those hours, some 'after-hours' trading still happens.", example: "Apple's stock price can change hundreds of times per second during busy trading days." },
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
      { text: "When prices are going UP for a while, we call it a Bull Market 🐂. Bulls charge upward!", visual: "bull", detail: "A bull market is officially defined as a 20%+ rise from recent lows. They can last months or even years.", example: "The bull market from 2009 to 2020 lasted over 11 years — the longest in US history. The S&P 500 rose ~400%!" },
      { text: "When prices DROP significantly, it's a Bear Market 🐻. Bears swipe their claws downward!", visual: "bear", detail: "A bear market = a 20%+ decline from recent highs. They're scary in the moment, but they're a normal part of investing cycles.", example: "During the 2008 financial crisis, the S&P 500 dropped 57%. Terrifying — but it fully recovered within 4 years." },
      { text: "A correction is when prices drop 10% from a peak. Normal and healthy — don't panic!", visual: "correction", detail: "Corrections happen roughly once a year on average. They reset overinflated prices and actually create better buying opportunities.", example: "In 2022, the NASDAQ dropped over 30% — a full bear market. By end of 2023, it had almost entirely recovered." },
      { text: "Sentiment drives markets as much as facts. Fear and greed move prices big!", visual: "sentiment", detail: "When fear grips investors, prices can fall far below real value. When greed takes over, prices can rise way beyond it.", example: "The 'Fear & Greed Index' is a real tool Wall Street uses. Extreme fear is often the BEST time to buy!" },
      { text: "Since 1928, the market has ALWAYS recovered from every single bear market. Patience wins!", visual: "recovery", detail: "The average bear market lasts about 9 months. The average bull market lasts about 3 years. Time in the market beats timing the market.", example: "Anyone who held through the 2020 COVID crash (−35%) and didn't panic-sell was up 100%+ within 18 months." },
    ],
    questions: [
      { type: "multiple_choice", q: "A bull market means prices are...", options: ["Falling", "Rising", "Staying flat", "Crashing"], answer: 1, explanation: "Bull markets = rising prices. The name comes from the way a bull thrusts its horns upward." },
      { type: "multiple_choice", q: "A bear market is officially defined as a drop of...", options: ["5%", "10%", "20%", "50%"], answer: 2, explanation: "A bear market = 20%+ decline from a recent high. A 10% drop is called a 'correction', not yet a bear market." },
      { type: "true_false", q: "Bear markets mean prices are rising.", answer: false, explanation: "Bear markets = falling prices. Bears swipe their claws downward — hence the name." },
      { type: "multiple_choice", q: "How long does the average bear market last?", options: ["1 month", "9 months", "2 years", "5 years"], answer: 1, explanation: "Bear markets average about 9 months, while bull markets last ~3 years. The pain is shorter than people think!" },
      { type: "true_false", q: "The stock market has recovered from every bear market in history.", answer: true, explanation: "Every single bear market since 1928 has been followed by a full recovery. Long-term, stocks go up." },
    ],
    summary: ["Bull market = 20%+ rise, Bear market = 20%+ fall", "Corrections (10% drops) are normal and healthy", "Fear and greed drive market sentiment", "The market has always recovered historically"],
  },
  { id: "1.4", unit: 1, title: "How Prices Move: Supply and Demand", xp: 20, time: 5, teaser: "Why did that stock just jump 5%? It's all about buyers and sellers.",
    slides: [
      { text: "Stock prices move based on supply and demand — just like any marketplace.", visual: "supply_demand", detail: "The same forces that make concert tickets expensive also make stock prices move. Scarcity + desire = price.", example: "When Taylor Swift announced a tour, tickets (limited supply) exploded in price because millions wanted them. Stocks work the same way!" },
      { text: "When MORE people want to buy than sell → price goes UP ⬆️", visual: "buyers", detail: "Every buyer needs a seller. If buyers outnumber sellers, sellers can demand a higher price — and they get it.", example: "When Apple announced the iPhone, so many investors wanted to buy Apple stock that the price jumped 8% in one day." },
      { text: "When MORE people want to sell than buy → price goes DOWN ⬇️", visual: "sellers", detail: "If many people rush to sell at once, buyers can demand a lower price. The seller who accepts the lowest offer wins the trade.", example: "During COVID in March 2020, so many investors panic-sold that the S&P 500 fell 34% in just 33 days." },
      { text: "The price you see at any moment is exactly where the last buyer and seller agreed.", visual: "agreement", detail: "This is called the 'last traded price'. It updates in real time as new trades happen, sometimes thousands per second.", example: "If you check Apple's price right now and it says $185.40, that's exactly what someone just paid for it a split second ago." },
      { text: "News and expectations shift demand instantly — that's why stocks react so fast to headlines!", visual: "trading", detail: "Markets are forward-looking. A stock price doesn't just reflect what a company IS worth today — it reflects what investors EXPECT it to be worth in the future.", example: "Nvidia's stock doubled in one year not because it was twice as profitable, but because investors expected AI to make it much more profitable." },
    ],
    questions: [
      { type: "multiple_choice", q: "What makes stock prices go up?", options: ["More sellers than buyers", "More buyers than sellers", "Government rules", "The weather"], answer: 1, explanation: "When buyers outnumber sellers, sellers can demand higher prices. Basic supply and demand!" },
      { type: "true_false", q: "Stock prices are determined by supply and demand.", answer: true, explanation: "Exactly right. The stock market is just a marketplace where buyers and sellers negotiate prices for company shares." },
      { type: "multiple_choice", q: "If everyone wants to sell a stock at once...", options: ["Price goes up", "Price stays same", "Price goes down", "Market closes"], answer: 2, explanation: "Too many sellers = buyers have power to demand lower prices. This is why panic-selling crashes prices." },
      { type: "multiple_choice", q: "The 'last traded price' means...", options: ["The highest price today", "The price the stock will open at tomorrow", "The price of the most recent completed trade", "The average price over 30 days"], answer: 2, explanation: "The displayed price is simply what the last buyer and seller agreed to pay moments ago. It's always the most recent transaction." },
      { type: "true_false", q: "Stock prices only reflect a company's current value, not future expectations.", answer: false, explanation: "Markets are forward-looking! Prices reflect what investors EXPECT to happen — that's why good news about the future moves prices even when nothing has happened yet." },
    ],
    summary: ["More buyers = price rises, more sellers = price falls", "The current price = last completed trade price", "News shifts expectations instantly, moving prices", "Markets are forward-looking — they price in the future"],
  },
  { id: "1.5", unit: 1, title: "Reading a Stock Ticker", xp: 20, time: 5, teaser: "AAPL? TSLA? AMZN? Time to decode those mysterious letters.",
    slides: [
      { text: "Every stock has a ticker symbol — a short code that's unique to that company.", visual: "tickers", detail: "Ticker symbols were invented when stock prices had to be telegraphed across the country. Short codes saved time.", example: "AAPL = Apple. TSLA = Tesla. AMZN = Amazon. MSFT = Microsoft. GOOGL = Alphabet (Google). NVDA = NVIDIA." },
      { text: "A ticker display shows: symbol, current price, dollar change, and % change today.", visual: "reading", detail: "The % change is relative to yesterday's closing price. So '+1.5%' means the stock is 1.5% higher than where it ended yesterday.", example: "AAPL $185.40 ▲ +$2.30 (+1.26%) means Apple closed yesterday at $183.10 and is now $2.30 higher." },
      { text: "Green means the stock is UP today. Red means it's DOWN. Simple!", visual: "colors", detail: "This colour convention is universal on all financial platforms worldwide. Red and green are the universal language of markets.", example: "NVDA +4.2% in green = great news for Nvidia holders! TSLA -2.1% in red = Tesla dropped today." },
      { text: "Volume tells you HOW MANY shares traded today — higher volume = more conviction.", visual: "volume", detail: "High volume on a price move means many traders agree it's significant. Low volume moves are less trustworthy.", example: "If Apple rises 3% on 5x its average volume, that's a strong signal. If it rises 3% on half its normal volume, it's less meaningful." },
      { text: "52-week high/low shows the range a stock has traded in over the past year.", visual: "reading", detail: "A stock trading near its 52-week high might be in a strong uptrend. Trading near its 52-week low might be a bargain — or a falling knife!", example: "If TSLA's 52-week range is $138–$282 and it's currently $185, it's about in the middle — neither extreme." },
    ],
    questions: [
      { type: "multiple_choice", q: "What does AAPL represent?", options: ["A type of fruit", "Apple's stock ticker", "An index fund", "A bond"], answer: 1, explanation: "AAPL is Apple's ticker symbol on the NASDAQ exchange. Every publicly traded company has a unique ticker." },
      { type: "true_false", q: "Green on a stock ticker means the price went up.", answer: true, explanation: "Green = price went up today vs yesterday's close. Red = price went down. Universal convention on all platforms." },
      { type: "multiple_choice", q: "Volume shows...", options: ["The stock's total value", "How many shares traded today", "The company's profit", "The dividend paid"], answer: 1, explanation: "Volume = number of shares traded in the current session. High volume means more investors are active in that stock." },
      { type: "multiple_choice", q: "A stock shows: MSFT $420.00 ▲ +$5.00. This means...", options: ["Microsoft dropped $5 today", "Microsoft is up $5 vs yesterday's close", "Microsoft's all-time high is $420", "Microsoft pays a $5 dividend"], answer: 1, explanation: "The ▲ arrow and + sign mean it's UP. +$5.00 means $5 above where it closed yesterday." },
      { type: "true_false", q: "High volume on a price move makes it more significant.", answer: true, explanation: "When many traders act in the same direction (high volume), it carries more weight than a small move on thin volume." },
    ],
    summary: ["Ticker symbols are unique codes for each company (e.g. AAPL)", "Green = up today, Red = down today vs yesterday", "% change is relative to yesterday's closing price", "Volume = shares traded; higher volume = more conviction"],
  },
  { id: "1.6", unit: 1, title: "What Are Indices?", xp: 15, time: 5, teaser: "The S&P 500 tracks 500 companies at once. Here's how.",
    slides: [
      { text: "An index is a basket of stocks that gives you one number to represent the whole market.", visual: "basket", detail: "Instead of tracking 500 individual stocks, an index distils them into a single number you can follow at a glance.", example: "S&P 500 at 5,200 means the 500 biggest US companies are, on average, priced at a level that equals 5,200 on the index scale." },
      { text: "The S&P 500 tracks 500 of the largest US companies — it's the market's report card.", visual: "sp500", detail: "The S&P 500 is weighted by market cap — bigger companies have more influence on the index than smaller ones.", example: "Apple, Microsoft, Nvidia, and Amazon together make up ~25% of the S&P 500. When those 4 move, the whole index moves." },
      { text: "NASDAQ Composite focuses on tech stocks. The Dow Jones tracks just 30 huge companies.", visual: "indices", detail: "Each index has a different purpose. NASDAQ = tech growth. Dow = established American blue chips. S&P 500 = the broadest US market view.", example: "Netflix, Meta, and Tesla are in NASDAQ. Coca-Cola, McDonald's, and Boeing are Dow components." },
      { text: "The UK has the FTSE 100 — the 100 biggest companies on the London Stock Exchange.", visual: "market_up", detail: "Just like the S&P 500 represents the US economy, the FTSE 100 is the UK's economic barometer.", example: "Shell, HSBC, AstraZeneca, and Unilever are all FTSE 100 companies. They represent the UK's biggest businesses." },
      { text: "You can invest IN an index via index funds — and own all 500 companies at once!", visual: "sp500", detail: "Index funds (like ETFs) copy the index, so you own a tiny slice of every company in it. Warren Buffett recommends them!", example: "Buying 1 share of VOO (an S&P 500 ETF) gives you exposure to Apple, Microsoft, Amazon, and 497 other companies for one price." },
    ],
    questions: [
      { type: "multiple_choice", q: "What is a stock market index?", options: ["A single stock", "A basket of stocks measuring market performance", "A type of bond", "A trading fee"], answer: 1, explanation: "An index is a basket of stocks that gives you a single number to represent how that group is performing." },
      { type: "multiple_choice", q: "How many companies does the S&P 500 track?", options: ["50", "100", "500", "5000"], answer: 2, explanation: "The S&P 500 tracks 500 of the largest US publicly traded companies, weighted by market cap." },
      { type: "true_false", q: "NASDAQ focuses mainly on technology stocks.", answer: true, explanation: "NASDAQ is heavily tech-focused — Apple, Microsoft, Nvidia, Meta, and Amazon are all NASDAQ-listed." },
      { type: "multiple_choice", q: "What is the UK's main stock index?", options: ["S&P 100", "FTSE 100", "Dow Jones", "NASDAQ UK"], answer: 1, explanation: "The FTSE 100 (pronounced 'Footsie') tracks the 100 largest companies on the London Stock Exchange." },
      { type: "true_false", q: "Buying an index fund lets you own a small piece of every company in that index.", answer: true, explanation: "Index funds replicate an index by holding all (or most) of its stocks. One purchase = instant diversification across hundreds of companies." },
    ],
    summary: ["An index tracks a group of stocks as one number", "S&P 500 = 500 largest US companies (most important)", "NASDAQ = tech-heavy, FTSE 100 = top 100 UK companies", "Index funds let you invest in an entire index at once"],
  },
  { id: "1.7", unit: 1, title: "How to Read a Basic Stock Chart", xp: 20, time: 5, teaser: "Those squiggly lines actually tell a story. Let's read it.",
    slides: [
      { text: "A stock chart shows price (Y-axis) over time (X-axis). It's a picture of a company's history.", visual: "chart_basic", detail: "The X-axis (horizontal) is time — could be minutes, days, months, or years. The Y-axis (vertical) is the price.", example: "A chart going from bottom-left to top-right is an uptrend. Top-left to bottom-right is a downtrend. Flat = sideways." },
      { text: "Line charts connect the closing prices each day. Great for seeing the big trend at a glance.", visual: "line_chart", detail: "The closing price (4pm for US stocks) is the most important price of the day — it's what the market 'agreed on' at the end.", example: "Tesla's 1-year line chart tells you at a glance: is it higher or lower than a year ago? That's all you need to start." },
      { text: "Candlestick charts show 4 data points per period: open, close, high, and low.", visual: "candle", detail: "Each 'candle' is a rectangle. Green/white = price closed HIGHER than it opened. Red/black = closed LOWER. The wicks show the high and low.", example: "A long green candle on Apple's chart after an earnings report means the stock opened low and rallied hard to close much higher that day." },
      { text: "Volume bars at the bottom show HOW MANY shares were traded in each period.", visual: "volume_bars", detail: "Big volume bars on price moves = strong conviction. Tiny volume on a big price move = treat it with suspicion.", example: "Nvidia surged 24% in one day after a blockbuster earnings report — on 5x its average daily volume. That's a very meaningful move." },
      { text: "Time ranges let you zoom in or out: 1D, 1W, 1M, 3M, 1Y, 5Y, ALL.", visual: "chart_basic", detail: "Short-term charts (1D, 1W) show noise. Long-term charts (1Y, 5Y) show the real trend. Most investors care about 1Y and 5Y.", example: "A stock might look terrifying on a 1-week chart but beautiful on a 5-year chart. Always zoom out before panicking!" },
    ],
    questions: [
      { type: "multiple_choice", q: "The Y-axis on a stock chart shows...", options: ["Time", "Volume", "Price", "Company name"], answer: 2, explanation: "Y-axis = price (vertical). X-axis = time (horizontal). Together they show how price has changed over time." },
      { type: "true_false", q: "Candlestick charts show more detail than line charts.", answer: true, explanation: "Each candlestick shows open, close, high, and low — four data points vs just one (closing price) for a line chart." },
      { type: "multiple_choice", q: "Volume bars tell you...", options: ["The stock's price", "How many shares were traded", "The company's revenue", "Tomorrow's price"], answer: 1, explanation: "Volume = number of shares traded. High volume makes price moves more significant and trustworthy." },
      { type: "multiple_choice", q: "A green candlestick means...", options: ["The stock went down that day", "The stock closed higher than it opened", "The stock hit a new all-time high", "The company reported profits"], answer: 1, explanation: "Green (or white) candles = closing price was HIGHER than the opening price. Red (or black) = it closed lower than it opened." },
      { type: "true_false", q: "You should always look at short-term charts before making investment decisions.", answer: false, explanation: "Short-term charts show noise and volatility. Long-term charts (1Y, 5Y) reveal the real trend and are more useful for investment decisions." },
    ],
    summary: ["Charts show price (Y-axis) over time (X-axis)", "Line charts = simple trend view, Candlestick = detailed (open/close/high/low)", "Volume bars show how many shares traded", "Always look at multiple time ranges — zoom out before panicking"],
  },
  { id: "1.8", unit: 1, title: "What Makes a Stock Go Up or Down?", xp: 20, time: 6, teaser: "Earnings, news, tweets, hype — lots of things move prices.",
    slides: [
      { text: "Company earnings beat expectations? Stock usually goes UP! The market loves positive surprises.", visual: "earnings", detail: "It's not just whether a company made profit — it's whether they did BETTER than analysts expected. The 'beat' is everything.", example: "Nvidia reported earnings 20% above expectations in 2023. Its stock jumped 24% the next day. Beating expectations is rocket fuel!" },
      { text: "Bad news — lawsuits, product recalls, fraud, executive scandals — usually tanks a stock.", visual: "bad_news", detail: "Trust is worth billions. When investors lose confidence in a company's management or products, they sell fast.", example: "In 2015, Volkswagen's emissions scandal wiped $25 billion off its market cap in just two days. Scandal = disaster for shareholders." },
      { text: "Macro events — interest rates, inflation, recessions — affect ALL stocks simultaneously.", visual: "macro", detail: "When central banks raise interest rates, borrowing costs rise for every company. That reduces profits — so all stocks tend to fall.", example: "In 2022, the US Federal Reserve raised interest rates aggressively to fight inflation. The S&P 500 fell 19% that year." },
      { text: "Sometimes hype and emotion move prices more than any fundamental fact. That's sentiment!", visual: "sentiment", detail: "Social media, news headlines, and influencer opinions can send stocks flying or crashing even with no real news.", example: "GameStop's stock rose 1,700% in 2021 driven purely by Reddit hype — not because the company's business changed at all!" },
      { text: "Competition, new products, and industry trends can also make or break a stock over time.", visual: "market", detail: "A company can be doing everything right but still see its stock fall if a competitor launches something better.", example: "When ChatGPT launched in 2022, Google's stock dropped 9% in a day — investors feared AI would threaten Google's search dominance." },
    ],
    questions: [
      { type: "multiple_choice", q: "Good earnings usually make a stock...", options: ["Go down", "Go up", "Stay the same", "Get delisted"], answer: 1, explanation: "Earnings beats are rocket fuel for stocks. The key is beating EXPECTATIONS, not just making a profit." },
      { type: "multiple_choice", q: "What is market sentiment?", options: ["A financial report", "The emotional mood of investors", "A type of stock order", "A trading fee"], answer: 1, explanation: "Sentiment is the collective fear or greed of the market. It can override fundamentals in the short term." },
      { type: "true_false", q: "Only company news can affect stock prices.", answer: false, explanation: "Macro events like interest rate changes, inflation data, and geopolitical events affect all stocks at once — not just individual companies." },
      { type: "multiple_choice", q: "When interest rates rise, stocks tend to...", options: ["Go up strongly", "Stay the same", "Fall overall", "Become more volatile only"], answer: 2, explanation: "Higher interest rates increase borrowing costs for companies, reduce profits, and make bonds more attractive vs stocks — so stock prices generally fall." },
      { type: "true_false", q: "A company's stock can fall even if the business is doing well.", answer: true, explanation: "Competition, macro headwinds, changing sentiment, or rising rates can all pressure a stock price even when the underlying business is healthy." },
    ],
    summary: ["Earnings beats are the biggest short-term price catalyst", "Scandals and bad news destroy investor trust fast", "Macro events (rates, inflation) move all stocks together", "Sentiment = emotional mood; it can override logic short-term"],
  },
  // UNIT 2
  { id: "2.1", unit: 2, title: "Revenue, Profit, and Why They Matter", xp: 15, time: 5, teaser: "Revenue is vanity, profit is sanity. Let's learn why.",
    slides: [
      { text: "Revenue is ALL the money a company earns from selling stuff — before any costs.", visual: "revenue", detail: "Revenue is called the 'top line' because it appears at the top of a company's income statement. It's the starting point.", example: "Amazon's 2023 revenue was $575 billion. That's every dollar from AWS, Prime, product sales, and ads combined — before expenses." },
      { text: "Profit is what's LEFT after paying ALL expenses. Revenue minus ALL costs = profit.", visual: "profit", detail: "Profit (also called net income or 'the bottom line') is what shareholders actually own a slice of — not revenue!", example: "Amazon had $575B revenue but only ~$30B net profit. That 5% profit margin tells you how much of each dollar sold actually becomes profit." },
      { text: "A company can have HUGE revenue but zero (or negative) profit if costs are too high!", visual: "comparison", detail: "This is why revenue alone is misleading. A startup with $100M revenue burning $150M in costs is actually losing money.", example: "Uber had billions in revenue for years but was unprofitable until 2023. High growth doesn't always mean good economics." },
      { text: "Gross profit = Revenue minus cost of goods. Operating profit also subtracts running costs.", visual: "calculation", detail: "There are multiple layers of profit: Gross Profit → Operating Profit → Net Profit. Each strips away different types of costs.", example: "Apple's gross profit margin is ~45% — for every $1 of iPhone sold, 45 cents is gross profit. Net profit margin is ~25%." },
      { text: "Profit margins reveal how EFFICIENT a business is. Higher margin = more cash from each sale.", visual: "eps", detail: "Profit margin = Net Profit ÷ Revenue × 100. A 20% margin means 20 cents of every dollar earned becomes profit.", example: "Microsoft has ~35% net margin. McDonald's has ~33%. A supermarket might have 2-3%. Margins vary hugely by industry." },
    ],
    questions: [
      { type: "multiple_choice", q: "Revenue is...", options: ["Money left after expenses", "Total money earned from sales", "A tax payment", "Shareholder money"], answer: 1, explanation: "Revenue = all money earned from sales before ANY costs are deducted. It's the 'top line' of the income statement." },
      { type: "true_false", q: "A company with high revenue always has high profit.", answer: false, explanation: "High revenue means nothing if costs are higher! A company can have billions in revenue and still lose money." },
      { type: "multiple_choice", q: "Profit margin of 20% means...", options: ["20% of revenue is wasted", "The company loses 20% on each sale", "20 cents of every dollar earned becomes profit", "The company grows 20% per year"], answer: 2, explanation: "Profit margin = Net Profit ÷ Revenue. 20% margin = 20 cents profit for every $1 in revenue." },
      { type: "fill_blank", q: "Revenue minus all costs equals ___.", options: ["revenue", "profit", "dividends"], answer: 1, explanation: "Profit = Revenue − Costs. It's what's left over after the company pays everything it owes." },
      { type: "true_false", q: "Net profit is what shareholders are actually entitled to a slice of.", answer: true, explanation: "Shareholders own the company, so they own a slice of net profit. This is why EPS (earnings per share) is based on net profit, not revenue." },
    ],
    summary: ["Revenue = all money earned (before costs)", "Profit = revenue minus all expenses", "Profit margin % shows how efficient the business is", "High revenue alone doesn't mean a good investment"],
  },
  { id: "2.2", unit: 2, title: "What Are Earnings? EPS Explained", xp: 15, time: 5, teaser: "EPS is the most watched number in finance. Here's why it matters.",
    slides: [
      { text: "Earnings = net profit. When Wall Street talks about 'earnings', they mean bottom-line profit.", visual: "earnings", detail: "Four times a year, every public company releases an 'earnings report' — a full breakdown of revenues, costs, and profit for the quarter.", example: "Apple's Q1 2024 earnings: Revenue $119.6B, Net Profit $33.9B. These numbers move the stock price more than almost anything else." },
      { text: "EPS = Earnings Per Share. Total net profit ÷ total shares outstanding.", visual: "eps", detail: "EPS lets you compare profitability between companies of different sizes. It's 'how much profit does each share of the company represent?'", example: "If Apple earns $100B and has 15B shares, EPS = $6.67. Each Apple share 'earned' $6.67 of profit that year." },
      { text: "Growing EPS year-over-year is one of the best signs of a healthy, compounding business.", visual: "calculation", detail: "If EPS grows 15% per year, the company is doubling its earnings per share roughly every 5 years. Compounding at work!", example: "Microsoft's EPS grew from $2.10 in 2014 to over $11 in 2024 — 5x growth. Its stock went up 10x in the same period." },
      { text: "Analysts forecast EPS. If a company BEATS forecasts, the stock usually jumps!", visual: "market", detail: "Wall Street analysts set consensus EPS estimates before earnings. 'Beating' by even a few cents can send a stock soaring.", example: "When Nvidia beat EPS estimates by 20% in May 2023, its stock jumped 24% in a single session." },
      { text: "Diluted EPS accounts for all possible shares — stock options, convertible bonds, etc.", visual: "shares", detail: "Always look at diluted EPS rather than basic EPS, as it shows the 'worst case' scenario if all convertible securities were exercised.", example: "A company's basic EPS might be $5.00 but diluted EPS is $4.50 if there are many outstanding employee stock options." },
    ],
    questions: [
      { type: "multiple_choice", q: "EPS stands for...", options: ["Extra Price Shares", "Earnings Per Share", "Equal Profit Split", "Equity Price Standard"], answer: 1, explanation: "EPS = Earnings Per Share. It tells you how much profit the company made per share of stock." },
      { type: "fill_blank", q: "EPS = Total Earnings ÷ Number of ___", options: ["employees", "shares", "customers"], answer: 1, explanation: "EPS = Net Profit ÷ Total Shares. Divide the company's total profit by how many shares exist." },
      { type: "multiple_choice", q: "A company has $50M profit and 10M shares. What's the EPS?", options: ["$5", "$50", "$500", "$0.50"], answer: 0, explanation: "$50M ÷ 10M shares = $5 EPS. Simple division!" },
      { type: "true_false", q: "If a company beats EPS estimates, its stock usually goes up.", answer: true, explanation: "Beating analyst expectations is like a positive surprise for the market. Investors react by buying — pushing the price up." },
      { type: "true_false", q: "Diluted EPS is always higher than basic EPS.", answer: false, explanation: "Diluted EPS is usually LOWER than basic EPS — it accounts for all extra shares that could be created from options and convertibles, diluting the profit per share." },
    ],
    summary: ["Earnings = net profit; reported quarterly", "EPS = total profit ÷ total shares", "Beating EPS estimates usually sends stocks higher", "Growing EPS over time = compounding wealth for shareholders"],
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
      { text: "A stop-loss order automatically sells your stock if it drops to a certain price.", visual: "stoploss", detail: "You set a trigger price below the current price. If the stock falls to that level, it automatically sells — protecting you from further loss.", example: "You buy Apple at £180 and set a stop-loss at £162 (10% below). If AAPL falls to £162, it auto-sells, limiting your loss to £18/share." },
      { text: "You set the trigger price. If the stock hits it, a sell order activates.", visual: "trigger", detail: "The stop price should reflect your maximum acceptable loss — often 7-10% below your buy price is used as a rule of thumb.", example: "Professional traders often risk no more than 1-2% of their total portfolio on any single trade. Stop-losses enforce that discipline." },
      { text: "It limits your downside. Think of it as an emergency exit for your investment!", visual: "safety", detail: "Without a stop-loss, emotions can make you hold a losing position too long hoping it recovers — often making losses worse.", example: "Studies show investors without stop-losses hold losing stocks 3x longer than winning stocks. Stop-losses override that bias." },
    ],
    questions: [
      { type: "multiple_choice", q: "A stop-loss order...", options: ["Buys more stock", "Sells automatically at a set price", "Locks in profits forever", "Cancels your order"], answer: 1, explanation: "A stop-loss triggers an automatic sell when the price hits your set level, protecting you from larger losses." },
      { type: "true_false", q: "Stop-loss orders help limit your losses.", answer: true, explanation: "That's their exact purpose — they create a maximum loss boundary so you don't hold a falling stock forever hoping it recovers." },
      { type: "multiple_choice", q: "If you buy at £100 and set stop-loss at £90, you lose a max of...", options: ["£100", "£10 per share", "£90 per share", "Nothing"], answer: 1, explanation: "£100 - £90 = £10 per share maximum loss. That's the power of a stop-loss — knowing your worst case before you invest." },
    ],
    summary: ["Stop-loss = automatic sell at a set price", "Protects against big losses", "Set it and forget it — your safety net"],
  },
  { id: "3.3", unit: 3, title: "Short Selling Explained", xp: 20, time: 5, teaser: "What if you could profit from a stock going DOWN? That's short selling.",
    slides: [
      { text: "Short selling = borrowing shares, selling them now, buying back cheaper later. You profit from falling prices!", visual: "short", detail: "You borrow shares from a broker, sell them at the current price, wait for the price to fall, buy them back cheaper, return them to the broker, and pocket the difference.", example: "You borrow 10 Tesla shares at £200 each (£2,000 total), sell them. Price drops to £150. You buy back for £1,500. Profit = £500. Pure falling price profit." },
      { text: "Short selling has theoretically UNLIMITED risk — a stock can rise forever, losses have no cap!", visual: "risk", detail: "When you buy normally, the worst case is losing 100% of your investment. When shorting, the stock can keep rising, creating unlimited losses.", example: "In 2021, GameStop rose 1,700% in days. Short sellers betting it would fall lost BILLIONS. Short squeeze is every short-seller's nightmare." },
      { text: "Short selling is an advanced strategy used by hedge funds and professionals.", visual: "professional", detail: "Individual investors can technically short stocks, but most beginners should avoid it. The risk/reward is very different from regular investing.", example: "The famous Gamestop short squeeze happened because Reddit traders noticed heavily shorted stocks and bought aggressively — trapping the short sellers." },
    ],
    questions: [
      { type: "multiple_choice", q: "Short sellers profit when stock prices...", options: ["Rise", "Stay the same", "Fall", "Split"], answer: 2, explanation: "Short sellers borrow shares and sell them, hoping to buy back cheaper. Price falls = profit for the short seller." },
      { type: "true_false", q: "Short selling has limited downside risk, like regular buying.", answer: false, explanation: "Short selling has theoretically unlimited risk — a stock can keep rising forever, creating endless losses for the short seller." },
      { type: "multiple_choice", q: "A short squeeze happens when...", options: ["A stock falls fast", "Heavily shorted stocks rise rapidly, forcing shorts to cover", "Options expire", "A company reports bad earnings"], answer: 1, explanation: "A short squeeze: shorted stock rises fast → shorts must buy to cover losses → buying pushes price higher → forces more covering. Vicious cycle!" },
    ],
    summary: ["Short selling = profit from falling prices", "Unlimited potential loss — very risky", "Short squeezes can destroy short positions instantly"],
  },
  { id: "3.4", unit: 3, title: "Reading Company Earnings Reports", xp: 20, time: 6, teaser: "Every 3 months, companies show their report cards. Here's how to read them.",
    slides: [
      { text: "Every public company releases an earnings report 4 times a year — quarterly. It's their financial report card.", visual: "earnings_report", detail: "The earnings report contains: revenue, profit, EPS, guidance (future forecasts), and management commentary. Each section tells you something different.", example: "Apple's Q1 2024 earnings: Revenue $119.6B (+2% YoY), Net Income $33.9B, EPS $2.18. All three beat analyst estimates — stock rose 3% after-hours." },
      { text: "Earnings call = when management speaks live about results and answers analyst questions.", visual: "earnings_call", detail: "Management tone matters as much as numbers. Confident guidance = investors buy. Cautious language about the future = investors often sell.", example: "Nvidia's CEO Jensen Huang giving bullish AI commentary on earnings calls has consistently moved the stock up even on 'average' quarters." },
      { text: "Revenue guidance tells you what management EXPECTS to earn next quarter. It's about the future!", visual: "guidance", detail: "If management 'raises guidance', they expect to earn more than previously forecast. If they 'cut guidance', they expect less. Guidance moves stocks enormously.", example: "A company beating Q1 earnings but cutting Q2 guidance often falls despite the 'good' results. Markets are always forward-looking." },
      { text: "Compare results to 'analyst consensus' — the average forecast from professional analysts.", visual: "consensus", detail: "A stock can have great results but fall if it doesn't beat consensus estimates. 'Beat and raise' (beat estimates AND raise guidance) is the ideal combo.", example: "NVIDIA's stock rose 24% in one session after beating EPS by 20% AND raising revenue guidance for the following quarter. That's a beat-and-raise." },
    ],
    questions: [
      { type: "multiple_choice", q: "How often do public companies report earnings?", options: ["Monthly", "Quarterly (4x/year)", "Annually", "Weekly"], answer: 1, explanation: "Public companies report earnings every quarter (every 3 months), giving 4 reports per year." },
      { type: "true_false", q: "A stock can fall even after great earnings results.", answer: true, explanation: "If great results don't beat analyst expectations or guidance is disappointing, the stock often falls despite reporting profits." },
      { type: "multiple_choice", q: "What is 'guidance' in an earnings report?", options: ["The CEO's salary", "Management's forecast for future earnings", "The company's dividend", "The debt level"], answer: 1, explanation: "Guidance = management's forecast for the next period's revenue and profit. Raising guidance is very bullish; cutting it is very bearish." },
    ],
    summary: ["Earnings reports come quarterly — they're the financial report card", "Beat expectations + raise guidance = best outcome for stock price", "Guidance is often more important than current results"],
  },
  { id: "3.5", unit: 3, title: "What Are Options? (Introduction)", xp: 25, time: 6, teaser: "The derivatives world — sounds scary, but the concept is simple.",
    slides: [
      { text: "An option gives you the RIGHT (not obligation) to buy or sell a stock at a set price before a set date.", visual: "options", detail: "You pay a 'premium' for this right. If conditions don't become favourable, you can simply let the option expire — your only loss is the premium paid.", example: "Imagine paying £5 for the right to buy Apple at £180 anytime in the next month. If Apple rises to £200, you exercise it and profit £15 per share." },
      { text: "A CALL option gives you the right to BUY at a fixed price. Calls profit from rising stocks.", visual: "call", detail: "You buy a call option if you think the stock will rise. If it does, your call increases in value dramatically — leverage in action.", example: "If Apple is at £175 and you buy a £180 call option for £5, and Apple rises to £195, your option is now worth at least £15 — a 200% return!" },
      { text: "A PUT option gives you the right to SELL at a fixed price. Puts profit from falling stocks.", visual: "put", detail: "Put options are often used as insurance — you hold the stock but buy puts to protect against a big fall.", example: "You own 100 Apple shares. You buy put options at £160 to protect against a crash. If Apple falls to £140, your puts cover your losses." },
      { text: "Options are advanced instruments. Most beginners should understand them conceptually, not trade them.", visual: "warning", detail: "Options can expire worthless, and sophisticated traders can lose 100% of their premium. They require understanding of time value, volatility, and the Greeks.", example: "Over 75% of all options expire worthless. Trading options without deep knowledge is essentially gambling. Learn the concept first." },
    ],
    questions: [
      { type: "multiple_choice", q: "A call option gives you the right to...", options: ["Sell at a fixed price", "Buy at a fixed price", "Short the stock", "Receive dividends"], answer: 1, explanation: "Call options give the right to BUY at a fixed price. They profit when the underlying stock rises above the strike price." },
      { type: "true_false", q: "You are obligated to exercise an option.", answer: false, explanation: "Options give the right but NOT the obligation. If the trade isn't profitable, you can let the option expire and only lose the premium paid." },
      { type: "multiple_choice", q: "Put options profit when stocks...", options: ["Rise", "Stay flat", "Fall", "Pay dividends"], answer: 2, explanation: "Put options give the right to SELL at a fixed price. If the stock falls below that price, the put becomes valuable." },
    ],
    summary: ["Options = right (not obligation) to buy/sell at a set price", "Calls = profit from rising prices, Puts = profit from falling prices", "Options are advanced — understand before ever trading them"],
  },
  // Unit 3 Checkpoint
  { id: "3.C", unit: 3, title: "Trading Mechanics Quiz", xp: 50, time: 6, type: "checkpoint",
    questions: [
      { type: "multiple_choice", q: "A limit order...", options: ["Buys at any price", "Buys only at a specific price or better", "Requires a broker", "Expires daily"], answer: 1 },
      { type: "true_false", q: "Short sellers profit when stock prices rise.", answer: false },
      { type: "multiple_choice", q: "A stop-loss order...", options: ["Locks in maximum profit", "Automatically sells when price falls to a set level", "Buys more on the dip", "Cancels your position"], answer: 1 },
      { type: "multiple_choice", q: "Options give you...", options: ["Obligation to buy", "The right (not obligation) to buy or sell", "Free shares", "A guaranteed profit"], answer: 1 },
      { type: "true_false", q: "Earnings guidance is about future performance expectations.", answer: true },
    ],
    summary: ["Trading mechanics mastered!", "You understand orders, shorts, and derivatives!", "⚡ Certified Trader badge incoming!"],
  },
  // Unit 4 — Portfolio Strategy
  { id: "4.1", unit: 4, title: "What Is Diversification?", xp: 20, time: 5, teaser: "The only free lunch in investing. Seriously.",
    slides: [
      { text: "Diversification = spreading your investments across multiple assets to reduce risk.", visual: "diversification", detail: "When you own many different assets, the poor performance of one doesn't destroy your whole portfolio. Some will zig when others zag.", example: "If you only held Kodak in 2012, you lost everything. If you held 50 stocks including Kodak, that one failure barely dented your portfolio." },
      { text: "Diversify across companies, sectors, countries, and asset types for maximum protection.", visual: "sectors", detail: "Don't just own 10 tech stocks — that's not diversified! True diversification means different industries, geographies, and even asset classes (stocks, bonds, property).", example: "The perfect diversified portfolio holds some tech, some healthcare, some energy, some international stocks, and some bonds. Crashes rarely hit everything at once." },
      { text: "Correlation matters — assets that move TOGETHER don't give you true diversification.", visual: "correlation", detail: "If all your stocks are highly correlated (they all rise and fall together), you get little diversification benefit. Low correlation between assets = better protection.", example: "Gold and stocks often move in opposite directions. Adding gold to a stock portfolio genuinely reduces overall risk, not just adds variety." },
      { text: "Over-diversification is also a thing! Too many holdings dilutes your best ideas.", visual: "over_diversify", detail: "Owning 200 stocks basically makes you an expensive index fund. The sweet spot for most investors is 15-30 well-researched positions.", example: "Warren Buffett keeps Berkshire concentrated: Apple alone is 40%+ of his portfolio. Too much diversification = average returns." },
    ],
    questions: [
      { type: "multiple_choice", q: "Diversification mainly helps reduce...", options: ["Returns", "Fees", "Risk", "Taxes"], answer: 2, explanation: "Diversification is primarily a risk management tool. It doesn't boost returns, but it protects against any single asset destroying your portfolio." },
      { type: "true_false", q: "Owning 10 tech stocks gives you good diversification.", answer: false, explanation: "10 tech stocks are highly correlated — they all tend to fall together in a tech downturn. True diversification means different SECTORS, not just companies." },
      { type: "multiple_choice", q: "The ideal number of holdings for most investors is roughly...", options: ["1-5", "15-30", "100-200", "500+"], answer: 1, explanation: "15-30 positions gives meaningful diversification without over-diluting your best ideas into index-like average returns." },
    ],
    summary: ["Diversification = spreading risk across multiple assets", "True diversification = different sectors, countries, asset types", "Low correlation between holdings = better protection"],
  },
  { id: "4.2", unit: 4, title: "Asset Allocation — Stocks, Bonds & Cash", xp: 20, time: 5, teaser: "How you split your money between asset classes defines your risk level.",
    slides: [
      { text: "Asset allocation = deciding how to split your money between stocks, bonds, and other assets.", visual: "allocation", detail: "This is actually the most important investment decision you make. Research shows 90%+ of portfolio returns come from asset allocation, not stock picking.", example: "A 80/20 portfolio (80% stocks, 20% bonds) behaves very differently from a 60/40 or 100% stocks. Each fits different risk tolerances and time horizons." },
      { text: "Stocks offer higher returns over time but with bigger short-term swings. Bonds are more stable.", visual: "stocks_bonds", detail: "Stocks have averaged ~10% annual return historically. Bonds average ~3-5%. The tradeoff: stocks can fall 50%, bonds rarely fall more than 10-15%.", example: "In 2022, a 60/40 stock/bond portfolio fell about 17%. A 100% stock portfolio fell 20%. Bonds acted as a cushion — less dramatic, still painful." },
      { text: "Your time horizon is critical. Longer = more stocks. Shorter = more bonds.", visual: "horizon", detail: "If you won't need the money for 20+ years, you can handle stock volatility — time heals all market crashes. If you need money in 2 years, volatility is dangerous.", example: "A 25-year-old saving for retirement should be nearly 100% stocks. A 60-year-old approaching retirement should shift toward 50-60% bonds." },
      { text: "Cash is also an asset class — it's safe but loses purchasing power to inflation over time.", visual: "cash", detail: "Cash pays near 0% real return after inflation. But holding some cash means you can buy great assets cheaply during market crashes.", example: "Warren Buffett keeps $150B+ in cash — not because he fears markets, but to pounce on rare incredible deals when others are panicking." },
    ],
    questions: [
      { type: "multiple_choice", q: "Asset allocation means...", options: ["Picking the best stocks", "Dividing money between asset classes", "Choosing a broker", "Finding cheap stocks"], answer: 1, explanation: "Asset allocation = how you split your investment capital between stocks, bonds, cash, property, etc. It's arguably the most important portfolio decision." },
      { type: "true_false", q: "A younger investor should hold more bonds than stocks.", answer: false, explanation: "Younger investors have more time to ride out market volatility, so they can afford (and should have) more stocks. More time = more risk tolerance." },
      { type: "multiple_choice", q: "The main advantage of bonds over stocks is...", options: ["Higher returns", "More stability and lower volatility", "Tax benefits", "They never lose value"], answer: 1, explanation: "Bonds are more stable than stocks. They don't grow as much, but they don't crash as dramatically either — good for capital preservation." },
    ],
    summary: ["Asset allocation defines your portfolio's risk and return profile", "Stocks = higher growth, higher volatility. Bonds = stability.", "Longer time horizon → more stocks appropriate"],
  },
  { id: "4.3", unit: 4, title: "ETFs — Diversification in One Click", xp: 20, time: 5, teaser: "One purchase. Hundreds of companies. Low cost. Perfect for beginners.",
    slides: [
      { text: "An ETF (Exchange-Traded Fund) is a basket of assets that trades on the stock exchange just like a single share.", visual: "etf", detail: "When you buy an ETF, you're buying exposure to all the assets inside it in one transaction. The fund manager maintains the basket — you just own a share of it.", example: "Buying 1 share of SPY (S&P 500 ETF) instantly gives you exposure to Apple, Microsoft, Amazon, Nvidia, and 496 other companies for one single price." },
      { text: "ETFs are generally much cheaper than actively managed funds — expense ratios as low as 0.03%!", visual: "fees", detail: "Traditional mutual funds charge 1-2% per year. Index ETFs charge 0.03-0.20%. On a £10,000 investment, that's £200 saved per year — which compounds massively.", example: "Over 30 years, a £100/month investment in a 0.03% ETF vs a 1.5% fund = a £40,000+ difference in final wealth. Fees destroy compound growth." },
      { text: "Index ETFs track a market index — they don't try to beat the market, they ARE the market.", visual: "index", detail: "Because they just replicate an index, no expensive fund managers are needed. This keeps costs tiny and performance matches the index exactly (minus tiny fees).", example: "VOO tracks the S&P 500. QQQ tracks NASDAQ-100. ISF tracks FTSE 100. All simple, cheap, and proven to outperform most active managers long-term." },
      { text: "Sector ETFs let you target specific industries without picking individual stocks.", visual: "sector", detail: "XLK = tech sector. XLV = healthcare. XLE = energy. GLD = gold. You can build a diversified portfolio entirely with sector ETFs at very low cost.", example: "Instead of picking 5 semiconductor companies and risking getting the wrong one, you buy SMH (Semiconductor ETF) and own them all equally." },
    ],
    questions: [
      { type: "multiple_choice", q: "ETF stands for...", options: ["Equity Transfer Fund", "Exchange-Traded Fund", "Emerging Technology Finance", "Earnings To Forecast"], answer: 1, explanation: "ETF = Exchange-Traded Fund. A basket of assets that trades on exchanges just like a share of stock." },
      { type: "true_false", q: "ETFs typically charge higher fees than actively managed funds.", answer: false, explanation: "ETFs (especially index ETFs) have much LOWER fees than actively managed funds. This is one of their biggest advantages." },
      { type: "multiple_choice", q: "Buying an S&P 500 ETF gives you exposure to...", options: ["One company", "The top 10 US companies only", "500 of the largest US companies", "International stocks only"], answer: 2, explanation: "An S&P 500 ETF gives you exposure to 500 of the largest US companies in one purchase. Instant diversification." },
    ],
    summary: ["ETFs = baskets of assets trading like single stocks", "Very low fees vs active funds — fees matter over decades", "Index ETFs outperform most active managers long-term"],
  },
  { id: "4.4", unit: 4, title: "Understanding Risk", xp: 20, time: 5, teaser: "All investments carry risk. The skill is understanding and managing it.",
    slides: [
      { text: "Risk in investing = the possibility that an investment loses value. It can't be eliminated, only managed.", visual: "risk", detail: "All investments carry some risk — even 'safe' government bonds carry inflation risk. Higher potential return always comes with higher potential risk.", example: "Government bonds: low risk, 3-5% return. Blue-chip stocks: medium risk, 8-12%. Small-cap penny stocks: high risk, could go to zero OR 1,000%." },
      { text: "Systematic risk affects all stocks (recessions, pandemics). It can't be diversified away.", visual: "systematic", detail: "When the whole economy struggles, virtually everything falls. This is why even a perfectly diversified stock portfolio lost 35% in March 2020.", example: "COVID-19 was systematic risk — every stock market in the world fell simultaneously. No amount of diversification within stocks would have saved you." },
      { text: "Unsystematic risk is specific to a company or industry. This CAN be diversified away.", visual: "unsystematic", detail: "If one company has a scandal, that's unsystematic. Owning 30 companies means one scandal hurts you 3%, not 100%.", example: "Boeing's 737 MAX disasters (2019) were unsystematic — only Boeing stock fell. Airlines didn't fall. Defence stocks didn't fall. Diversification protected everyone else." },
      { text: "Volatility ≠ permanent loss. Short-term price swings are not the same as losing money forever.", visual: "volatility", detail: "Experienced investors separate 'price volatility' (temporary swings) from 'fundamental deterioration' (the business is actually broken). They are very different risks.", example: "Apple fell 80% during the dot-com crash but recovered and grew 100,000%+ over 20 years. The business wasn't broken — just the sentiment was." },
    ],
    questions: [
      { type: "multiple_choice", q: "Systematic risk...", options: ["Can be diversified away", "Affects the whole market", "Only affects one company", "Can be predicted"], answer: 1, explanation: "Systematic risk = market-wide risk (recessions, global events). It affects everything and cannot be diversified away within an asset class." },
      { type: "true_false", q: "Volatility and permanent loss of capital are the same thing.", answer: false, explanation: "Volatility = temporary price swings. Permanent loss happens when a business truly fails. A good company's stock volatility often creates buying opportunities." },
      { type: "multiple_choice", q: "Unsystematic risk can be reduced by...", options: ["Selling all stocks", "Diversification", "Buying bonds only", "Avoiding markets"], answer: 1, explanation: "Diversification reduces unsystematic (company-specific) risk. The more uncorrelated positions you hold, the less any one failure hurts." },
    ],
    summary: ["Risk can't be eliminated — only understood and managed", "Systematic risk affects everything; unsystematic risk is company-specific", "Volatility ≠ permanent loss — patience is the key risk management tool"],
  },
  { id: "4.5", unit: 4, title: "Compound Interest — The 8th Wonder", xp: 25, time: 6, teaser: "The most powerful force in finance. Einstein reportedly called it the 8th wonder.",
    slides: [
      { text: "Compound interest = earning returns on your returns. Your money grows itself — exponentially!", visual: "compound", detail: "Year 1: You earn 10% on £1,000 = £100 profit. Year 2: You earn 10% on £1,100 = £110 profit. Each year, the base grows. This accelerates dramatically over decades.", example: "£1,000 invested at 10% for 30 years = £17,449. Not invested = £1,000. Compound interest added £16,449 of extra wealth — from doing absolutely nothing." },
      { text: "The Rule of 72: divide 72 by your annual return % to find doubling time.", visual: "rule72", detail: "At 8% annual return, 72÷8 = 9 years to double your money. At 10%, it's 7.2 years. Simple mental maths for evaluating investments.", example: "S&P 500 avg 10% return → money doubles every 7.2 years. Starting at 18 with £1,000 → by 60 you'd have ~£45,000 just from that £1,000." },
      { text: "Time is the MOST important variable. Starting 10 years earlier can double your final wealth.", visual: "time", detail: "Because compounding is exponential (not linear), the earlier you start, the disproportionately richer you end up.", example: "Starting at 18 vs 28 with £200/month at 8% return: At 68, the person who started at 18 has £1.06M. The person who started at 28 has £560K. Same monthly investment, £500K difference." },
      { text: "Fees destroy compounding! A 1% fee sounds tiny but costs you 20-30% of your final wealth.", visual: "fees", detail: "On £1,000 growing at 10% for 40 years: no fees = £45,000. 1% fee = £29,000. That single 1% quietly stole £16,000 from your future self.", example: "This is why cheap index funds (0.03-0.1% fees) massively outperform 1-2% managed funds over decades — even if the managed funds pick slightly better stocks." },
    ],
    questions: [
      { type: "multiple_choice", q: "Compound interest means...", options: ["Paying tax on gains", "Earning returns on your returns", "Interest paid monthly", "Borrowing at a fixed rate"], answer: 1, explanation: "Compound interest = returns earned on your previous returns. Your gains generate more gains — creating exponential growth over time." },
      { type: "multiple_choice", q: "Using the Rule of 72, at 9% annual return, your money doubles in roughly...", options: ["4 years", "8 years", "12 years", "18 years"], answer: 1, explanation: "72 ÷ 9 = 8 years to double. The Rule of 72 is a quick mental maths trick for estimating doubling time." },
      { type: "true_false", q: "Starting 10 years earlier matters a lot due to compound interest.", answer: true, explanation: "Compounding is exponential, so earlier = dramatically richer. The last decade of growth is the biggest — and you need the earlier decades to get there." },
    ],
    summary: ["Compound interest = returns on your returns = exponential growth", "Rule of 72: doubling time = 72 ÷ annual return %", "Starting early and keeping fees low are the two biggest levers"],
  },
  // Unit 4 Checkpoint
  { id: "4.C", unit: 4, title: "Portfolio Strategy Quiz", xp: 50, time: 6, type: "checkpoint",
    questions: [
      { type: "multiple_choice", q: "Diversification primarily reduces...", options: ["Returns", "Fees", "Risk", "Taxes"], answer: 2 },
      { type: "true_false", q: "ETFs typically charge higher fees than managed funds.", answer: false },
      { type: "multiple_choice", q: "Systematic risk...", options: ["Can be diversified away", "Affects the whole market", "Only one company", "Is predictable"], answer: 1 },
      { type: "multiple_choice", q: "The Rule of 72 helps calculate...", options: ["Tax owed", "Time to double money", "Annual fees", "Market cap"], answer: 1 },
      { type: "true_false", q: "Starting 10 years earlier can roughly double your final investment pot.", answer: true },
    ],
    summary: ["Portfolio strategy mastered!", "Diversification, ETFs, risk, and compounding — you've got it!", "🧩 Portfolio Architect badge incoming!"],
  },
  // Unit 5 — Advanced Concepts
  { id: "5.1", unit: 5, title: "Market Psychology & Behavioural Finance", xp: 25, time: 6, teaser: "Why do smart people make terrible investment decisions? Science explains.",
    slides: [
      { text: "Behavioural finance studies why humans make irrational financial decisions — and we ALL do it.", visual: "psychology", detail: "Traditional economics assumes rational actors. Behavioural finance realised humans are ruled by emotions, biases, and cognitive shortcuts that hurt investment returns.", example: "Nobel Prize winner Daniel Kahneman proved humans feel losses ~2× more intensely than equivalent gains. This 'loss aversion' makes investors sell winners too early and hold losers too long." },
      { text: "Herd mentality = following the crowd into bad decisions. The crowd is often wrong at extremes.", visual: "herd", detail: "When everyone is buying (bubble territory), that's often the worst time to buy. When everyone is selling (crash territory), that's often the best time to buy.", example: "In 1999, everyone was buying tech stocks — then crashed 80%. In March 2020, everyone was selling — then the market doubled in 18 months. Crowds are wrong at extremes." },
      { text: "Confirmation bias = only seeking information that confirms your existing belief about a stock.", visual: "bias", detail: "If you own a stock, you subconsciously focus on positive news and dismiss negative news. This is why investors hold losers far too long.", example: "Studies show investors research a stock much less after buying it than before. Once you own it, you stop looking for reasons you might be wrong." },
      { text: "Recency bias = assuming recent trends will continue forever. They never do.", visual: "recency", detail: "After a 3-year bull market, investors expect it to continue. After a crash, they expect crashes forever. Both extremes are wrong — mean reversion always comes.", example: "After the 2020-2021 bull run, many investors put everything into tech stocks expecting it to continue. 2022's 75% tech crash was the painful correction." },
    ],
    questions: [
      { type: "multiple_choice", q: "Loss aversion means investors feel losses...", options: ["Less than equivalent gains", "The same as equivalent gains", "About 2x more than equivalent gains", "Only on paper"], answer: 2, explanation: "Loss aversion: losing £100 feels about twice as bad as gaining £100 feels good. This bias makes investors hold losing positions too long." },
      { type: "true_false", q: "Following the investing crowd is usually a good strategy.", answer: false, explanation: "Herd mentality leads to buying at bubble tops and selling at crash bottoms — the exact opposite of good investing. Crowds are wrong at extreme points." },
      { type: "multiple_choice", q: "Confirmation bias means...", options: ["Looking for info that contradicts your view", "Only seeking info that confirms your existing belief", "Checking multiple sources", "Using fundamental analysis"], answer: 1, explanation: "Confirmation bias = unconsciously favouring information that confirms what you already believe, while dismissing contradictory evidence." },
    ],
    summary: ["Human psychology creates predictable investing mistakes", "Loss aversion, herd mentality, and confirmation bias cost investors returns", "Being aware of your biases is the first step to overcoming them"],
  },
  { id: "5.2", unit: 5, title: "Inflation & Your Investments", xp: 20, time: 5, teaser: "The silent wealth thief. Understanding inflation is crucial for any investor.",
    slides: [
      { text: "Inflation = the general rise in prices over time, reducing what your money can buy.", visual: "inflation", detail: "UK target is 2% per year. At 2% inflation, your £100 only buys what £98 bought last year. Over 20 years, it halves your purchasing power.", example: "In 1990, £100 could buy what £270 buys today. Money sitting under your mattress since 1990 has lost 63% of its real purchasing power." },
      { text: "Inflation is why keeping all your savings in cash is actually risky long-term.", visual: "cash_risk", detail: "If your savings account pays 2% and inflation is 4%, you're losing 2% real purchasing power every year despite earning interest.", example: "UK inflation hit 11.1% in October 2022. Anyone with money in a standard savings account paying 2-3% was losing 8% real purchasing power per year." },
      { text: "Stocks historically outpace inflation over the long run — they're one of the best inflation hedges.", visual: "hedge", detail: "Companies can raise prices when costs rise — so revenues and profits tend to keep pace with inflation. This is why stocks protect real wealth better than cash or bonds.", example: "The S&P 500 averages 10% nominal return. Subtract 3% avg inflation = 7% real return. That's genuine wealth creation, not just number inflation." },
      { text: "Real assets — property, gold, commodities — also tend to rise with inflation.", visual: "real_assets", detail: "Real assets have intrinsic value tied to physical things. As the pound buys less, the physical things (houses, gold) cost more pounds.", example: "UK house prices have risen ~7% per year for decades — typically well ahead of inflation. Homeowners get automatic inflation protection." },
    ],
    questions: [
      { type: "multiple_choice", q: "Inflation is defined as...", options: ["Stock market returns", "The general rise in prices over time", "A type of bond", "Government spending"], answer: 1, explanation: "Inflation = the general increase in the price level over time, which reduces the purchasing power of money." },
      { type: "true_false", q: "Cash savings are totally safe from inflation risk.", answer: false, explanation: "Cash loses real purchasing power when inflation exceeds the savings account interest rate. Holding only cash is actually risky long-term." },
      { type: "multiple_choice", q: "Which asset class historically does best at beating inflation?", options: ["Cash savings", "Government bonds", "Stocks", "Nothing beats inflation"], answer: 2, explanation: "Stocks have historically returned 7-10% annually, well above the average 2-3% inflation rate. Companies' ability to raise prices makes stocks good inflation hedges." },
    ],
    summary: ["Inflation erodes purchasing power of cash over time", "Keeping all savings in cash is riskier than most people realise", "Stocks historically beat inflation over the long run"],
  },
  { id: "5.3", unit: 5, title: "Long-Term Investing vs Trading", xp: 25, time: 6, teaser: "Buy and hold vs active trading — the data might surprise you.",
    slides: [
      { text: "Long-term investing = buying quality assets and holding for years or decades. Simple and powerful.", visual: "long_term", detail: "The evidence is overwhelming: most long-term buy-and-hold investors beat most active traders over 10+ year periods. Patience is a genuine edge.", example: "If you bought the S&P 500 and held for any 20-year period since 1926, you made money. Every single 20-year period. Even after every crash." },
      { text: "Active trading requires skill, time, discipline — and most traders still underperform indexes.", visual: "trading_stats", detail: "Studies show 70-80% of active traders underperform a simple index fund over 5-10 years, largely due to fees, taxes on gains, and psychological errors.", example: "SPIVA (S&P Index vs Active) reports show 90%+ of actively managed US funds underperform the S&P 500 index over 20 years. Even professionals struggle." },
      { text: "Missing just the 10 best days in the market cuts your returns roughly in half.", visual: "best_days", detail: "The best days often happen right after the worst days — during crashes. Investors who sell during downturns miss the powerful recovery days.", example: "S&P 500 returned 9.8%/year 2003-2023. Miss the 10 best days: 5.6%. Miss the 20 best: 2.8%. Miss the 30 best: 0.4%. Staying invested matters enormously." },
      { text: "The best strategy for most people: invest regularly, diversify broadly, and ignore short-term noise.", visual: "strategy", detail: "This is called passive investing or dollar-cost averaging. It's boring — but boring wins. Most millionaires built wealth through consistent, patient investing, not speculation.", example: "£300/month invested in an S&P 500 ETF at 10% average return for 30 years = £678,000. No stock picking required. No stress. Just time and consistency." },
    ],
    questions: [
      { type: "multiple_choice", q: "What percentage of active funds underperform the S&P 500 over 20 years?", options: ["10-20%", "40-50%", "70-90%", "Almost none"], answer: 2, explanation: "SPIVA data shows 90%+ of actively managed US large-cap funds underperform the S&P 500 index over 20 years. Index investing wins over time." },
      { type: "true_false", q: "Missing the best market days significantly reduces long-term returns.", answer: true, explanation: "Missing just the 10 best days roughly halves your return. The best days often follow the worst days — so selling in panics means missing the recovery." },
      { type: "multiple_choice", q: "The most reliable strategy for most investors is...", options: ["Day trading", "Technical analysis", "Regular investing in diversified low-cost funds", "Picking hot stocks"], answer: 2, explanation: "Boring wins. Regular investments in diversified, low-cost index funds outperforms most active strategies over time, with much less stress and effort." },
    ],
    summary: ["Long-term investing beats most active traders over 10+ years", "Missing the 10 best market days roughly halves your returns", "Regular investing in low-cost index funds: boring but evidence-based"],
  },
  { id: "5.4", unit: 5, title: "How to Analyse a Company (Fundamentals)", xp: 30, time: 7, teaser: "Time to do real company research — like a mini fund manager.",
    slides: [
      { text: "Fundamental analysis = studying a company's actual business to decide if the stock is worth buying.", visual: "fundamental", detail: "You look at financials (revenue, profit, debt), management quality, competitive advantages (moat), industry trends, and valuation metrics to build a picture.", example: "Before buying Nvidia in 2023, a fundamental analyst would note: massive GPU market, AI tailwind, no competition at the top, growing margins, and high but justified P/E." },
      { text: "The 5 key questions: What does the company do? Is it growing? Is it profitable? Is it cheap? Does it have a moat?", visual: "five_questions", detail: "Answering these 5 questions about any company gives you most of what you need to make an informed decision. Simple framework, powerful results.", example: "Apple: Premium tech (✓) | Revenue growing (✓) | ~25% margin (✓) | P/E 30 (slightly pricey) | iPhone ecosystem moat (✓). That analysis explains why it's a strong long-term hold." },
      { text: "A 'moat' = competitive advantage that's hard to replicate. Companies with moats dominate for decades.", visual: "moat", detail: "Moats include: brand loyalty (Apple), network effects (Facebook), switching costs (Microsoft Office), cost advantages (Walmart), patents (pharma companies).", example: "Google has a moat: no one can easily replicate their search index data, their AI training data, or their ad network relationships built over 20+ years." },
      { text: "Valuation matters. A great company at too high a price is still a bad investment.", visual: "valuation", detail: "Even the best company can be overpriced. When you pay too much, the stock needs years of growth just to justify your entry price — and anything can go wrong in that time.", example: "Cisco was the best tech company in 2000 with $80B revenue. But at 200× earnings, it took 20 years to get back to its 2000 price. Quality ≠ good investment at any price." },
    ],
    questions: [
      { type: "multiple_choice", q: "Fundamental analysis focuses on...", options: ["Chart patterns", "Trading volume", "A company's actual business and financials", "Market sentiment only"], answer: 2, explanation: "Fundamental analysis = studying the actual business: revenue, profit, debt, competitive advantages, and management quality." },
      { type: "true_false", q: "A company with a strong moat has advantages competitors can't easily replicate.", answer: true, explanation: "A 'moat' is a sustainable competitive advantage. Companies with strong moats (Apple, Google, Microsoft) tend to maintain profitability and market position for decades." },
      { type: "multiple_choice", q: "A great company at too high a price is...", options: ["Always a good investment", "A bad investment", "Risk free", "Better than average"], answer: 1, explanation: "Valuation matters. Overpaying for even a great company means it needs many years of perfect execution just to earn your initial investment back." },
    ],
    summary: ["Fundamental analysis = studying the actual business, not the share price alone", "The 5 key questions cover 90% of what you need to know", "Moat + reasonable price = great long-term investment recipe"],
  },
  { id: "5.5", unit: 5, title: "Avoiding Common Investing Mistakes", xp: 25, time: 6, teaser: "Learn from others' expensive mistakes — not your own.",
    slides: [
      { text: "Mistake 1: Panic selling at market bottoms — the most costly mistake most investors ever make.", visual: "panic", detail: "Every crash feels like 'this time it's different' and 'it'll never recover'. It always has. Panic selling locks in losses and misses the recovery.", example: "Investors who sold everything in March 2020 (COVID crash) locked in 35% losses. Those who held were made whole and up 100%+ within 18 months." },
      { text: "Mistake 2: Trying to time the market — virtually impossible, even for professionals.", visual: "timing", detail: "Studies show almost no one can consistently predict market tops and bottoms. Time in the market beats timing the market.", example: "Peter Lynch famously said: 'More money has been lost preparing for corrections than in corrections themselves.' Constant defensive positioning kills returns." },
      { text: "Mistake 3: Chasing hot tips and FOMO-buying after big runs.", visual: "fomo", detail: "By the time a stock is on the news and your friends are talking about it, the gains are likely already priced in. Late FOMO buyers usually lose.", example: "GameStop: people who bought at $400 (after hearing about the Reddit squeeze) saw it fall to $10. The news came AFTER the gain — you were the exit liquidity." },
      { text: "Mistake 4: Neglecting fees. A 1% fee sounds tiny but destroys long-term wealth.", visual: "fees", detail: "Fees compound just like returns — but in reverse. Every pound paid in fees is a pound that can no longer compound for you over decades.", example: "£100,000 growing at 8% for 30 years: No fees = £1.006M. 1% fee = £744K. 2% fee = £570K. That 2% cost you £436,000 over 30 years." },
      { text: "Mistake 5: Investing money you need soon. Never invest short-term money in volatile assets.", visual: "emergency", detail: "If you might need the money within 3 years, keep it in cash or stable assets. Markets can fall 30-50% and might not recover in your required timeframe.", example: "Someone who invested their house deposit in 2021 saw it fall 20%+ in 2022. Forced to delay buying and pay higher mortgage rates. Devastating and avoidable." },
    ],
    questions: [
      { type: "multiple_choice", q: "Panic selling during crashes typically results in...", options: ["Protecting all your capital", "Locking in losses and missing recovery", "A wise strategic move", "Tax benefits"], answer: 1, explanation: "Panic selling locks in losses at the worst moment and means you miss the recovery. The market always recovers, and sellers miss those gains." },
      { type: "true_false", q: "Successfully timing the market is easy and consistently done by professionals.", answer: false, explanation: "Almost no one consistently times the market correctly. Study after study shows time IN the market beats timing the market." },
      { type: "multiple_choice", q: "Short-term money you'll need within 3 years should be...", options: ["Invested in aggressive stocks", "In crypto for maximum return", "In cash or stable assets", "In emerging markets"], answer: 2, explanation: "Short-term money belongs in cash or stable assets. Markets can fall 30-50% and might not recover before you need the funds." },
    ],
    summary: ["The most costly mistakes: panic selling, market timing, FOMO, high fees, investing short-term money", "Knowing the mistakes is 90% of avoiding them", "Patient, low-cost, diversified investing beats most alternatives over time"],
  },
  // Unit 5 Checkpoint
  { id: "5.C", unit: 5, title: "Advanced Concepts Final Exam", xp: 75, time: 8, type: "checkpoint",
    questions: [
      { type: "multiple_choice", q: "Loss aversion makes investors...", options: ["Take more risks", "Hold losers too long and sell winners too early", "Buy at market bottoms", "Diversify correctly"], answer: 1 },
      { type: "true_false", q: "Stocks historically outperform inflation over the long run.", answer: true },
      { type: "multiple_choice", q: "90% of active funds underperform the S&P 500 over...", options: ["1 year", "5 years", "20 years", "All periods"], answer: 2 },
      { type: "multiple_choice", q: "A company 'moat' refers to...", options: ["A type of bond", "Cash reserves", "Sustainable competitive advantage", "P/E ratio"], answer: 2 },
      { type: "true_false", q: "Investing money you need in 2 years in volatile stocks is sensible.", answer: false },
    ],
    summary: ["You've completed all 5 units! 🎓", "You now understand investing better than most adults!", "🚀 Market Veteran badge earned! You are a Market Legend in the making."],
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