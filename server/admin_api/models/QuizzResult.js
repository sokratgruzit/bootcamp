const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug); 

const QuizzResultSchema = mongoose.Schema({
  full_name:{
    type: String,
  },
  result:{
    type: Array
  },
  score:{
    type: String
  },
  slug: { 
    type: String, 
    slug: "full_name", 
    slugPaddingSize: 2,  
    unique: true 
  },
}, 
{
  timestamps: true 
});  

const QuizzResults = mongoose.model('quizz_result', QuizzResultSchema);

module.exports = QuizzResults;