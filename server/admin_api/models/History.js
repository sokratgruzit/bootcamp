const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Language = require('../models/Language')

mongoose.plugin(slug); 

const HystoryTranslatedFieldsSchema = mongoose.Schema(
  {
    title: String,
    picArr:[
      {
        teaser: '',
        image: {}
      }
    ]
  },
  { _id : false }
)


const historySchemaObject = {
  slug: { 
    type: String, 
    slug: "en.title", 
    slugPaddingSize: 2,  
    unique: true 
  },
  status:{
    type: Boolean,
    default: true
  }
}  

Language.schema.obj.list.default.forEach((lang) => {
  historySchemaObject[lang.code] = HystoryTranslatedFieldsSchema
})

// create your schema
const HistorySchema = mongoose.Schema(historySchemaObject, {
  timestamps: true
}) 

const History = mongoose.model('history', HistorySchema);

module.exports = History;