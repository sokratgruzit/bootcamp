const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Language = require('../models/Language') 

mongoose.plugin(slug); 

const QuizzTranslatedFieldsSchema = mongoose.Schema(
  {
    question: String,
    answers: {
      type: Array,
      default: [
        {
          definition: {
            type: String
          },
          value: {
            type: Boolean
          }
        }
      ]
    },
  },
  { _id : false }
)


const quizzSchemaObject = {
  slug: { 
    type: String, 
    slug: "en.question", 
    slugPaddingSize: 2,  
    unique: true 
  },
  status:{
    type: Boolean,
  }
}  

Language.schema.obj.list.default.forEach((lang) => {
  quizzSchemaObject[lang.code] = QuizzTranslatedFieldsSchema
})

// create your schema
const QuizzSchema = mongoose.Schema(quizzSchemaObject, {
  timestamps: true
}) 

const Quizz = mongoose.model('quizz', QuizzSchema);

module.exports = Quizz;