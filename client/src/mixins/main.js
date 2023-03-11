import { Trans } from '@/plugins/Translation'

export default {
	methods:{
		translate(data){
			if(!data) return data;
			if(data instanceof Array){
				data.forEach((item) => {
					item = Object.assign(item, item[Trans.currentLocale]);
				})
			}else{
				data = Object.assign(data, data[Trans.currentLocale]);
			}
			return data;	
		},
	}
} 