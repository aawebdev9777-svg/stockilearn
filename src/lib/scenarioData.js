export const SCENARIOS = [
  {
    id: "2008-crisis",
    title: "The 2008 Financial Crisis",
    year: "2008",
    emoji: "🏦",
    color: "#EF4444",
    description: "The housing market collapses, banks teeter on the edge, and the world faces the worst financial crisis since the Great Depression. How would you navigate it?",
    steps: [
      {
        prompt: "It's early 2008. Housing prices are falling fast. You hold shares in several major banks. Rumours of trouble are everywhere. What do you do?",
        context: "Banks had been lending recklessly to people who couldn't repay. Subprime mortgages were packaged into complex securities that were rated as safe.",
        choices: [
          { text: "Sell all bank stocks immediately", outcome: "Smart move. Over the next 12 months, bank stocks fell 50–90%. Lehman Brothers went bankrupt in September 2008.", correct: true, xp: 20 },
          { text: "Hold and wait for recovery", outcome: "Painful. Many bank stocks never recovered. Royal Bank of Scotland fell 95% and was bailed out by the UK government.", correct: false, xp: 0 },
          { text: "Buy more — 'buy the dip!'", outcome: "Catastrophic. You'd have lost most of your money. The 'dip' turned out to be a cliff.", correct: false, xp: 0 },
        ],
        lesson: "When the underlying fundamentals deteriorate, cutting losses early can save your portfolio. 'Buy the dip' only works if the asset is fundamentally sound.",
      },
      {
        prompt: "It's March 2009. The S&P 500 has fallen 57% from its peak. Everyone is panicking. The news says 'the end of capitalism.' What do you do?",
        context: "By March 2009, markets had hit rock bottom. Central banks had slashed rates to near zero and started quantitative easing.",
        choices: [
          { text: "Invest your remaining cash into a broad index fund", outcome: "Brilliant. The S&P 500 rose 26% in 2009 alone and kept climbing for a decade. This was the buying opportunity of a generation.", correct: true, xp: 30 },
          { text: "Sell everything and move to cash", outcome: "You locked in your losses and missed the recovery. The market gained 400%+ over the next 10 years.", correct: false, xp: 0 },
          { text: "Do nothing — wait for 'more certainty'", outcome: "By the time things felt 'certain,' the market had already risen 50%. You missed the best prices.", correct: false, xp: 5 },
        ],
        lesson: "The best opportunities often come when fear is highest. 'Be greedy when others are fearful' — Warren Buffett.",
      },
      {
        prompt: "It's 2010. The crisis is over but the world is changed. Regulators are cracking down. What's your long-term strategy?",
        context: "New regulations (Dodd-Frank, Basel III) reshaped banking. Investors who understood the new landscape thrived.",
        choices: [
          { text: "Diversify across sectors and add index funds", outcome: "Excellent. Diversification would have protected you in the crisis and index funds would have captured the full recovery.", correct: true, xp: 20 },
          { text: "Go all-in on bank stocks — they're cheap now", outcome: "Risky. Some banks recovered, but regulations capped their growth. Tech and healthcare outperformed.", correct: false, xp: 5 },
          { text: "Keep everything in cash — never trust markets again", outcome: "Inflation would have eaten your savings. The market returned 400%+ over the decade.", correct: false, xp: 0 },
        ],
        lesson: "Crises teach us to diversify, stay invested, and never let fear or greed drive permanent decisions.",
      },
    ],
  },
  {
    id: "dotcom-bubble",
    title: "The Dot-Com Bubble",
    year: "1999–2001",
    emoji: "💻",
    color: "#8B5CF6",
    description: "The internet is changing everything. Tech stocks are soaring. Companies with no revenue are valued in the billions. Are you riding the wave or spotting the crash?",
    steps: [
      {
        prompt: "It's 1999. Pets.com, Webvan, and dozens of dot-com startups are going public with sky-high valuations. Your friends are getting rich. What do you do?",
        context: "The NASDAQ rose 86% in 1999 alone. Many companies had no profits, no revenue, and no clear business model — just '.com' in their name.",
        choices: [
          { text: "Invest in established tech companies with real revenue", outcome: "Wise. Companies like Microsoft and Cisco survived the crash. You'd have participated in the boom with less downside risk.", correct: true, xp: 25 },
          { text: "Go all-in on any stock with '.com' in the name", outcome: "Thrilling at first — but devastating. Most dot-com stocks went to zero. Pets.com lost 99% in 9 months.", correct: false, xp: 0 },
          { text: "Stay out entirely — it feels like a bubble", outcome: "You missed incredible gains in 1999, but you also avoided losing everything in 2000–2002. A defensible choice.", correct: false, xp: 15 },
        ],
        lesson: "Investing in companies with real revenue and profits is safer than chasing hype. A great industry doesn't mean every company in it is a great investment.",
      },
      {
        prompt: "It's March 2000. The NASDAQ has peaked at 5,048. Your dot-com stocks are up 300%. A friend says 'sell now, this can't last.' What do you do?",
        context: "Alan Greenspan had warned of 'irrational exuberance' years earlier. P/E ratios of 200+ were common. Many insiders were quietly selling.",
        choices: [
          { text: "Take profits — sell your dot-com holdings", outcome: "Perfect timing. The NASDAQ fell 78% over the next 2.5 years. You locked in life-changing gains.", correct: true, xp: 30 },
          { text: "Hold — 'this time is different, the internet changes everything'", outcome: "The NASDAQ fell 78%. Many stocks went to zero. It took 15 years for the index to recover.", correct: false, xp: 0 },
          { text: "Buy more on margin — 'stocks only go up'", outcome: "You'd have been wiped out, possibly owing money. Margin + bubble = disaster.", correct: false, xp: 0 },
        ],
        lesson: "No tree grows to the sky. When valuations defy logic and everyone says 'this time is different,' it's usually time to be cautious.",
      },
      {
        prompt: "It's 2002. The bubble has burst. The NASDAQ is down 78%. But some companies survived — Amazon, Google (soon to IPO), eBay. What do you do?",
        context: "The crash destroyed the weak companies but the strong ones emerged stronger. Amazon fell from $107 to $6 — then eventually rose to $3,000+.",
        choices: [
          { text: "Buy the survivors — Amazon, eBay, and later Google", outcome: "Legendary. Amazon returned 50,000%+ over the next 20 years. The survivors of a crash often dominate the next era.", correct: true, xp: 30 },
          { text: "Avoid all tech stocks forever — too risky", outcome: "You'd have missed the greatest wealth creation in history. Tech drove the market for the next two decades.", correct: false, xp: 0 },
          { text: "Try to find the 'next big dot-com'", outcome: "Most new dot-coms still failed. The winners were already-established survivors, not new hype.", correct: false, xp: 5 },
        ],
        lesson: "Crashes separate the strong from the weak. The companies that survive a bubble burst often become the giants of the next era.",
      },
    ],
  },
  {
    id: "covid-crash",
    title: "The COVID-19 Crash",
    year: "2020",
    emoji: "🦠",
    color: "#3B82F6",
    description: "A global pandemic shuts down the world. Markets crash faster than ever before — then stage the shortest bear market in history. Can you keep your head?",
    steps: [
      {
        prompt: "It's February 2020. A mysterious virus is spreading from China. Markets are near all-time highs. Most people aren't worried yet. What do you do?",
        context: "The S&P 500 hit a record high on February 19, 2020. Within 33 days, it would fall 34% — the fastest bear market in history.",
        choices: [
          { text: "Review your portfolio and ensure it's diversified", outcome: "Smart preparation. You couldn't predict the crash, but diversification would cushion the blow.", correct: true, xp: 20 },
          { text: "Ignore it — it's just a flu, markets will be fine", outcome: "The market fell 34% in 33 days. Without preparation, you'd have been caught off guard.", correct: false, xp: 5 },
          { text: "Sell everything and go to cash", outcome: "You'd have missed the 28% gain in March alone. Timing the market is nearly impossible.", correct: false, xp: 0 },
        ],
        lesson: "You can't predict crashes, but you can prepare for them. Diversification and a plan help you weather any storm.",
      },
      {
        prompt: "It's March 23, 2020. The S&P 500 has fallen 34% in 33 days. The world is in lockdown. Oil prices went negative. Everyone is terrified. What do you do?",
        context: "This was the fastest bear market ever. Central banks and governments launched massive stimulus. The market bottomed that exact day.",
        choices: [
          { text: "Invest your cash reserves into a broad index fund", outcome: "Perfect. The S&P 500 rose 28% in the next 3 days and 68% by August. This was the fastest recovery from a bear market ever.", correct: true, xp: 35 },
          { text: "Sell everything — it's going to get worse", outcome: "You'd have sold at the exact bottom. The market gained 68% in 5 months. The worst possible moment to sell.", correct: false, xp: 0 },
          { text: "Free in fear — do nothing, can't even look at your portfolio", outcome: "You avoided selling at the bottom, which is good. But if you had cash, you missed a historic buying opportunity.", correct: false, xp: 10 },
        ],
        lesson: "The scariest moments are often the best opportunities. Markets recover from crises — those who stay invested (or buy) are rewarded.",
      },
      {
        prompt: "It's late 2020. The market has fully recovered and tech stocks are soaring. 'Stay-at-home' stocks like Zoom are up 400%. What's your move?",
        context: "Tech stocks boomed as the world went remote. But many 'stay-at-home' stocks would crash once lockdowns ended.",
        choices: [
          { text: "Stick with a diversified portfolio and avoid chasing the hottest stocks", outcome: "Wise. Zoom fell 80% after the pandemic. A diversified portfolio captured the gains without the wipeout.", correct: true, xp: 25 },
          { text: "Go all-in on Zoom, Peloton, and stay-at-home stocks", outcome: "Painful. Zoom fell from $588 to $80. Peloton fell 90%. Pandemic winners didn't all stay winners.", correct: false, xp: 0 },
          { text: "Sell everything — the recovery is 'fake', another crash is coming", outcome: "The market kept rising for years. You'd have missed enormous gains by staying in cash.", correct: false, xp: 0 },
        ],
        lesson: "Don't chase the hottest trend. What wins during a crisis doesn't always win after it. Diversification keeps you steady.",
      },
    ],
  },
  {
    id: "gamestop-squeeze",
    title: "The GameStop Squeeze",
    year: "2021",
    emoji: "🎮",
    color: "#F59E0B",
    description: "Reddit traders vs Wall Street hedge funds. A struggling video game retailer's stock explodes 1,700% in weeks. FOMO or fortune?",
    steps: [
      {
        prompt: "It's January 2021. You see Reddit's r/WallStreetBets talking about GameStop (GME). Hedge funds have shorted 140% of its shares. The stock is $40 and rising. What do you do?",
        context: "Short interest above 100% meant more shares were shorted than existed. If the price rose, short sellers would be forced to buy — creating a 'short squeeze'.",
        choices: [
          { text: "Watch from the sidelines — this is gambling, not investing", outcome: "Smart. GME hit $483 then crashed to $50. Most people who bought during the hype lost money.", correct: true, xp: 25 },
          { text: "Buy GME at $40 — 'to the moon!'", outcome: "If you sold near the top, incredible. But almost nobody timed it right. Most held too long and lost everything.", correct: false, xp: 10 },
          { text: "Short GME — it's obviously overvalued", outcome: "Extremely dangerous. The stock hit $483. If you were short, you'd have faced unlimited losses. Some hedge funds lost billions.", correct: false, xp: 0 },
        ],
        lesson: "A short squeeze is a speculative event, not an investment. When a trade is driven by hype rather than fundamentals, it's gambling.",
      },
      {
        prompt: "GME hits $483. You're up 1,000% if you bought early. Your whole feed is talking about it. Your friend says 'hold the line, it's going to $1,000.' What do you do?",
        context: "The price was driven by social media hype, not fundamentals. GameStop's business was still struggling. The squeeze was already happening.",
        choices: [
          { text: "Sell and take your profits", outcome: "Brilliant. GME fell from $483 to $50 within days. Taking profits when you're up 1,000% is never a mistake.", correct: true, xp: 30 },
          { text: "Hold — 'diamond hands, to $1,000!'", outcome: "The stock crashed to $50. 'Diamond hands' turned to paper losses. Greed turned a 1,000% gain into a loss.", correct: false, xp: 0 },
          { text: "Buy more at $483 — 'this is just the beginning'", outcome: "You bought at the exact top. The stock fell 90%. The worst possible entry point.", correct: false, xp: 0 },
        ],
        lesson: "Have a plan for when to sell before you buy. 'Diamond hands' sounds brave, but taking 1,000% profits is the real power move.",
      },
      {
        prompt: "The dust settles. GME is back to $50. The SEC is investigating. Trading apps restricted buying. What's the lesson for your investing journey?",
        context: "The event exposed issues in market structure but also showed how social media hype can create dangerous bubbles in any stock.",
        choices: [
          { text: "Stick to fundamentals — invest in companies with real value", outcome: "The right lesson. GameStop's business hadn't changed — only its stock price. Real wealth comes from real businesses.", correct: true, xp: 25 },
          { text: "Look for the next squeeze — you almost got rich", outcome: "Dangerous mindset. Chasing the next GME is like chasing lottery wins. Most 'meme stocks' after GME collapsed.", correct: false, xp: 0 },
          { text: "Never trust the stock market — it's all rigged", outcome: "Overreaction. The market isn't rigged, but speculative corners can be manipulated. Index funds remain the safest path.", correct: false, xp: 10 },
        ],
        lesson: "Speculative manias come and go. Real investing is about owning pieces of real businesses that create real value over time.",
      },
    ],
  },
];