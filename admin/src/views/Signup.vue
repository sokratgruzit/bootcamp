<template>
	<div class="login">
		<el-form label-position="top" label-width="100px" 
			:model="ruleForm" :rules="rules" ref="ruleForm">
			<h1 class="f-34">Registration</h1>
			<el-form-item label="Email" prop="email" :error="errors.email">
			    <el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="Password" prop="password" :error="errors.password"> 
			    <el-input type="password" v-model="ruleForm.password"></el-input>
			</el-form-item>
			<el-form-item label="Confirm" prop="confirm"> 
			    <el-input type="password" v-model="ruleForm.confirm"></el-input>
			</el-form-item>
			<router-link :to="{name: 'Login'}" v-slot="{ href, navigate }" class="link">
			  	<el-link :href="href"  type="primary" @click="navigate">login</el-link>
			</router-link>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">Registration</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import AuthServices from '@/services/AuthServices';
	import authMixin from "@/mixins/authMixin";

	export default{
		name: 'Login',
		mixins: [authMixin],
		data() {
			let validatePass = (rule, value, callback) => {
		        if(value === ''){
		          	callback(new Error('Please input the password again'));
		        }else if (value !== this.ruleForm.password) {
		          	callback(new Error('Two inputs don\'t match!'));
		        }else{
		          	callback();
		        }
		    };
		    return {
		        ruleForm: {
			        email: '',
			        password: '',
			        confirm: ''
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
			        confirm: [
			            { validator: validatePass, trigger: 'blur' }
			        ],
		        },
		        errors:{},
		    };
	    },
	    methods: {
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			            this.signup();
			        } else {
			            return false;
			        }
		        });
		    },
		    async signup(){
		    	const res = await AuthServices.signup(this.ruleForm); 
		    	this.errors = {};
		    	if(res.status === 201){
		    		if(this.verify()){
		    			this.$router.push({name: 'Home'});
		    		}else{
		    			this.message();
		    			this.$router.push({name: 'Login'});
		    		}
		    		
		    	}
		    	if(res.status === 400){
		    		setTimeout(() => {
		    			this.errors = res.data.errors;
		    		}, 200);
		    	}
		    },
		    message() {
		        this.$message({
		          	message: 'You registered successfully , but have not admin rights.',
		        });
		    },
	    }
	}
</script>

<style lang="scss" scoped>
	.login{
		@extend %login;
	}
</style>