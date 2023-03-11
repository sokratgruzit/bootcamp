<template>
    <el-form-item >
        <el-checkbox v-model="checked">{{options.title}}</el-checkbox>
    </el-form-item>
</template>
<script>
    export default{
        props:['options'],
        data(){
            return{
                checked: false
            }
        },
        model: {
            event: 'change'
        },
        watch: {
            checked:{
                immediate: true,
                handler: function(){
                    this.$emit('change', this.checked);
                }
            },
            'options.val':{
                immediate: true,
                handler: function(){
                    typeof this.options.val == 'function' ? this.checked = false : this.checked = this.options.val;
                }
            }
        }
    }
</script>