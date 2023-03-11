const QuizzServices = require('../services/QuizzServices');

class QuizzController {  

	async index(req, res){
		try{ 
			let data = await QuizzServices.index(req); 
			res.status(200).json(data);
		}catch(e){
			let errors = QuizzServices.handleErrors(e);
			res.status(400).json({errors});
		}
	} 

	async create(req, res){ 
		try{
			let item = await QuizzServices.create(req.body);
			res.status(201).json(item);
		}catch(e){
			let errors = QuizzServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async update(req, res){
		try{
			let item = await QuizzServices.update(req.body);
			res.status(201).json(item);
		}catch(e){
			let errors = QuizzServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async updateStatus(req, res){
		try{
			let item = await QuizzServices.updateStatus(req.body);
			res.status(201).json(item);
		}catch(e){
			let errors = QuizzServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async destroy(req, res){   
		try{ 
			let item = await QuizzServices.destroy(req.params.id);
			res.status(200).json(item);
		}catch(e){ 
			let errors = QuizzServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

}

module.exports = new QuizzController();

