const mongoose = require('mongoose');

const HomePageTranslatedFieldsSchema = mongoose.Schema(
  {
    intro_title: String,
    intro_text1: String,
    intro_text2: String,

    about_title: String,
    about_subtitle: String,
    about_teaser: String,

    technology_title: String,
    slogans_title: String,

    strategy_title: String,
    strategy_subtitle: String,

    contact_title: String,
    contact_email: String,
  },
  { _id : false }
)

const HomePageSchema = mongoose.Schema({
	linkedin:{
		type: String,
		default: '#'
	},
  instagram:{
    type: String,
    default: '#'
  },
  twitter:{
    type: String,
    default: '#'
  },
	en: HomePageTranslatedFieldsSchema,
	ge: HomePageTranslatedFieldsSchema,
	ru: HomePageTranslatedFieldsSchema,
},
{
	timestamps: true 
});  

const HomePage = mongoose.model('home_page', HomePageSchema);

module.exports = HomePage;