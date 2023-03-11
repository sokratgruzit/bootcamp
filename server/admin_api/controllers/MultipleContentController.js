const MultipleContentServices = require('../services/MultipleContentServices');

class MultipleContentController {  
	constructor(model) {
	    this.Services = new MultipleContentServices(model);
	    this.index = this.index.bind(this);
	    this.create = this.create.bind(this);
	    this.update = this.update.bind(this);
	    this.updateStatus = this.updateStatus.bind(this);
	    this.destroy = this.destroy.bind(this);
	}

	async index(req, res){
		try{ 
			let data = await this.Services.index(req); 
			res.status(200).json(data);
		}catch(e){
			let errors = this.Services.handleErrors(e);
			res.status(400).json({errors});
		}
	} 

	async create(req, res){ 
		try{
			let item = await this.Services.create(req.body);
			res.status(201).json(item);
		}catch(e){
			let errors = this.Services.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async update(req, res){
		try{
			let item = await this.Services.update(req.body);
			res.status(201).json(item);
		}catch(e){
			let errors = this.Services.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async updateStatus(req, res){
		try{
			let item = await this.Services.updateStatus(req.body);
			res.status(201).json(item);
		}catch(e){
			let errors = this.Services.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async destroy(req, res){   
		try{ 
			let item = await this.Services.destroy(req.params.id);
			res.status(200).json(item);
		}catch(e){ 
			let errors = this.Services.handleErrors(e);
			res.status(400).json({errors});
		}
	}

}

module.exports = MultipleContentController;

