require("dotenv").config()
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router)
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);

})
