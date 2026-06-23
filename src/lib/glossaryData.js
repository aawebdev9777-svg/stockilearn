export const GLOSSARY_CATEGORIES = [
  "All",
  "Stocks",
  "ETFs & Funds",
  "Bonds",
  "Trading",
  "Risk",
  "Economics",
];

export const GLOSSARY_TERMS = [
  // Stocks
  { term: "Stock", category: "Stocks", emoji: "📊", definition: "A share of ownership in a company. When you buy a stock, you own a small piece of that company and can benefit from its growth and profits." },
  { term: "Dividend", category: "Stocks", emoji: "💰", definition: "A portion of a company's profits paid to shareholders, usually quarterly. Not all companies pay dividends — growth companies often reinvest profits instead." },
  { term: "P/E Ratio", category: "Stocks", emoji: "📐", definition: "Price-to-Earnings ratio. A stock's share price divided by its earnings per share. A high P/E may suggest the stock is overvalued, or that investors expect high growth." },
  { term: "Market Cap", category: "Stocks", emoji: "🏢", definition: "Market capitalisation. The total value of a company's shares: share price × number of shares outstanding. Used to classify companies as small, mid, or large cap." },
  { term: "Blue Chip", category: "Stocks", emoji: "🔵", definition: "Shares in large, well-established, financially sound companies with a history of reliable performance. Think Apple, Microsoft, or Coca-Cola." },
  { term: "IPO", category: "Stocks", emoji: "🚀", definition: "Initial Public Offering. The first time a private company sells shares to the public. It's how companies raise money to grow and how early investors cash out." },
  { term: "Bull Market", category: "Stocks", emoji: "🐂", definition: "A period of rising stock prices and investor optimism. Bull markets can last months or years." },
  { term: "Bear Market", category: "Stocks", emoji: "🐻", definition: "A period of falling stock prices (typically 20%+ drop from recent highs) and investor pessimism. Bear markets are normal and temporary." },
  { term: "Volume", category: "Stocks", emoji: "📈", definition: "The number of shares traded in a given period. High volume often signals strong interest or a significant price move." },
  { term: "Volatility", category: "Stocks", emoji: "🎢", definition: "How much and how fast a stock's price swings. High volatility means bigger, more frequent price changes — more risk, but also more opportunity." },

  // ETFs & Funds
  { term: "ETF", category: "ETFs & Funds", emoji: "🧺", definition: "Exchange-Traded Fund. A basket of investments (like stocks or bonds) that you can buy and sell like a single stock. ETFs offer instant diversification." },
  { term: "Mutual Fund", category: "ETFs & Funds", emoji: "📦", definition: "A professionally managed pool of money from many investors, invested in a portfolio of stocks, bonds, or other assets. Priced once daily, unlike ETFs." },
  { term: "Index Fund", category: "ETFs & Funds", emoji: "📋", definition: "A fund designed to mirror a specific market index (like the S&P 500). Low fees, broad diversification, and historically strong long-term returns." },
  { term: "Expense Ratio", category: "ETFs & Funds", emoji: "💸", definition: "The annual fee a fund charges, expressed as a percentage of your investment. Even 0.5% vs 0.05% can mean tens of thousands of pounds over decades." },
  { term: "Diversification", category: "ETFs & Funds", emoji: "🌈", definition: "Spreading your money across different investments to reduce risk. 'Don't put all your eggs in one basket' — the golden rule of investing." },
  { term: "Rebalancing", category: "ETFs & Funds", emoji: "⚖️", definition: "Adjusting your portfolio back to your target asset allocation. If stocks grew to 80% of your portfolio but your target is 70%, you sell some stocks and buy bonds." },

  // Bonds
  { term: "Bond", category: "Bonds", emoji: "📜", definition: "A loan you make to a company or government. They pay you regular interest and return your money at a set date. Generally lower risk than stocks." },
  { term: "Yield", category: "Bonds", emoji: "🌾", definition: "The income returned on an investment, usually expressed as a percentage. A bond paying £40/year on a £1,000 investment has a 4% yield." },
  { term: "Coupon", category: "Bonds", emoji: "✂️", definition: "The fixed interest payment a bond makes. A £1,000 bond with a 5% coupon pays £50 per year, typically in two £25 payments." },
  { term: "Maturity", category: "Bonds", emoji: "📅", definition: "The date when a bond ends and the issuer returns your principal. Bonds can mature in months or decades." },
  { term: "Credit Rating", category: "Bonds", emoji: "⭐", definition: "A grade (like AAA, BB) assessing a bond issuer's ability to repay. Higher ratings mean lower risk and lower yields. Lower ratings (junk bonds) pay more." },
  { term: "Treasury Bond", category: "Bonds", emoji: "🏛️", definition: "A bond issued by the UK or US government. Considered the safest investment because governments rarely default. Used as a benchmark for all other rates." },

  // Trading
  { term: "Market Order", category: "Trading", emoji: "⚡", definition: "An order to buy or sell immediately at the best available price. Fast and simple, but you don't control the exact price." },
  { term: "Limit Order", category: "Trading", emoji: "🎯", definition: "An order to buy or sell only at a specific price or better. You set the price, but there's no guarantee it'll fill." },
  { term: "Stop Loss", category: "Trading", emoji: "🛑", definition: "An order that automatically sells a stock when it drops to a price you set. Limits losses but can also lock in temporary dips." },
  { term: "Short Selling", category: "Trading", emoji: "📉", definition: "Betting a stock will fall. You borrow shares, sell them, and hope to buy them back cheaper. Unlimited potential losses — very risky." },
  { term: "Margin", category: "Trading", emoji: "🏦", definition: "Borrowing money from your broker to buy more stock. Amplifies gains but also losses — you can lose more than you invested." },
  { term: "Leverage", category: "Trading", emoji: "🔧", definition: "Using borrowed money or derivatives to increase your exposure. Magnifies both gains and losses — handle with extreme care." },
  { term: "Liquidity", category: "Trading", emoji: "💧", definition: "How easily you can buy or sell an asset without affecting its price. Cash is the most liquid; real estate is illiquid." },

  // Risk
  { term: "Risk Tolerance", category: "Risk", emoji: "🫀", definition: "How much risk you can financially and emotionally handle. Younger investors can usually take more risk because they have time to recover from dips." },
  { term: "Asset Allocation", category: "Risk", emoji: "🥧", definition: "How you divide your money across stocks, bonds, cash, and other assets. The single biggest factor in your portfolio's risk and return." },
  { term: "Portfolio", category: "Risk", emoji: "📁", definition: "Your complete collection of investments. A well-built portfolio balances risk and reward across different asset types." },
  { term: "Hedge", category: "Risk", emoji: "🛡️", definition: "An investment made to reduce the risk of another investment. Like insurance — it costs money but can protect you from big losses." },
  { term: "Beta", category: "Risk", emoji: "β", definition: "A measure of how much a stock moves compared to the overall market. A beta of 1.5 means the stock swings 50% more than the market." },

  // Economics
  { term: "Compound Interest", category: "Economics", emoji: "✨", definition: "Earning interest on your interest. The most powerful force in investing — £100/month at 8% for 40 years becomes £350,000, not £48,000." },
  { term: "Inflation", category: "Economics", emoji: "🔥", definition: "The general rise in prices over time, which reduces purchasing power. UK inflation of 3% means £100 today buys £97 worth of goods next year." },
  { term: "Recession", category: "Economics", emoji: "📉", definition: "A period of economic decline, typically defined as two consecutive quarters of shrinking GDP. Stock markets usually fall, but recover." },
  { term: "GDP", category: "Economics", emoji: "🌐", definition: "Gross Domestic Product. The total value of all goods and services a country produces. Used to measure economic health and growth." },
  { term: "Interest Rate", category: "Economics", emoji: "🏦", definition: "The cost of borrowing money, set by central banks. Higher rates make borrowing expensive and usually cool down stock markets." },
  { term: "Central Bank", category: "Economics", emoji: "🏛️", definition: "The institution that manages a country's money supply and interest rates. The Bank of England sets the UK's base rate." },
  { term: "Dollar-Cost Averaging", category: "Economics", emoji: "📅", definition: "Investing a fixed amount at regular intervals, regardless of price. You buy more shares when prices are low and fewer when high — smoothing out volatility." },
];