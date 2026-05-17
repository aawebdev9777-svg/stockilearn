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