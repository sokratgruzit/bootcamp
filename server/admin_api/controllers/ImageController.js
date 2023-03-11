const ImageServices = require('../services/ImageServices');

 class ImageController { 
 	async create(req, res){
 		try{
            const result = ImageServices.create(req.files.image, req.body.folder);
            res.status(200).json(result);
 		}catch(e){
            console.log(e)
            res.status(400).json(e);
 		} 
 	}

    async destroy(req, res){
        try{
            const result = ImageServices.destroy(req.body.path);
            res.status(200).json(result);
        }catch(e){
            console.log(e)
            res.status(400).json(e);
        } 
    }    

 }

module.exports = new ImageController();   