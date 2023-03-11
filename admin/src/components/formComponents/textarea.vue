<template>
    <el-input type="textarea" v-model="value">
    </el-input>
</template>
<script>
	export default{
		props:['options'],
		data(){
			return{
				value: ''
			}
		},
		model: {
		    event: 'change'
		},
		watch: {
			value:{
                immediate: true,
                handler: function(){
                    this.$emit('change', this.value);
                }
            },
            'options.val':{
                immediate: true,
                handler: function(){
                    typeof this.options.val == 'function' ? this.value = '' : this.value = this.options.val;
                }
            }
		}
	}
</script>