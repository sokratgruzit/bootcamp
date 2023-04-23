<template>
    <div id="services_card" class="into animate services-card" v-if="contentData">
        <div class="card-container">
            <div class="card-wrapper">
                <div class="card-body animate fade-up deley-2" v-for="text in contentData" :key="text.id"
                    v-if="text.card_text">
                    <div class="text-content">
                        <p class="content">{{ text.card_text }}</p>
                    </div>
                </div>
            </div>
            <div class="line ttl animate fade-up delay-3">
                <img :src="require('@/assets/img/services/Group772.svg')" class="line-wrapper" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServicesCard",
    data() {
        return {
            text: '',
            type: 'services_card',
            svgs: [
                [
                    { url: "Group717", classes: "arrow-container" },
                    { url: "Group707", classes: "reverse-arrow" },
                    { url: "SeparateLines", classes: "line" }
                ]
            ]
        }
    },
    computed: {
        contentData() {
            return this.$store.getters.getServices;
        }
    },
    watch: {
        'contentData.card_text': {
            immediate: true,
            handler: function () {
                if (this.contentData && this.contentData.card_text) { // check if card_text is not undefined
                    this.text = this.contentData.card_text.split("\n");
                } else {
                    this.text = '';
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.card-container {
    width: auto;
    height: auto;
    position: relative;
}

.card-body {
    width: 759px;
    border: 1px solid #efededa4;
    background-color: #efededa4;
    margin: 32px 32px 0px 0px;
}

.card-wrapper {
    width: auto;
    /* margin: 0 184px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .stain {
        position: absolute;
        top: 185px;
        left: 730px;
    }
}

.content {
    font-family: Skeena;
    font-size: 32px;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0em;
    text-align: center;
    margin: 32px;
    max-height: 100%;
}

.text-content {
    height: 100%;
}

.line {
    width: 100%;
    margin: 32px 0px 32px 0px;

    .line-wrapper {
        margin: 0 auto;
        display: flex;
    }

}

.arrow-container {
    position: absolute;
    left: -20px;
    top: 150px;
    z-index: 1;
}

@media (max-width: 767px) {
    .card-body {
        margin: 32px 32px 0 32px;

        .content {
            font-size: 28px;
        }
    }
}


@media (max-width: 425px) {
    .card-body {
        .content {
            font-size: 24px;
        }
    }
}
</style>