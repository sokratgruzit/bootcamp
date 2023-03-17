<template>
  <div class="team-container">
    <div class="container">
      <div class="top">
        <h1>Team</h1>
        <div class="top-item">
          <BecomeMember />
        </div>
      </div>
    </div>
    <div class="cover">
      <img
        src="https://www.shutterstock.com/image-illustration/triangle-solid-black-golden-illustration-260nw-1862937556.jpg"
        alt="cover photo"
      />
    </div>
    <div class="container">
      <div class="bottom">
        <div class="switcher-outer">
          <p>All</p>
          <p>Chief</p>
          <p>Developers</p>
          <p>Desingers</p>
        </div>
        <div class="team-members">###</div>
      </div>
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
.top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
}
.top h1 {
  /* font-size: 250px; */
  @extend %largest;
  letter-spacing: 30px;
  opacity: 0.2;
  text-transform: uppercase;
}
.cover {
  position: relative;
  width: 100%;
  height: 880px;
  margin-top: 120px;
}
.cover img {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.bottom {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.switcher-outer {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
}
.switcher-outer p {
  color: #1a1e25;
  opacity: 0.6;
  text-transform: uppercase;
  cursor: pointer;
  @extend %smallest;
  transition: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  transition-delay: 0.3s;
}
.switcher-outer p:hover {
  opacity: 1;
  transition: cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

@media (max-width: 1900px) {
  .team-container {
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
