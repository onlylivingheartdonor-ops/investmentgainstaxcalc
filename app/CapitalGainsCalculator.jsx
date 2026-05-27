"use client"

import { useState } from "react"

function fmt(num) { return "$" + Math.round(num).toLocaleString("en-US") }
function fmtDec(num) { return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

function getLongTermRate(income, gain) {
  const total = income + gain
  if (total <= 47025) return 0
  if (total <= 518900) return 0.15
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

export default function CapitalGainsCalculator() {
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
    let taxRate = 0, taxOwed = 0
    if (!isLoss) {
      if (holdingPeriod === "long") taxRate = getLongTermRate(annualIncome, gain)
      else taxRate = getShortTermRate(annualIncome, gain)
      taxOwed = gain * taxRate
    }
    setResults({ gain, isLoss, absGain, taxRate, taxOwed, netProceeds: sale - taxOwed })
  }

  return (
    <div className="igt-card">
      <div className="igt-field-row">
        <div>
          <label className="igt-field-label">Sale price</label>
          <div className="igt-input-wrap">
            <span className="igt-prefix">$</span>
            <input className="igt-input" type="number" placeholder="0" value={salePrice} onChange={e => setSalePrice(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="igt-field-label">Purchase price</label>
          <div className="igt-input-wrap">
            <span className="igt-prefix">$</span>
            <input className="igt-input" type="number" placeholder="0" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="igt-field-row">
        <div>
          <label className="igt-field-label">Holding period</label>
          <select className="igt-select" value={holdingPeriod} onChange={e => setHoldingPeriod(e.target.value)}>
            <option value="long">Long-term (over 1 year)</option>
            <option value="short">Short-term (1 year or less)</option>
          </select>
        </div>
        <div>
          <label className="igt-field-label">Annual taxable income</label>
          <div className="igt-input-wrap">
            <span className="igt-prefix">$</span>
            <input className="igt-input" type="number" placeholder="0" value={income} onChange={e => setIncome(e.target.value)} />
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
              <p className="igt-result-val">{results.isLoss ? "N/A" : `${Math.round(results.taxRate * 100)}%`}</p>
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
  )
}