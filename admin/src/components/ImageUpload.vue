<template>
	<div class="image-upload">
		<span class="ttl">{{title}} Uploader</span>
		<el-upload
			class="upload-demo"
			list-type="picture" 
			:file-list="fileList"
			name="image"
			:data="info"
			:action="$SERVER_API + 'image'"
			:on-preview="handlePreview" 
			:on-remove="handleRemove"
			:on-progress="handleProgress"
			:on-change="handleChange"
			:on-success="handleSuccess"
			:before-upload="beforeUpload"
			accept=".jpg, .png, .jpeg, .ico, .svg"
			:limit="1"
			:multiple="false">
			<el-button size="small" type="primary" >
				Click to upload
			</el-button>
			<div slot="tip" class="el-upload__tip">
				jpg/png/jpeg/ico/svg files accepted
			</div>
		</el-upload>
		<el-form-item label="Alt text">
			<el-input 
				v-if="_.get(file_list, 'alt') || _.get(file_list, 'alt') == ''"
				placeholder="alt text" 
				v-model="file_list.alt"
				@change="$emit('change', file_list)">		
			</el-input>
		</el-form-item>
	</div>
</template>
<script> 
	import axios from "axios";
	export default{
		name: "ImageUpload",
		props:{
			folder: {},
			file_list: {
				path: '',
				name: '',
				alt: ''
			},
			title: {
				default: 'Image'
			}
		},
		model: {
		    event: 'change'
		},
		data(){
			let self = this;
			return{
				fileList: [] ,
				info: {
					folder: self.folder || '',
				}
			}
		},
		watch:{
			file_list: {
				immediate: true,
				handler: function(){
					if(this.file_list){
						this.fileList = [];
						this.fileList.push(
							{	...this.file_list , 
								url: this.$PUBLIC + this.file_list.path
							}
						);
					}
				}
			}
		}, 
		methods: { 
		    async handleRemove(file, fileList) { 
		    	try {
		            const res = await axios({
		                method: 'delete',
		                baseURL: this.$SERVER_API + 'image',
		                data: JSON.stringify({path: this.file_list.path}),
		                headers: {
		                    'Accept': 'application/json',
		                    'Content-Type': 'application/json',
		                }
		            });

		            if(res.status === 200){
		            	this.$emit('change', false);
		            }
		        } catch (err) {
		            return err.response;
		        }
		    },
		    handlePreview(file) {
		    },
		    beforeUpload(file){
		    },
		    handleProgress(event,file,fileList){
		    },
		    handleChange(file, fileList){
		    },
		    handleSuccess(response,file,fileList){
		    	this.$emit('change', response);
		    }
	    }
	} 
</script>

<style lang="scss" scoped>
	.image-upload{
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		padding: 16px;

		.ttl{
			font-size: 21px;
			margin-bottom: 16px;
			display: block;
		}

		.el-upload__tip{
			margin-top: 10px;
		}

		.el-form-item{
			margin-top: 16px;
		}
	}
</style>