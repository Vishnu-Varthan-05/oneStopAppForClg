const express = require('express');
const config = require('./config/config');
const db = require('./config/database');
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/', userRoutes);

db.sync({ force: false })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(config.port, () => {
      console.log(`Server is running at port ${config.port}`);
    });
  })
  .catch(err => {
    console.log('Error syncing database: ', err);
  });