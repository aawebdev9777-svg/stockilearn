// Full simulated stock data for paper trading

const STOCKS = {
  // US Large Cap
  AAPL:  { name: "Apple Inc.",           sector: "Technology",  beta: 1.2,  price: 189.50, change: 1.23,  mcap: "2.94T", pe: 31.2, eps: 6.07, div: 0.56, high52: 199.62, low52: 143.90 },
  MSFT:  { name: "Microsoft Corp.",      sector: "Technology",  beta: 0.9,  price: 378.91, change: 0.87,  mcap: "2.81T", pe: 35.1, eps: 10.79,div: 0.75, high52: 430.82, low52: 309.45 },
  GOOGL: { name: "Alphabet Inc.",        sector: "Technology",  beta: 1.1,  price: 141.80, change: -0.45, mcap: "1.78T", pe: 24.8, eps: 5.71, div: 0,    high52: 163.02, low52: 115.83 },
  AMZN:  { name: "Amazon.com Inc.",      sector: "Technology",  beta: 1.3,  price: 178.25, change: 2.14,  mcap: "1.87T", pe: 64.2, eps: 2.78, div: 0,    high52: 201.20, low52: 118.35 },
  TSLA:  { name: "Tesla Inc.",           sector: "Automotive",  beta: 2.3,  price: 248.42, change: -1.87, mcap: "790B",  pe: 72.1, eps: 3.45, div: 0,    high52: 299.29, low52: 138.80 },
  NVDA:  { name: "NVIDIA Corp.",         sector: "Technology",  beta: 1.9,  price: 495.22, change: 3.45,  mcap: "1.22T", pe: 61.5, eps: 8.05, div: 0.04, high52: 502.66, low52: 180.29 },
  META:  { name: "Meta Platforms Inc.",  sector: "Technology",  beta: 1.3,  price: 354.78, change: 1.02,  mcap: "910B",  pe: 23.4, eps: 15.16,div: 0.5,  high52: 531.49, low52: 279.40 },
  NFLX:  { name: "Netflix Inc.",         sector: "Entertainment",beta:1.2,  price: 478.52, change: -0.34, mcap: "208B",  pe: 47.9, eps: 9.99, div: 0,    high52: 700.99, low52: 344.73 },
  "BRK.B":{ name:"Berkshire Hathaway",  sector: "Finance",     beta: 0.7,  price: 358.90, change: 0.31,  mcap: "776B",  pe: 22.1, eps: 16.22,div: 0,    high52: 394.80, low52: 330.05 },
  V:     { name: "Visa Inc.",            sector: "Finance",     beta: 0.95, price: 275.60, change: 0.45,  mcap: "565B",  pe: 29.8, eps: 9.25, div: 2.08, high52: 290.96, low52: 225.68 },
  MA:    { name: "Mastercard Inc.",      sector: "Finance",     beta: 1.0,  price: 428.90, change: 0.67,  mcap: "404B",  pe: 34.7, eps: 12.36,div: 2.28, high52: 478.38, low52: 356.80 },
  JPM:   { name: "JPMorgan Chase",       sector: "Finance",     beta: 1.1,  price: 172.30, change: 0.56,  mcap: "493B",  pe: 11.5, eps: 14.97,div: 4.20, high52: 200.94, low52: 135.19 },
  JNJ:   { name: "Johnson & Johnson",    sector: "Healthcare",  beta: 0.55, price: 156.78, change: -0.23, mcap: "378B",  pe: 14.9, eps: 10.53,div: 4.80, high52: 175.97, low52: 143.13 },
  UNH:   { name: "UnitedHealth Group",   sector: "Healthcare",  beta: 0.65, price: 524.30, change: 0.89,  mcap: "484B",  pe: 20.1, eps: 26.09,div: 7.52, high52: 553.31, low52: 444.56 },
  PFE:   { name: "Pfizer Inc.",          sector: "Healthcare",  beta: 0.6,  price: 28.45,  change: -1.34, mcap: "161B",  pe: 14.8, eps: 1.92, div: 6.54, high52: 42.71,  low52: 25.20  },
  XOM:   { name: "ExxonMobil Corp.",     sector: "Energy",      beta: 1.15, price: 104.56, change: 1.67,  mcap: "424B",  pe: 12.2, eps: 8.57, div: 3.42, high52: 121.87, low52: 90.51  },
  CVX:   { name: "Chevron Corp.",        sector: "Energy",      beta: 1.05, price: 152.34, change: 0.92,  mcap: "277B",  pe: 12.7, eps: 12.0, div: 4.26, high52: 193.02, low52: 132.11 },
  KO:    { name: "Coca-Cola Co.",        sector: "Consumer",    beta: 0.55, price: 59.23,  change: 0.12,  mcap: "255B",  pe: 22.5, eps: 2.63, div: 3.22, high52: 64.99,  low52: 54.11  },
  PEP:   { name: "PepsiCo Inc.",         sector: "Consumer",    beta: 0.57, price: 168.90, change: -0.34, mcap: "232B",  pe: 22.9, eps: 7.37, div: 3.19, high52: 186.00, low52: 155.83 },
  MCD:   { name: "McDonald's Corp.",     sector: "Consumer",    beta: 0.7,  price: 294.56, change: 0.45,  mcap: "212B",  pe: 22.8, eps: 12.93,div: 2.31, high52: 311.44, low52: 243.51 },
  DIS:   { name: "Walt Disney Co.",      sector: "Entertainment",beta:1.1,  price: 92.34,  change: -0.89, mcap: "167B",  pe: 53.8, eps: 1.72, div: 0,    high52: 123.74, low52: 78.73  },
  NKE:   { name: "Nike Inc.",            sector: "Consumer",    beta: 0.8,  price: 108.90, change: -0.67, mcap: "164B",  pe: 28.8, eps: 3.78, div: 1.48, high52: 128.63, low52: 88.66  },
  SBUX:  { name: "Starbucks Corp.",      sector: "Consumer",    beta: 0.8,  price: 98.45,  change: 0.23,  mcap: "111B",  pe: 27.4, eps: 3.60, div: 2.44, high52: 115.84, low52: 71.09  },
  WMT:   { name: "Walmart Inc.",         sector: "Consumer",    beta: 0.5,  price: 162.34, change: 0.34,  mcap: "437B",  pe: 27.1, eps: 5.99, div: 1.48, high52: 183.10, low52: 138.30 },
  COST:  { name: "Costco Wholesale",     sector: "Consumer",    beta: 0.72, price: 738.20, change: 1.12,  mcap: "327B",  pe: 49.3, eps: 14.98,div: 1.02, high52: 787.08, low52: 564.49 },

  // US Mid/Growth
  AMD:   { name: "AMD Inc.",             sector: "Technology",  beta: 1.85, price: 152.80, change: 2.34,  mcap: "248B",  pe: 41.2, eps: 3.71, div: 0,    high52: 227.30, low52: 93.12  },
  INTC:  { name: "Intel Corp.",          sector: "Technology",  beta: 0.9,  price: 44.12,  change: -2.15, mcap: "187B",  pe: 28.9, eps: 1.53, div: 2.18, high52: 51.28,  low52: 26.86  },
  CRM:   { name: "Salesforce Inc.",      sector: "Technology",  beta: 1.3,  price: 224.50, change: 0.78,  mcap: "218B",  pe: 64.1, eps: 3.50, div: 0,    high52: 318.71, low52: 212.97 },
  UBER:  { name: "Uber Technologies",    sector: "Technology",  beta: 1.5,  price: 62.45,  change: 1.56,  mcap: "131B",  pe: 47.2, eps: 1.32, div: 0,    high52: 82.14,  low52: 40.24  },
  LYFT:  { name: "Lyft Inc.",            sector: "Technology",  beta: 1.8,  price: 14.20,  change: -1.20, mcap: "5.8B",  pe: null, eps: -0.51,div: 0,    high52: 20.78,  low52: 8.05   },
  SPOT:  { name: "Spotify Technology",   sector: "Entertainment",beta:1.5,  price: 188.90, change: 1.89,  mcap: "38B",   pe: null, eps: -2.18,div: 0,    high52: 343.17, low52: 107.43 },
  SNAP:  { name: "Snap Inc.",            sector: "Technology",  beta: 1.7,  price: 11.20,  change: -2.80, mcap: "18B",   pe: null, eps: -1.12,div: 0,    high52: 17.88,  low52: 8.68   },
  SHOP:  { name: "Shopify Inc.",         sector: "Technology",  beta: 1.6,  price: 63.40,  change: 1.45,  mcap: "82B",   pe: 70.4, eps: 0.90, div: 0,    high52: 91.87,  low52: 40.85  },
  SQ:    { name: "Block Inc.",           sector: "Finance",     beta: 2.1,  price: 74.50,  change: 2.30,  mcap: "44B",   pe: null, eps: -1.22,div: 0,    high52: 97.28,  low52: 46.40  },
  PLTR:  { name: "Palantir Technologies",sector: "Technology",  beta: 2.2,  price: 18.90,  change: 3.10,  mcap: "39B",   pe: 193,  eps: 0.10, div: 0,    high52: 25.02,  low52: 7.19   },
  COIN:  { name: "Coinbase Global",      sector: "Finance",     beta: 3.5,  price: 189.40, change: 4.20,  mcap: "47B",   pe: null, eps: -2.05,div: 0,    high52: 283.10, low52: 47.32  },
  RBLX:  { name: "Roblox Corp.",         sector: "Entertainment",beta:1.8,  price: 32.50,  change: 1.60,  mcap: "20B",   pe: null, eps: -2.25,div: 0,    high52: 46.88,  low52: 20.28  },
  HOOD:  { name: "Robinhood Markets",    sector: "Finance",     beta: 2.1,  price: 14.80,  change: 2.50,  mcap: "12B",   pe: null, eps: -0.20,div: 0,    high52: 24.04,  low52: 7.96   },
  RIVN:  { name: "Rivian Automotive",    sector: "Automotive",  beta: 2.5,  price: 16.40,  change: -2.40, mcap: "15B",   pe: null, eps: -5.42,div: 0,    high52: 28.00,  low52: 8.94   },
  LCID:  { name: "Lucid Group Inc.",     sector: "Automotive",  beta: 2.8,  price: 3.20,   change: -3.10, mcap: "7B",    pe: null, eps: -1.75,div: 0,    high52: 8.04,   low52: 1.93   },

  // UK Stocks
  BARC:  { name: "Barclays PLC",         sector: "Finance",     beta: 1.4,  price: 192.50, change: 0.90,  mcap: "34B",   pe: 6.1,  eps: 31.5, div: 3.80, high52: 234.90, low52: 130.24, currency: "GBP" },
  LLOY:  { name: "Lloyds Banking Group", sector: "Finance",     beta: 1.2,  price: 50.30,  change: 0.60,  mcap: "34B",   pe: 7.8,  eps: 6.45, div: 5.20, high52: 56.88,  low52: 39.45,  currency: "GBP" },
  HSBA:  { name: "HSBC Holdings PLC",    sector: "Finance",     beta: 0.85, price: 638.80, change: 0.45,  mcap: "118B",  pe: 7.0,  eps: 91.3, div: 6.40, high52: 707.50, low52: 575.00, currency: "GBP" },
  BP:    { name: "BP PLC",               sector: "Energy",      beta: 1.0,  price: 478.65, change: 1.20,  mcap: "89B",   pe: 12.3, eps: 38.9, div: 4.92, high52: 553.00, low52: 416.30, currency: "GBP" },
  SHEL:  { name: "Shell PLC",            sector: "Energy",      beta: 0.9,  price: 2598.50,change: 0.80,  mcap: "196B",  pe: 10.1, eps: 257.3,div: 3.88, high52: 2836.00,low52: 2245.00,currency: "GBP" },
  AZN:   { name: "AstraZeneca PLC",      sector: "Healthcare",  beta: 0.55, price: 11420,  change: 0.30,  mcap: "218B",  pe: 32.4, eps: 352.5,div: 2.08, high52: 13082,  low52: 9792,   currency: "GBP" },
  GSK:   { name: "GSK PLC",              sector: "Healthcare",  beta: 0.5,  price: 1652.40,change: -0.20, mcap: "67B",   pe: 13.4, eps: 123.3,div: 3.40, high52: 1777.00,low52: 1340.40,currency: "GBP" },
  ULVR:  { name: "Unilever PLC",         sector: "Consumer",    beta: 0.52, price: 3864,   change: -0.40, mcap: "99B",   pe: 17.2, eps: 224.7,div: 3.80, high52: 4548,   low52: 3540,   currency: "GBP" },
  DGE:   { name: "Diageo PLC",           sector: "Consumer",    beta: 0.6,  price: 2928,   change: -0.60, mcap: "64B",   pe: 17.1, eps: 171.2,div: 2.96, high52: 3556,   low52: 2558,   currency: "GBP" },
  VOD:   { name: "Vodafone Group PLC",   sector: "Technology",  beta: 0.72, price: 72.50,  change: 0.35,  mcap: "19B",   pe: 22.3, eps: 3.25, div: 10.2, high52: 97.45,  low52: 60.35,  currency: "GBP" },
  BT:    { name: "BT Group PLC",         sector: "Technology",  beta: 0.85, price: 136.40, change: 0.55,  mcap: "13B",   pe: 13.5, eps: 10.1, div: 5.80, high52: 163.25, low52: 108.05, currency: "GBP" },
  TSCO:  { name: "Tesco PLC",            sector: "Consumer",    beta: 0.58, price: 296.10, change: 0.20,  mcap: "23B",   pe: 14.1, eps: 21.0, div: 3.80, high52: 334.00, low52: 255.40, currency: "GBP" },
  MKS:   { name: "Marks & Spencer",      sector: "Consumer",    beta: 0.75, price: 277.60, change: 0.90,  mcap: "9.1B",  pe: 16.2, eps: 17.1, div: 1.68, high52: 362.10, low52: 155.70, currency: "GBP" },
  RIO:   { name: "Rio Tinto PLC",        sector: "Energy",      beta: 0.88, price: 4974,   change: 0.70,  mcap: "75B",   pe: 8.6,  eps: 578.4,div: 6.82, high52: 6000,   low52: 4354,   currency: "GBP" },
  GLEN:  { name: "Glencore PLC",         sector: "Energy",      beta: 1.05, price: 427.15, change: 1.10,  mcap: "52B",   pe: 9.8,  eps: 43.6, div: 4.62, high52: 542.00, low52: 362.10, currency: "GBP" },
};

