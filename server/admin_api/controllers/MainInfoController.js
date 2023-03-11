const MainInfoServices = require('../services/MainInfoServices');

 class MainInfoController { 
 	async index(req, res){
 		try{
 			const main_info = await MainInfoServices.index();
            res.status(200).json(main_info);
 		}catch(e){
 			let errors = MainInfoServices.handleErrors(e);
            res.status(400).json({errors});
 		} 
 	}    
 
 	async update(req, res){
 		try{ 
 			const main_info = await MainInfoServices.update(req.body);
            res.status(201).json(main_info);
 		}catch(e){
            let errors = MainInfoServices.handleErrors(e);
            res.status(400).json({errors});
 		}
 	}
 }

module.exports = new MainInfoController(); 