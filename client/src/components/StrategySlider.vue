
<template>
  <section id="focus" class="linked">
    <div class="strategy-slider"  v-if="title && mainSlide && slides">
      <div class="start"></div>
      <div ref="swiper" class="swiper" :class="{'slider-visible': allowScroll}">
        <div
          class="parallax-bg"
          data-swiper-parallax="20%">
        </div>
        <div class="swiper-wrapper">
          <div class="swiper-slide main">
              <div class="sm-container">
                <div class="inner">
                  <div class="ttl-wrap">
                    <div class="move-up-wrap">
                      <h2 class="ttl f-display animate move-up">{{title[0]}}</h2>
                    </div>
                    <div class="move-up-wrap">
                      <h2 class="ttl f-display animate move-up deley-1">{{title[1]}}</h2>
                    </div>
                  </div>
                  <h2 class="subtitle animate fade-up deley-2">{{mainSlide.strategy_subtitle}}</h2>
                </div>
              </div>
              <div class="bg-shape animate fade-in">
                <img :src="require('@/assets/img/strategy-big-shape.png')" alt="">
              </div>
          </div>
          <div class="swiper-slide" v-for="(slide, index) in slides">
             <div class="ttl">
              <div class="num animate move-up">{{(index + 1) < 10 ? '0' : ''}}{{index + 1}}</div>
              <h2 class="animate fade-up deley-1">{{slide.title}}</h2>
            </div>
              <p class="teaser animate fade-up delay-2" v-html="slide.teaser"></p>
            <div class="bg-shape animate fade-in" v-if="index === 0">
              <img :src="require('@/assets/img/spot.png')" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="end"></div>
    </div>
  </section>
</template>

<script>
import Swiper , { Mousewheel, Parallax }from 'swiper'
import 'swiper/swiper-bundle.css'

