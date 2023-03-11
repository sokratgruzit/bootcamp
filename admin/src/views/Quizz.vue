<template>
	<div class="banners">
		<div class="top">
			<h1 class="f-34">Quizz</h1>
			<el-button 
				type="primary" plain 
				@click="formBox = true">
				Create
			</el-button>
		</div>
		<el-table
		    	:data="contentData"
		    	style="width: 100%"
		    	:empty-text="empty">
		    <el-table-column
		      	label="slug"
		      	prop="slug">
		    </el-table-column>
		    <el-table-column
			    label="Status"
			    width="100">
			    <template slot-scope="scope">
			        <el-checkbox  v-model="scope.row.status" @change="updateStatus(scope.row)">Status</el-checkbox>
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

		<el-pagination
			v-if="this.pagination"
			background
			layout="prev, pager, next"
			:total="this.pagination.size"
			:page-size="limit"
			:current-page="this.pagination.current"
			:hide-on-single-page="true"
			@current-change="handleCurrentChange">
		</el-pagination>
  
		<el-dialog
			title="New Question"
			:visible.sync="formBox"
			@closed="dialogClose"
			width="600px"
			center>
			<el-form 
				v-if="formData"
				label-position="top" 
				label-width="100px" 
				:model="formData" :rules="rules" 
				ref="formData">
				<el-tabs type="border-card">
					<el-tab-pane v-for="lang in languages" :label="lang.code" >
					  	<el-form-item>
					  		<el-form-item label="Question">
							    <el-input type="textarea" 
							    	v-model="formData[lang.code].question">		
							    </el-input>
							</el-form-item>
							<el-form-item label="Answers count">
								<el-input-number 
									v-model="count"
									@change="generateAnswData" 
									:min="2" :max="10">
								</el-input-number>
							</el-form-item>
							<el-form-item label="Answers">
								<div class="answ-item" v-for="(answ, index) in count">
									<el-checkbox v-model="formData[lang.code].answers[index].value"></el-checkbox>
									<el-input v-model="formData[lang.code].answers[index].definition">		
								    </el-input>
								</div>
							</el-form-item>
							<el-form-item>
								<el-checkbox v-model="formData.status">Status</el-checkbox>
							</el-form-item>
							<el-button type="primary" @click="submitForm('formData')">
								{{edit ? 'Edit' : 'Save'}}
							</el-button>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Service from '@/services/QuizzServices';
	export default {
		name: 'Quizz',
	    data() {
	      return {
	      	contentData: [],
	      	empty: 'loading',
	      	formBox: false,
	        formData:null,
	        tmpformData:{},
	        rules: null,
	        errors:{},
	        path: 'quizzes',
	        edit: false,
	        pagination: null,
	        limit: 10,
	        count: 2
	      } 
	    },
	    mounted(){
	    	this.getData();
	    	this.tmpformData = this.formData;	
	    },
	    computed:{
			languages(){
				return this.$store.getters.getLanguages;
			},
		},
		watch:{
			languages:{
				immediate: true,
				handler: function(){
					this.generateFormData();
				}
			},
			count:{
				immediate: false,
				handler: function(){
					// this.generateAnswData();
				}
			}
		},
	    methods: {
	    	generateFormData(){
				let obj = {};
				let rules = {};
				if(!this.languages) return null;
				this.languages.forEach(function(lang){
					obj[lang.code] = {
						question: '',
						answers: []
					};
					rules[lang.code] = {};
				})
				obj.status = true;
				this.formData = obj;
				this.tmpFormData = obj;
				this.rules = rules;
				this.generateAnswData();
			},
			generateAnswData(){
				const _this = this;
				this.languages.forEach(function(lang){
					if(_this.count >  _this.formData[lang.code].answers.length){
						for(let i = _this.formData[lang.code].answers.length ; i < _this.count; i++ ){
							_this.formData[lang.code].answers.push({
								definition: '',
								value: false
							})
						}
					}else if(_this.count < _this.formData[lang.code].answers.length){
						_this.formData[lang.code].answers.splice(_this.count, _this.formData[lang.code].answers.length - _this.count)
					}
					
				})
			},
			submitForm(formName) {
		        this.$refs[formName].validate( async (valid) => {
			        if(valid){
			        	let res;
			        	if(!this.edit){
			        		res = await Service.create(this.formData , this.path);
			        	}else{
			        		res = await Service.update(this.formData , this.path);
			        	}
			        	
			        	if(res.status === 201){
			        		this.getData();
			        		this.formBox = false;
			        		this.showMessage(this.edit ? 'Information succesfully saved.' : 'Information succesfully updated.')
			        	}else{
			        		this.showMessage('Something get wrong' , 'error')
			        	}
			        }else{
			        	this.showMessage('Validation failed, please check language tabs too' , 'error')
			            return false;
			        }
		        });
		    },
		    handleEdit(index, row) {
		        this.formData = row;
		        this.edit = true;
		        this.formBox = true;
		        this.count = row.en.answers.length;
		    },
		    async handleDelete(index, row) {
		        let res = await Service.destroy(row._id, this.path);
		        if(res.status === 200){
	        		this.getData();
	        		this.showMessage('Information succesfully deleted.')
	        	}else{
	        		this.showMessage('Something get wrong' , 'error')
	        	}
		    },
		    async updateStatus(row){
		    	let res = await Service.updateStatus({
		    		_id: row._id,
		    		status: row.status
		    	},this.path);

		    	if(res.status === 201){
	        		this.getData();
	        		this.showMessage('Status succesfully updated.')
	        	}else{
	        		this.showMessage('Something get wrong' , 'error')
	        	}
		    },
		    showMessage(msg,type){
		    	this.$message({
		          	message: msg,
		          	type: type || 'success'
		        });
		    },
		    async getData(){
		    	let page;
		    	this.$route.query.page ? page = this.$route.query.page : '';
		    	if(this.$route.query.page){
		    		page
		    	}
		    	const res = await Service.index(this.limit , page, this.path);
		    	if(res.status === 200){
		    		this.contentData = res.data.results;
		    		if(!this.contentData || this.contentData.length < 1){
		    			this.empty = 'No Data';
		    		}
		    		this.pagination = res.data.pagination;
		    	}else{
		    		this.showMessage('Something get wrong, cannot access data' , 'error');
		    		this.empty = 'No Data';
		    	}
		    },
		    dialogClose(){
		    	const _this = this;
		    	setTimeout(function(){
		    		_this.formData = _this.tmpFormData;
		    		_this.edit = false;
		    		_this.count = _this.tmpFormData.en.answers.length;
		    	},300)
		    },
		    handleCurrentChange(val) {
		    	this.$router.push({  query: { limit: this.limit, page: val }})
		        this.getData();
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
	.el-form .el-form-item{
		margin-bottom: 30px;
	}
	.el-form ::v-deep .el-form-item:last-child{
		margin-bottom: 0;
	}
	.el-form ::v-deep .el-form-item__label{
		line-height: normal;
	}
	.el-pagination{
		margin-top: 30px;
	}
	.answ-item{
		display: flex;
		margin-bottom: 10px;
		&:last-child{
			margin-bottom: 0;
		}

		.el-checkbox{
			margin-right: 10px;
		}
	}
</style>