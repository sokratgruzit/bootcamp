<template>
  <section id="initiatives-container" class="initiatives-section">
    <div class="container">
      <div id="scroll-sphere" class="initiatives-img"></div>
      <div class="initiatives-slider">
        <div
          v-swiper:mySwiper="swiperOption"
          ref="initiativesSlider"
          class="swiper stop-scrollbar-on"
        >
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(slide, i) in slides"
              :key="i"
              style="opacity: 0"
            >
              <h3 class="swiper__ttl">
                {{ slide.title }}
              </h3>
              <p class="swiper__teaser">{{ slide.subtitle }}</p>
              <div class="swiper__text" v-html="slide.teaser"></div>
            </div>
          </div>
          <div class="slider-content">
            <div
              class="content-box flex-box column justify-center"
              v-for="(item, index) in slides"
              :key="index"
              :class="{
                active: currentIndx == index,
              }"
            >
              <h3 class="content-box__ttl">
                {{ item.title }}
              </h3>
              <p class="content-box__teaser">{{ item.subtitle }}</p>
              <div class="content-box__text" v-html="item.teaser"></div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>

        <div class="nav-btns">
          <div class="btn-prev" slot="button-prev">
            <svg
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.69486 7.08725L8.29969 0.482422L10.4751 2.65788L5.40882 7.7242H20.7939V10.8012H5.40882L10.4751 15.8675L8.29969 18.043L1.69486 11.4382C1.118 10.8611 0.793945 10.0786 0.793945 9.26271C0.793945 8.44679 1.118 7.66428 1.69486 7.08725V7.08725Z"
                fill="#212121"
              />
            </svg>
          </div>
          <div class="btn-next" slot="button-next">
            <svg
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.893 7.08725L13.2882 0.482422L11.1127 2.65788L16.1791 7.7242H0.793945V10.8012H16.1791L11.1127 15.8675L13.2882 18.043L19.893 11.4382C20.4699 10.8611 20.7939 10.0786 20.7939 9.26271C20.7939 8.44679 20.4699 7.66428 19.893 7.08725Z"
                fill="#212121"
              />
            </svg>
          </div>
        </div>
      </div>
      <img
        :src="require('@/assets/img/initiatives-bg-elem.png')"
        alt=""
        class="bg-elem"
      />
    </div>
    <img :src="require('@/assets/img/elem-1.png')" alt="" class="elem elem-1" />
    <img :src="require('@/assets/img/elem-2.png')" alt="" class="elem elem-2" />
    <img :src="require('@/assets/img/elem-3.png')" alt="" class="elem elem-3" />
    <img
      :src="require('@/assets/img/initiatives-bg.png')"
      alt=""
      data-transform="0" data-intensity="2"
      class="initiatives-bg parallaxe"
    />
  </section>
</template>

