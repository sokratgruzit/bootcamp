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
    <div class="contact">
      <ContactBox />
    </div>
  </div>
</template>

<script>
import ContactBox from "../components/ContactBox.vue";
import BecomeMember from "../components/parts/BecomeMember.vue";
import items from "@/work.json"

export default {
  name: "Work",
  data() {
    return {
      items: []
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

/* end of bottom */
/*
@media(max-width: 1900px){
} */
@media (max-width: 1900px) {

}
@media (max-width: 1023px) {

}
@media (max-width: 767px) {


}
</style>
