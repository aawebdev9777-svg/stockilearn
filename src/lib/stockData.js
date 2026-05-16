// Simulated stock data for paper trading
const STOCKS = {
  AAPL: { name: "Apple Inc.", sector: "Technology", price: 189.50, change: 1.23 },
  MSFT: { name: "Microsoft Corp.", sector: "Technology", price: 378.91, change: 0.87 },
  GOOGL: { name: "Alphabet Inc.", sector: "Technology", price: 141.80, change: -0.45 },
  AMZN: { name: "Amazon.com", sector: "Technology", price: 178.25, change: 2.14 },
  TSLA: { name: "Tesla Inc.", sector: "Automotive", price: 248.42, change: -1.87 },
  NVDA: { name: "NVIDIA Corp.", sector: "Technology", price: 495.22, change: 3.45 },
  META: { name: "Meta Platforms", sector: "Technology", price: 354.78, change: 1.02 },
  NFLX: { name: "Netflix Inc.", sector: "Entertainment", price: 478.52, change: -0.34 },
  JPM: { name: "JPMorgan Chase", sector: "Finance", price: 172.30, change: 0.56 },
  BAC: { name: "Bank of America", sector: "Finance", price: 33.45, change: -0.78 },
  GS: { name: "Goldman Sachs", sector: "Finance", price: 382.15, change: 1.12 },
  V: { name: "Visa Inc.", sector: "Finance", price: 275.60, change: 0.45 },
  MA: { name: "Mastercard", sector: "Finance", price: 428.90, change: 0.67 },
  JNJ: { name: "Johnson & Johnson", sector: "Healthcare", price: 156.78, change: -0.23 },
  PFE: { name: "Pfizer Inc.", sector: "Healthcare", price: 28.45, change: -1.34 },
  UNH: { name: "UnitedHealth", sector: "Healthcare", price: 524.30, change: 0.89 },
  XOM: { name: "ExxonMobil", sector: "Energy", price: 104.56, change: 1.67 },
  CVX: { name: "Chevron Corp.", sector: "Energy", price: 152.34, change: 0.92 },
  KO: { name: "Coca-Cola", sector: "Consumer", price: 59.23, change: 0.12 },
  PEP: { name: "PepsiCo", sector: "Consumer", price: 168.90, change: -0.34 },
  MCD: { name: "McDonald's", sector: "Consumer", price: 294.56, change: 0.45 },
  DIS: { name: "Walt Disney", sector: "Entertainment", price: 92.34, change: -0.89 },
  INTC: { name: "Intel Corp.", sector: "Technology", price: 44.12, change: -2.15 },
  AMD: { name: "AMD Inc.", sector: "Technology", price: 152.80, change: 2.34 },
  UBER: { name: "Uber Technologies", sector: "Technology", price: 62.45, change: 1.56 },
  WMT: { name: "Walmart", sector: "Consumer", price: 162.34, change: 0.34 },
  NKE: { name: "Nike Inc.", sector: "Consumer", price: 108.90, change: -0.67 },
  SBUX: { name: "Starbucks", sector: "Consumer", price: 98.45, change: 0.23 },
  BA: { name: "Boeing", sector: "Industrial", price: 215.67, change: -1.23 },
  SPOT: { name: "Spotify", sector: "Technology", price: 188.90, change: 1.89 },
};

const INDICES = {
  SPX: { name: "S&P 500", price: 4783.35, change: 0.56 },
  NDX: { name: "NASDAQ", price: 16895.60, change: 1.12 },
  DJI: { name: "DOW Jones", price: 37562.70, change: 0.34 },
  FTSE: { name: "FTSE 100", price: 7694.50, change: -0.23 },
};

// Generate simulated price history
function generatePriceHistory(basePrice, days = 365) {
  const history = [];
  let price = basePrice * (0.7 + Math.random() * 0.3);
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.48) * basePrice * 0.03;
    price = Math.max(price + change, basePrice * 0.3);
    history.push({
      date: new Date(now - i * 86400000).toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 50000000) + 5000000,
    });
  }
  // Ensure last price matches current
  if (history.length > 0) {
    history[history.length - 1].price = basePrice;
  }
  return history;
}

// Add small random variance to prices to simulate real-time
function getSimulatedPrice(stock) {
  const variance = (Math.random() - 0.5) * stock.price * 0.002;
  return Math.round((stock.price + variance) * 100) / 100;
}

export function getStock(ticker) {
  const stock = STOCKS[ticker];
  if (!stock) return null;
  return { ticker, ...stock, current_price: getSimulatedPrice(stock) };
}

export function getAllStocks() {
  return Object.entries(STOCKS).map(([ticker, data]) => ({
    ticker,
    ...data,
    current_price: getSimulatedPrice(data),
  }));
}

export function getIndices() {
  return Object.entries(INDICES).map(([ticker, data]) => ({
    ticker,
    ...data,
    current_price: data.price + (Math.random() - 0.5) * data.price * 0.001,
  }));
}

export function getStockHistory(ticker, days = 365) {
  const stock = STOCKS[ticker];
  if (!stock) return [];
  return generatePriceHistory(stock.price, days);
}

export function getTopMovers() {
  const all = getAllStocks();
  const sorted = [...all].sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  return {
    gainers: sorted.filter(s => s.change > 0).slice(0, 3),
    losers: sorted.filter(s => s.change < 0).slice(0, 3),
  };
}

export function searchStocks(query) {
  const q = query.toLowerCase();
  return getAllStocks().filter(s =>
    s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q)
  );
}

export function getStocksByCategory(category) {
  const sectorMap = {
    tech: "Technology",
    finance: "Finance",
    energy: "Energy",
    consumer: "Consumer",
    healthcare: "Healthcare",
  };
  const sector = sectorMap[category];
  if (!sector) return getAllStocks();
  return getAllStocks().filter(s => s.sector === sector);
}

export function generateSparkline(ticker, points = 20) {
  const stock = STOCKS[ticker];
  if (!stock) return [];
  const data = [];
  let price = stock.price * (0.95 + Math.random() * 0.1);
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.48) * stock.price * 0.01;
    data.push(Math.round(price * 100) / 100);
  }
  data.push(stock.price);
  return data;
}

export { STOCKS, INDICES };