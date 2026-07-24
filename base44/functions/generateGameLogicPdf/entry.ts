import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { jsPDF } from 'npm:jspdf@4.2.1';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

const ADMIN_PASSWORD = "AA9777";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return withHeaders({ ok: false, error: "Forbidden" }, 403);
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 48;
    const maxW = pageW - margin * 2;
    let y = margin;

    const ensure = (needed) => {
      if (y + needed > pageH - margin) { doc.addPage(); y = margin; }
    };

    const h1 = (t) => {
      ensure(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(34, 139, 34);
      doc.text(t, margin, y);
      y += 28;
    };
    const h2 = (t) => {
      ensure(34);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(30, 30, 30);
      doc.text(t, margin, y);
      y += 20;
    };
    const p = (t) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(55, 55, 55);
      const lines = doc.splitTextToSize(t, maxW);
      for (const ln of lines) { ensure(16); doc.text(ln, margin, y); y += 15; }
      y += 4;
    };
    const li = (t) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(55, 55, 55);
      const lines = doc.splitTextToSize("•  " + t, maxW - 14);
      for (const ln of lines) { ensure(16); doc.text(ln, margin + 14, y); y += 15; }
      y += 3;
    };
    const spacer = (n = 10) => { y += n; };

    // ── COVER ──────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(34, 139, 34);
    doc.text("StockiLearn", pageW / 2, pageH / 2 - 40, { align: "center" });
    doc.setFontSize(18);
    doc.setTextColor(60, 60, 60);
    doc.text("Complete Game Logic & Systems Reference", pageW / 2, pageH / 2, { align: "center" });
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("Generated " + new Date().toISOString().split("T")[0], pageW / 2, pageH / 2 + 30, { align: "center" });
    doc.addPage();
    y = margin;

    // ── 1. ARCHITECTURE OVERVIEW ───────────────────────────
    h1("1. Architecture Overview");
    p("StockiLearn is a gamified investing-education web app built on React + Tailwind CSS on Vite, backed by the Base44 platform (auth, database, integrations, hosting). It ships to iOS/Android from the same codebase. The app uses a CUSTOM authentication system (not the platform's built-in User auth) so that gameplay accounts, league servers, and XP state are fully under the app's control.");
    h2("Frontend Stack");
    li("React + Tailwind CSS + Vite (ESM only).");
    li("shadcn/ui component primitives, lucide-react icons, framer-motion animations.");
    li("React Router for navigation; @tanstack/react-query for data fetching/caching.");
    li("recharts for charts, react-leaflet for maps, three.js for 3D, @hello-pangea/dnd for drag-and-drop.");
    h2("Backend Stack");
    li("Base44 entities (JSON-schema data models) with Row-Level Security (RLS).");
    li("Backend functions (Deno serverless handlers) for auth, XP, and service-role reads.");
    li("Core integrations: InvokeLLM (AI tutor Bruno), UploadFile, SendEmail, GenerateImage/Speech/Video.");
    li("Workflows for scheduled daily-challenge dispatch and reminders.");

    // ── 2. AUTHENTICATION & SECURITY ───────────────────────
    h1("2. Authentication & Security");
    p("The app does NOT use the platform's built-in login. Instead it authenticates against the custom AppUser entity through backend functions (appSignup, appLogin, completeOnboarding). This avoids RLS blocking unauthenticated client writes.");
    h2("Account Model (AppUser entity)");
    li("username: unique, stored lowercase. Acts as the login identifier.");
    li("password_hash: PBKDF2 hash (SHA-256, salted) — plaintext is never stored.");
    li("session_token: random UUID issued at signup/login; the bearer credential for all subsequent backend calls. Rotated on onboarding completion.");
    li("role: 'user' (default) or 'admin'.");
    li("failed_login_attempts + locked_until: persistent rate limiting / lockout.");
    h2("Password Hashing");
    p("Passwords are hashed with PBKDF2 using SubtleCrypto (SHA-256) and a per-user random salt. Verification re-derives the hash and compares in constant time. Plaintext passwords are never stored or logged.");
    h2("Rate Limiting & Lockout");
    li("Each failed login increments failed_login_attempts on the AppUser record.");
    li("After repeated failures the account is locked (locked_until ISO timestamp) for a cooldown period.");
    li("Locked accounts are rejected at login and at lesson-progress saves.");
    h2("Session Token Flow");
    li("Issued at signup and login; returned to the client and stored in localStorage (stockilearn_session).");
    li("Every gameplay backend call (saveLessonProgress, getLeagueLeaderboard) sends session_token; the function validates it via a strict UUID regex, looks up exactly one matching user, and refuses ambiguous identities.");
    li("Rotated on onboarding completion to prevent replay; NOT rotated on frequent lesson saves (to avoid lockout if a response is lost).");
    h2("Row-Level Security (RLS)");
    p("Every entity is RLS-protected. Most gameplay entities (LessonProgress, PaperPortfolio, PaperTrade, etc.) are owner-scoped: a user can only read/write their own records (created_by_id === user.id), with admins having full access. AppUser is admin-only for create/delete, owner-or-admin for read/update. This means cross-user reads (e.g. league leaderboards) MUST go through service-role backend functions that return only public-safe fields.");

    // ── 3. DATA MODEL (ENTITIES) ───────────────────────────
    h1("3. Data Model (Entities)");
    h2("AppUser");
    p("The player account. Key fields: username, display_name, password_hash, session_token, role, xp_total, level, streak_current, streak_longest, hearts_current, gems, daily_xp_earned_today, daily_goal_xp, league_tier, league_xp, league_instance, onboarding_complete, preferred_currency, goal_type, knowledge_level, last_active_date, completed_lessons, failed_login_attempts, locked_until.");
    h2("LessonProgress");
    p("Per-lesson record: lesson_id, unit_id, status (locked/in_progress/complete), score_percent, xp_earned, completed_at, attempts_count.");
    h2("PaperPortfolio");
    p("cash_balance (default £10,000), total_value, deposits_used.");
    h2("PaperHolding");
    p("ticker, shares, avg_buy_price.");
    h2("PaperTrade");
    p("ticker, action (buy/sell), shares, price_at_trade, total_value, realised_pnl, order_type (market/limit/stop).");
    h2("Watchlist");
    p("ticker — stocks the user is tracking.");
    h2("Prediction");
    p("ticker, direction (up/down), prediction_date, result_direction, is_correct, xp_awarded, is_resolved.");
    h2("UserBadge");
    p("badge_slug, badge_name, badge_emoji — achievement record.");
    h2("Challenge / DailyChallenge");
    p("Challenge: long-running goals (challenge_slug, status active/completed/failed, progress_percent, xp_reward, badge_reward). DailyChallenge: per-day task (challenge_date, completed, xp_earned, challenge_type quiz/portfolio/streak/prediction, score).");
    h2("TopicMastery");
    p("topic, mastery_percent (0-100), lessons_completed, quiz_accuracy, total_xp_earned, last_practiced.");
    h2("WeeklyRecap");
    p("week_start, xp_earned, lessons_completed, quizzes_passed, streak_days, best_topic, league_rank, portfolio_change_pct.");
    h2("LoginLog / ContactSubmission");
    p("LoginLog audits sign-in/sign-up events (username, action, success, timestamp). ContactSubmission stores contact-form IP/email for rate limiting.");

    // ── 4. XP SYSTEM ───────────────────────────────────────
    h1("4. XP System");
    p("All XP awards flow through a centralised xpEngine so the economy stays balanced. XP is NEVER trusted from the client — the server re-derives it from trusted lesson tables and validated scores.");
    h2("XP Values (xpEngine.js)");
    li("LESSON_COMPLETE_BASE: 15");
    li("QUIZ_CORRECT: 5");
    li("QUIZ_PERFECT (100%): 20 bonus");
    li("STREAK_BONUS_PER_DAY: 2 (capped at 50 days)");
    li("DAILY_CHALLENGE: 30");
    li("DAILY_GOAL_HIT: 10");
    li("LEAGUE_PROMOTION: 50");
    li("PREDICTION_CORRECT: 20");
    li("TRADE_EXECUTED: 5");
    li("FIRST_TRADE: 25");
    li("PORTFOLIO_UP_10: 30");
    li("PORTFOLIO_UP_25: 75");
    h2("Streak Multiplier");
    p("Scales lesson XP based on consecutive-day streak: 3+ days = 1.1x, 7+ = 1.2x, 14+ = 1.3x, 30+ = 1.5x, 100+ = 2.0x (hard cap).");
    h2("Accuracy Multiplier");
    p("Scales lesson XP by quiz accuracy: 100% = 1.5x, 80%+ = 1.2x, 60%+ = 1.0x, below 60% = 0.8x (partial).");
    h2("Lesson XP Calculation");
    p("calcLessonXp = baseXp * streakMultiplier * accuracyMultiplier (first completion). Repeat lessons give flat 50% XP to prevent farming. Server-side, XP is derived from a trusted LESSON_XP table keyed by lesson ID, scaled by the clamped score percentage, and awarded 0 if the lesson was already completed (anti-farming).");
    h2("Combo Bonus");
    p("Consecutive perfect (100%) lessons grant a combo bonus: 2 in a row = +10, 3 = +25, 5+ = +50.");
    h2("Trusted Lesson XP Table (server)");
    p("Each lesson ID maps to a max XP (e.g. 1.1 = 15, 1.C checkpoint = 50, 5.C = 75, 6.C = 75). The server clamps the score 0-100 and awards round(maxXp * score/100), only on first completion.");

    // ── 5. LEVEL SYSTEM ────────────────────────────────────
    h1("5. Level System");
    h2("Level Curve");
    p("Level is derived from total XP. XP required for a level grows progressively: getXpForLevel(L) = 200 + (L-1)*80. Level caps at 50. A player accumulates XP across levels; getLevelProgress returns the current level, progress fraction, XP spent, and XP needed for the next level.");
    p("Example: Level 1 needs 200 XP, Level 2 needs 280, Level 3 needs 360... Level 50 needs ~4,120 XP.");
    h2("Level Titles");
    li("Lv 1-4: Market Newbie 🐣");
    li("Lv 5-9: Market Learner 📖");
    li("Lv 10-14: Junior Analyst 🔍");
    li("Lv 15-19: Stock Enthusiast 📊");
    li("Lv 20-24: Certified Trader ⚡");
    li("Lv 25-29: Senior Analyst 💼");
    li("Lv 30-34: Portfolio Pro 🧩");
    li("Lv 35-39: Market Expert 🎯");
    li("Lv 40-49: Wall Street Wizard 🪄");
    li("Lv 50: Market Legend 👑");

    // ── 6. STREAKS ────────────────────────────────────────
    h1("6. Streaks");
    li("streak_current increments by 1 on the first lesson/activity of a new calendar day (tracked via last_active_date).");
    li("streak_longest keeps the all-time high.");
    li("Streaks feed the streak multiplier (up to 2x XP at 100 days).");
    li("Streak badges: Week Warrior (7d), Month Master (30d), Streak Legend (100d).");
    li("Streak Freezes: gems can buy freezes to protect a streak on a missed day (Freeze Master badge at 10 uses).");

    // ── 7. HEARTS & GEMS ──────────────────────────────────
    h1("7. Hearts & Gems");
    li("hearts_current (default 5): lives lost on failed quiz answers; regen over time.");
    li("gems: premium currency earned through lessons, challenges, and milestones. Spent on streak freezes, hearts refills, and other perks.");

    // ── 8. LEAGUES ─────────────────────────────────────────
    h1("8. Leagues");
    p("Weekly competitive leagues ranked by league_xp earned during the season. Resembles a 'server' system: each league tier is split into server instances (shards) capped at 30 players.");
    h2("League Tiers");
    li("Tier 1: Pebble League 🪨");
    li("Tier 2: Bronze League 🥉");
    li("Tier 3: Silver League 🥈");
    li("Tier 4: Gold League 🥇");
    li("Tier 5: Diamond League 💎");
    li("Tier 6: Sapphire League 🔮");
    li("Tier 7: Obsidian League 🏆");
    h2("Server Sharding");
    p("assignLeagueServer places each user into a server instance within their tier. Servers cap at MAX_PLAYERS_PER_SERVER = 30. Currently all users are placed into Server 1 (single league) so everyone competes together; the sharding logic exists to split into new servers when a server fills.");
    h2("Server Assignment");
    li("New users (appSignup) are assigned a server on join.");
    li("Returning users (appLogin) are backfilled if they predate the sharding feature (league_instance unset).");
    li("Admins can manually set a user's server via the Admin panel.");
    h2("Season & Rankings");
    li("league_xp accumulates during the season (reset weekly, nominally Monday).");
    li("Leaderboard fetched via getLeagueLeaderboard: real players in the user's tier + server, sorted by league_xp, with rank, XP, streak, and isUser flag.");
    li("Top 5 promote to the next tier; bottom 5 relegate; ranks 6-25 are safe.");
    li("League Champion badge for finishing #1.");
    h2("Server Capacity Display");
    p("The Leagues page shows a server capacity bar (fill/30). When full, new players are routed to a fresh server.");

    // ── 9. DAILY CHALLENGES ────────────────────────────────
    h1("9. Daily Challenges");
    h2("Rotating Daily Question");
    p("A pool of 14 investing questions (DAILY_QUESTIONS). getTodaysChallenge seeds by today's date (YYYYMMDD % pool length) so every user sees the same question on a given day. Each question awards 20-35 XP. Topics include compound interest, diversification, P/E ratios, inflation, ETFs, DCA, corrections, and bond/rate relationships.");
    h2("Daily Missions");
    p("3 missions rotate daily by day-of-week (getTodaysMissions). Pool: Complete a lesson (15), Pass a quiz (10), Make a trade (10), Keep your streak (5), Add to watchlist (5), Answer daily Q (20), Get 100% on quiz (25).");
    h2("Scheduled Dispatch");
    li("dispatchDailyChallenges workflow fires daily to seed per-user DailyChallenge records.");
    li("processDailyChallengeReminders sends reminders via the Outlook connector (Mail.Send).");

    // ── 10. MASTERY ────────────────────────────────────────
    h1("10. Topic Mastery");
    p("Lessons map to 10 topic categories (stocks, financials, valuation, dividends, trading, portfolio, etfs, risk, advanced, psychology). Mastery per topic = 60% completion weight + 40% average accuracy weight, clamped 0-100.");
    h2("Topic Meta");
    li("Stocks & Markets 📈 (#3b82f6)");
    li("Company Financials 📊 (#8b5cf6)");
    li("Stock Valuation 💰 (#f59e0b)");
    li("Dividends 💵 (#10b981)");
    li("Trading Mechanics ⚡ (#00FF87)");
    li("Portfolio Strategy 🧩 (#6366f1)");
    li("ETFs & Index Funds 🗂️ (#ec4899)");
    li("Risk Management 🛡️ (#ef4444)");
    li("Advanced Concepts 🚀 (#ff6b35)");
    li("Market Psychology 🧠 (#a855f7)");
    h2("Mastery Helpers");
    li("getRevisionTopics: topics below 60% mastery, sorted ascending.");
    li("getStrongestTopic / getWeakestTopic: highest/lowest mastery topics.");

    // ── 11. SPACED REPETITION / FLASHCARDS ─────────────────
    h1("11. Spaced Repetition (Flashcards)");
    p("Implements the SM-2 algorithm. Review state is stored in localStorage (stockilearn_flashcard_progress) per term key.");
    h2("SM-2 Parameters");
    li("quality 0-5 (0 = Again, 3 = Hard, 4 = Good, 5 = Easy).");
    li("Initial ease factor 2.5, floored at 1.3.");
    li("Interval progression: rep 0 -> 1 day, rep 1 -> 6 days, then interval * ease.");
    li("On quality < 3 (fail): repetitions reset to 0, interval reset to 1.");
    li("Ease updated: ease += (0.1 - (5-q)*(0.08 + (5-q)*0.02)), floored 1.3.");
    h2("Card States");
    li("getDueCards: cards never seen OR whose nextReview <= today.");
    li("getStats: due, reviewed, mastered (interval >= 21), learning, total.");

    // ── 12. TRADING SIMULATOR GAME ─────────────────────────
    h1("12. Trading Simulator Game");
    p("A timing-based mini-game (gameEngine.js). Players try to time buy/sell decisions on a simulated price chart and beat buy-and-hold.");
    h2("Round Generation");
    li("Random ticker selected from the stock universe.");
    li("STARTING_CASH = £10,000; 250 price points; tick every 120ms.");
    li("Price series generated with a regime model: 35% bull, 35% bear, 30% choppy, with regime length 15-50 ticks.");
    li("Per-tick move = regime drift (±0.0007) + noise scaled by stock beta (0.003 * beta).");
    h2("Result Calculation");
    li("Player return vs buy-and-hold return (start vs end price).");
    li("beatMarket = playerReturn > buyHoldReturn.");
    li("If holding shares at end, valued at endPrice.");
    h2("Game XP");
    li("Base 10 XP.");
    li("+20 if beatMarket, +10 if positive return, +15 if >5%, +25 if >10%.");
    li("Max ~80 XP per round.");

    // ── 13. PAPER TRADING ──────────────────────────────────
    h1("13. Paper Trading");
    p("Educational simulated portfolio with £10,000 starting cash. No real money is ever involved.");
    h2("Portfolio");
    li("cash_balance, total_value, deposits_used tracked in PaperPortfolio.");
    li("Holdings (PaperHolding): ticker, shares, avg_buy_price (weighted average on buys).");
    li("Trades (PaperTrade): buy/sell, shares, price_at_trade, total_value, realised_pnl, order_type (market/limit/stop).");
    h2("Stock Detail Page");
    li("Market tab: stock chart and price data.");
    li("Portfolio tab: holdings and cash overview.");
    li("Watchlist tab: tracked tickers.");
    li("History tab: trade history.");
    li("TradeModal: buy/sell execution.");
    h2("Portfolio Milestones");
    li("Bull Rider badge: portfolio up 10%.");
    li("To The Moon badge: portfolio up 25%.");
    li("Diamond Hands badge: hold a position 30 days.");
    li("First Trade badge: execute first paper trade (+25 XP).");

    // ── 14. PREDICTIONS ────────────────────────────────────
    h1("14. Predictions");
    li("User predicts a stock's direction (up/down) for a given date.");
    li("Prediction entity: ticker, direction, prediction_date, result_direction, is_correct, xp_awarded, is_resolved.");
    li("Correct prediction awards 20 XP (PREDICTION_CORRECT).");
    li("Resolved asynchronously when the prediction date passes.");

    // ── 15. BADGES ─────────────────────────────────────────
    h1("15. Badges (Achievements)");
    p("26 collectible badges stored as UserBadge records (badge_slug, badge_name, badge_emoji). Examples:");
    li("Unit completion: Market Seedling, Company Analyst, Certified Trader, Portfolio Architect, Market Veteran, Real-World Investor.");
    li("Streaks: Week Warrior, Month Master, Streak Legend.");
    li("Skill: Speed Demon (lesson < 60s), Sharpshooter (5 perfect in a row), Genius (100% on 10 quizzes).");
    li("Trading: First Trade, Bull Rider, To The Moon, Diamond Hands, Contrarian, Diversified.");
    li("Social/League: Challenger, League Champion.");
    li("Misc: News Junkie, Freeze Master, Global Thinker, Graduated, Boss Slayer, Market Legend (Lv 50).");

    // ── 16. CURRICULUM ────────────────────────────────────
    h1("16. Lessons & Curriculum");
    p("6 units, each ending in a checkpoint exam. Lessons are story-driven with slides (text + visual + detail + example) and a quiz (multiple_choice, true_false, fill_blank). Lessons unlock sequentially; a unit's checkpoint unlocks after its lessons.");
    h2("Units");
    li("Unit 1: The Foundation 🌱 — stocks, market, bulls/bears, supply & demand, tickers (badge: Market Seedling).");
    li("Unit 2: Understanding Companies 🏢 — financials, valuation, dividends (badge: Company Analyst).");
    li("Unit 3: Trading Mechanics ⚡ (badge: Certified Trader).");
    li("Unit 4: Portfolio Strategy 🧩 (badge: Portfolio Architect).");
    li("Unit 5: Advanced Concepts 🚀 (badge: Market Veteran).");
    li("Unit 6: Real-World Investing 🌍 — ISAs, DCA, alternatives, news (badge: Real-World Investor).");
    h2("Lesson Flow");
    li("Intro -> slides -> quiz -> completion screen with XP, accuracy, streak, and badge unlocks.");
    li("Hearts are consumed on wrong answers; running out blocks further attempts until regen.");
    li("Onboarding can pre-unlock lessons based on the user's self-reported knowledge level.");
    h2("Checkpoint Exams");
    li("1.C, 2.C (50 XP), 3.C, 4.C (50 XP), 5.C, 6.C (75 XP) — comprehensive final exams per unit.");

    // ── 17. ONBOARDING ─────────────────────────────────────
    h1("17. Onboarding");
    li("Multi-step wizard collects goal_type, knowledge_level, and daily commitment (daily_goal_xp).");
    li("completeOnboarding backend function validates session_token, updates the profile, rotates the session token, and pre-unlocks lessons based on knowledge level.");
    li("onboarding_complete flag gates entry into the main app.");

    // ── 18. AI TUTOR (Bruno) ───────────────────────────────
    h1("18. AI Tutor — Bruno the Bull 🐂");
    li("Floating chat widget using InvokeLLM.");
    li("Persona: friendly, enthusiastic investing tutor; 2-3 sentence answers, plain English, one emoji.");
    li("Framed as educational only — avoids financial-advice language.");

    // ── 19. BACKEND FUNCTIONS ──────────────────────────────
    h1("19. Backend Functions");
    li("appSignup — registers a new AppUser (PBKDF2 hash, league server assignment, default stats, session token).");
    li("appLogin — validates credentials, enforces lockout/rate-limit, backfills league server, issues session token.");
    li("completeOnboarding — finalises profile, rotates session token.");
    li("saveLessonProgress — trusted XP derivation, anti-farming, streak/daily/league XP updates.");
    li("getLeagueLeaderboard — real players in the user's tier+server (public-safe fields).");
    li("getServersOverview — admin/server overview of all league servers and rosters (password-gated AA9777).");
    li("dispatchDailyChallenges — scheduled daily-challenge seeding.");
    li("processDailyChallengeReminders — scheduled reminder emails via Outlook.");
    li("sendContactMessage — contact form submission (rate-limited via ContactSubmission).");
    li("verifyClaudeAccess — password gate for the Claude page.");
    li("getAnalyticsData / getSearchConsoleData — Google Analytics & Search Console integration reads.");

    // ── 20. ADMIN PANEL ────────────────────────────────────
    h1("20. Admin Panel");
    li("Password-gated (AA9777) — anyone with the password can access; real admin-role users bypass the gate.");
    li("Overview: total/active/banned users, lesson & badge counts, platform architecture notes.");
    li("Users: search/filter, ban/unban, promote/demote admin, and set each user's league server inline.");
    li("Servers: every game server with player count, capacity bar (x/30), and full ranked roster (real players, XP, streaks).");
    li("Content: full lesson catalogue by unit with XP/time/type.");
    li("Gamification: badge catalogue and level titles.");
    li("Moderation: safety guidelines and data/privacy notes.");
    li("Pitch: link to the investor pitch deck.");

    // ── 21. WORKFLOWS ──────────────────────────────────────
    h1("21. Workflows");
    li("Daily Challenge: scheduled workflow that triggers dispatchDailyChallenges and reminder processing on a cron cadence.");

    // ── 22. PERSISTENCE & SYNC ─────────────────────────────
    h1("22. Persistence & Sync");
    li("Lesson progress saves optimistically update the local demoUser profile, then persist server-side via saveLessonProgress (session_token auth).");
    li("On login, DemoContext fetches persistent state (completed_lessons, XP totals, streaks, league data) so users resume across devices.");
    li("localStorage keys: stockilearn_session (session profile), stockilearn_lesson_progress (demo fallback), stockilearn_flashcard_progress (SM-2 state).");

    // ── 23. SAFETY & COMPLIANCE ────────────────────────────
    h1("23. Safety & Compliance");
    li("No real money involved at any point — all trading is simulated.");
    li("AI tutor responses avoid financial-advice language; framed educational only.");
    li("League leaderboards use pseudonymous usernames, not full names.");
    li("User progress data is per-user with RLS; analytics are aggregated, not linked to individuals.");

    // ── END ───────────────────────────────────────────────
    spacer(20);
    h2("End of Document");
    p("This document is a generated snapshot of StockiLearn's game logic and systems. For the authoritative source, refer to the codebase.");

    const dataUri = doc.output("datauristring");
    return withHeaders({ ok: true, pdf: dataUri });
  } catch (error) {
    return withHeaders({ ok: false, error: error.message }, 500);
  }
});