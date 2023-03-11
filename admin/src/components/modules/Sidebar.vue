<template>  
    <el-aside style="width: 200px;">
        <router-link :to="{name: 'Home'}" class="logo" >
            <img 
                v-if="_.get($store, 'getters.mainInfoData.logo.path')"
                :src="$PUBLIC + _.get($store, 'getters.mainInfoData.logo.path')" 
                :alt="_.get($store, 'getters.mainInfoData.logo.alt')">
        </router-link>
        <el-menu :router="true">
            <!-- <el-menu-item index="1" :route="{name: 'MainInfo'}"> 
                <span>Main Content</span>
            </el-menu-item> -->
            <el-submenu index="2">
                <template slot="title">Content</template>
                <el-menu-item-group>
                    <el-menu-item index="2-2" :route="{name: 'HomePage'}">Home Page</el-menu-item>
                    <el-menu-item index="2-3" :route="{name: 'Strategies'}">Strategies</el-menu-item>
                    <el-menu-item index="2-4" :route="{name: 'Advantages'}">Advantages</el-menu-item>
                    <el-menu-item index="2-5" :route="{name: 'History'}">History</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" :route="{name: 'Quizz'}"> 
                <span>Quizz</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>


<style lang="scss" scoped>
    .el-aside{
        width: 200px;
        min-height: 100vh;
        border-right: 1px solid #ccc;

        .logo{
            display: flex;
            height: 60px;
            padding: 10px;

            img{
                display: block;
                max-height: 40px;
                max-width: calc(100% - 20px);
            }
        }

        .el-menu-item{
            display: flex;
            align-items: center;
        }
    }
</style> 