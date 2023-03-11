
class PaginationService {
	async paginate(req, Model){
		const results = {
			pagination: {},
		};

		if(!req.query.page){
			results.results = await Model.find().sort({createdAt: -1}).exec();
			results.pagination = false;
			return results;
		}
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const startIndex = (page -1) * limit;
		const endIndex = page * limit;

		

		results.pagination.size = await Model.countDocuments().exec();
		results.pagination.limit = limit;
		results.pagination.current = page;
		results.pagination.path = req._parsedOriginalUrl.pathname;

		if(endIndex < await Model.countDocuments().exec()){
			results.pagination.next = {
				page: page + 1,
				limit: limit
			}
		}

		if(startIndex > 0){
			results.pagination.previous = {
				page: page - 1 ,
				limit: limit
			}
		}

		results.results = await Model.find().limit(limit).skip(startIndex).sort({createdAt: -1}).exec();

		return results;
	}
}

module.exports = new PaginationService();