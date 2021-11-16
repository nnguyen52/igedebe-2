require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const gamesRoutes = require('./routes/gamesRouter');
app.get('/api', (req, res) => {
  res.json({ msg: 'testing api GET route!', status: 'success' });
});
app.use('/api', gamesRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server is running on port ', port);
});
