// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const database = require('./model/dbPool');
// const authMiddleW = require('./middleware/auth');
// const usersRoutes = require('./routes/usersrts');
// const dataRoutes = require('./routes/dataCollectionRoutes');
// const adminRoutes = require('./routes/adminRts');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Database connection
// database.connect();


// // Authentication middleware
// app.use(authMiddleW.verifyAuth);

// // Routes
// app.use('/user', usersRoutes);
// app.use('/data', dataRoutes);
// app.use('/admin', adminRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.listen(5000, function () {
//   console.log("server is running ")
// })


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./model/dbPool');
const authMiddleW = require('./middleware/auth');
const usersRoutes = require('./routes/usersRoutes');
const dataRoutes = require('./routes/dataCollectionRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
database.connect().then(() => {
    console.log('Connected to database successfully');
}).catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
});


// Authentication middleware
app.use(authMiddleW.verifyAuth);
// app.use(MiddleW.mid);

// Routes
app.use('/user', usersRoutes);
app.use('/data', dataRoutes);
app.use('/admin', adminRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Graceful shutdown
// function gracefulShutdown() {
//   console.log('Shutting down gracefully...');
//   database.disconnect().finally(() => {
//     process.exit(0);
//   });
// }








