<template> 
	<div class="main-info">  
		<el-form label-position="top" label-width="100px" 
			:model="ruleForm" :rules="rules" ref="ruleForm">
			<h1 class="f-34">Web Page Main Information</h1>
			<el-form-item label="Title" prop="title" :error="errors.title">
			    <el-input type="text" v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="Copyright">
			    <el-input type="text" v-model="ruleForm.copyright"></el-input>
			</el-form-item>
			<el-form-item>
				<ImageUpload 
					v-model="ruleForm.favicon"
					:file_list="ruleForm.favicon"
					folder="/main_info" 
					title="Favicon"/> 
			</el-form-item>		
			<el-form-item>	 
				<ImageUpload 
					v-model="ruleForm.logo"
					:file_list="ruleForm.logo"
					folder="/main_info" 
					title="Logo"/>
			</el-form-item>
			<el-form-item>	 
				<ImageUpload 
					v-model="ruleForm.svg_logo" 
					:file_list="ruleForm.svg_logo"
					folder="/main_info" 
					title="Svg Logo"/> 
			</el-form-item>
			<el-form-item label="Address">
			    <el-input v-model="ruleForm.address"></el-input>
			</el-form-item>
			<el-form-item label="Mobile">
			    <el-input v-model="ruleForm.mobile"></el-input>
			</el-form-item>
			<el-form-item label="Phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="Email" prop="email" :error="errors.email">
			    <el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
 
<script>
	import MainInfoServices from '../services/MainInfoServices';
	import ImageUpload from '../components/ImageUpload';
	import { mapActions } from 'vuex';
	export default{
		name: 'Main_Info',
		components:{
			ImageUpload
		},
		data() {
		    return {
		        ruleForm: {
			        title: '',
			        copyright: '',
			        address: '',
			        mobile: '',
			        phone: '',
			        email: '',
			        logo: '',
			        svg_logo: '',
			        favicon: '',
		        },
		        rules: {
			        title: [
			            { required: true, message: 'Please input email address', trigger: 'blur' },
			            { min: 3, message: 'Length should be min 6 symbol', trigger: 'blur' }
			        ],
			        email: [
			            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
			        ],
		        },
		        errors:{},
		    };
	    },
	    computed:{
	    	contentData(){
	    		return this.$store.getters.mainInfoData;
	    	}
	    },
	    watch:{
	    	contentData:{
	    		immediate: true,
	    		handler: function(){
	    			//set current value from DB
	    			for(let item in this.contentData){
	    				this.ruleForm[item] = this.contentData[item];
	    			}
	    		}
	    	}
	    },
	    methods: { 
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if(valid){
			        	this.update();
			        }else{
			            return false;
			        }
		        });
		    },
		    async update(){
		    	const res = await MainInfoServices.update(this.ruleForm); 
		    	this.errors = {};

		    	if(res.status === 201){
		    		this.message();
		    		this.getMainInfoData(); 
		    	}
		    	if(res.status === 400){
		    		setTimeout(() => {
		    			this.errors = res.data.errors;
		    		}, 200);
		    	}
		    },
		    message() {
		        this.$message({
		          	message: 'Information succesfully saved.',
		          	type: 'success'
		        });
		    },
		    ...mapActions([
                'getMainInfoData'
            ]),
	    }
	}
</script>

<style lang="scss" scoped>
	.main-info{
		@extend %default-form;
	}
</style>