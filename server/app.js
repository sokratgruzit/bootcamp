const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv').config();


const admin = require('./admin_api/routes/router.js');
const client = require('./client_api/router.js');
const auth = require('./admin_api/routes/authRoutes.js');


const app = express();

/*middleware*/
app.use(express.static('api/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload());
app.use(cookieParser());
app.use(cors());
app.use(history({
    index: '/index.html'
}));



const PORT =  process.env.PORT;
//const DB_URL = 'mongodb+srv://bootcamp:hy65Cb89P@bootcamp.i4bcb.mongodb.net/bootcamp?retryWrites=true&w=majority';
const DB_URL="mongodb+srv://sokrat:lalala12345@cluster0.x2cvw.mongodb.net/catan?retryWrites=true&w=majority";
async function start(){
	try{
		mongoose.connect(DB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			autoIndex: true,
		})
		app.listen(PORT, () => { console.log('Server started on port ' + PORT)});
	}catch(e){
		console.log(e);
	}
}

start();

/*routes*/
app.use('/api/client', client);
app.use('/api/admin', admin);
app.use('/api/auth', auth);
