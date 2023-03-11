const jwt = require('jsonwebtoken');

const secret = '';
const requireAdmin = (req, res, next) => { 
	const token = req.cookies.user;
	if(token){
		jwt.verify(token, secret, (err, decodedToken) => {
		    if (err) {
		        console.log(err.message);
		        throw Error('you have not admin rights'); 
		    } else {
		    	let haveAccess = false;
		        decodedToken.roles.forEach((role) => {
		        	if(role === "ADMIN"){
		        		haveAccess = true;
		        	}
		        })
		        if(haveAccess){
		        	next();
		        }else{
		        	throw Error('you have not admin rights');
		        }
		    }
	    });
	}else{
		throw Error('you have not admin rights'); 
	}
};

module.exports = { requireAdmin };