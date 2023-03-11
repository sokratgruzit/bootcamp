 const HomePageServices = require('../services/HomePageServices');

class HomePageController {  

	async index(req, res){
		try{ 
			let data = await HomePageServices.index(); 
			res.status(200).json({data});
		}catch(e){
			res.status(400).json(e);
		}
	}

	async update(req, res){
		try{
			let data = await HomePageServices.update(req.body);
			res.status(201).json({data});
		}catch(e){
			console.log(e)
			res.status(400).json(e);
		}
	}

}

module.exports = new HomePageController();