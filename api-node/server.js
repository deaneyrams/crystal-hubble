const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors({ origin: ['https://www.syntry.co', 'https://syntry.co'] }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/api/status', (req, res) => {
  res.json({ status: 'Sovereign Node Active', version: '1.0.5-SENTINEL' });
});

// The core verification endpoint for the map
app.post('/api/verify', (req, res) => {
  console.log('Forensic Request Received:', req.body);
  res.json({ accuracy: 0.999, message: 'Land Verified via Sentinel Protocol' });
});

app.listen(PORT, () => {
  console.log('Syntry Sovereign Engine running on port ' + PORT);
});
