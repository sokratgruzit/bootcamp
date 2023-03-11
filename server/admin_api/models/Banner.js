const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug); 

const BannerTranslatedFieldsSchema = mongoose.Schema(
  {
    title: String,
    subtitle: String,
    teaser: String,
    image: Object,
  },
  { _id : false }
)

const bannerSchema = mongoose.Schema({
	status:{
		type: Boolean,
		default: true
	},
	slug: { 
		type: String, 
		slug: "en.title", 
		slugPaddingSize: 2,  
		unique: true 
	},
	en: BannerTranslatedFieldsSchema,
	ge: BannerTranslatedFieldsSchema,
	ru: BannerTranslatedFieldsSchema,
},
{
	timestamps: true 
});  

const Banner = mongoose.model('banners', bannerSchema);

module.exports = Banner;