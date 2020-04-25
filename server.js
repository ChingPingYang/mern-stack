const express = require('express');
const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const path = express('path');


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

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    server.use(express.static('client/build'));

    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

server.listen(PORT, ()=> {
    console.log(`server started at port ${PORT}`);
})