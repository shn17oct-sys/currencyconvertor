import { useEffect, useState } from "react";
import { convertCurrency, getHistory } from "./api";
import "./App.css";

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  // Load history from MongoDB
  useEffect(() => {
    getHistory().then(data => setHistory(data));
  }, []);


  const handleConvert = async () => {
    if (!fromValue) {
      setError("Please enter amount");
      return;
    }

    setError("");

    const result = await convertCurrency({fromCurrency,toCurrency,fromValue});

    if (result.error) {
      setError(result.error);
      return;
    }

    setToValue(result.toValue);
    setExchangeRate(result.exchangeRate);
    setHistory(prev => [result, ...prev]);
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>

      <div className="box">
        <label>From:</label>
        <input value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}/>

        <label>To:</label>
        <input value={toCurrency} onChange={e => setToCurrency(e.target.value)}/>

        <label>Amount:</label>
        <input
          type="number" value={fromValue} onChange={e => setFromValue(e.target.value)}/>

        <button onClick={handleConvert}>Convert</button>
      </div>

      {error && <p className="error">{error}</p>}

      {exchangeRate && (
        <div className="result">
          <h3>
            Converted Amount: {toValue} {toCurrency}
          </h3>
          <p>
            Exchange Rate: 1 {fromCurrency} ={" "}
            {exchangeRate.toFixed(4)} {toCurrency}
          </p>
        </div>
      )}

      <hr />

      <h3>Conversion History</h3>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>Amount</th>
            <th>To</th>
            <th>Result</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.fromCurrency}</td>
              <td>{item.fromValue}</td>
              <td>{item.toCurrency}</td>
              <td>{item.toValue}</td>
              <td>{item.exchangeRate.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

