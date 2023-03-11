<template>
	<div class="banners">
		<div class="top">
			<h1 class="f-34">Banners</h1>
			<el-button 
				type="primary" plain 
				@click="formBox = true">
				Create
			</el-button>
		</div>
		<el-table
		    	:data="contentData"
		    	style="width: 100%">
		    <el-table-column
		      	label="slug"
		      	prop="slug">
		    </el-table-column>
		    <el-table-column
		      	label="Image">
		      	<template slot-scope="scope">
		      		<el-image
					    style="width: 50px; height: 50px"
					    :src="$PUBLIC + scope.row.en.image.path"
					    fit="cover">     	
					</el-image>
			    </template>
		    </el-table-column>
		    <el-table-column
		      	align="right">
		      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
		      </template>
		    </el-table-column>
		</el-table>
 
		<el-dialog
			title="New Banner"
			:visible.sync="formBox"
			:before-close="dialogClose"
			width="600px"
			center>
			<el-form label-position="top" label-width="100px" 
			:model="ruleForm" :rules="rules" ref="ruleForm">
				<el-tabs type="border-card">
					<el-tab-pane label="En">
					  	<el-form-item label="Title" prop="en.title" :error="errors.title">
						    <el-input type="text" 
						    	v-model="ruleForm.en.title">		
						    </el-input>
						</el-form-item>
						<el-form-item label="Subtitle">
							    <el-input type="text" 
							    	v-model="ruleForm.en.subtitle">		
							    </el-input>
						</el-form-item>
						<el-form-item label="Textarea">
						    <el-input type="textarea" 
						    	v-model="ruleForm.en.teaser">
						    </el-input>
						</el-form-item>
						<el-form-item>
							<ImageUpload 
								v-model="ruleForm.en.image"
								:file_list="ruleForm.en.image"
								folder="/banner"/> 
						</el-form-item>		
						<el-form-item>
							<el-button type="danger" @click="formBox = false">Cancel</el-button>
							<el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
						</el-form-item>
					</el-tab-pane>
				  	<el-tab-pane label="Ge">
				  		<el-form-item label="Title">
						    <el-input type="text" 
						    	v-model="ruleForm.ge.title">		
						    </el-input>
						</el-form-item>
						<el-form-item label="Subtitle">
							    <el-input type="text" 
							    	v-model="ruleForm.ge.subtitle">		
							    </el-input>
						</el-form-item>
						<el-form-item label="Textarea">
						    <el-input type="textarea" 
						    	v-model="ruleForm.ge.teaser">
						    </el-input>
						</el-form-item>
						<el-form-item>
							<ImageUpload 
								v-model="ruleForm.ge.image"
								:file_list="ruleForm.ge.image"
								folder="/banner"/> 
						</el-form-item>		
						<el-form-item>
							<el-button type="danger" @click="formBox = false">Cancel</el-button>
							<el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
						</el-form-item>
				  	</el-tab-pane>
					<el-tab-pane label="Ru">
					  	<el-form-item label="Title">
						    <el-input type="text" v-model="ruleForm.ru.title"></el-input>
						</el-form-item>
						<el-form-item label="Subtitle">
						    <el-input type="text" v-model="ruleForm.ru.subtitle"></el-input>
						</el-form-item>
						<el-form-item label="Textarea">
						    <el-input type="textarea" 
						    	v-model="ruleForm.ru.teaser">
						    </el-input>
						</el-form-item>
						<el-form-item>
							<ImageUpload 
								v-model="ruleForm.ru.image"
								:file_list="ruleForm.ru.image"
								folder="/banner"/> 
						</el-form-item>		
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import BannersServices from '@/services/BannersServices';
	import ImageUpload from '@/components/ImageUpload';
	export default {
		name: 'Banners',
		components:{
			ImageUpload
		},
	    data() {
	      return {
	      	contentData: [],
	      	formBox: false,
	        ruleForm: {
	        	en:{
	        		title: '',
	        		subtitle: '',
		        	teaser: '',
		        	image: '',
	        	},
	        	ge:{
	        		title: '',
	        		subtitle: '',
		        	teaser: '',
		        	image: '',
	        	},
	        	ru:{
	        		title: '',
	        		subtitle: '',
		        	teaser: '',
		        	image: '',
	        	},
	        	status: false,
	        	slug: '',
	        },
	        tmpRuleForm:{},
	        rules: {
		        en:{
		        	title: [
			            { required: true, message: 'Fild is required', trigger: 'blur' },
			            { min: 3, message: 'Length should be min 3 symbol', trigger: 'blur' }
			        ]
		        },
	        },
	        errors:{},
	      } 
	    },
	    mounted(){
	    	this.getData();
	    	this.tmpRuleForm = this.ruleForm;	
	    },
	    methods: {
		    handleEdit(index, row) {
		        this.ruleForm = row;
		        this.formBox = true;
		    },
		    async handleDelete(index, row) {
		        let res = await BannersServices.destroy(row.slug);
		        if(res.status === 200){
	        		this.getData();
	        		this.ruleForm = this.tmpRuleForm;
	        		this.delete();
	        	} 
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate( async (valid) => {
			        if(valid){
			        	console.log(this.ruleForm._id);
			        	let res;
			        	if(this.ruleForm._id){
			        		res = await BannersServices.update(this.ruleForm); 
			        	}else{
			        		res = await BannersServices.create(this.ruleForm);
			        	}
			        	this.errors = {};

			        	if(res.status === 201){
			        		this.getData();
			        		this.formBox = false;
			        		if(this.ruleForm._id){
			        			this.update();
			        		}else{
			        			this.saved();
			        		}
			        		this.ruleForm = this.tmpRuleForm;
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
		    saved() {
		        this.$message({
		          	message: 'Information succesfully saved.',
		          	type: 'success'
		        });
		    },
		    update() {
		        this.$message({
		          	message: 'Information succesfully updated.',
		          	type: 'success'
		        });
		    },
		    delete() {
		        this.$message({
		          	message: 'Information succesfully deleted.',
		          	type: 'success'
		        });
		    },
		    async getData(){
		    	const res = await BannersServices.index();
	    		_.get(res, 'data.banners.results') ? this.contentData = res.data.banners.results : '';
		    },
		    dialogClose(done){
		    	this.ruleForm = this.tmpRuleForm;
		    	done();
		    }
	    },
	}
</script>

<style lang="scss" scoped>
	.top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}
</style>