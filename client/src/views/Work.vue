<template>
  <div class="work-container">
    <div class="container">
      <div class="top">
        <h1>Work</h1>
        <div class="top-item">
          <BecomeMember />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="items-wrap">
        <div class="bottom-item">
          <div class="container">
            <router-link to="/">
              <div class="item">
                <div class="item-title">
                  <h2 class="title">Dirty Catan</h2>
                  <span class="item-index">01</span>
                </div>
                <div class="item-image">
                  <img
                    alt="project image"
                    src="https://image-processor-storage.s3.us-west-2.amazonaws.com/images/3cf61c1011912a2173ea4dfa260f1108/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg"
                  />
                </div>
                <div class="tags">
                  <p>Technologies:</p>
                  <div class="tags-inner">
                    <span class="tag"> React </span>
                    <span class="tag"> Javascript </span>
                    <span class="tag"> Vue </span>
                    <span class="tag"> Git </span>
                    <span class="tag"> Html </span>
                    <span class="tag"> Css </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BecomeMember from "../components/parts/BecomeMember.vue";

export default {
  name: "Work",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: { BecomeMember },
};
</script>
<style lang="scss" scoped>
.work-container {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* top */
.top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
}
.top-item {
  margin: 100px 100px 0px 0px;
}
.top h1 {
  /* font-size: 250px; */
  @extend %largest;

  letter-spacing: 30px;
  opacity: 0.2;
  text-transform: uppercase;
}
/* end of top */

/* bottom */
.bottom {
  margin: 150px 0px 150px 0px;
}
.items-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* item hover */
.bottom-item:hover {
  background-color: #1a1e25;
}
.bottom-item:hover .title {
  color: #c62828;
}
.bottom-item:hover .item-index {
  color: #c62828;
}
/* item hover end */
.bottom-item {
  width: 100%;
  cursor: pointer;
}
.item {
  position: relative;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  padding: 30px 0px 30px 0px;
  z-index: 1;
}
.item:last-child {
  border-bottom: 1px solid #9f9f9f;
}
.item:hover {
  background-color: #1a1e25;
}
.item:hover .tags {
  opacity: 1;
}
.item-index {
  position: absolute;
  font-size: 200px;
  color: #1a1e25;
  opacity: 0.1;
  /* top: ; */
}
.item-title {
  position: relative;
  width: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.title {
  @extend %medium;
  padding-left: 60px;
  letter-spacing: 0.08rem;
  // font-size: 50px;
  text-transform: uppercase;
}
.item-image {
  position: relative;
  width: 25%;
  height: 100%;
  padding-top: 20%;
}
.item-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tags {
  position: absolute;
  bottom: 30px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tags p {
  color: #fff;
  opacity: 0.6;
}
.tags-inner {
  display: flex;
  align-items: center;
  gap: 3px;
}
.tag {
  border: 1px solid #30343a;
  border-radius: 17px;
  width: fit-content;
  height: auto;
  font-size: 13px;
  color: #fff;
  padding: 4px 6px 4px 6px;
}
.tag:hover {
  opacity: 0.7;
}
/* end of bottom */
/* 
@media(max-width: 1900px){
} */
@media (max-width: 1300px) {
}
@media (max-width: 1023px) {
}
@media (max-width: 767px) {
}
</style>
