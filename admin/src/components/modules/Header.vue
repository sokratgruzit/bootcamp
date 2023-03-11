<template>    
    <el-header>
        <el-dropdown type="primary">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item>
                    <el-button type="primary" size="mini">Log out</el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-link type="primary" @click="logout">Log out</el-link>
    </el-header>
</template>

<script>
    
    export default{
        methods:{
            logout(){
                this.$cookies.set("user", " " ,  0);
                this.$router.push({name: 'Login'})
            }
        }
    } 
</script>

<style  scoped>
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