export default {
  components: {
  },
  data() {
    return {
      title: true, //null, 
      swiper: null,
    }
  },
  mounted() {
		
	},
  computed:{
    mainSlide(){
      return this.$store.getters.mainPageData;
    },
    slides(){
      return this.$store.getters.getStrategy;
    },
    combined(){
      return `${this.mainSlide}|${this.slides}`;
    },
    allowScroll(){
      return this.$store.state.allowScrollStrategy;
    }
  },
  watch: {
    combined: {
      immediate: true,
      handler: function() {
        if (this.mainSlide && this.slides) {
          this.title = this.mainSlide.strategy_title.split("\n");
          this.$nextTick(function () {
            this.swiperSetup();
          })
        }
      }
    },
    allowScroll:{
      immediate: true,
      handler: function(){
        if(!this.swiper) return false;
        if(this.allowScroll){
          this.swiper.mousewheel.enable();
        }else{
          this.swiper.mousewheel.disable();
        }
      }
    }
  },
  methods: {
    swiperSetup() {
      this.swiper = new Swiper(this.$refs.swiper, {
        // configure Swiper to use modules
        modules: [Mousewheel, Parallax],

        // Optional parameters
        slideVisibleClass: 'slide-visible',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
          sticky: false,
        },
        parallax: true,
        speed: 1000,
        mousewheel: {
          invert: false,
          releaseOnEdges: false,
          eventsTarget: '.strategy-slider'
        },
        on: {
          init(swiper){
            if(swiper.size < 1366){
              swiper.disable();
            }
            swiper.mousewheel.disable();
          },
          resize(swiper){
            if(swiper.size < 1366){
              swiper.disable();
            }else{
              swiper.enable();
            }
          }, 
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  @media(min-width: 1366px){
      .slider-visible .slide-visible.swiper-slide .animate.move-up{
        transform: translateY(0%);
      }
      .slider-visible .slide-visible.swiper-slide .animate.fade-up{
        opacity: 1;
        transform: translateY(0px);
      }
      .slider-visible .slide-visible.swiper-slide .animate.fade-in{
        opacity: 1;
      }
  }


  .strategy-slider {
    position: relative;
    padding: 320px 0 212px;
    width: 100%;
    overflow: hidden;
  }
  .parallax-bg{
    position: absolute;
    top: -320px;
    left: 0;
    width: 100%;
    height: calc(100% + 532px);
    background-image: url('~@/assets/img/strategyBg.png');
    background-position: center;
    background-size: cover;
    background-repeat-x: repeat;
  }
  .stop-scrollbar {
    position: relative;
  }
  .swiper {
    overflow: unset;
  }
  .swiper-wrapper{
    // align-items: center;
  }
  .swiper-slide {
    &:nth-child(n+2){
      width: auto;
      padding-right: 404px;
    }
    &:nth-child(2n){
      padding-top: 95px;
    }
    &:nth-child(1){
      padding-top: 0px;
      padding-right: 0;
      width: 100%;
    }

    &.main .inner{
      padding-left: 294px;
    }
    &.main .ttl{
      @extend %largest;
      text-transform: uppercase;
      letter-spacing: 8px;
    }
    &.main .ttl:last-child{
      padding-left: 100px;
    }
    &.main .subtitle{
      max-width: 600px;
      @extend %medium;
      margin-top: 20px;
      text-transform: uppercase;
      margin-left: auto;
    }
    &.main .bg-shape{
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }


    &:nth-child(2) .bg-shape{
      position: absolute;
      right: 0;
      z-index: -1;
    }
    .num{
      @extend %small;
      text-transform: uppercase;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #1a1e25;
      -webkit-text-fill-color: #ffffff;
    }
    &:not(.main) .ttl{
      display: flex;
      overflow: hidden;
    }
    &:not(.main) h2{
      @extend %small;
      text-transform: uppercase;
      margin-left: 16px;
    }
    .teaser{
      margin-top: 34px;
      margin-left: 54px;
      max-width: 500px;
      white-space: pre-wrap;
      @extend %smallest;
    }
  }

  .start,
  .end{
    width: 100%;
    height: 3px;
  }

  @media(max-width: 1900px){
    .strategy-slider{
      padding: 250px 0px; 
    }
    .parallax-bg{
      position: absolute;
      top: -250px;
      height: calc(100% + 500px);
    }
    .swiper-slide{
      &.main .inner{
        padding-left: 285px;
      }
    }
  }
  @media(max-width: 1599px){
    .swiper-slide.main .bg-shape{
      top: -155px;
    }
    .swiper-slide.main .bg-shape img{
      display: block;
      width: 335px;
      height: auto;
    }
    .swiper-slide{
      &.main .inner{
        padding-left: 194px;
      }
    }
  }
  @media(max-width: 1439px){
    .swiper-slide{
      &.main .inner{
        padding-left: 245px;
      }
    }
  }
  @media(max-width: 1365px){
    .strategy-slider{
      padding: 212px 0px 243px; 
    }
    .parallax-bg{
      position: absolute;
      top: 212px;
      height: calc(100% + 455px);
    }
    .swiper-wrapper{
      flex-direction: row;
      flex-wrap: wrap;
    }
    .swiper-slide.main .inner{
      padding-left: 212px;
    }
    .swiper-slide.main .subtitle{
      max-width: 500px;
    }
    .swiper-slide:nth-child(n+2){
      width: 100%;
      padding: 0 56px;
      margin-top: 68px; 
    }
    .swiper-slide:nth-child(4n+2),
    .swiper-slide:nth-child(4n+3) {
      width: 50%;
      margin-top: 129px;
    }
    .swiper-slide:nth-child(2) .bg-shape{
      display: none;
    }
    .swiper-slide:nth-child(4n+2){
      padding-right: 34px;
    }
    .swiper-slide:nth-child(4n+3){
      padding-top: 256px;
      padding-left: 34px;
    }
    .swiper-slide .teaser{
      max-width: 655px;
      margin-top: 50px;
    }
    .swiper-slide .teaser{
      margin-left: 40px;
    }
  }
  @media(max-width: 1023px){
    .strategy-slider{
      padding: 162px 0px 243px; 
    }
    .parallax-bg{
      position: absolute;
      top: 162px;
      height: calc(100% + 407px);
    }
    .swiper-slide:nth-child(n+2){
      margin-top: 50px;
    }
    .swiper-slide.main .inner{
      padding-left: 92px;
    }
    .swiper-slide.main .subtitle{
      max-width: 345px;
    }
    .swiper-slide.main .bg-shape{
      top: -45px;
      left: -60px;
    }
    .swiper-slide.main .bg-shape img{
      max-width: 230px;
    }
  }
  @media(max-width: 767px){
    .strategy-slider{
      padding: 140px 0; 
    }
    .parallax-bg{
      position: absolute;
      top: -140px;
      height: calc(100% + 280px);
    }
    .swiper-slide.main .bg-shape{
      display: none;
    }
    .swiper-slide.main .inner{
      padding-left: 0;
    }
    .swiper-slide.main .ttl:last-child{
      padding-left: 0;
    }
    .swiper-slide.main .subtitle{
      max-width: 100%;
      margin-top: 21px;
    }
    .swiper-slide:nth-child(n+2){
      width: 100%;
      padding: 0 16px;
      margin-top: 100px; 
    }
    .swiper-slide:nth-child(4n+2),
    .swiper-slide:nth-child(4n+3) {
      width: 100%;
      margin-top: 100px;
    }
    .swiper-slide .teaser{
      max-width: 100%;
      margin-left: 40px;
      margin-top: 34px;
    }
  }
</style>