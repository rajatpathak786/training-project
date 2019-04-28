const express = require('express');
const router = express.Router();
import trello from '../../app/controllers/trello'

router.get('/trelloBoard', trello.trelloUpdateBoard);
router.post('/trelloCard', trello.trelloUpdateCard);
router.post('/trelloList', trello.trelloUpdateList);

module.exports = router;