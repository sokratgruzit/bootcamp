<template>
  <section class="rolling-line__section" v-if="slogans">
    <marquee-text :repeat="10" :duration="30" class="line-first">
      <div class="word" v-for="(word, i) in _.get(slogans, '0')" :key="i">{{ word }}</div>
    </marquee-text>
    <marquee-text
      :repeat="10"
      :duration="40"
      :reverse="true"
      class="line-second"
    >
      <div class="word" v-for="(word, i) in _.get(slogans, '1')" :key="i">{{ word }}</div>
    </marquee-text>
    <marquee-text :repeat="10" :duration="50" class="line-third">
      <div class="word" v-for="(word, i) in _.get(slogans, '2')" :key="i">{{ word }}</div>
    </marquee-text>
  </section>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
export default {
  components: {
    MarqueeText,
  },
  data() {
    return {
      slogans: null,
    };
  },
  computed: {
    contentData(){
      return this.$store.getters.mainPageData;
    }, 
  },
  watch: {
    'contentData.slogans_title':{
      immediate: true,
      handler: function(){
        if(this.contentData){
          let tmp = [];
          let arr = [];
          tmp = this.contentData.slogans_title.split("\n");
          tmp.forEach(function(line){
            arr.push(line.split("/"));
          })
          this.slogans = arr;
        } else {
          this.slogans = null;
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.rolling-line__section {
  margin-top: -99px;
  @media (max-width: 1365px) {
    margin-top: -66px;
  }
  @media (max-width: 767px) {
    margin-top: -46px;
  }
  .word {
    @extend %large;
    margin: 0 50px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.4s;
  }
  .marquee-text-text {
    display: flex;
  }
  .line-first {
    .word {
      -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
      color: transparent;
      &:hover {
        -webkit-text-stroke: 2px $secondary-color;
      }
    }
  }
  .line-second {
    .word {
      opacity: 0.3;
      &:hover {
        color: $secondary-color;
        opacity: 1;
      }
    }
  }
  .line-third {
    .word {
      -webkit-text-stroke: 2px rgba(26, 30, 37, 0.3);
      color: transparent;
      &:hover {
        -webkit-text-stroke: 2px $secondary-color;
      }
    }
  }
}
</style>
