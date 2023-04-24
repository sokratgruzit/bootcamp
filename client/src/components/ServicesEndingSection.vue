<template>
    <div class="services-ending" v-if="contentData">
        <div class="ending-content">
            <p class="ending-text animate fade-up delay-2" v-for="text in contentData" v-if="text.service_text_ending">
                {{ text.service_text_ending }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServicesEndingSection",
    computed: {
        contentData() {
            return this.$store.getters.getServices;
        }
    },
    watch: {
        'contentData.service_text_ending': {
            immediate: true,
            handler: function () {
                if (this.contentData) {
                    this.text = this.contentData?.service_text_ending?.split("\n");
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
    text-align: left;
}

@media (max-width: 1300px) {
    .ending-text {
        font-size: 22px;
    }
}

@media (max-width: 1200px) {
    .ending-content {
        margin: 0 70px;
    }
    .ending-text {
        line-height: 33px;
    }
}

@media (max-width: 767px) {
    .ending-content {
        margin: 0 20px;
    }
}

@media (max-width: 425px) {
    .ending-text {
        font-size: 24px;
    }
}
</style>