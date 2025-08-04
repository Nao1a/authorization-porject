const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');

const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const userroutes= require('./routes/userRoutes');

const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/contacts" , contactRoutes )
app.use("/api/users" , userroutes)
connectDb();
app.use(cookieParser()); // Middleware to parse cookies
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`the server in running in port ${PORT}`);
});