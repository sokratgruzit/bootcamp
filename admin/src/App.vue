<template>
    <div id="app">
        <transition name="router" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default { 
        name: 'App',
        metaInfo(){
            return{
                title: this.$store.getters.mainInfoData.title || '',
                titleTemplate: '%s | ' + (this.$route.name || ''),
                htmlAttrs: {
                    lang: 'en',
                },
            }
        },
        async mounted(){
            this.getMainInfoData();
            this.getLanguage();
        },
        methods:{
            ...mapActions([
                'getMainInfoData',
                'getLanguage'
            ]),
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/main.scss";
</style>
