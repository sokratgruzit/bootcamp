const HistoryServices = require('../services/HistoryServices');

class HistoryController {  

	async index(req, res){
		try{ 
			let histories = await HistoryServices.index(req); 
			res.status(200).json(histories);
		}catch(e){
			let errors = HistoryServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async create(req, res){
		try{
			console.log(req.body)
			let history = await HistoryServices.create(req.body);
			res.status(201).json(history);
		}catch(e){
			let errors = HistoryServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async update(req, res){
		try{
			let history = await HistoryServices.update(req.body);
			res.status(201).json(history);
		}catch(e){
			let errors = HistoryServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async updateStatus(req, res){
		try{
			let history = await HistoryServices.updateStatus(req.body);
			res.status(201).json(history);
		}catch(e){
			let errors = HistoryServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async destroy(req, res){   
		try{ 
			let history = await HistoryServices.destroy(req.params.id);
			res.status(200).json(history);
		}catch(e){ 
			let errors = HistoryServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

}

module.exports = new HistoryController();

