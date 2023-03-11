const Strategy = require('../models/Strategy')
const PaginationService = require('./PaginationService');

class StrategyServices {  
	handleErrors(err){
		return err; 
	} 

	async index(req){
		const strategies = await PaginationService.paginate(req, Strategy); 
 		return strategies;
	} 

	async create(body){
		const strategy = new Strategy(body);
		await strategy.save();
		return strategy;
	} 

	async update(body){
		let strategy = await Strategy.findOne({_id: body._id});
		strategy.status = body.status;
		strategy.ge = body.ge;
		strategy.en = body.en;
		strategy.ru = body.ru;
		strategy = await strategy.save();
		return strategy;
	}

	async updateStatus(body){
		console.log(body)
		let strategy = await Strategy.findByIdAndUpdate(body._id, {status: body.status});
		return strategy;
	}
 
	async destroy(id){
		const strategy = await Strategy.findOneAndDelete({ _id: id });
		return strategy;
	}

} 

module.exports = new StrategyServices();