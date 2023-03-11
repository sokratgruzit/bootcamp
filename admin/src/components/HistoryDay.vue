<template>
	<div class="day">
		<el-form-item label="Teaser" prop="day.teaser">
		    <el-input type="text" 
		    	v-model="day.teaser">		
		    </el-input>
		</el-form-item>
	</div>
</template>

<script>
	export default{
		name: 'History_Day',
		data(){
			return{
				day:{
					teaser: ''
				}
			}
		}
	}
</script>