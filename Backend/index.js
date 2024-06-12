const express = require('express');
const sequelize = require('./database');

// const express = require('express')

const app = express()
const port = 3000
 
sequelize
  .authenticate()
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})