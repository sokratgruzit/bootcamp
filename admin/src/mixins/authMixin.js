import Vue from 'vue';
const jwt = require('jsonwebtoken');

export default {

	methods:{
		verify(){
			const token = Vue.$cookies.get("user");
			let result = false;

			if(token){
				jwt.verify(token, process.env.VUE_APP_SECRET_KEY, (err, decodedToken) => {
			      	if(err){
			        	return false;
			      	}
		        	let haveAccess = false;
		          	decodedToken.roles.forEach((role) => {
		            	if(role === "ADMIN"){
		             	 	haveAccess = true;
		            	}
		          	})
		          	
		          	if(haveAccess){
		          		result = true;
		          		return true;
		          	}
			    });
			}
			return result;		
		},
	}

}