<script>
import { Mousewheel, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import store from "../store/index";

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive,
  },
  data() {
    const self = this;
    return {
      windowWidth: window.innerWidth,
      currentIndx: 0,
      swiperOption: {
        modules: [Mousewheel, Pagination, Navigation],
        slidesPerView: "auto",
        spaceBetween: 50,
        speed: 1000,
        direction: "vertical",
        updateOnWindowResize: true,

        navigation: {
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        },

        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },

        mousewheel: {
          invert: false,
          releaseOnEdges: true,
          eventsTarget: ".initiatives-section",
        },
        on: {
          slideChange: function (obj) {
            store.dispatch("sphereDeform", {
              sliderCount: obj.activeIndex,
            });
          },
          beforeTransitionStart() {
            self.currentIndx = self.mySwiper.activeIndex;
          },
          reachEnd: function () {
          },
        },
        breakpoints: {
          320: {
            direction: "horizontal",
            spaceBetween: 0,
          },
          1366: {
            direction: "vertical",
            spaceBetween: 50,
          },
        },
      },
    };
  }, 
  watch: {
    windowWidth: {
      immediate: true,
      handler(val) {
        if (val < 1366) {
          // console.log(val);
          this.swiperOption.mousewheel = false;
        } else {
          // console.log(val);
          this.swiperOption.mousewheel = {
            enabled: true,
            invert: false,
            releaseOnEdges: true,
            eventsTarget: ".initiatives-section",
          };
        }
      },
    },
  },
  computed: {
    slides(){
      return this.$store.getters.getAdvantage;
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1366) {
        this.swiperOption.mousewheel = false;
      } else {
        this.swiperOption.mousewheel = {
          enable: true,
          invert: false,
          releaseOnEdges: true,
          eventsTarget: ".initiatives-section",
        };
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style lang="scss" scoped>
.initiatives-section {
  position: relative;
  overflow: hidden;
  padding: 280px 0;
  .container {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media (max-width: 1679px) {
    padding: 210px 0;
  }
  @media (max-width: 1365px){
    .swiper-wrapper{
      overflow: hidden;
    }
  }
  @media (max-width: 1023px) {
    padding: 150px 0;
  }
  @media (max-width: 767px) {
    padding: 120px 0;
  }
  .elem{
    position: relative;
    z-index: 2;
    pointer-events: none;
  }
  .initiatives-img {

    flex-shrink: 0;
    max-width: 686px;
    width: 45%;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    height: 0;
    @media (max-width: 767px) {
      display: block;
      width: 280px;
      height: 1px;
      align-self: center;
      margin: 320px auto 0;
      flex-shrink: unset;
    }
  }
  .initiatives-slider {
    width: 55%;
    @media (max-width: 767px) {
      width: 100%;
    }
    .swiper {
      position: relative;
      // padding-right: 176px;
      height: 400px;
      overflow: visible;
      // @media (max-width: 1679px) {
      //   padding-right: 76px;
      // }
      // @media (max-width: 1599px) {
      //   padding-right: 30px;
      // }
      @media (max-width: 1365px) {
        height: max-content;
        min-height: 200px;
        // padding-right: 0px;
      }
      // .swiper-slide {
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: center;
      // }
      .swiper-pagination {
        right: 0;
        left: unset;
        width: 2px;
        // height: 400px;
        @media (max-width: 1365px) {
          display: none;
        }
        &.swiper-pagination-progressbar {
          background: #d7d7d7;
          /deep/ .swiper-pagination-progressbar-fill {
            background: $secondary-color !important;
          }
        }
      }

      @media (min-width: 1025px) {
        .btn-prev:hover svg path,
        .btn-next:hover svg path {
          fill: $secondary-color;
        }
      }

      // &__ttl {
      //   @extend %medium;
      //   text-transform: uppercase;
      // }
      // &__teaser {
      //   @extend %small;
      //   margin-top: 21px;
      // }
      // &__text {
      //   @extend %smallest;
      //   color: #5c5f64;
      // }

      .slider-content {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translateY(-50%);
        width: 100%;
        height: 100%;
        .content-box {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 176px;
          @media (max-width: 1679px) {
            padding-right: 76px;
          }
          @media (max-width: 1599px) {
            padding-right: 30px;
          }
          @media (max-width: 1365px) {
            height: auto;
            padding-right: 0px;
          }
          &__ttl {
            @extend %medium;
            text-transform: uppercase;
            opacity: 0;
            will-change: transform;
            backface-visibility: hidden;
          }
          &__teaser {
            @extend %small;
            margin-top: 21px;
            opacity: 0;
            will-change: transform;
            backface-visibility: hidden;
          }
          &__text {
            @extend %smallest;
            color: #5c5f64;
            opacity: 0;
            will-change: transform;
            backface-visibility: hidden;
          }
          &.active .content-box__ttl {
            opacity: 1;
            animation: activeAnim 0.6s;
            animation-timing-function: cubic-bezier(0.09, 0.41, 0.49, 0.86);
          }
          &.active .content-box__teaser {
            opacity: 1;
            animation: activeAnim 0.6s;
            animation-delay: 0.1s;
            animation-timing-function: cubic-bezier(0.09, 0.41, 0.49, 0.86);
          }
          &.active .content-box__text {
            opacity: 1;
            animation: activeAnim 0.6s;
            animation-delay: 0.1s;
            animation-timing-function: cubic-bezier(0.09, 0.41, 0.49, 0.86);
          }
        }
      }
    }
    .nav-btns {
      display: flex;
      align-items: center;
      margin-top: 50px;
      position: relative;
      z-index: 9;
      @media (min-width: 1366px) {
        display: none;
      }
      .btn-prev {
        margin-right: 30px;
      }
      .btn-prev,
      .btn-next {
        cursor: pointer;
      }
      .btn-prev svg,
      .btn-next svg {
        transition: 0.6s;
      }
      .btn-prev svg path,
      .btn-next svg path {
        transition: 0.6s;
      }
    }
  }
  .bg-elem {
    position: absolute;
    left: -25px;
    bottom: 0;
  }
  .elem-1 {
    position: absolute;
    bottom: 152px;
    left: 124px;
  }
  .elem-2 {
    position: absolute;
    top: 243px;
    left: 297px;
  }
  .elem-3 {
    position: absolute;
    top: 104px;
    right: 400px;
  }
  .initiatives-bg {
    position: absolute;
    top: -150px;
    left: 0;
    width: 100%;
    height: calc(100% + 300px);
    object-fit: cover;
  }
}

@keyframes activeAnim {
  0% {
    transform: translate3d(0, 30px, 0);
    opacity: 0;
  }
  50% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 1;
  }
}
</style>
