const express = require('express');
const router = express.Router();
import sendemail from '../../app/controllers/sendEmail'

router.get('/email', sendemail.sendEmailParams);
router.post('/email', sendemail.sendEmail);


module.exports = router;
