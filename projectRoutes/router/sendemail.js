const express = require('express');
const router = express.Router();
import sendemail from '../../app/controllers/sendEmail'

router.get('/emailParams', sendemail.sendEmailParams);
router.use('/email', sendemail.sendEmail);
<<<<<<< HEAD
=======

>>>>>>> feature/api_controllers

module.exports = router;
