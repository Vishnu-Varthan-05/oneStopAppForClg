const express = require('express');
const config = require('./config/config');
const db = require('./config/database'); 
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const morganConfig = morgan(
  ':method :url :status :res[content-length] - :response-time ms'
);
app.use(morganConfig);

const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const generalRoutes = require('./routes/generalRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api', generalRoutes);
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); 
  } else {
    console.log('Database connection established successfully');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
    connection.release();
  }
});
