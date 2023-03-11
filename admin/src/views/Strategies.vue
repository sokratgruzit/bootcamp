<template>
	<div class="strategies">
		<div class="top">
			<h1 class="f-34">{{name}}</h1>
			<el-button 
				type="primary" plain 
				@click="formBox = true">
				Create
			</el-button>
		</div>

		<el-table
		    	:data="contentData"
		    	style="width: 100%"
		    	:lazy="true">
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
			:title="'New ' + name"
			:visible.sync="formBox"
			:before-close="dialogClose"
			width="600px"
			v-if="formData"
			center>
			<el-form 
				label-position="top" label-width="100px" 
				:rules="rules"
				:model="formData" ref="formData">
				<el-tabs type="border-card">
					<el-tab-pane v-for="lang in languages" :label="lang.code">
					  	<template v-for="comp in data">
					  		<el-form-item 
					  			v-if="comp.options.translate" 
					  			:label="comp.options.title" 
					  			:prop="rules[lang.code][comp.options.value] && rules[lang.code][comp.options.value].length > 0  ? lang.code + '.' + comp.options.value : '' ">
						  		<component 
						  			:is="'my-' + comp.type" 
						  			:options="{...comp.options, 'val' : formData[lang.code][comp.options.value]}"
						  			v-model="formData[lang.code][comp.options.value]">
						  		</component>
						  	</el-form-item>
						  	<el-form-item 
					  			v-else
					  			:label="comp.options.title"
					  			:key="comp.options.title" 
					  			:prop="rules[comp.options.value] && rules[comp.options.value].length > 0 ? comp.options.value : ''">
						  		<component 
						  			:is="'my-' + comp.type" 
						  			:options="{...comp.options, 'val' : formData[comp.options.value]}"
						  			v-model="formData[comp.options.value]">
						  		</component>
						  	</el-form-item>
					  	</template>
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
	import Service from '@/services/MultipleContentServices';

	export default{
		props:{
			name: {
				type: String,
				default: 'Title'
			}, 
			path: {
				type: String,
				default: 'strategies'
			},
			data:{
				type: Array,
				default: function(){
					return [
						{
							type: 'input',
							options: {
								title: 'input title',
								value: 'title',
								val: '',
								type: String,
								translate: true,
								validation: {
									langs: ['en' , 'ru'],
									required: false
								}
							}
						},
						{
							type: 'textarea',
							options: {
								title: 'textarea title',
								value: 'textarea',
								val: '',
								type: String,
								translate: true,
								validation: {
									langs: ['en'],
									required: false
								}
							}
						},
						{
							type: 'checkbox',
							options: {
								title: 'status',
								value: 'checkbox',
								val: '',
								type: Boolean,
								translate: false,
								validation: {
									langs: ['en'],
									required: false
								}
							}
						}
					]
				}
			}
		},
		name: 'create_dynamic_component',
		components:{
			'my-input': () => import('@/components/formComponents/input'),
			'my-textarea': () => import('@/components/formComponents/textarea'),
			'my-checkbox': () => import('@/components/formComponents/checkbox')
		},
		data(){
			return{
				contentData: [],
		      	formBox: false,
		        formData: null,
		        tmpFormData:{},
		        rules: {},
		        errors:{},
		        edit: false,
		        pagination: null,
		        limit: 10
			}
		},
		computed:{
			languages(){
				return this.$store.getters.getLanguages;
			},
			combined(){
		        return `${this.languages}|${this.data}`;
		    }
		},
		watch:{
			combined:{
				immediate: true,
				handler: function(){
					this.generateFormData();
				}
			}
		}, 
		mounted(){ 
			this.getData();
		},
		methods: {
			generateFormData(){
				let obj = {};
				let rules = {};
				if(!this.languages || !this.data) return null;
				this.languages.forEach(function(lang){
					obj[lang.code] = {};
					rules[lang.code] = {};
				})
				for(let key in obj){
					this.data.forEach(function(item){
						if(item.options.translate){
							obj[key][item.options.value] = item.options.type;

							if(item.options.validation.langs.includes(key)){
								//validation
								rules[key][item.options.value] = [];

								//required
								if(item.options.validation.required){
									rules[key][item.options.value].push({
										required: true, message: 'This field is required', trigger: 'blur' 
									})
								}
							}
						}else{
							obj[item.options.value] = item.options.type;

							//validation
							rules[item.options.value] = [];

							//required
							if(item.options.validation.required){
								rules[item.options.value].push({
									required: true, message: 'This field is required', trigger: 'blur' 
								})
							}
						}
					})
				}
				this.formData = obj;
				this.tmpFormData = obj;
				this.rules = rules;
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
			        	}
			        	if(res.status === 400){
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
		    },
		    async handleDelete(index, row) {
		        let res = await Service.destroy(row._id, this.path);
		        if(res.status === 200){
	        		this.getData();
	        		this.ruleForm = this.tmpRuleForm;
	        		this.showMessage('Information succesfully deleted.')
	        	} 
	        	if(res.status === 400){
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
	        	}

	        	if(res.status === 400){
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
		    		this.pagination = res.data.pagination;
		    	}
		    },
		    dialogClose(done){
		    	this.formData = this.tmpFormData;
		    	this.edit = false;
		    	done();
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
</style>

