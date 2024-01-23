const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json());

// Routes
const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
