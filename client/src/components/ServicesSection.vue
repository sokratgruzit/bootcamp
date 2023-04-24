<template>
    <div id="services_section" class="intro animate services-section" v-if="contentData">
        <template v-for="(text, index) in contentData">
            <div class="services-content animate fade-up deley-2">
                <div class="services-title-container">
                    <h2 class="services-title" v-if="text.service_title">{{ text.service_title }}</h2>
                </div>
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

    .line {
        width: 100%;
        margin: 32px 0px 0px 0px;

        .line-wrapper {
            margin: 0 auto;
            display: flex;
        }
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

.services-title-container {
    margin-bottom: 20px;
    margin-left: 184px;
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
    text-align: left;
}

.services-title {
    font-family: 'Skeena';
    font-weight: 400;
    font-size: 100px;
    line-height: normal;
    text-align: left;
    letter-spacing: 8px;
    text-transform: uppercase;
}

@media (max-width: 1300px) {
    .services-text {
        font-size: 22px;
    }
    .services-title {
        font-size: 60px;
    }
}

@media (max-width: 1200px) {
    .services-container {
        margin: 0 70px;
    }

    .services-title-container {
        margin: 0 70px;
    }
    .services-text {
        line-height: 33px;
    }
}

@media (max-width: 767px) {
    .services-container {
        margin: 0 20px;
    }

    .services-title-container {
        margin: 0 20px 20px 20px;
    }

    .services-title {
        font-size: 40px;
    }

    .line img {
        width: 70%;
    }
}

@media (max-width: 425px) {
    .main-title {
        font-size: 65px;
    }
}</style>