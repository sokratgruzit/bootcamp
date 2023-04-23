<template>
    <section id="services" class="intro animate">
        <ServicesSection />
        <ServicesCard />
        <ServicesEndingSection />
        <MainServices />
        <div class="contact">
            <ContactBox />
        </div>
    </section>
</template>

<script>
import ContactBox from "../components/ContactBox.vue";
import ServicesCard from "../components/ServicesCard.vue";
import ServicesSection from "../components/ServicesSection.vue";
import ServicesEndingSection from "../components/ServicesEndingSection.vue";
import MainServices from "../components/MainServices.vue";
export default {
    components: { ContactBox, ServicesCard, ServicesSection, ServicesEndingSection, MainServices }
};
</script>

<style>
.contact {
    margin-top: 350px;
}
</style>