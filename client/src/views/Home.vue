<template>
  <div class="home">
    <img :src="require('@/assets/img/top-bg.png')" alt="" data-transform="0" data-intensity="5" class="top parallaxe"/>
    <IntroBox />
    <AboutBox />
    <TechnologySpace />
    <RollingLine />
    <StrategySlider />
    <Initiatives />
    <ContactBox />
    <img :src="require('@/assets/img/bottom-bg.png')" alt="" data-transform="0" data-intensity="5" class="bottom parallaxe"/>
  </div>
</template>
<script> 
import IntroBox from "@/components/IntroBox";
import ContactBox from "@/components/ContactBox";
import AboutBox from "@/components/AboutBox";
import TechnologySpace from "@/components/TechnologySpace";
import StrategySlider from "@/components/StrategySlider";
import Initiatives from "@/components/Initiatives";
import RollingLine from "@/components/RollingLine";

export default {
  name: "Home_Page",
  components: {
    IntroBox,
    ContactBox,
    AboutBox,
    TechnologySpace,
    StrategySlider,
    Initiatives,
    RollingLine,
  },
};
</script>
<style lang="scss" scoped>
  .home{
    position: relative;
  }
  .home > .top{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: -2;
  }
  .home > .bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: -2;
  }
</style>
