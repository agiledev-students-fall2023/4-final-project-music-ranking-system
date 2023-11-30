#!/usr/bin/env node
const mongoose = require('mongoose');
const connect_db = require('./db');
require('dotenv').config();
const server = require("./app") // load up the web server

require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

const port = process.env.port || 3000 // the port to listen to for incoming requests

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}


