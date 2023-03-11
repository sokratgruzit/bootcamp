const BannerServices = require('../services/BannerServices');

class BannerController {  

	async index(req, res){
		try{ 
			let banners = await BannerServices.index(req); 
			res.status(200).json({banners});
		}catch(e){
			res.status(400).json(e);
		}
	}

	async create(req, res){
		try{
			let banner = await BannerServices.create(req.body);
			res.status(201).json({banner});
		}catch(e){
			let errors = BannerServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async update(req, res){
		try{
			let banner = await BannerServices.update(req.body);
			res.status(201).json({banner});
		}catch(e){
			let errors = BannerServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

	async destroy(req, res){   
		try{ 
			console.log(req.params.slug)
			let banner = await BannerServices.destroy(req.params.slug);
			res.status(200).json({banner});
		}catch(e){ 
			let errors = BannerServices.handleErrors(e);
			res.status(400).json({errors});
		}
	}

}

module.exports = new BannerController();