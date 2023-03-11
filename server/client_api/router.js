const Router = require('express');

//controllers
const QuizzController = require('./controllers/QuizzController');
const MultipleContentController = require('./controllers/MultipleContentController');

const HomePageController = new MultipleContentController('HomePage');
const StrategyController = new MultipleContentController('Strategy');
const AdvantageController = new MultipleContentController('Advantage');
const HistoryController = new MultipleContentController('History');

const router = new Router;

router.get('/home-page',  HomePageController.index);
router.get('/strategy',  StrategyController.index);
router.get('/advantage',  AdvantageController.index);
router.get('/history',  HistoryController.index);


//quizz
router.get('/quizz',  QuizzController.index);
router.get('/quizz-results',  QuizzController.indexResults);
router.post('/quizz-results',  QuizzController.createResult); 
module.exports = router;
module.exports = router;   
