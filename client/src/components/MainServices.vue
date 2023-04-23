<template>
    <div v-if="contentData" class="animate fade-up delay-2">
        <div class="main-section" v-for="(text, index) in contentData"  :key="index">
            <div class="main-content">
                <marquee-text :repeat="10" :duration="30" class="line-first">
                    <div class="main-header animate fade-up delay-2">
                        <h1 class="main-title" v-if="text.main_title">{{ text.main_title }}</h1>

                        <h1 class="main-title title-fill" v-if="text.main_title">{{ text.main_title }}</h1>
                    </div>
                </marquee-text>

                <div class="separate-lines animate fade-up delay-2">
                    <img :src="require('@/assets/img/services/SeparateLines.svg')" />
                </div>

                <!-- <div v-if="svgs[index]"> -->

                <!-- </div> -->
                <div v-if="svgs[index]" v-for="key in svgs[index]" >
                    <img v-if="key.url" :src="require(`@/assets/img/services/${key.url}`)" :class="key.classes" />
                </div>

                <div class="main-text-container">
                    <p class="main-text animate fade-up delay-2" v-if="text.main_text">
                        {{ text.main_text }}
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";

export default {
    data() {
        return {
            svgIncrement:0,
            svgs: [
                [
                    { url: "RedShape.svg", classes: "brush" },
                    { url: "Asset11.svg", classes: "graphics-globe" },

                ],
                [
                    { url: "Group732.svg", classes: "stain" },
                    { url: "Group708.svg", classes: "graphics-lines" },
                ],
                [
                    { url: "Group737.svg", classes: "left-blocks" },
                    { url: "Group753.svg", classes: "separate-left-line" },

                ],
                [
                    { url: "Group723.svg", classes: "stain-bg" },

                ],
                [
                    { url: "fu.svg", classes: "bg-brush" },

                ],
                [
                    { url: "Asset31.svg", classes: "line-globe" },
                    { url: "Group737.svg", classes: "right-blocks" },
                    { url: "Group753.svg", classes: "extreme-separate-line" },
                    { url: "Asset21.svg", classes: "steel-arrows" },
                ],
            ],
        }
    },
    components: {
        MarqueeText
    },
    name: "MainServices",
    computed: {
        contentData() {
            console.log(this.$store.getters.getServices, 'service kvl')

            if (this.$store.getters.getServices){
                return this.$store.getters.getServices
                    .filter(item => item.main_text && item.main_title)
            }
            return null;
        }
    },
    watch: {
        'contentData.main_title': {
            immediate: true,
            handler: function () {
                if (this.contentData) {
                    this.text = this.contentData?.main_title?.split("\n");
                } else {
                    this.text = '';
                }
            }
        },
        'contentData.main_text': {
            immediate: true,
            handler: function () {
                if (this.contentData) {
                    this.text = this.contentData?.main_text?.split("\n");
                } else {
                    this.text = '';
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.main-section {
    width: 100%;
    height: auto;
    margin-top: 191px;
    border: 1px solid black;
}

.main-content {
    width: 100%;
    margin-top: 100px;
    margin-bottom: 100px;
    position: relative;

    .stain {
        position: absolute;
        right: 210px;
        top: 480px;
    }

    .left-blocks {
        position: absolute;
        top: 20px;
        left: 35px;
    }

    .right-blocks {
        position: absolute;
        top: 40px;
        right: 60px;
    }

    .bottom-separate-lines {
        position: absolute;
        top: 420px;
        left: 0;
    }
}

.main-header {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: max-content;
    margin-left: 56px;
    z-index: 999;
    position: relative;

    .title-fill {
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #babbbd;
        -webkit-text-fill-color: transparent;
    }

    .main-title {
        font-family: Skeena;
        font-size: 110px;
        font-weight: 400;
        line-height: 121px;
        letter-spacing: 0.08em;
        text-align: left;
    }

    .globe {
        margin-left: 50px;
        margin-right: 50px;
    }
}

.separate-lines {
    display: flex;
    justify-content: center;
    margin-top: 48px;
    margin-bottom: 56px;
}

.main-text-container {
    width: auto;
    margin: 0 184px;
}

.main-text {
    font-family: Skeena;
    font-size: 39.5px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: center;
}

.brush {
    position: absolute;
    top: -80px;
}

.graphics-globe {
    position: absolute;
    z-index: 999;
    right: 23px;
    bottom: -195px;
}

.graphics-lines {
    position: absolute;
    z-index: 999;
    right: 0px;
    top: 500px;
}

.separate-left-line {
    position: absolute;
    z-index: 999;
    left: 0px;
    top: 417px;
}

.stain-bg {
    position: absolute;
    left: 925px;
    top: 490px;
}

.bg-brush {
    position: absolute;
    top: -235px;
    left: -18px;
}

.line-globe {
    position: absolute;
    top: -200px;
    left: 30px;
}

.extreme-separate-line {
    position: absolute;
    top: 470px;
    left: -20px;
}

.steel-arrows {
    position: absolute;
    bottom: -170px;
    right: 7px;
    width: 270px;
}
</style>