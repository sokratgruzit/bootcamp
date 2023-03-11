const Router = require('express');
const Banner = require('../models/Banner')
 
//middleware
const { requireAdmin } = require('../middleware/AuthMiddleware');

//controllers
const LanguageController = require('../controllers/LanguageController');
const BannerController = require('../controllers/BannerController');
const MainInfoController = require('../controllers/MainInfoController');
const ImageController = require('../controllers/ImageController');
const HomePageController = require('../controllers/HomePageController');
const QuizzController = require('../controllers/QuizzController');
const HistoryController = require('../controllers/HistoryController');

const MultipleContentController = require('../controllers/MultipleContentController');

const AdvantagesController = new MultipleContentController('Advantage');
const StrategyController = new MultipleContentController('Strategy');

const router = new Router;
 
/*router.use(requireAdmin);*/

//routes//

//language
router.get('/language', LanguageController.index);


// images 
router.post('/image', ImageController.create);
router.delete('/image', ImageController.destroy);

// main info

router.get('/main-info', MainInfoController.index);
router.put('/main-info', MainInfoController.update);  


//banners 
router.get('/banners', BannerController.index);
router.post('/banners', BannerController.create);
router.put('/banners', BannerController.update);
router.delete('/banners/:slug', BannerController.destroy);

//home page
router.get('/home-page', HomePageController.index);
router.put('/home-page', HomePageController.update);

//strategy
router.get('/strategies', StrategyController.index); 
router.post('/strategies', StrategyController.create);  
router.put('/strategies', StrategyController.update);
router.put('/strategies/update-status', StrategyController.updateStatus);
router.delete('/strategies/:id', StrategyController.destroy);

//advantures
router.get('/advantages', AdvantagesController.index);
router.post('/advantages', AdvantagesController.create);  
router.put('/advantages', AdvantagesController.update);
router.put('/advantages/update-status', AdvantagesController.updateStatus);
router.delete('/advantages/:id', AdvantagesController.destroy);

//quizz
router.get('/quizzes', QuizzController.index);
router.post('/quizzes', QuizzController.create);  
router.put('/quizzes', QuizzController.update);
router.put('/quizzes/update-status', QuizzController.updateStatus);
router.delete('/quizzes/:id', QuizzController.destroy);
//history
router.get('/history', HistoryController.index); 
router.post('/history', HistoryController.create);  
router.put('/history', HistoryController.update);
router.put('/history/update-status', HistoryController.updateStatus);
router.delete('/history/:id', HistoryController.destroy);

 
module.exports = router;



