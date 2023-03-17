<template>
  <div class="work-container">
    <ContactBox/>
    <div class="container">
      <div class="top">
        <h1>Work</h1>
        <div class="top-item">
          <BecomeMember />
        </div>
      </div>
    </div>
    <div class="items-wrap">
      <router-link
        :to="`/work/${item.id}`"
        class="main-item"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="container">
          <div class="item">
            <div class="item-title">
              <h2 class="title">{{ item.name }}</h2>
              <span class="item-index">{{ index + 1 }}</span>
            </div>
            <div class="item-image">
              <img
                alt="project image"
                :src="require(`@/assets/img/work/${item.images.main}`)"
              />
            </div>
            <div class="tags">
              <p>Technologies:</p>
              <div class="tags-inner">
                <span
                  class="tag"
                  v-for="(list, index) in _.get(item, 'tech')"
                  :key="index"
                >
                  {{ list }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="contact">
      <ContactBox />
    </div>
  </div>
</template>

<script>
import ContactBox from "../components/ContactBox.vue";
import BecomeMember from "../components/parts/BecomeMember.vue";
import items from "@/work.json";

export default {
  name: "Work",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = items;
  },
  methods: {},
  components: { BecomeMember, ContactBox },
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
.main-item {
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
}
.items-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 120px;
}

/* item hover */
.main-item:hover {
  background-color: #1a1e25;
}
.main-item:hover .title {
  color: #c62828;
}
.main-item:hover .item-index {
  color: #c62828;
}
/* item hover end */
.main-item {
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

.item-index {
  position: absolute;
  font-size: 200px;
  color: #1a1e25;
  opacity: 0.1;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  /* top: ; */
}
.item-title {
  position: relative;
  width: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
}
.title {
  @extend %medium;
  padding-left: 60px;
  letter-spacing: 0.08rem;
  // font-size: 50px;
  text-transform: uppercase;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
}
.item-image {
  position: relative;
  width: 25%;
  height: 100%;
  padding-top: 20%;
  overflow: hidden;
  background: #23262e;
}
.item-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  transform: scale(1.05);
}
.tags {
  position: absolute;
  bottom: 30px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  transform: translateY(5px);
}
.tags p {
  color: #fff;
  opacity: 0;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  transform: translateY(5px);
}
.item:hover .item-image img {
  transform: scale(1);
}
.item:hover .tags p {
  transform: translateY(0px);
  opacity: 0.6;
}
.item:hover .tags {
  opacity: 1;
  transform: translateY(0px);
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

@media (max-width: 1900px) {
  .work-container {
    margin-top: 50px;
  }
}
@media (max-width: 1023px) {
  .top {
    width: 100%;
  }
  .top-item {
    margin: -40px 100px 0px 0px;
  }
}
@media (max-width: 767px) {
  .top {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .top-item {
    margin: 100px 0px 0px 0px;
  }

  .item {
    flex-direction: column-reverse;
    width: 100%;
    padding: 20px 0px 20px 0px;
  }
  .item-title {
    margin-top: 30px;
    width: 100%;
    height: 275px;
  }
  .item-image {
    width: 100%;
    padding-top: 80%;
  }
}
</style>
