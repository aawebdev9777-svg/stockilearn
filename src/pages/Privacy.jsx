import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Privacy() {
  const lastUpdated = "23 July 2026";

  return (
    <div className="min-h-screen bg-white text-gray-800 font-nunito">

      {/* Nav */}
      <nav className="border-b-2 border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </Link>
          <Link to="/login"
            className="text-sm font-black px-5 py-2.5 rounded-xl bg-[#58CC02] text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">Your Privacy</p>
          <h1 className="text-4xl font-black text-gray-900 leading-tight">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mt-2">Last updated: {lastUpdated}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 text-gray-600 leading-relaxed"
        >
          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">1. Overview</h2>
            <p>
              StockiLearn ("we", "us") is a gamified investing education app. We are committed to
              protecting your privacy. This policy explains what data we collect, how we use it, and
              the choices you have. By creating an account, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Account information:</strong> the username and password you choose, plus your email address if you provide it for account recovery or support.</li>
              <li><strong>Learning progress:</strong> completed lessons, quiz scores, XP, streaks, level, badges, and league tier.</li>
              <li><strong>Paper trading data:</strong> your virtual portfolio, holdings, trades, and watchlist. All trading uses <em>virtual</em> money only — no real funds are ever involved.</li>
              <li><strong>App settings:</strong> preferences such as currency and daily XP goal.</li>
              <li><strong>Usage analytics:</strong> aggregated, anonymised event data (e.g. screens viewed, features used) collected via Google Analytics to help us improve the app.</li>
              <li><strong>Technical data:</strong> account creation date and a unique user identifier assigned by our backend.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To provide your personalised learning journey and save your progress across devices.</li>
              <li>To run the paper trading simulator and calculate your portfolio performance.</li>
              <li>To operate gamification features such as streaks, XP, leagues, and badges.</li>
              <li>To power the Bruno AI tutor, which processes your questions to generate educational responses.</li>
              <li>To analyse aggregated usage patterns so we can improve lessons and features.</li>
              <li>To send you service-related notifications (e.g. streak reminders) where you have enabled them.</li>
            </ul>
            <p className="mt-2">We never sell your personal data, and we do not use it to build advertising profiles.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">4. Third Parties</h2>
            <p>We share data only with trusted service providers that help us operate the app:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Base44</strong> — hosts our backend, database, and authentication. Your account and progress data are stored here.</li>
              <li><strong>Google Analytics</strong> — receives anonymised usage metrics to help us understand how the app is used. Google's use of data is governed by its own privacy policy.</li>
              <li><strong>AI provider</strong> — processes prompts you send to the Bruno AI tutor to generate responses. We do not use your inputs to train third-party models.</li>
            </ul>
            <p className="mt-2">If you purchase a StockiLearn Pro subscription, the transaction is processed by Apple's App Store under Apple's own privacy policy; we only receive confirmation of your subscription status.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">5. Data Retention & Deletion</h2>
            <p>
              We keep your data for as long as your account is active. You can delete your account and all
              associated data at any time from <strong>Settings → Delete Account</strong>. This permanently
              removes your profile, progress, portfolio, and achievements. Anonymised analytics data that has
              already been aggregated is not linked back to you after deletion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">6. Children's Privacy</h2>
            <p>
              StockiLearn is designed for teenagers, students, and young adults learning about investing.
              We do not knowingly collect data from children under 13. We never share personal information
              with third parties for marketing, and we do not serve behavioural advertising to minors. Parents
              who believe their child has registered an account may contact us to request its deletion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">7. Security</h2>
            <p>
              Passwords are never stored in plain text — they are hashed with a salted one-way function before
              being saved. Access to your data is restricted to you and authorised administrators. While we use
              industry-standard safeguards, no method of transmission or storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">8. Your Rights</h2>
            <p>
              Depending on where you live (for example, under the EU/UK GDPR), you may have the right to access,
              correct, or delete your personal data, and to withdraw consent for processing. To exercise any of
              these rights, delete your account in Settings or contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">9. Educational Use Only</h2>
            <p>
              StockiLearn is an educational tool. All trading takes place with virtual money and real-time
              simulated prices. Nothing in the app constitutes financial, investment, or trading advice. Always
              do your own research and consult a qualified professional before making real financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. When we do, we will revise the "last updated" date
              above. Continued use of the app after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-2">11. Contact Us</h2>
            <p>
              Questions about this policy or your data? Email us at{" "}
              <a href="mailto:aa.web.dev@outlook.com" className="text-[#58CC02] font-bold hover:underline">
                aa.web.dev@outlook.com
              </a>{" "}
              or use our <Link to="/contact" className="text-[#58CC02] font-bold hover:underline">contact form</Link>.
            </p>
          </section>
        </motion.div>

        <div className="text-center pt-10">
          <Link to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white bg-[#58CC02] border-b-4 border-[#46A302] hover:brightness-105 transition-all shadow-md">
            Back to StockiLearn
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-100 py-8 px-6 bg-white mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </Link>
          <p className="text-xs text-gray-400">© 2026 StockiLearn · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-gray-700 transition-colors font-bold text-[#58CC02]">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}