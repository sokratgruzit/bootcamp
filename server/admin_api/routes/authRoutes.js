const Router = require('express');
const router = new Router;

//controllers
const AuthController = require('../controllers/AuthController'); 


router.get('/logout', AuthController.logout);
router.post('/sign-up', AuthController.signup); 
router.post('/login', AuthController.login);

module.exports = router; 