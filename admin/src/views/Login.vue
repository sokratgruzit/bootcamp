<template> 
	<div class="login"> 
		<el-form label-position="top" label-width="100px" 
			:model="ruleForm" :rules="rules" ref="ruleForm">
			<h1 class="f-34">Login</h1>
			<el-form-item label="Email" prop="email" :error="errors.email">
			    <el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="Password" prop="password" :error="errors.password"> 
			    <el-input type="password" v-model="ruleForm.password"></el-input>
			</el-form-item>
			<router-link :to="{name: 'Signup'}" v-slot="{ href, navigate }" class="link">
			  	<el-link :href="href"  type="primary" @click="navigate">registration</el-link>
			</router-link>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
 
<script>
	import AuthServices from '@/services/AuthServices';
	export default{
		name: 'Login',
		data() {
		    return {
		        ruleForm: {
			        email: '',
			        password: ''
		        },
		        rules: {
			        email: [
			            { required: true, message: 'Please input email address', trigger: 'blur' },
			            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
			        ],
			        password: [
			            { required: true, message: 'Please input password', trigger: 'blur' },
			            { min: 6, message: 'Length should be min 6 symbol', trigger: 'blur' }
			        ],
		        },
		        errors:{},
		    };
	    }, 
	    methods: { 
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if(valid){
			        	this.login();
			        }else{
			            return false;
			        }
		        });
		    },
		    async login(){
		    	const res = await AuthServices.login(this.ruleForm); 
		    	this.errors = {};
		    	if(res.status === 200){
		    		this.$router.push({name: 'Home'});
		    	}
		    	if(res.status === 400){
		    		setTimeout(() => {
		    			this.errors = res.data.errors;
		    		}, 200);
		    	}
		    }
	    }
	}
</script>

<style lang="scss" scoped>
	.login{
		@extend %login;
	}
</style>