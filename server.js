const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: [
    /(localhost|127.0.0.1)./,
    'https://army-ui.herokuapp.com',
    'https://army-ui.netlify.app',
    'https://wireframe-test.netlify.app',
  ],
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

/**
 * Use the express-static middleware
 */
app.use(express.static('public'));

/**
 * Connects to database
 */
const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log('\x1b[33m%s\x1b[0m', `Connected to mongodb database...`);
  })
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', `Cannot connect to the database...`, err);
    process.exit();
  });

/**
/**
 * Define the first route
 */
app.get('/hello', function (req, res) {
  res.send('<h1>Hello World!</h1>');
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Server is running on port ${PORT}...`);
});
