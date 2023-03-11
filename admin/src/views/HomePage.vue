<template> 
	<div>
		<el-form label-position="top" label-width="100px" 
			:model="ruleForm" ref="ruleForm">
			<el-tabs type="border-card">
				<el-tab-pane label="En">
					<h2 class="f-34">Introduction</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.intro_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="First Text">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.intro_text1">
					    </el-input>
					</el-form-item>
					<el-form-item label="Second Text">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.intro_text2">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">About</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.about_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="Subtitle">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.about_subtitle">
					    </el-input>
					</el-form-item>
					<el-form-item label="Teaser">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.about_teaser">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Technology</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.technology_title">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Slogans</h2>
					<el-tooltip content="For separate slogans use'/'" placement="top">
					  	<el-button>Info</el-button>
					</el-tooltip>
					<el-form-item >
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.slogans_title">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Strategy</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.strategy_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="Subtitle">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.strategy_subtitle">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Contact</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.en.contact_title">
					    </el-input>
					</el-form-item>

					<el-form-item label="Email">
					    <el-input 
					    	v-model="ruleForm.en.contact_email">
					    </el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="Ge">
					<h2 class="f-34">Introduction</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.intro_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="First Text">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.intro_text1">
					    </el-input>
					</el-form-item>
					<el-form-item label="Second Text">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.intro_text2">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">About</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.about_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="Subtitle">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.about_subtitle">
					    </el-input>
					</el-form-item>
					<el-form-item label="Teaser">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.about_teaser">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Technology</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.technology_title">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Slogans</h2>
					<el-tooltip content="For separate slogans use '/' " placement="top">
					  	<el-button>Info</el-button>
					</el-tooltip>
					<el-form-item>
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.slogans_title">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Strategy</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.strategy_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="Subtitle">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.strategy_subtitle">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Contact</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ge.contact_title">
					    </el-input>
					</el-form-item>

					<el-form-item label="Email">
					    <el-input 
					    	v-model="ruleForm.ge.contact_email">
					    </el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="Ru">
					<h2 class="f-34">Introduction</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.intro_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="First Text">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.intro_text1">
					    </el-input>
					</el-form-item>
					<el-form-item label="Second Text">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.intro_text2">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">About</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.about_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="Subtitle">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.about_subtitle">
					    </el-input>
					</el-form-item>
					<el-form-item label="Teaser">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.about_teaser">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Technology</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.technology_title">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Slogans</h2>
					<el-tooltip content="For separate slogans use'/'" placement="top">
					  	<el-button>Info</el-button>
					</el-tooltip>
					<el-form-item>
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.slogans_title">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Strategy</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.strategy_title">
					    </el-input>
					</el-form-item>
					<el-form-item label="Subtitle">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.strategy_subtitle">
					    </el-input>
					</el-form-item>

					<h2 class="f-34">Contact</h2>
					<el-form-item label="Title">
					    <el-input type="textarea" 
					    	v-model="ruleForm.ru.contact_title">
					    </el-input>
					</el-form-item>

					<el-form-item label="Email">
					    <el-input  
					    	v-model="ruleForm.ru.contact_email">
					    </el-input>
					</el-form-item>
				</el-tab-pane>

				<h2 class="f-34">Socials Links</h2>
				<el-form-item label="Linkedin">
				    <el-input  
				    	v-model="ruleForm.linkedin">
				    </el-input>
				</el-form-item>
				<el-form-item label="instagram">
				    <el-input  
				    	v-model="ruleForm.instagram">
				    </el-input>
				</el-form-item>
				<el-form-item label="twitter">
				    <el-input  
				    	v-model="ruleForm.twitter">
				    </el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
				</el-form-item>
			</el-tabs>
		</el-form>
	</div>
</template>

<script>
	import HomePageServices from '@/services/HomePageServices';
	export default{
		data(){
			return{ 
				ruleForm: {
					linkedin: '',
					instagram: '',
					twitter: '',
		        	en:{
		        		intro_title: '',
		        		intro_text1: '',
		        		intro_text2: '',
		        		about_title: '',
		        		about_subtitle: '',
		        		about_teaser: '',
		        		technology_title: '',
		        		slogans_title: '',
		        		strategy_title: '',
		        		strategy_subtitle: '',
		        		contact_title: '',
		        		contact_email: ''
		        	},
		        	ge:{
		        		intro_title: '',
		        		intro_text1: '',
		        		intro_text2: '',
		        		about_title: '',
		        		about_subtitle: '',
		        		about_teaser: '',
		        		technology_title: '',
		        		slogans_title: '',
		        		strategy_title: '',
		        		strategy_teaser: '',
		        		contact_title: '',
		        		contact_email: ''
		        	},
		        	ru:{
		        		intro_title: '',
		        		intro_text1: '',
		        		intro_text2: '',
		        		about_title: '',
		        		about_subtitle: '',
		        		about_teaser: '',
		        		technology_title: '',
		        		slogans_title: '',
		        		strategy_title: '',
		        		strategy_teaser: '',
		        		contact_title: '',
		        		contact_email: ''
		        	},
		        },
		        tmpRuleForm:{}
			}
		},
		mounted(){
			this.tmpRuleForm = this.ruleForm;
			this.getData();
		},
		methods:{
			submitForm(formName) {
		        this.$refs[formName].validate( async (valid) => {
			        if(valid){
			        	const res = await HomePageServices.update(this.ruleForm);
			        	this.errors = {};

			        	if(res.status === 201){
			        		this.getData();
			        		this.update();
			        	}
			        	if(res.status === 400){
			        		setTimeout(() => {
			        			console.log(res)
				    			this.errors = res.data.errors;
				    		}, 200);
			        	}
			        }else{
			            return false;
			        }
		        });
		    },
			async getData(){
				const res = await HomePageServices.index();
				if(res.status === 200){
					this.ruleForm = res.data.data;
				}
			},
			update() {
		        this.$message({
		          	message: 'Information succesfully updated.',
		          	type: 'success'
		        });
		    },
		}
	}
</script> 