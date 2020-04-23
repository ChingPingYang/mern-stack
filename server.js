const express = require('express');
const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');


// @ Connect Database
connectDB();

// @ Init middleware
server.use(cors());
server.use(express.json({extended: false}));

// @ Routes
server.use('/api/users', require('./routes/api/users'));
server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/posts', require('./routes/api/posts'));
server.use('/api/profile', require('./routes/api/profile'));


server.listen(PORT, ()=> {
    console.log(`server started at port ${PORT}`);
})