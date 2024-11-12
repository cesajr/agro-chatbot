const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.API_KEY;

module.exports = { API_KEY };