/*
props:{
	name: 'module name', 
	path: 'path where to send requests',
 	**  data contains array of module fileds , now allowed: input,textarea,checkbox
	data:
		[
			{
				type: 'type of field example: input/textarea',
				options: {
					title: 'input title',
					value: 'title - v-model value name',
					val: '',
					type: 'Type of filed like: String, Boolean' , 
					translate: 'is this filed translated or not, set tru or false',
					** list of supported validation
					validation: {
						langs: 'array of languages which need validate if filed is translated, set array of lanf: ['en' , 'ru'] ',
						required: 'is field required or not set true or false'
					}
				}
			},
		]
}

*/

export default {
    categories: {
    	name: 'Strategies', 
		path: 'strategies',
		data:[
			{
				type: 'input',
				options: {
					title: 'Title',
					value: 'title',
					val: '',
					type: String,
					translate: true,
					validation: {
						langs: [],
						required: false
					}
				}
			},
			{
				type: 'textarea',
				options: {
					title: 'Teaser',
					value: 'teaser',
					val: '',
					type: String,
					translate: true,
					validation: {
						langs: [],
						required: false
					}
				}
			},
			{
				type: 'checkbox',
				options: {
					title: 'status',
					value: 'status',
					val: '',
					type: Boolean,
					translate: false,
					validation: {
						langs: [],
						required: false
					}
				}
			}
		]
    },

    advantages: {
    	name: 'Advantages', 
		path: 'advantages',
		data:[
			{
				type: 'input',
				options: {
					title: 'Title',
					value: 'title',
					val: '',
					type: String,
					translate: true,
					validation: {
						langs: [],
						required: false
					}
				}
			},
			{
				type: 'input',
				options: {
					title: 'Subtitle',
					value: 'subtitle',
					val: '',
					type: String,
					translate: true,
					validation: {
						langs: [],
						required: false
					}
				}
			},
			{
				type: 'textarea',
				options: {
					title: 'Teaser',
					value: 'teaser',
					val: '',
					type: String,
					translate: true,
					validation: {
						langs: [],
						required: false
					}
				}
			},
			{
				type: 'checkbox',
				options: {
					title: 'status',
					value: 'status',
					val: '',
					type: Boolean,
					translate: false,
					validation: {
						langs: [],
						required: false
					}
				}
			}
		]
    }
};