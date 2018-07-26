require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
