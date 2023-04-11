<template>
    <div class="services-ending" v-if="contentData">
        <div class="ending-content">
            <p class="ending-text animate fade-up delay-2" v-for="text in contentData">
                {{ text.services_text_ending }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ServicesEndingSection",
        computed: {
            contentData() {
                console.log(this.$store.getters.getServices, 'nas like')
                return this.$store.getters.getServices;
            }
        },
        watch: {
            'contentData.services_text_ending': {
                immediate: true,
                handler: function () {
                    if (this.contentData) {
                        this.text = this.contentData?.services_text?.split("\n");
                    } else {
                        this.text = '';
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.ending-content {
    width: auto;
    height: auto;
    margin: 0 184px;
}
.ending-text {
    font-family: 'Skeena';
    font-style: normal;
    font-weight: 400;
    font-size: 30.5px;
    line-height: 38px;
    text-align: center;
}
</style>