<template>
  <div id="app">
    <loader
      v-if="isLoading === 'loading'"
      key="loader"
      object="#C62828"
      color1="#ffffff"
      color2="#fff"
      size="5"
      speed="2"
      bg="#fff"
      objectbg="#fff"
      opacity="100"
      name="dots"
    ></loader>
    <div class="page-wrap">
      <Brush />
      <Header />
      <div id="custom-scrollbar">
        <transition name="fade" mode="out-in">
          <div class="page-wrapper" :key="$route.path">
            <THREE :scrollTop="_.get(scrollbar, 'offset.y') || 0"/>
            <div class="noisy"></div>
            <main>
              <router-view></router-view>
            </main>
          </div>
        </transition>
         <Footer />
      </div>
    </div>
    <portal-target name="destination"></portal-target>
    <portal-target name="nav"></portal-target>
  </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";

import { mapActions } from "vuex";
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
import Brush from "./components/Brush";
import THREE from "./components/THREE";

export default {
  name: "App",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Hypercubic',
    // all titles will be injected into this template
    titleTemplate: '%s | Inovation Center',
    meta: [
      {
        name: "description",
        content: 'description'
      },
    ]
  },
  components: {
    Header,
    Footer,
    Brush,
    THREE
  },
  data() {
    return {
      isLoading: "loading",
      scrollbar: null,
      direction: "down"
    }
  },
  async mounted() {
    this.handleFetchTweets();
  },
  computed: {
    scrollToPosition() {
      return this.$store.state.scrollTo;
    },
    scrollToTop() {
      return this.$store.state.scrollTop;
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function () {
        let _this = this;
        if(!this.scrollbar) return false;
        this.$nextTick(function(){
          setTimeout(function(){
            _this.scrollHandler();
          },600)
        })
      },
    },
    scrollToPosition: {
      immediate: true,
      handler: function () {
        if (this.scrollToPosition) {
          this.scrollTo(true);
        }
      },
    },
    scrollToTop: {
      immediate: true,
      handler: function () {
        if (this.scrollToTop) {
          this.scrollbar.scrollTo(0, 0, 1000);
          this.$store.commit("setScrollToTop", false);
        }
      },
    },
  },
  methods: {
    ...mapActions(["getHomPageApi", "getStrategyApi", "getAdvantageApi", "getHistoryApi"]),
    async handleFetchTweets() {
      try {
        await this.getHomPageApi();
        await this.getStrategyApi();
        await this.getAdvantageApi();
        await this.getHistoryApi();
      } catch (error) {
        console.log(error);
      } finally {
        let _this = this;
        this.$nextTick(function(){
          setTimeout(function(){
            _this.isLoading = "load";
            _this.initScrollbar();
          },600)
        })
      }
    },
    initScrollbar() {
      this.scrollbar = Scrollbar.init(
        document.querySelector("#custom-scrollbar"),
        {
          damping: 0.1,
          renderByPixels: true,
          continuousScrolling: true,
          alwaysShowTracks: true,
          plugins: {
            overscroll: {
              damping: 0.2,
              maxOverscroll: 20,
              syncCallbacks: true,
            },
          },
        }
      );
      this.scrollHandler();
    },
    scrollHandler(){

      const _this = this;
      //header
        let scrollOldValue = 0;
        const header = document.getElementById("header");

        //scroll to
        this.scrollTo(false);
        const linkedSections = document.querySelectorAll(".linked");

        //animation
        const animates = document.querySelectorAll(".animate");
        // _this.setAnimationClass(animates);
        setTimeout(function () {
          _this.setAnimationClass(animates);
        }, 200);
        


        //strategy slider
        const strategySlider = document.querySelector(".strategy-slider");
        const strategySliderStart = document.querySelector(".strategy-slider .start");
        const strategySliderEnd = document.querySelector(".strategy-slider .end");

        //parallaxe

        const parallaxe = document.querySelectorAll('.parallaxe');

        this.scrollbar.addListener((status) => { 
          const _this = this;

          //animate
          _this.setAnimationClass(animates);

          //parallaxe

          //strategy slider
          if (strategySlider) {
            if (
              _this.scrollbar.isVisible(strategySliderStart) &&
              _this.scrollbar.isVisible(strategySliderEnd)
            ) {
              _this.$store.commit("setStrategyScroll", true);
            } else {
              _this.$store.commit("setStrategyScroll", false);
            }
          }

          if(_this.$route.name === 'Home'){
            let introTop = document.getElementById("scroll-rock-hand").getBoundingClientRect().top;
            let socratesTop = document.getElementById("scroll-socrates").getBoundingClientRect().top;
            let technoTop = document.getElementById("scroll-point-hand").getBoundingClientRect().top;
            let sphereTop = document.getElementById("scroll-sphere").getBoundingClientRect().top;
            let helloTop = document.getElementById("scroll-hello").getBoundingClientRect().top;

            let visibleObjects = {
              intro_hand: true,
              socrates: false,
              techno_hand: false,
              cosmo: false,
              sphere: false,
              hello_hand: false
            };

            if (helloTop > 0) {
              visibleObjects.hello_hand = true;
              visibleObjects.socrates = false;
              visibleObjects.intro_hand = false;
              visibleObjects.techno_hand = false;
              visibleObjects.sphere = false;
            } else {
              visibleObjects.hello_hand = false;
            }

            if (sphereTop > 0) {
              //visibleObjects.sphere = true;
              visibleObjects.socrates = false;
              visibleObjects.hello_hand = false;
              visibleObjects.intro_hand = false;
              visibleObjects.techno_hand = false;
            } else {
              visibleObjects.sphere = false;
            }

            if (technoTop > 0) {
              visibleObjects.techno_hand = true;
              visibleObjects.socrates = false;
              visibleObjects.sphere = false;
              visibleObjects.hello_hand = false;
              visibleObjects.intro_hand = false;
            } else {
              visibleObjects.techno_hand = false;
            }

            if (socratesTop > 0) {
              visibleObjects.socrates = true;
              visibleObjects.techno_hand = false;
              visibleObjects.sphere = false;
              visibleObjects.hello_hand = false;
              visibleObjects.intro_hand = false;
            } else {
              visibleObjects.socrates = false;
            }

            if (introTop > 0) {
              visibleObjects.intro_hand = true;
              visibleObjects.socrates = false;
              visibleObjects.techno_hand = false;
              visibleObjects.sphere = false;
              visibleObjects.hello_hand = false;
            } else if (introTop < 0) {
              visibleObjects.intro_hand = false;
            }

            this.$store.dispatch('checkScrolled', {
              visibleObjects,
              direction: this.direction,
              scrolled: status.offset.y
            });
          }
          //header code
          if (status.offset.y > scrollOldValue) {
            //down
            this.direction = "down";

            if(status.offset.y > 250){
              !header.classList.contains('scrolled') ? header.classList.add('scrolled') : '';
            }
            header.classList.contains("show")
              ? header.classList.remove("show")
              : "";
          } else {
            //up
            this.direction = "up";

            if (status.offset.y < 250) {
              header.classList.contains("scrolled")
                ? header.classList.remove("scrolled")
                : "";
              header.classList.contains("show")
                ? header.classList.remove("show")
                : "";
            } else {
              header.classList.add("show");
            }
          } 

          
          
          //parallaxe
          _this.setParallaxe(parallaxe, status.offset.y, scrollOldValue);

          scrollOldValue = status.offset.y <= 0 ? 0 : status.offset.y;

          // scroll to

          if (linkedSections) {
            function isTrue(section) {
              return _this.scrollbar.isVisible(section);
            }
            let checker = Array.from(linkedSections).some(isTrue);
            if (checker) {
              linkedSections.forEach(function (section) {
                if (_this.scrollbar.isVisible(section)) {
                  const routeName =
                    section.getAttribute("id").charAt(0).toUpperCase() +
                      section.getAttribute("id").slice(1) || null;
                  if (routeName) {
                    if (_this.$route.query.section != routeName) {
                      _this.$router.push({ query: { section: routeName } });
                    }
                  }
                }
              });
            } else {
              const query = Object.assign({}, _this.$route.query);
              if (!query.section) return false;
              delete query.section;
              _this.$router.replace({ query });
            }
          }
        });
    },
    setAnimationClass(animates) {
      if (!animates) return false;
      const _this = this;
      animates.forEach(function (el) {
        if (_this.scrollbar.isVisible(el)) {
          el.classList.add("anim-active");
        } else if(!_this.scrollbar.isVisible(el)){
          el.classList.remove("anim-active");
        }
      });
    },
    setParallaxe(items, offset, oldOffset){
      const _this = this;
      if(items && items.length > 0){
        items.forEach(function(item){
          if(!_this.scrollbar.isVisible(item)) return false;
          let value = parseInt(item.getAttribute('data-transform'));
          if(offset > oldOffset){

            value = value + 1;
            if(value < 80){
              item.setAttribute('data-transform', value);
              item.style.transform = 'translate(0,' + value + 'px)';
            }
          }else{
            value = value - 1;
            if(value > 0){
              item.setAttribute('data-transform', value);
              item.style.transform = 'translate(0,' + value + 'px)';
            }
          }
         
        })
      }
    },
    scrollTo(clicked) {
      const _this = this;
      const doScroll = function (section) {
        if (!section) return false;
        const id = section.toLowerCase();
        const el = document.getElementById(id);
        el ? _this.scrollbar.scrollIntoView(el) : "";
      };

      clicked
        ? doScroll(this.scrollToPosition)
        : this.$route.query.section
        ? doScroll(this.$route.query.section)
        : "";
    },
  },
};
</script>

<style lang="scss">

#app,
.page-wrap{
  height: 100%;
  width: 100%;
  overflow: hidden; 
}
#custom-scrollbar {
  display: block;
  width: 100%;
  height: 100%;
}
.scroll-content {
  min-height: 100vh;
}
.page-wrapper{
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
}
.noisy {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-image: url("~@/assets/img/noise.gif");
  background-size: 100px 100px;
  opacity: 0.1;
}
main {
  padding-top: 140px;
  overflow: hidden;
}
</style>