<template>
    <div id="services_section" class="intro animate services-section" v-if="contentData">
        <template v-for="(text, index) in contentData">
            <div class="services-content animate fade-up deley-2">
                <h1 class="services-title" v-if="text.service_title">{{ text.service_title }}</h1>
                <div class="services-container">
                    <p class="services-text animate fade-up deley-2">{{ text.service_text }}</p>
                </div>
                <div class="services-container">
                    <p class="services-text second-text animate fade-up deley-2">{{ text.service_second_text }}</p>
                </div>
            </div>
            <div class="bg-wrapper">
                <img v-if="text.service_title" :src="require('@/assets/img/services/HeaderBlock.svg')" />
            </div>
            <div class="line" v-if="text.service_title">
                <img :src="require('@/assets/img/services/Group772.svg')" class="line-wrapper animate fade-up delay-2" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "ServicesSection",
    data() {
        return {
            text: '',
            type: 'services_section',
        }
    },
    computed: {
        contentData() {
            return this.$store.getters.getServices;
        }
    },
    watch: {
        'contentData.service_text': {
            immediate: true,
            handler: function () {
                if (this.contentData) {
                    this.text = this.contentData?.service_text?.split("\n");
                } else {
                    this.text = '';
                }
            }
        },
        'contentData.service_title': {
            immediate: true,
            handler: function () {
                if (this.contentData) {
                    this.text = this.contentData?.service_title?.split("\n");
                } else {
                    this.text = '';
                }
            }
        },
        'contentData.service_second_title': {
            immediate: true,
            handler: function () {
                if (this.contentData) {
                    this.text = this.contentData?.service_second_title?.split("\n");
                } else {
                    this.text = '';
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.services-section {
    position: relative;

    .services-content {
        width: 100%;
        height: auto;
        position: relative;
    }

    .services-container {
        width: auto;
        margin: 0 184px;
        margin-bottom: 24px;
    }

    .services-text {
        font-family: 'Skeena';
        font-style: normal;
        font-weight: 400;
        font-size: 30.5px;
        line-height: 38px;
        text-align: center;
    }

    .line {
        width: 100%;
        margin: 32px 0px 0px 0px;

        .line-wrapper {
            margin: 0 auto;
            display: flex;
        }

    }

    .services-title {
        font-family: 'Skeena';
        font-style: normal;
        font-weight: 400;
        font-size: 48.5px;
        line-height: 38px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        letter-spacing: 0.08em;
    }

    .bg-wrapper {
        position: absolute;
        top: 110px;
        left: -25px;
        width: 100%;
        z-index: 999;
    }

    .second-text {
        margin-top: 24px;
    }
}

@media (max-width: 1200px) {
    .bg-wrapper {
        display: none;
    }
    .services-container {
        margin: 0 140px !important;
    }
}

@media (max-width: 767px) {
    .services-container {
        margin: 0 100px !important;
    }
}

@media (max-width: 425px) {
    .services-container {
        margin: 0 50px !important;

        .services-text {
            font-size: 24px;
        }
    }
    .main-title {
        font-size: 65px;
    }
}
</style>