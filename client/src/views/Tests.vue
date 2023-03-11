<template>
	<div class="tests">
		<div class="container">
			<h1 class="ttl">
				<span>HYPERCUBIC</span>
				<span>quizzes</span>
			</h1>
		</div>
		<transition name="fade" mode="out-in">
			<div class="tests__step" v-if="step == 1" key="step-1">
				<div class="container">
					<div class="tests__name">
						<p>Enter your fullname</p>
						<input type="text" v-model="fullName" />
						<div class="tests__next" @click="nextStep(2)">
							start quizz
							<svg
								width="31"
								height="29"
								viewBox="0 0 31 29"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M28.8806 10.5933L19.205 0.917725L14.4247 5.70031L19.9218 11.1973H0.104004V17.9588H19.9218L14.4247 23.4558L19.205 28.2384L28.8806 18.5628C29.404 18.0396 29.8192 17.4184 30.1024 16.7346C30.3857 16.0509 30.5315 15.3181 30.5315 14.5781C30.5315 13.838 30.3857 13.1052 30.1024 12.4215C29.8192 11.7378 29.404 11.1166 28.8806 10.5933Z"
									fill="#C62828"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div class="tests__step" v-if="step == 2" key="step-2">
				<div class="container">
					<div class="tests__inner" v-if="tests">
						<div
							class="tests__item"
							v-for="(test, index) in tests"
							:key="test._id"
						>
							<div class="tests__ttl">
								<span>{{ index + 1 }}</span>
								{{ test.question }}
							</div>
							<div class="tests__variants">
								<div
									class="tests__variant"
									v-for="answer in test.answers"
									:key="answer.definition"
									@click="
										handleClick(answer.value, {
											index,
											answer: answer.definition,
											question: test.question,
										})
									"
									:class="{activeItem: active[index] === answer.definition.replace(/\s/g, '') }"
								>
									<i class="tests__radio-icon"></i>
									{{ answer.definition }}
                 
								</div>
							</div>
						</div>

						<div class="tests__next" @click="nextStep(3)">
							end quizz
							<svg
								width="31"
								height="29"
								viewBox="0 0 31 29"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M28.8806 10.5933L19.205 0.917725L14.4247 5.70031L19.9218 11.1973H0.104004V17.9588H19.9218L14.4247 23.4558L19.205 28.2384L28.8806 18.5628C29.404 18.0396 29.8192 17.4184 30.1024 16.7346C30.3857 16.0509 30.5315 15.3181 30.5315 14.5781C30.5315 13.838 30.3857 13.1052 30.1024 12.4215C29.8192 11.7378 29.404 11.1166 28.8806 10.5933Z"
									fill="#C62828"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div class="tests__step" v-if="step == 3" key="step-3">
				<div class="container">
					<div class="tests__result">
						<div><span>Thank you, </span> {{ fullName }}</div>
						<div>
							Your Score is <span>{{ score }}</span> from
							<span>{{ tests.length }}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import Service from "@/services/quizzServices.js";

export default {
	name: "Quizzes",
	data() {
		return {
			step: 1,
			fullName: "",
			active: null,
      activeItems: [],
			resUnswers: null,
		};
	},
	async mounted() {
		this.handleFetchTweets();
	},
	computed: {
		tests() {
			return this.$store.getters.getQuizz;
		},
		score() {
			if (!this.resUnswers) return 0;
			const count = Object.values(this.resUnswers).filter(
				(item) => item === true
			).length;
			return count;
		},
	},
	watch: {
		tests: {
			immediate: true,
			handler: function () {
				let _this = this;
				if (this.tests) {
          let resUnswers = {};
          let active = {};
					this.tests.forEach(function (item, index) {
						resUnswers[item.question.replace(/\s/g, "")] = false;
            active[index] = '';
					});
          this.$set(this, 'resUnswers' , resUnswers)
          this.$set(this, 'active' , active)
				}
			},
		},
	},
	methods: {
		handleClick(value, clickedItem) {
			console.log(clickedItem.index);
			this.$set(
				this.active,
				clickedItem.index, 
				clickedItem.answer.replace(/\s/g, "")
			);
		
      this.$set(this.resUnswers , clickedItem.question.replace(/\s/g, "") , value)
      console.log(this.active[clickedItem.index])
		},
		...mapActions(["getQuizzApi"]),
		async handleFetchTweets() {
			try {
				await this.getQuizzApi();
			} catch (error) {
				console.log(error);
			}
		},
		async nextStep(step) {
			this.step = step;
			if (step === 3) {
				let _this = this;
				let res = await Service.createResult({
					full_name: _this.fullName,
					result: _this.resUnswers,
					score: _this.score + "/" + _this.tests.length,
				});
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.tests {
	padding-top: 80px;
}
.tests__result {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 80px 0;
}
.tests__result div:nth-child(2) {
	margin-top: 34px;
}
.tests__result div:nth-child(2) span {
	color: #c62828;
}
.tests__result * {
	@extend %large;
	text-transform: uppercase;
	font-family: "Skeena-Display";
}
.tests__name {
	margin-bottom: 100px;
	display: flex;
	flex-direction: column;
	margin-top: 80px;
}
.tests__next {
	display: flex;
	align-items: center;
	font-size: 22px;
	text-transform: uppercase;
	margin-top: 50px;
	cursor: pointer;
	transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
	margin-right: auto;
}
.tests__next svg {
	margin-left: 10px;
	transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
}
.tests__next:hover svg {
	transform: translateX(10px);
}
.tests__next:hover {
	color: #c62828;
}
.tests__name input {
	font-size: 34px;
	line-height: 51px;
	background: transparent;
	border: none;
	border-bottom: 2px solid #c62828;
	width: 500px;
}
.tests__name p {
	font-size: 22px;
	line-height: 33px;
	color: #5c5f64;
	margin-bottom: 20px;
}
.tests__item {
	margin-bottom: 100px;
}
.ttl {
	@extend %largest;
	text-transform: uppercase;
	display: flex;
	flex-direction: column;
	font-family: "Skeena-Display";
}
.ttl span {
	font-size: inherit;
	line-height: inherit;
	font-family: "Skeena-Display";
}
.ttl span:nth-child(2) {
	padding-left: 120px;
}
.ttl span:nth-child(1) {
	color: #c62828;
}
.tests__inner {
	padding-left: 140px;
	padding-bottom: 80px;
	margin-top: 100px;
}
.tests__ttl {
	font-size: 34px;
	line-height: 51px;
	position: relative;
	margin-bottom: 30px;
}
.tests__ttl span {
	font-size: 110px;
	line-height: 121px;
	color: #c62828;
	position: absolute;
	top: -8px;
	left: -140px;
	text-align: end;
	width: 120px;
}
.tests__variants {
	display: flex;
	flex-direction: column;
}
.tests__variant {
	display: flex;
	position: relative;
	font-size: 22px;
	line-height: 33px;
	color: #5c5f64;
	max-width: 500px;
	padding-left: 25px;
	margin-bottom: 15px;
	transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
	cursor: pointer;
}
.tests__radio-icon {
	height: 15px;
	width: 15px;
	border: 2px solid #c62828;
	border-radius: 50%;
	display: flex;
	position: absolute;
	left: 0px;
	top: 9px;
	transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
}
.tests__variant.activeItem .tests__radio-icon {
	background: #c62828;
}
.tests__variant:hover {
	color: #1a1e25;
}
@media (max-width: 767px) {
	.tests__ttl span {
		font-size: 51px;
		line-height: normal;
		padding-top: 5px;
	}
	.tests__inner {
		padding-left: 74px;
	}
}
</style>
