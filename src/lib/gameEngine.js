import { STOCKS } from "./stockData";

const TICKERS = Object.keys(STOCKS);
export const STARTING_CASH = 10000;
export const TICK_MS = 120;
export const NUM_POINTS = 250;

export function generateGameRound() {
  const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)];
  const stock = STOCKS[ticker];
  const basePrice = stock.price;
  const beta = stock.beta || 1;

  const points = generatePriceSeries(basePrice, beta, NUM_POINTS);

  return {
    ticker,
    stockName: stock.name,
    sector: stock.sector,
    currency: stock.currency || "USD",
    points,
    startPrice: points[0],
    endPrice: points[points.length - 1],
  };
}

function generatePriceSeries(basePrice, beta, numPoints) {
  const points = [];
  let price = basePrice * (0.85 + Math.random() * 0.3);
  const baseVol = 0.003 * beta;

  let regime = 0;
  let regimeTimer = 0;

  for (let i = 0; i < numPoints; i++) {
    if (regimeTimer <= 0) {
      const r = Math.random();
      regime = r < 0.35 ? 1 : r < 0.7 ? -1 : 0;
      regimeTimer = 15 + Math.floor(Math.random() * 35);
    }
    regimeTimer--;

    const drift = regime * 0.0007;
    const noise = (Math.random() - 0.5) * baseVol * 2;
    price = Math.max(price * (1 + drift + noise), 0.01);
    points.push(Math.round(price * 100) / 100);
  }

  return points;
}

export function calculateResults(round, trades) {
  const { startPrice, endPrice } = round;
  const buyHoldReturn = ((endPrice - startPrice) / startPrice) * 100;

  let cash = STARTING_CASH;
  let shares = 0;
  for (const trade of trades) {
    if (trade.type === "buy") {
      shares = cash / trade.price;
      cash = 0;
    } else {
      cash = shares * trade.price;
      shares = 0;
    }
  }
  if (shares > 0) {
    cash = shares * endPrice;
  }

  const playerReturn = ((cash - STARTING_CASH) / STARTING_CASH) * 100;
  const beatMarket = playerReturn > buyHoldReturn;

  return { playerReturn, buyHoldReturn, beatMarket, finalCash: cash };
}

export function calculateGameXp(results) {
  let xp = 10;
  if (results.beatMarket) xp += 20;
  if (results.playerReturn > 0) xp += 10;
  if (results.playerReturn > 5) xp += 15;
  if (results.playerReturn > 10) xp += 25;
  return xp;
}

export function getResultMessage(results) {
  if (results.playerReturn > 10) return "Incredible timing! You're a natural! 🌟";
  if (results.beatMarket) return "You beat buy-and-hold! Impressive! 🎉";
  if (results.playerReturn > 0) return "Profit! But holding would've been better. 📈";
  if (results.playerReturn > -5) return "So close! Timing the market is tough. 💪";
  return "This is why most pros recommend buy-and-hold. 📚";
}