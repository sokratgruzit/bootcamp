const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Language = require('../models/Language')

mongoose.plugin(slug); 

const AdvantageTranslatedFieldsSchema = mongoose.Schema(
  {
    title: String,
    subtitle: String,
    teaser: String
  },
  { _id : false }
)


const advantageSchemaObject = {
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

Language.schema.obj.list.default.forEach((lang) => {
  advantageSchemaObject[lang.code] = AdvantageTranslatedFieldsSchema
})

// create your schema
const AdvantageSchema = mongoose.Schema(advantageSchemaObject, {
  timestamps: true
}) 

const Advantage = mongoose.model('advantage', AdvantageSchema);

module.exports = Advantage;