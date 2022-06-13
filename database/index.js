require('dotenv').config();
const { Pool } = require('pg');

const client = new Pool({
  host: process.env.HOST,
  user: process.env.POSTGRESUSER,
  port: process.env.POSTGRESPORT,
  password: process.env.POSTGRESPASS,
  database: process.env.DATABASE
})

module.exports = client;