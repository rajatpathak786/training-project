const express = require('express');
const router = express.Router();
import trello from '../../app/controllers/trello'

router.post('/trelloCard', trello.trelloUpdateCard);
router.post('/trelloList', trello.trelloUpdateList);

module.exports = router;