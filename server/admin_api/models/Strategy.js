const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Language = require('../models/Language')

mongoose.plugin(slug); 

const StrategyTranslatedFieldsSchema = mongoose.Schema(
  {
    title: String,
    teaser: String
  },
  { _id : false }
)

// create object you want to pass StrategySchema 
const strategySchemaObject = {
  slug: { 
    type: String, 
    slug: "en.title", 
    slugPaddingSize: 2,  
    unique: true 
  },
  status:{
    type: Boolean,
    default: false
  }
}  
// add each field to your schema object
Language.schema.obj.list.default.forEach((lang) => {
  strategySchemaObject[lang.code] = StrategyTranslatedFieldsSchema
})

// create your schema
const StrategySchema = mongoose.Schema(strategySchemaObject, {
  timestamps: true
}) 

const Strategy = mongoose.model('strategy', StrategySchema);

module.exports = Strategy;