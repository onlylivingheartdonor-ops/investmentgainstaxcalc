"use client";

import { useState } from "react";
import { RELATED_LINKS as RELATED } from "./lib/links";

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
  .igt-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; }
  .igt-input:focus { border-color: #1e4a76; }
  .igt-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .igt-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; }
  .igt-calc-btn:hover { background: #1e4a76; }
  .igt-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .igt-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .igt-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .igt-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .igt-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .igt-result-val.red { color: #b91c1c; }
  .igt-result-val.green { color: #d97706; }
  .igt-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .igt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .igt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #9ac4de; line-height: 1; margin-bottom: .4rem; }
  .igt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .igt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .igt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .igt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; }
  .igt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .igt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .igt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .igt-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) { .igt-field-row, .igt-result-grid, .igt-tip-grid { grid-template-columns: 1fr; } }
`;

function fmt(num) { return "$" + Math.round(num).toLocaleString("en-US"); }
function fmtDec(num) { return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function getLongTermRate(income, gain) {
  const total = income + gain;
  if (total <= 47025) return 0;
  if (total <= 518900) return 0.15;
  return 0.20;
}

function getShortTermRate(income, gain) {
  const total = income + gain;
  if (total <= 11600) return 0.10;
  if (total <= 47150) return 0.12;
  if (total <= 100525) return 0.22;
  if (total <= 191950) return 0.24;
  if (total <= 243725) return 0.32;
  if (total <= 609350) return 0.35;
  return 0.37;
}

export default function Page() {
  const [salePrice, setSalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("long");
  const [income, setIncome] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const sale = parseFloat(salePrice);
    const purchase = parseFloat(purchasePrice);
    const annualIncome = parseFloat(income) || 0;
    if (!sale || !purchase) return;
    const gain = sale - purchase;
    const isLoss = gain < 0;
    const absGain = Math.abs(gain);
    let taxRate = 0, taxOwed = 0;
    if (!isLoss) {
      if (holdingPeriod === "long") taxRate = getLongTermRate(annualIncome, gain);
      else taxRate = getShortTermRate(annualIncome, gain);
      taxOwed = gain * taxRate;
    }
    setResults({ gain, isLoss, absGain, taxRate, taxOwed, netProceeds: sale - taxOwed });
  };

  return (
    <>
      <style>{css}</style>
      <main className="igt-wrap">
        <div className="igt-header">
          <p className="igt-eyebrow">Tax Planning</p>
          <h1 className="igt-title">Capital Gains Tax<br /><em>Calculator</em></h1>
        </div>
        <div className="igt-card">
          <div className="igt-field-row">
            <div><label className="igt-field-label">Sale price</label><div className="igt-input-wrap"><span className="igt-prefix">$</span><input className="igt-input" type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} /></div></div>
            <div><label className="igt-field-label">Purchase price</label><div className="igt-input-wrap"><span className="igt-prefix">$</span><input className="igt-input" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} /></div></div>
          </div>
          <div className="igt-field-row">
            <div><label className="igt-field-label">Holding period</label><select className="igt-select" value={holdingPeriod} onChange={e => setHoldingPeriod(e.target.value)}><option value="long">Long-term (over 1 year)</option><option value="short">Short-term (1 year or less)</option></select></div>
            <div><label className="igt-field-label">Annual taxable income</label><div className="igt-input-wrap"><span className="igt-prefix">$</span><input className="igt-input" type="number" value={income} onChange={e => setIncome(e.target.value)} /></div><p className="igt-field-label" style={{ marginTop: ".3rem", fontSize: "10px" }}>Used to determine your tax bracket</p></div>
          </div>
          <button className="igt-calc-btn" onClick={calculate}>Calculate tax owed →</button>
          {results && (<div className="igt-results"><div className="igt-result-grid"><div className="igt-result-cell"><p className="igt-result-label">Capital gain / loss</p><p className={`igt-result-val ${results.isLoss ? "red" : "green"}`}>{results.isLoss ? `-${fmt(results.absGain)}` : fmt(results.gain)}</p></div><div className="igt-result-cell"><p className="igt-result-label">Tax rate</p><p className="igt-result-val">{results.isLoss ? "N/A" : `${Math.round(results.taxRate * 100)}%`}</p></div><div className="igt-result-cell"><p className="igt-result-label">Tax owed</p><p className={`igt-result-val ${results.taxOwed > 0 ? "red" : ""}`}>{results.isLoss ? "$0" : fmtDec(results.taxOwed)}</p></div><div className="igt-result-cell"><p className="igt-result-label">Net proceeds</p><p className="igt-result-val green">{fmtDec(results.netProceeds)}</p></div></div></div>)}
        </div>
        <div className="igt-card"><p className="igt-section-title">How capital gains tax works</p><div className="igt-prose"><p>When you sell an investment for more than you paid, the profit is a capital gain. Short-term gains (held ≤1 year) are taxed as ordinary income — up to 37%. Long-term gains (held >1 year) get preferential rates: 0%, 15%, or 20% depending on your total income.</p><p>A married couple with $100,000 in ordinary income could sell stock for a $50,000 long-term gain and pay 0% tax on that gain. The same gain sold short-term would cost $11,000 or more.</p></div></div>
        <div className="igt-card"><p className="igt-section-title">Four ways to pay less</p><div className="igt-tip-grid"><div><p className="igt-tip-num">01</p><p className="igt-tip-title">Wait one year</p><p className="igt-tip-body">The single most effective strategy. Waiting a few weeks can cut your tax rate by half or more.</p></div><div><p className="igt-tip-num">02</p><p className="igt-tip-title">Harvest losses</p><p className="igt-tip-body">Sell underperforming investments to offset gains. Up to $3,000 can reduce ordinary income.</p></div><div><p className="igt-tip-num">03</p><p className="igt-tip-title">Use retirement accounts</p><p className="igt-tip-body">Trades inside a 401(k) or IRA generate no capital gains tax at the time of sale.</p></div><div><p className="igt-tip-num">04</p><p className="igt-tip-title">Time your income</p><p className="igt-tip-body">Sell appreciated assets in low-income years to qualify for the 0% long-term bracket.</p></div></div></div>
        <div className="igt-card"><p className="igt-section-title">Related tools</p><div className="igt-related-links">{RELATED.map((r, i) => (<a key={i} className="igt-related-link" href={r.href}>{r.label}</a>))}</div><div className="igt-disclaimer">This tool provides estimates for informational purposes only and does not constitute tax advice. Consult a qualified tax professional.<div className="igt-footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div></div></div>
      </main>
    </>
  );
}