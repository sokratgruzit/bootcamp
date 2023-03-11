<template>
    <transition name="fade" mode="out-in">
        <div class="lang-wrap" 
            @click="open = !open" 
            :class="{open: open}" :key="$i18n.locale"
            v-click-outside="close">
            <ul class="lang">
                <li v-for="locale in locales" 
                    :key="locale" @click="switchLocale(locale)" 
                    class="lang-item" :class="{active: $i18n.locale == locale}">
                    <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g style="mix-blend-mode:difference">
                        <path d="M43.3179 4.55299C40.7347 1.97767 37.5989 0.971398 34.588 0.494198C31.805 0.0710956 29.0007 0.118053 26.2242 0.634248C22.876 0.96519 19.5617 1.87504 16.3425 3.34703C13.8388 4.49236 11.4197 6.0467 9.12557 7.98417C7.40728 9.12986 5.76266 10.5271 4.21384 12.1571C2.23151 14.2863 -0.193553 17.3726 0.170957 21.5818C0.284619 22.7621 0.576079 23.8837 1.02148 24.8548C2.25149 30.5267 8.27837 32.5315 11.6738 33.2499C14.5145 33.8111 17.3829 33.9518 20.2406 33.67C21.6088 33.5844 22.9769 33.4107 24.3368 33.1254C27.3696 32.607 30.3738 31.7402 33.3247 30.5319C36.4871 29.2196 39.7161 27.539 42.5073 24.8262C44.7043 22.697 47.0429 19.5511 47.4323 15.3237C47.8518 10.8137 45.5931 6.82229 43.3179 4.55299ZM1.7971 16.6568C2.44647 15.4398 3.19258 14.3566 4.01744 13.4331C2.69755 15.2874 1.58239 17.4789 1.06142 20.1087C0.941953 20.6998 0.860551 21.3079 0.818416 21.9241C0.552108 20.0101 1.02148 18.1506 1.7971 16.6568ZM2.9622 27.8814C3.35856 28.3382 3.76966 28.7633 4.19387 29.1548C3.75613 28.7924 3.34149 28.366 2.95554 27.8814H2.9622ZM37.1662 27.8062C36.4638 28.2055 35.7531 28.5842 35.0373 28.9291C36.1259 28.279 37.1978 27.5641 38.253 26.7843C38.481 26.6183 38.2813 26.0996 38.055 26.2656C32.0834 30.4933 25.6155 32.7519 19.0572 32.8998C15.8491 32.979 12.6458 32.4848 9.51005 31.4267C7.05668 30.5786 4.59999 29.0225 2.71087 26.3797C2.15846 25.6343 1.68396 24.7593 1.30443 23.7863C0.821747 19.8416 2.92558 15.8243 4.7215 13.3994C5.55793 12.2761 6.44392 11.2457 7.37293 10.3157C8.07032 9.77627 8.76938 9.27832 9.4468 8.81927C15.502 4.6697 22.2779 1.71832 28.8956 1.19962C31.9232 0.963618 35.0407 1.22297 38.005 2.26295C40.9327 3.28738 43.8738 5.27398 45.713 9.13049C50.1071 18.3529 41.6901 25.236 37.1595 27.8062H37.1662Z" fill="white"/>
                        </g>
                    </svg>
                    <span>{{locale}}</span>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
import { Trans } from '@/plugins/Translation'
export default {
    name: 'LocaleSwitcher',
    data(){
        return{
            open: false,
            locales: []
        }
    },
    computed: {
        supportedLocales () {
            return Trans.supportedLocales;
        },
    },
    watch:{
        '$i18n.locale': {
            immediate: true,
            handler: function(){
                let tmp = this.supportedLocales;
                const fromIndex = tmp.indexOf(this.$i18n.locale);
                const element = tmp.splice(fromIndex, 1);
                tmp.splice(0, 0, element[0]);
                this.locales = tmp;
            }
        }
    },
    methods: {
        switchLocale(locale) {
          if (this.$i18n.locale !== locale) {
            const to = this.$router.resolve({ params: {locale} })
            return Trans.changeLocale(locale).then(() => {
              this.$router.push(to.location)
            })
          }
        },
        close(){
            this.open = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .lang-wrap{
        width: 47px;
        height: 37px;
        cursor: pointer;
    }
    .lang{
        flex-direction: column;
        height: 38px;
    }
    .lang-wrap.open .lang{
        height: unset;
    }
    .lang-item {
        display: block;
        cursor: pointer;
        width: 47px;
        height: 37px;
        mix-blend-mode: difference;
        color: white;

        opacity: 0;
        pointer-events: none;
        transform: translateY(3px);
        transition: opacity 0.1s , all 0.5s;
    }
    .lang-item.active{
        opacity: 1;
        pointer-events: all;
        transform: translateY(0px);
    }
    .lang-wrap.open .lang-item{
        opacity: 1;
        pointer-events: all;
        transform: translateY(0px);
    }
    .lang-item svg{
        opacity: 0;
        transition: .3s;
    }
    .lang-item.active svg{
        opacity: 1;
    }
    .lang-item:hover svg{
        opacity: 1;
    }
    .lang-wrap.open .lang-item.active svg{
        opacity: 0;
    }
    .lang-wrap.open .lang-item.active:hover svg{
        opacity: 1;
    }
    .lang-item span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        mix-blend-mode: difference;
        color: white;
        text-transform: uppercase;
    }
</style>