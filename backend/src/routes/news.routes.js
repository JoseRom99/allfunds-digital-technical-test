const express = require('express');
const NewsController = require('../controllers/news.controller');

var router = express.Router();

//Post news
router.post('/news', NewsController.saveNews);

//Get any news by id
router.get('/news/:id', NewsController.getNews);

//Get a list of all non-archived news
router.get('/news', NewsController.getNewsList);

//Update news
router.put('/news/:id', NewsController.updateNews);



//Get a list of all archived news
router.get('/archive', NewsController.getArchivedNewsList);

//Archive news by id
router.put('/archive/:id', NewsController.archiveNews);

//Delete news by id only if it's archived
router.delete('/archive/:id', NewsController.deleteArchivedNews);

module.exports = router;