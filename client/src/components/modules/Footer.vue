<template>
	<footer>
		<div class="sm-container">
			<div class="inner">
				<button class="scroll-up animate fade-up" @click="clickHanlder()">
					<span class="f-display">{{ $t("scroll_up") }}</span>
					<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.52363 0.667171L0.707763 4.48304L2.59392 6.36831L4.76185 4.20038L4.76185 12.0161L7.42842 12.0161L7.42842 4.20038L9.59634 6.36831L11.4825 4.48304L7.66663 0.667171C7.46028 0.460764 7.21529 0.297028 6.94565 0.185319C6.676 0.0736081 6.387 0.016113 6.09513 0.016113C5.80327 0.0161131 5.51426 0.0736082 5.24462 0.185319C4.97498 0.297028 4.72998 0.460764 4.52363 0.667171Z" fill="#1A1E25"/>
					</svg>
				</button>
				<div class="line animate fade-up"></div>
				<p class="teaser animate fade-up delay-1">
					Follow us on LinkedIn, Twitter and Instagram to stay informed with the latest news, pictures and our blogs!
				</p>
				<div class="socials animate fade-up delay-2">
					<a :href="_.get(contentData, 'linkedin')" target="_blank" class="item">LINKEDIN</a>
					<a :href="_.get(contentData, 'instagram')" target="_blank" class="item">INSTAGRAM</a>
					<a :href="_.get(contentData, 'twitter')" target="_blank" class="item">TWITTER</a>
				</div>
				<p class="copyright animate fade-in delay-3">
					©2022 <span>Hypercubic</span> Innovation Center.
				</p>
			</div>
		</div>
	</footer>
</template>
<script>
	export default{
		name: 'Footer',
		methods: {
			clickHanlder(){
				this.$store.commit('setScrollToTop', true);
			}
		},
		computed: {
			contentData(){ 
				return this.$store.getters.mainPageData;
			},
		},
	}
</script>
<style lang="scss" scoped> 
	footer{
		position: relative;
		z-index: 9999999;
	}
	.inner{
		padding: 22px 0 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.scroll-up{
		display: flex;
		align-items: center;

		span{
			letter-spacing: 1px;
			transition: .4s;
			margin-right: 8px;
		}
		svg,path{
			transition: .4s;
		}

		&:hover{
			span{
				color: $secondary-color;
			}
			svg{
				transform: translateY(-5px);
			}
			path{
				fill: $secondary-color;
			}
		}
	}
	.line{
		width: 100%;
		height: 1px;
		background-color: #000;
		margin: 10px 0 34px;
	}
	.teaser{
		max-width: 470px;
		line-height: 24px;
		color: #5C5F64;
		text-align: center;
	}
	.socials{
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;

		.item{
			display: flex;
			margin-right: 40px;
			margin-bottom: 5px;
			@extend %smallest;
			@extend %hover;
			font-family: "Skeena-Display";
		}
		.item:last-child{
			margin-right: 0;
		}
	}
	.copyright{
		margin-top: 100px;
		max-width: 470px;
		line-height: 24px;
		color: #5C5F64;

		::v-deep span{
			font-family: "Skeena-Display";
		}
	}
	@media(max-width: 767px){
		.copyright{
			margin-top: 60px;
		}
	}
</style>








