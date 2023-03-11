const StrategyServices = require('../services/StrategyServices');

class StrategyController {  

	async index(req, res){
		try{ 
			let strategies = await StrategyServices.index(req); 
			res.status(200).json(strategies);
		}catch(e){
			let errors = StrategyServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async create(req, res){
		try{
			let strategy = await StrategyServices.create(req.body);
			res.status(201).json(strategy);
		}catch(e){
			let errors = StrategyServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async update(req, res){
		try{
			let strategy = await StrategyServices.update(req.body);
			res.status(201).json(strategy);
		}catch(e){
			let errors = StrategyServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async updateStatus(req, res){
		try{
			let strategy = await StrategyServices.updateStatus(req.body);
			res.status(201).json(strategy);
		}catch(e){
			let errors = StrategyServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async destroy(req, res){   
		try{ 
			let strategy = await StrategyServices.destroy(req.params.id);
			res.status(200).json(strategy);
		}catch(e){ 
			let errors = StrategyServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

}

module.exports = new StrategyController();

