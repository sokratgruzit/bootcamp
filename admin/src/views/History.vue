<template>
	<div class="history">
		<div class="top">
			<h1 class="f-34">History</h1>
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
			v-if="formData"
			:title="'New History'"
			:visible.sync="formBox"
			@closed="dialogClose"
			width="600px"
			center>
			<el-form  
				label-position="top" label-width="100px" 
				:rules="rules"
				:model="formData" ref="formData">
				<el-tabs type="border-card">
					<el-tab-pane v-for="lang in languages" :label="lang.code">
 
					  	<el-form-item label="Title">
						    <el-input type="text" 
						    	v-model="formData[lang.code].title">		
						    </el-input>
						</el-form-item>
						<div class="btns-wrap">
							<el-button type="primary" icon="el-icon-plus" @click="chaneCount(true)"></el-button>
							<el-button type="primary" icon="el-icon-minus"  @click="chaneCount(false)"></el-button>
						</div>
						
						<div class="pic-list" v-for="(pic, index) in picCount" v-if="picCount">
							<div class="pic-item">
								<ImageUpload 
									v-model="formData.en.picArr[index].image"
									:file_list="formData.en.picArr[index].image"
									folder="/history"/>
								<el-form-item label="Teaser">
								    <el-input type="text" 
								    	v-model="formData[lang.code].picArr[index].teaser">		
								    </el-input>
								</el-form-item>
							</div>
						</div>

					  	<el-form-item>
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
	import Service from '@/services/History.js';
	import ImageUpload from '@/components/ImageUpload';
	export default{
		name: 'History',
		components: {
			ImageUpload
		},
		data(){
			return{
				contentData: [],
				empty: 'loading',
		      	formBox: false,
		        formData: null,
		        tmpFormData:null,
		        rules: {},
		        errors:{},
		        edit: false,
		        pagination: null,
		        limit: 10,
		        picCount: 0,
		        path: 'history'
			}
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
		}, 
		mounted(){ 
			this.getData();
		}, 
		methods: {
			generateFormData(){
				let obj = {};
				let tmpObj = {};
				let rules = {};
				if(!this.languages) return null;
				this.languages.forEach(function(lang){
					obj[lang.code] = {};
					rules[lang.code] = {};
				})
				for(let key in obj){
					obj[key].title = '';
					obj[key].status = true;
					obj[key].picArr = [];
				}
				
				this.formData = _.cloneDeep(obj);
				this.tmpFormData = _.cloneDeep(obj);
				this.rules = rules;
			},
			chaneCount(direction){
				let _this = this;
				if(direction){
					this.picCount ++;
					_this.languages.forEach(function(lang){
						_this.formData[lang.code].picArr.push({
							teaser: '',
							image: ''
						})
					})
				}else{
					this.picCount --;
					_this.languages.forEach(function(lang){
						_this.formData[lang.code].picArr.splice(_this.picCount, 1)
					})
				}
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
		    	this.picCount = _.size(row.en.picArr);
		        this.formData = row;
		        this.edit = true;
		        this.formBox = true;
		    },
		    async handleDelete(index, row) {
		        let res = await Service.destroy(row._id, this.path);
		        if(res.status === 200){
	        		this.getData();
	        		this.formData = _.cloneDeep(this.tmpFormData);
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
		    	this.picCount = 0;
		    	this.formData = _.cloneDeep(this.tmpFormData);
		    	this.edit = false;
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
	.el-form .el-form-item:last-child{
		margin-bottom: 0;
	}
	.el-form .el-form-item__label{
		line-height: normal;
	}
	.el-form .el-form-item__content{
		line-height: normal;
	}
	.el-pagination{
		margin-top: 30px;
	}
	.btns-wrap{
		margin-bottom: 30px;
	}
	.pic-list{
		padding-bottom: 30px;
	}
	.pic-item{
		border: 1px solid #ccc;
		padding: 10px;
	}
</style>

