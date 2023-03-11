<template>
	<div class="error">
		<div class="sm-container">
			<div class="move-up-wrap">
				<h1 class="ttl animate move-up">
					Ooops! 404.
				</h1>
			</div>
			<p class="subtitle animate fade-up deley-1">
				Sorry, the page you are looking for could not be found.
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.error{
		padding-top: 100px;
	}
	.ttl{
		@extend %large;
		font-family: "Skeena-Display";
		text-transform: uppercase;
	    -webkit-text-stroke-width: 1px;
	    -webkit-text-stroke-color: $secondary-color;
	     -webkit-text-fill-color: transparent;
	}
	.subtitle{
		@extend %small;
		margin-top: 30px;
	}
	@media(max-width: 767px){
		.error{
			padding-top: 60px;
		}
	}
</style>