const INDICES = {
  SPX:  { name: "S&P 500",    price: 5248.49, change: 0.56,  description: "Tracks 500 of the largest US companies" },
  NDX:  { name: "NASDAQ 100", price: 18290.40,change: 1.12,  description: "Technology-heavy index of 100 major companies" },
  DJI:  { name: "Dow Jones",  price: 39127.14,change: 0.34,  description: "30 major US blue-chip companies" },
  FTSE: { name: "FTSE 100",   price: 8312.20, change: -0.23, description: "100 largest companies listed in London" },
};

const SECTOR_EMOJIS = {
  Technology: "💻", Finance: "🏦", Healthcare: "💊", Energy: "⚡",
  Consumer: "🛍️", Entertainment: "🎬", Automotive: "🚗", Industrial: "🏭",
};

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generatePriceHistory(ticker, basePrice, days = 365) {
  const history = [];
  let price = basePrice * (0.75 + seededRandom(ticker.charCodeAt(0) * 7) * 0.35);
  const now = Date.now();
  const stock = STOCKS[ticker];
  const beta = stock?.beta || 1;
  const dailyVol = 0.012 * beta;

  for (let i = days; i >= 0; i--) {
    const dayIndex = days - i;
    const seed = ticker.charCodeAt(0) * 31 + dayIndex;
    const trend = Math.sin(dayIndex / 60) * 0.003;
    const noise = (seededRandom(seed) - 0.48) * dailyVol;
    price = Math.max(price * (1 + trend + noise), basePrice * 0.2);
    history.push({
      date: new Date(now - i * 86400000).toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      open: Math.round(price * (1 - seededRandom(seed + 1) * 0.008) * 100) / 100,
      high: Math.round(price * (1 + seededRandom(seed + 2) * 0.015) * 100) / 100,
      low: Math.round(price * (1 - seededRandom(seed + 3) * 0.015) * 100) / 100,
      volume: Math.floor(seededRandom(seed + 4) * 50000000 + 5000000),
    });
  }
  if (history.length > 0) {
    history[history.length - 1].price = basePrice;
  }
  return history;
}

