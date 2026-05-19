"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
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
  .igt-input.no-prefix { padding-left: 0; }
  .igt-input:focus { border-color: #1e4a76; }
  .igt-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .igt-select:focus { border-color: #1e4a76; }
  .igt-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
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
  .igt-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .igt-info-item { padding: .75rem; border-left: 2px solid #9ac4de; }
  .igt-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .igt-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .igt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .igt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #9ac4de; line-height: 1; margin-bottom: .4rem; }
  .igt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .igt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .igt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .igt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .igt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .igt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .igt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .igt-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .igt-field-row, .igt-result-grid, .igt-info-grid, .igt-tip-grid { grid-template-columns: 1fr; }
  }
`

function fmt(num) {
  return "$" + Math.round(num).toLocaleString("en-US")
}

function fmtDec(num) {
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 2025 long-term capital gains tax brackets (single filer)
function getLongTermRate(income, gain) {
  const totalIncome = income + gain
  if (totalIncome <= 47025) return 0
  if (totalIncome <= 518900) return 0.15
  return 0.20
}

function getShortTermRate(income, gain) {
  const total = income + gain
  if (total <= 11600) return 0.10
  if (total <= 47150) return 0.12
  if (total <= 100525) return 0.22
  if (total <= 191950) return 0.24
  if (total <= 243725) return 0.32
  if (total <= 609350) return 0.35
  return 0.37
}

export default function Page() {
  const [salePrice, setSalePrice] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [holdingPeriod, setHoldingPeriod] = useState("long")
  const [income, setIncome] = useState("")
  const [results, setResults] = useState(null)

  const calculate = () => {
    const sale = parseFloat(salePrice)
    const purchase = parseFloat(purchasePrice)
    const annualIncome = parseFloat(income) || 0

    if (!sale || !purchase) return

    const gain = sale - purchase
    const isLoss = gain < 0
    const absGain = Math.abs(gain)

    let taxRate = 0
    let taxOwed = 0

    if (!isLoss) {
      if (holdingPeriod === "long") {
        taxRate = getLongTermRate(annualIncome, gain)
      } else {
        taxRate = getShortTermRate(annualIncome, gain)
      }
      taxOwed = gain * taxRate
    }

    const netProceeds = sale - taxOwed

    setResults({
      gain,
      isLoss,
      absGain,
      taxRate,
      taxOwed,
      netProceeds,
      holdingPeriod,
    })
  }

  return (
    <>
      <style>{css}</style>
      <main className="igt-wrap">

        <div className="igt-header">
          <p className="igt-eyebrow">Tax Planning</p>
          <h1 className="igt-title">Capital Gains Tax<br /><em>Calculator</em></h1>
        </div>

        {/* TOOL */}
        <div className="igt-card">
          <div className="igt-field-row">
            <div>
              <label className="igt-field-label" htmlFor="salePrice">Sale price</label>
              <div className="igt-input-wrap">
                <span className="igt-prefix">$</span>
                <input id="salePrice" className="igt-input" type="number" min="0" placeholder="0"
                  value={salePrice} onChange={e => setSalePrice(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="igt-field-label" htmlFor="purchasePrice">Purchase price</label>
              <div className="igt-input-wrap">
                <span className="igt-prefix">$</span>
                <input id="purchasePrice" className="igt-input" type="number" min="0" placeholder="0"
                  value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
          </div>

          <div className="igt-field-row">
            <div>
              <label className="igt-field-label" htmlFor="holdingPeriod">Holding period</label>
              <select id="holdingPeriod" className="igt-select" value={holdingPeriod} onChange={e => setHoldingPeriod(e.target.value)}>
                <option value="long">Long-term (over 1 year)</option>
                <option value="short">Short-term (1 year or less)</option>
              </select>
            </div>
            <div>
              <label className="igt-field-label" htmlFor="income">Annual taxable income</label>
              <div className="igt-input-wrap">
                <span className="igt-prefix">$</span>
                <input id="income" className="igt-input" type="number" min="0" placeholder="0"
                  value={income} onChange={e => setIncome(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
              <p className="igt-field-label" style={{ marginTop: ".3rem", fontSize: "10px" }}>Used to determine your tax bracket</p>
            </div>
          </div>

          <button className="igt-calc-btn" onClick={calculate}>Calculate tax owed →</button>

          {results && (
            <div className="igt-results">
              <div className="igt-result-grid">
                <div className="igt-result-cell">
                  <p className="igt-result-label">Capital gain / loss</p>
                  <p className={`igt-result-val ${results.isLoss ? "red" : "green"}`}>
                    {results.isLoss ? `-${fmt(results.absGain)}` : fmt(results.gain)}
                  </p>
                </div>
                <div className="igt-result-cell">
                  <p className="igt-result-label">Tax rate</p>
                  <p className="igt-result-val">
                    {results.isLoss ? "N/A" : `${Math.round(results.taxRate * 100)}%`}
                  </p>
                </div>
                <div className="igt-result-cell">
                  <p className="igt-result-label">Tax owed</p>
                  <p className={`igt-result-val ${results.taxOwed > 0 ? "red" : ""}`}>
                    {results.isLoss ? "$0" : fmtDec(results.taxOwed)}
                  </p>
                </div>
                <div className="igt-result-cell">
                  <p className="igt-result-label">Net proceeds</p>
                  <p className="igt-result-val green">{fmtDec(results.netProceeds)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="igt-card">
          <p className="igt-section-title">How capital gains tax works</p>
          <div className="igt-prose">
            <p>When you sell an investment or asset for more than you paid, the profit is called a capital gain. The IRS taxes that profit — but how much you pay depends almost entirely on how long you owned the asset before selling.</p>
            <p><strong>Short-term gains</strong> (assets held one year or less) are taxed as ordinary income — the same rate you pay on your salary or freelance income. For most people with a job, that means 22%, 24%, or even 32%.</p>
            <p><strong>Long-term gains</strong> (assets held more than one year) get preferential tax rates: 0%, 15%, or 20%. A married couple with $100,000 in ordinary income could sell a stock for a $50,000 long-term gain and pay exactly 0% tax on that gain. The same gain sold short-term would cost them $11,000 or more.</p>
            <p>If you sell for less than you paid, that's a capital loss. Losses offset gains dollar-for-dollar, and up to $3,000 of excess loss can reduce your ordinary income each year.</p>
          </div>
          <div className="igt-info-grid">
            <div className="igt-info-item">
              <p className="igt-info-title">Long-term rates (2025)</p>
              <p className="igt-info-body">0% up to $47,025 · 15% $47,026–$518,900 · 20% over $518,900 (single filer)</p>
            </div>
            <div className="igt-info-item">
              <p className="igt-info-title">Short-term rates</p>
              <p className="igt-info-body">Taxed at your ordinary income bracket — 10% to 37% depending on total income.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="igt-card">
          <p className="igt-section-title">Why this matters more than you think</p>
          <div className="igt-prose">
            <p>Most investors focus entirely on returns — "I made 20% on that trade!" — and ignore the tax bill waiting for them in April. A $10,000 short-term gain for someone in the 24% bracket costs $2,400 in taxes. The same gain held for one more day (crossing into long-term) costs $1,500 at 15% — or $0 if their total income stays under $47,000.</p>
            <p>The difference between short-term and long-term treatment is often larger than the difference between two competing investment strategies. You can pick the wrong stock and still come out ahead of someone who picked the right stock but sold it too early.</p>
            <p>Understanding your gain type before you sell gives you a choice. Without it, you're guessing — and the IRS doesn't guess in your favor.</p>
          </div>
        </div>

        {/* STRATEGIES */}
        <div className="igt-card">
          <p className="igt-section-title">Four ways to pay less</p>
          <div className="igt-tip-grid">
            <div>
              <p className="igt-tip-num">01</p>
              <p className="igt-tip-title">Wait one year</p>
              <p className="igt-tip-body">The single most effective strategy. If you're close to the one-year mark, waiting a few weeks or months can cut your tax rate by half or more. Mark your purchase dates.</p>
            </div>
            <div>
              <p className="igt-tip-num">02</p>
              <p className="igt-tip-title">Harvest losses</p>
              <p className="igt-tip-body">Sell underperforming investments before year end to offset gains. If you have more losses than gains, up to $3,000 can reduce your ordinary income. Unused losses carry forward indefinitely.</p>
            </div>
            <div>
              <p className="igt-tip-num">03</p>
              <p className="igt-tip-title">Use retirement accounts</p>
              <p className="igt-tip-body">Trades inside a 401(k), traditional IRA, or Roth IRA generate no capital gains tax at the time of sale. That's the law's biggest loophole — use it.</p>
            </div>
            <div>
              <p className="igt-tip-num">04</p>
              <p className="igt-tip-title">Time your income</p>
              <p className="igt-tip-body">If you're retiring or taking a low-income year, sell appreciated assets then. The 0% long-term bracket exists — you just need your total income low enough to qualify.</p>
            </div>
          </div>
        </div>

        {/* COMMON EXAMPLES */}
        <div className="igt-card">
          <p className="igt-section-title">Real examples</p>
          <div className="igt-prose">
            <p><strong>Example 1:</strong> You earn $60,000 at your job and sell crypto for a $10,000 gain after 10 months (short-term). Your tax rate is 22%. You owe $2,200.</p>
            <p><strong>Example 2:</strong> Same $60,000 salary, same $10,000 gain, but you waited 14 months (long-term). Your total income is $70,000, which falls in the 15% long-term bracket. You owe $1,500 — saving $700.</p>
            <p><strong>Example 3:</strong> You're retired with $40,000 in ordinary income. You sell stock for a $20,000 long-term gain. Total income $60,000. The first $7,025 of your gain fills the 0% bracket; the remaining $12,975 is taxed at 15%. Total tax: $1,946. If you had sold short-term, your rate would be 12% on the whole gain: $2,400.</p>
          </div>
        </div>

        {/* MONEYWISE LINK */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#1e4a76", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>

        {/* RELATED TOOLS */}
        <div className="igt-card">
          <p className="igt-section-title">Related tools</p>
          <div className="igt-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="igt-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="igt-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute tax advice. Tax laws change frequently — consult a qualified tax professional before making decisions. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="igt-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}