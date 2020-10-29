<template>
	<view>
		<playFloatingWindow @my-event="goToPlay"/>
		
	</view>
</template>

<script>
	import playFloatingWindow from '../../components/player-floating-window/player-floating-window.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			playFloatingWindow
		},
		methods: {
			goToPlay(id,time){
				uni.navigateTo({
					url:'../player/player?id='+id+'&time='+time
				})
			}
		}
	}
</script>

<style>

</style>
