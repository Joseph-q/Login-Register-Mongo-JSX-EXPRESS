const express = require('express');
const router = express.Router();
const {autenticated}= require("../config/auth")

const passport=require("passport")

// Welcome Page
router.get('/',(req, res) => res.render('start'));

// Dashboard
router.get('/dashboard', autenticated,(req, res) =>
  res.render('dashboard')
);

module.exports = router;
