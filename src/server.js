require('dotenv').config();
const { db } = require('./database/config');
const app = require('./app');
const initModel = require('./models/init.model');

db.authenticate()
  .then(console.log('database authenticate'))
  .catch((err) => console.log(err));

  initModel()

db.sync()
  .then(console.log('database synced'))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log('app running in server 🐛');
});
