const ArticleServies = require('../services/ArticleServices');

class ArticleController { 

	async index(req,res){
		try{
			const articles = await ArticleServies.getAll(req);
			res.render('content/articles', {articles})
		}catch(e){
			console.log(e);
		}
	}

	async findOne(req, res){ 
		try{ 
			let article = await ArticleServies.findOne(req.params.id);
			res.status(200).json({article});
		}catch(e){ 
			let errors = ArticleServies.handleErrors(e);
			res.status(400).json({errors}); 
		}
	}

	async add(req,res){
		try{ 
			let picture = null; 
			if(req.files){
				picture = req.files.picture; 
			} 
			const article = await ArticleServies.add(req.body, picture);
			res.status(200).json({article})
		}catch(e){ 
			let errors = ArticleServies.handleErrors(e);
			res.status(400).json({errors});
			console.log(e)
		}
	}

	async deleteOne(req, res){
		try{
			const article = await ArticleServies.deleteOne(req.params.id);
			res.status(200).json({article})
		}catch(e){
			let errors = ArticleServies.handleErrors(e);
			res.status(400).json({errors});
			console.log(e); 
		}
	}

	async edit(req, res){
		try{
			let picture = null; 
			if(req.files){
				picture = req.files.picture;
			}  
			let article = await ArticleServies.edit(req.body, picture);
			res.status(201).json(article);
		}catch(e){
			let errors = ArticleServies.handleErrors(e);
			res.status(400).json({errors});
			console.log(e); 
		}
	}

} 
 
module.exports = new ArticleController();