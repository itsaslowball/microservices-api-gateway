const express = require('express');
var cors = require("cors");
const app = express();
app.use(cors())

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.get('/', (req, res) => {
  res.send('Hello from Micro1');
});
app.get('/micro1', (req, res) => {
  res.send('Hello from Micro1 route');
});


app.listen(5000, () => {
  console.log('Micro1 listening on port 5000');
});