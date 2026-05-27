import CapitalGainsCalculator from "./CapitalGainsCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .igt-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .igt-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .igt-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .igt-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .igt-title em { font-style: italic; color: #1e4a76; }
  .igt-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .igt-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .igt-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .igt-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .igt-input-wrap { position: relative; }
  .igt-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .igt-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .igt-input:focus { border-color: #1e4a76; }
  .igt-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .igt-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .igt-calc-btn:hover { background: #1e4a76; }
  .igt-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .igt-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .igt-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .igt-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .igt-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .igt-result-val.red { color: #b91c1c; }
  .igt-result-val.green { color: #d97706; }
  .igt-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .igt-prose p:last-child { margin-bottom: 0; }
  .igt-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .igt-prose ul li { margin-bottom: .3rem; }
  .igt-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .igt-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .igt-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .igt-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .igt-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .igt-info-item { padding: .75rem; border-left: 2px solid #9ac4de; }
  .igt-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .igt-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .igt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .igt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #9ac4de; line-height: 1; margin-bottom: .4rem; }
  .igt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .igt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #1e4a76; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .igt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .igt-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .igt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .igt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .igt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .igt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .igt-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .igt-field-row, .igt-result-grid, .igt-info-grid, .igt-tip-grid { grid-template-columns: 1fr; }
  }
`

const FAQ = [
  {
    q: "What's the difference between short-term and long-term capital gains?",
    a: "Short-term gains come from assets held for one year or less. They're taxed as ordinary income at your marginal tax rate, which can be as high as 37%. Long-term gains come from assets held for more than one year. They're taxed at preferential rates: 0%, 15%, or 20% depending on your total taxable income. The difference can be substantial — a $50,000 gain could cost $18,500 in short-term taxes but only $7,500 if held long-term at the 15% rate."
  },
  {
    q: "How do I qualify for the 0% long-term capital gains rate?",
    a: "For 2025, single filers with total taxable income under $47,025 pay 0% long-term capital gains tax. For married filing jointly, the threshold is $94,050. This includes both your ordinary income and the capital gain itself. If your income is near the threshold, selling appreciated assets in a low-income year — such as during a career transition or after retirement — can allow you to realize gains tax-free."
  },
  {
    q: "Can capital losses offset my gains?",
    a: "Yes — capital losses are first used to offset capital gains of the same type (short-term losses offset short-term gains, long-term losses offset long-term gains). If you have more losses than gains, up to $3,000 can be deducted against ordinary income each year. Any remaining losses carry forward indefinitely to future tax years. This strategy, called tax-loss harvesting, is commonly used to reduce taxable gains from winning investments."
  },
  {
    q: "Do I pay capital gains tax on cryptocurrency?",
    a: "Yes. The IRS treats cryptocurrency as property for tax purposes, which means every sale, trade, or crypto-to-crypto transaction is a taxable event. Short-term and long-term rules apply the same way as stocks. This includes using crypto to buy goods or services — the difference between your purchase price and the value at the time of spending is a capital gain or loss. Many crypto investors are caught off guard by the tax bill on trades they assumed were non-taxable."
  },
  {
    q: "Does the Net Investment Income Tax (NIIT) apply to me?",
    a: "This calculator does not include the 3.8% Net Investment Income Tax, which applies to high-income earners. For 2025, NIIT applies to individuals with modified adjusted gross income over $200,000 ($250,000 for married filing jointly). If you exceed these thresholds, add an additional 3.8% to your effective capital gains tax rate. Consult a tax professional for your specific situation."
  },
  {
    q: "What about state capital gains taxes?",
    a: "This calculator estimates federal capital gains tax only. Most states also tax capital gains as ordinary income, with rates typically ranging from 2–13%. A handful of states (including Florida, Texas, and Nevada) have no state income tax and thus no state capital gains tax. Check your state's tax rate and add it to the federal rate for a complete estimate."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="igt-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="igt-header">
          <p className="igt-eyebrow">Tax Planning</p>
          <h1 className="igt-title">Capital Gains Tax<br /><em>Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate short-term and long-term capital gains tax on stocks, crypto, and other investments. See your tax rate, tax owed, and net proceeds based on your income and holding period.
        </p>

        <CapitalGainsCalculator />

        {/* HOW IT WORKS */}
        <div className="igt-card">
          <p className="igt-section-title">How capital gains tax works</p>
          <div className="igt-prose">
            <p>When you sell an investment for more than you paid, the profit is a capital gain. Short-term gains (held ≤1 year) are taxed as ordinary income — up to 37%. Long-term gains (held {'>'}1 year) get preferential rates: 0%, 15%, or 20% depending on your total income.</p>
            <p>A married couple with $100,000 in ordinary income could sell stock for a $50,000 long-term gain and pay 0% tax on that gain. The same gain sold short-term would cost $11,000 or more. The calculator uses the current 2025 tax brackets to determine your rate automatically.</p>
          </div>
          <div className="igt-info-grid">
            <div className="igt-info-item">
              <p className="igt-info-title">Short-term rates</p>
              <p className="igt-info-body">10%, 12%, 22%, 24%, 32%, 35%, or 37% — same as ordinary income tax brackets. Applies to assets held 1 year or less.</p>
            </div>
            <div className="igt-info-item">
              <p className="igt-info-title">Long-term rates</p>
              <p className="igt-info-body">0%, 15%, or 20% depending on total taxable income. Applies to assets held more than 1 year.</p>
            </div>
            <div className="igt-info-item">
              <p className="igt-info-title">Net Investment Income Tax</p>
              <p className="igt-info-body">High earners (AGI over $200k/$250k) pay an additional 3.8% NIIT on investment income including capital gains.</p>
            </div>
            <div className="igt-info-item">
              <p className="igt-info-title">Wash sale rule</p>
              <p className="igt-info-body">You cannot claim a loss if you buy the same security within 30 days before or after the sale. This rule applies to stocks and ETFs but not crypto.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="igt-card">
          <p className="igt-section-title">Why holding period is your most powerful tax lever</p>
          <div className="igt-prose">
            <p>The single biggest factor in your investment tax bill is completely within your control: how long you hold before selling. The difference between selling at 11 months (short-term) and 12 months (long-term) can cut your tax rate from 35% to 15% or even 0%.</p>
            <p>Consider an investor in the 32% ordinary bracket who buys $50,000 of stock that doubles to $100,000. Selling at 11 months costs roughly $16,000 in federal tax. Waiting one more month — crossing the 12-month threshold — cuts the tax to roughly $7,500. That one month of patience is worth $8,500. The same logic applies to smaller gains, just proportionally.</p>
            <p>This calculator helps you see that difference instantly. If you're close to the one-year mark, the math often strongly favors waiting.</p>
          </div>
        </div>

        {/* REAL-WORLD EXAMPLE */}
        <div className="igt-card">
          <p className="igt-section-title">Real-world example: Short-term vs long-term tax difference</p>
          <div className="igt-prose">
            <p><strong>Meet James.</strong> He's a single software engineer earning $120,000/year. He bought $40,000 of stock that grew to $70,000 — a $30,000 gain.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#fff1f2", padding: "1rem", borderRadius: "4px", border: "1px solid #fcd4d4" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#b91c1c", marginBottom: ".5rem" }}>📉 Sells at 11 months (short-term)</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>Income + gain = $150,000 → 24% bracket</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Tax owed:</strong> $7,200</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Net proceeds:</strong> $62,800</p>
              <p style={{ fontSize: "13px", color: "#b91c1c", fontWeight: "500", marginTop: ".5rem" }}>He pays nearly 1/4 of his gain to the IRS.</p>
            </div>
            
            <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "4px", border: "1px solid #b7d9c8" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#166534", marginBottom: ".5rem" }}>📈 Waits to 13 months (long-term)</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>Income + gain = $150,000 → 15% long-term rate</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Tax owed:</strong> $4,500</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Net proceeds:</strong> $65,500</p>
              <p style={{ fontSize: "13px", color: "#166534", fontWeight: "500", marginTop: ".5rem" }}>Waiting 2 months saves him $2,700 — 38% less tax.</p>
            </div>
          </div>
          
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
            <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: "500", marginBottom: ".25rem" }}>The bottom line:</p>
            <p style={{ fontSize: "13px", color: "#444" }}>James had no reason to sell at 11 months. By waiting just 2 more months, he kept an extra $2,700 in his pocket — the same investment, the same gain, different tax outcome. If you're close to the one-year mark, check the calendar before you click sell.</p>
          </div>
        </div>

        {/* STRATEGIES */}
        <div className="igt-card">
          <p className="igt-section-title">Four ways to pay less capital gains tax</p>
          <div className="igt-tip-grid">
            <div>
              <p className="igt-tip-num">01</p>
              <p className="igt-tip-title">Wait one year</p>
              <p className="igt-tip-body">The single most effective strategy. Waiting a few weeks can cut your tax rate by half or more. If you're at 11 months, wait until month 13 to sell.</p>
            </div>
            <div>
              <p className="igt-tip-num">02</p>
              <p className="igt-tip-title">Harvest losses</p>
              <p className="igt-tip-body">Sell underperforming investments to offset gains. Up to $3,000 in excess losses can reduce ordinary income each year. Remaining losses carry forward indefinitely.</p>
            </div>
            <div>
              <p className="igt-tip-num">03</p>
              <p className="igt-tip-title">Use retirement accounts</p>
              <p className="igt-tip-body">Trades inside a 401(k), traditional IRA, or Roth IRA generate no capital gains tax at the time of sale. This is the most tax-efficient way to hold investments that you plan to trade actively.</p>
            </div>
            <div>
              <p className="igt-tip-num">04</p>
              <p className="igt-tip-title">Time your income</p>
              <p className="igt-tip-body">Sell appreciated assets in low-income years to qualify for the 0% long-term bracket. Consider selling during sabbaticals, career transitions, or early retirement before Social Security or RMDs begin.</p>
            </div>
          </div>
        </div>

        {/* TAX BRACKETS REFERENCE */}
        <div className="igt-card">
          <p className="igt-section-title">2025 Long-term capital gains tax brackets</p>
          <div className="igt-prose">
            <p>Your long-term capital gains rate depends on your total taxable income including the gain itself:</p>
            <ul>
              <li><strong>0% rate:</strong> Single up to $47,025 · Married filing jointly up to $94,050</li>
              <li><strong>15% rate:</strong> Single $47,026–$518,900 · Married filing jointly $94,051–$583,750</li>
              <li><strong>20% rate:</strong> Single over $518,900 · Married filing jointly over $583,750</li>
            </ul>
            <p><strong>Short-term rates</strong> follow the ordinary income tax brackets: 10%, 12%, 22%, 24%, 32%, 35%, and 37% at the highest incomes. The calculator applies these automatically based on your annual income plus the gain.</p>
            <p style={{ fontSize: "11px", color: "#888", marginTop: ".5rem" }}>These thresholds are for 2025 tax year. High earners may also owe the 3.8% Net Investment Income Tax — not included in these rates.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="igt-card">
          <p className="igt-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="igt-faq-item" key={i}>
              <p className="igt-faq-q">{item.q}</p>
              <p className="igt-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="igt-card">
          <p className="igt-section-title">Related tools</p>
          <p className="igt-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="igt-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="igt-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="igt-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute tax advice. Tax laws change frequently and vary by individual situation. Consult a qualified tax professional before making investment or tax decisions. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="igt-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
