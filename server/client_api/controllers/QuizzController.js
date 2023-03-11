const QuizzServices = require('../services/QuizzServices');

class QuizzController {  
	async index(req, res){
		try{  
			let data = await QuizzServices.index(); 
			res.status(200).json(data);
		}catch(e){
			return e;
		}
	}

	async indexResults(req, res){
		try{  
			let data = await QuizzServices.indexResults(); 
			res.status(200).json(data);
		}catch(e){
			return e;
		}
	}

	async createResult(req, res){
		try{   
			let data = await QuizzServices.createResult(req.body); 
			res.status(200).json(data);
		}catch(e){
			return e;
		}
	}
} 
 
module.exports = new QuizzController(); 