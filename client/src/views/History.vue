<template>
  <div class="page-container">
    <!-- <portal to="nav">
      <RightMenu />
    </portal> -->

    <Gallery />
  </div>
</template>

<script>
// import RightMenu from "../components/RightMenu.vue";
import Gallery from "../components/Gallery.vue";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Hypercubic',
    // all titles will be injected into this template
    titleTemplate: '%s | History',
  },
  components: {
    // RightMenu,
    Gallery,
  },
};
</script>

<style lang="scss">
.page-container {
  position: relative;
  z-index: 99;
  padding-bottom: 80px;
  @media (max-width: 1023px) {
    padding-bottom: 250px;
  }
  &::after {
    content: "";
    position: fixed;
    width: 400px;
    height: 100%;
    left: 0px;
    top: 0px;
    background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
    z-index: 9;
    pointer-events: none;
    @media (max-width: 1599px) {
      width: 300px;
    }
    @media (max-width: 1023px) {
      width: 200px;
    }
    @media (max-width: 767px) {
      width: 100px;
    }
  }
  &::before {
    content: "";
    position: fixed;
    width: 400px;
    height: 100%;
    right: 0px;
    top: 0px;
    background: linear-gradient(
      -90deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 9;
    pointer-events: none;
    @media (max-width: 1599px) {
      width: 300px;
    }
    @media (max-width: 1023px) {
      width: 200px;
    }
    @media (max-width: 767px) {
      width: 100px;
    }
  }
}
</style>
