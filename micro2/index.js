const express = require('express');
var cors = require("cors");
const app = express();
app.use(cors())


app.get('/micro2', (req, res) => {
  res.send('Hello from Micro2');
});


app.listen(4000, () => {
  console.log('Micro2 is running on port 4000');
});