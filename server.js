const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: /(localhost|127.0.0.1)./,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

/**
 * Parse requests of content-type - application/json
 */
app.use(bodyParser.json());

/**
 * Parse requests of content-type - application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('\x1b[33m%s\x1b[0m', `Connected to mongodb database...`);
  })
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', `Cannot connect to the database...`, err);
    process.exit();
  });

/**
 * Simple GET route
 */
app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo!' });
});

require('./app/routes/weapon.routes')(app);

/**
 * Set port, listen for requests
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Server is running on port ${PORT}...`);
});
