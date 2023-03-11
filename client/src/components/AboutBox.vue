<template>
	<section id="about" class="about-box linked animate" v-if="contentData">
		<div class="bg-shape animate fade-in deley-1">
			<img :src="require('@/assets/img/letterA.png')" alt="tassel" data-transform="0" data-intensity="2" class="top parallaxe"/>
		</div>
		<div class="sm-container">
			<div class="inner">
				<div class="left"> 
					<div class="title">
						<div class="move-up-wrap">
							<h2 class="f-display animate move-up">{{title[0]}}</h2>
						</div>
						<div class="move-up-wrap">
							<h2 class="f-display animate move-up deley-1">{{title[1]}}</h2>
						</div>	
					</div>
					<h3 class="subtitle animate fade-up deley-2" v-html="contentData.about_subtitle"></h3>
					<p class="teaser animate fade-up deley-3">
						{{contentData.about_teaser}}
					</p>
				</div>
				<div class="right">
					<h2 class="f-display ttl animate fade-in deley-3">{{title[0]}}</h2>
					<h2 class="f-display ttl second animate fade-in deley-4">{{title[1]}}</h2>
					<div class="socrat-wrap" id="scroll-socrates" >
						<div class="bg-shape animate fade-up">
							<img :src="require('@/assets/img/tassel2.png')" alt="tassel"/>
						</div> 
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import A from '@/components/parts/A';
	import Tassel from '@/components/parts/Tassel-1';
	
	export default {
		name: "About_Box",
		components:{
			A,
			Tassel
		},
		data() {
			return {
				title: '',
				type: 'about'
			}
		},
		computed: {
			contentData() {
				return this.$store.getters.mainPageData;
			},
		},
		watch:{
			'contentData.about_title': {
				immediate: true,
				handler: function() {
					if (this.contentData) {
						this.title = this.contentData.about_title.split("\n");
					} else {
						this.title = '';
					}
				}
			}
		},
		methods: {
			
		}
	}
</script> 
<style lang="scss" scoped>
	.about-box{
		position: relative;
		overflow: hidden;

		> .bg-shape{
			position: absolute;
			left: 0;
			top: 144px;

			img{
				display: block;
				width: 390px;
				height: auto;
			}
		}
	}
	.inner{
		position: relative;
		display: flex;
		padding: 150px 0 246px;
	}
	.left{
		width: 550px;
		padding-top: 300px;

		.subtitle{
			@extend %small;

			::v-deep span{
				font-size: inherit;
				line-height: inherit;
				@extend %text-underline;
			}
		}
		.teaser{
			@extend %smallest;
			margin-top: 22px;
		} 
	}
	.title{
		display: none;
		margin-bottom: 34px;

		h2{
			@extend %large;
			text-transform: uppercase;
		}
		.move-up-wrap:nth-child(2) h2{
			padding-left: 80px;
		}
	}
	.right{
		position: relative;
		flex: 1;
		padding-left: 50px;
		display: flex;
		align-items: flex-end;

		.ttl{
			@extend %large;
			@extend %text-vertical;
			text-transform: uppercase;
		}
		.ttl.second{
			padding-top: 75px;
			margin-left: 17px;
		}
	}
	#scroll-socrates{
		position: absolute;
		left: 200px;
		bottom: 0px;
		width: 600px;
		height: 1px;
	}
	.socrat-wrap{
		.bg-shape{
			position: absolute;
			bottom: 0;
			left: 107px;
			z-index: 70;
			img{
				display: block;
				width: 350px;
				height: auto;
				opacity: 0.8;
			}
		}
	}

	@media(max-width: 1900px){
		.right{
			padding-left: 34px;
		}
	}
	@media(max-width: 1599px){
		.left{
			width: 525px;
		}
		.about-box > .bg-shape img{
			width: 320px;
		}
	}
	@media(max-width: 1365px){
		.title{
			display: flex;
			flex-direction: column;
		}
		.right .ttl{
			display: none;
		}
		#scroll-socrates{
			left: 0;
		}
		.left{
			width: 556px;
			padding-top: 214px;
		}
		.about-box > .bg-shape img{
			width: 270px;
		}
	}
	@media(max-width: 1023px){
		.title{
			.move-up-wrap:nth-child(2) h2{
				padding-left: 0px;
			}
		}
		.left{
			width: 344px;
			padding-top: 185px;
		}
		.about-box > .bg-shape img{
			width: 220px;
		}
	}
	@media(max-width: 767px){
		.about-box > .bg-shape{
			top: 40px;
			left: -85px;
		}
		.left{
			width: 100%;
			padding-top: 50px;
		}
		.right{
			display: none;
		}
		.inner{
			padding: 40px 0 110px;
		}
	}
</style>





