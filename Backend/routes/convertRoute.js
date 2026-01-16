const express = require("express");
const axios = require("axios");
const Convert = require("../models/convert");

const router = express.Router();

const API_URL = process.env.API_URL;

router.post("/", async (req, res) => {
  try {
    const { fromCurrency, toCurrency, fromValue } = req.body;

    const response = await axios.get(API_URL);

    if (
      response.data.result !== "success" || !response.data.conversion_rates
    
    ) {
      return res.status(500).json({ error: "Invalid API response" });
    }
    else{
        console.log("successful");
    }

    const rates = response.data.conversion_rates;
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    const exchangeRate = toRate / fromRate;
    const toValue = Number((fromValue * exchangeRate).toFixed(2));

    const savedData = await Convert.create({
      fromCurrency,
      toCurrency,
      fromValue,
      toValue,
      exchangeRate
    });

    res.json(savedData);
  } catch (error) {
    console.error("Conversion error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const data = await Convert.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
