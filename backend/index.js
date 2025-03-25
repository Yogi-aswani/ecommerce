const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const router = require('./Route/authRoute');
const Supplier = require('./Route/supplierRoute');
const fileupload = require('express-fileupload');
const app = express();
app.use(fileupload());


const PORT = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_URL

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
 

app.use('/API',router);
app.use('/API',Supplier);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Connect to MongoDB
mongoose.connect(process.env.mongo_url)
.then(() => {
    console.log('Connected to MongoDB',mongo_url);
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});