function getSimulatedPrice(ticker, stock) {
  const variance = (Math.random() - 0.5) * stock.price * 0.002 * (stock.beta || 1);
  return Math.round((stock.price + variance) * 100) / 100;
}

export function getStock(ticker) {
  const stock = STOCKS[ticker];
  if (!stock) return null;
  return {
    ticker,
    ...stock,
    sectorEmoji: SECTOR_EMOJIS[stock.sector] || "📊",
    current_price: getSimulatedPrice(ticker, stock),
    currency: stock.currency || "USD",
  };
}

export function getAllStocks() {
  return Object.entries(STOCKS).map(([ticker, data]) => ({
    ticker,
    ...data,
    sectorEmoji: SECTOR_EMOJIS[data.sector] || "📊",
    current_price: getSimulatedPrice(ticker, data),
    currency: data.currency || "USD",
  }));
}

export function getIndices() {
  return Object.entries(INDICES).map(([ticker, data]) => ({
    ticker,
    ...data,
    current_price: data.price + (Math.random() - 0.5) * data.price * 0.001,
    description: data.description,
  }));
}

export function getStockHistory(ticker, days = 365) {
  const stock = STOCKS[ticker];
  if (!stock) return [];
  return generatePriceHistory(ticker, stock.price, days);
}

export function getTopMovers() {
  const all = getAllStocks();
  const sorted = [...all].sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  return {
    gainers: sorted.filter(s => s.change > 0).slice(0, 5),
    losers: sorted.filter(s => s.change < 0).slice(0, 5),
  };
}

