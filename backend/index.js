const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
  const inputArray = req.body.features; // Expect array of 22 numbers
  if (!inputArray || inputArray.length !== 22) {
    return res.status(400).json({ error: "22 features required" });
  }

  const inputStr = inputArray.join(",");

  exec(`python3 predict.py "${inputStr}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", stderr);
      return res.status(500).json({ error: "Prediction failed" });
    }

    const probability = parseFloat(stdout.trim());
    res.json({ probability, prediction: probability > 0.5 ? "Parkinson's" : "Healthy" });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
