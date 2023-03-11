<template>
  <section id="technology-container" class="technology-section animate">
    <div class="technology-section__content container">
      <div class="line line-first">
        <h3 class="animate move-up">{{_.get(title, '0')}}</h3>
      </div>
      <div class="line line-second">
        <h3 class="animate move-up">{{_.get(title, '1')}}</h3>
        <div id="scroll-point-hand" class="hand"></div>
      </div>
      <div class="line line-third">
        <h3 class="animate move-up" v-html="_.get(title, '2')"></h3>
      </div>
    </div>
    <img
      :src="require('@/assets/img/astronaut.png')"
      alt=""
      class="astronaut-img"
    />
    <!-- <AstroTHREE /> -->
    <img
      :src="require('@/assets/img/technology-bg-element.png')"
      alt=""
      data-transform="0" data-intensity="3"
      class="bg-element parallaxe"
    />
  </section>
</template>

<script>
import AstroTHREE from '@/components/AstroTHREE';

export default {
  name: 'Thechnology_Space',
  components: {
    AstroTHREE
  },
  data() {
    return {
      title: null,
    }
  },
  computed: {
    contentData(){
      return this.$store.getters.mainPageData;
    }, 
  },
  watch: {
    'contentData.technology_title':{
      immediate: true,
      handler: function(){
        if(this.contentData){
          this.title = this.contentData.technology_title.split("\n");
        } else {
          this.title = '';
        }
      }
    }
  },
}; 
</script>

<style lang="scss" scoped>
.technology-section {
  position: relative;
  background: $primary-color;
  padding-top: 250px;
  padding-bottom: 300px;
  @media (max-width: 1365px) {
    padding-bottom: 266px;
  }
  @media (max-width: 1023px) {
    padding-top: 200px;
    padding-bottom: 216px;
  }
  @media (max-width: 767px) {
    padding-top: 162px;
    padding-bottom: 166px;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 9;
    * {
      @extend %largest;
       font-family: "Skeena-Display";
      color: #fff;
      text-transform: uppercase;
      @media (max-width: 1679px) {
      }
    }
    .line-first {
      margin-left: auto;
      @media (max-width: 1023px) {
        margin-left: unset;
      }
    }
    @media (max-width: 1023px) {
      text-align: center;
    }
    .line-second {
      position: relative;
      margin: 10px 0;
      margin-right: auto;
      display: flex;
      align-items: center;
      @media (max-width: 1023px) {
        margin-right: unset;
      }
    }
    .line-third {
      text-align: center;
       /deep/  span {
        color: $secondary-color;
        @extend %largest;
        font-family: "Skeena-Display";
        text-transform: uppercase;
      }
    }
  }
  .astronaut-img {
    position: absolute;
    top: 69px;
    left: 126px;
    @media (max-width: 1679px) {
      max-width: 376px;
      top: 75px;
      left: 111px;
    }
    @media (max-width: 1599px) {
      left: 65px;
    }
    @media (max-width: 1439px) {
      left: 23px;
    }
    @media (max-width: 1365px) {
      max-width: 297px;
      top: 114px;
      left: 43px;
    }
    @media (max-width: 1023px) {
      max-width: 240px;
      top: 36px;
      left: 48px;
    }
    @media (max-width: 767px) {
      top: 0;
      left: -35px;
    }
  }
  .bg-element {
    position: absolute;
    right: 0;
    bottom: -40px;
  }

  .hand{
    flex: none;
    display: inline-block;
    position: relative;
    width: 170px;
    height: 1px;
    margin-left: 45px;
    margin-top: 46px;
    @media(max-width: 1023px){
      &{
        display: none;
      }
    }
  }

  @media(max-width: 1023px){
    .line{
      text-align: center;
      justify-content: center;
    }
  }
}
</style>