export function searchStocks(query) {
  const q = query.toLowerCase();
  return getAllStocks().filter(s =>
    s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q)
  );
}

export function getStocksByCategory(category) {
  const all = getAllStocks();
  switch (category) {
    case "gainers": return [...all].filter(s => s.change > 0).sort((a, b) => b.change - a.change);
    case "losers": return [...all].filter(s => s.change < 0).sort((a, b) => a.change - b.change);
    case "tech": return all.filter(s => s.sector === "Technology");
    case "finance": return all.filter(s => s.sector === "Finance");
    case "energy": return all.filter(s => s.sector === "Energy");
    case "healthcare": return all.filter(s => s.sector === "Healthcare");
    case "consumer": return all.filter(s => s.sector === "Consumer");
    case "entertainment": return all.filter(s => s.sector === "Entertainment");
    case "automotive": return all.filter(s => s.sector === "Automotive");
    case "uk": return all.filter(s => s.currency === "GBP");
    case "growth": return all.filter(s => s.beta >= 1.5).sort((a, b) => b.beta - a.beta);
    default: return all;
  }
}

export function generateSparkline(ticker, points = 20) {
  const stock = STOCKS[ticker];
  if (!stock) return [];
  const data = [];
  let price = stock.price * (0.95 + seededRandom(ticker.charCodeAt(0)) * 0.1);
  for (let i = 0; i < points; i++) {
    const seed = ticker.charCodeAt(0) * 53 + i * 7 + Date.now() % 100;
    price += (seededRandom(seed) - 0.48) * stock.price * 0.01 * (stock.beta || 1);
    data.push(Math.round(price * 100) / 100);
  }
  data.push(stock.price);
  return data;
}

export function formatPrice(price, currency = "USD") {
  if (currency === "GBP") {
    // UK stocks quoted in pence if > 100, or pounds if < 100
    if (price > 100) return `${price.toFixed(0)}p`;
    return `£${price.toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
}

export function getSectorBreakdown(holdings) {
  const breakdown = {};
  let total = 0;
  holdings.forEach(h => {
    const stock = STOCKS[h.ticker];
    if (!stock) return;
    const val = h.shares * (getSimulatedPrice(h.ticker, stock));
    breakdown[stock.sector] = (breakdown[stock.sector] || 0) + val;
    total += val;
  });
  return Object.entries(breakdown).map(([sector, value]) => ({
    sector,
    value,
    percent: total > 0 ? (value / total) * 100 : 0,
    emoji: SECTOR_EMOJIS[sector] || "📊",
  })).sort((a, b) => b.value - a.value);
}

export { STOCKS, INDICES, SECTOR_EMOJIS };