const PaginationService = require('./PaginationService');

class MultipleContentServices {
	constructor(model) {
	    this.Model = require(`../models/${model}`);
	}  

	handleErrors(err){
		return err; 
	} 

	async index(req){
		const data = await PaginationService.paginate(req, this.Model); 
 		return data;
	} 

	async create(body){
		const item = new this.Model(body);
		await item.save();
		return item;
	} 
 
	async update(body){
		let item = await this.Model.findByIdAndUpdate(body._id, body);
		return item;
	}

	async updateStatus(body){
		let item = await this.Model.findByIdAndUpdate(body._id, {status: body.status});
		return item;
	}
 
	async destroy(id){
		const item = await this.Model.findOneAndDelete({ _id: id });
		return item;
	}

} 

module.exports =  MultipleContentServices;