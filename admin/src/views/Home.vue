+<template>
	<div class="home">
		Home
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default{
		name: 'Home',
		computed:{
			...mapGetters({
				info: 'mainInfoData'
			}),
		}
	}
</script>

<style lang="scss" scoped>

</style>