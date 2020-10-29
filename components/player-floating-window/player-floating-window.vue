<template>
	<view class="floating-window">
		<view class="img-box" :class="[isPlay ? '' : 'stoped']" @click="play()">
			<image class="img" :src="musicSrc" mode="" ></image>
		</view>
	</view>
</template>

<script>
	import {
	       mapState,  
	       mapMutations  
	   } from 'vuex';  
	export default {
		data() {
			return {
			
			}
		},
		computed: {
		          ...mapState(['musicSrc','isPlay'])  
		      }, 
		methods: {
			play(){
				if(this.$store.state.songid!=0){
					this.$emit('my-event',this.$store.state.songid,this.$store.getters.getTime)
				}else{
					uni.showToast({
						title: '暂无歌曲播放'
					});
				}
				
			}
		}
	}
</script>

<style lang="scss">
.floating-window{
	// position: absolute;margin-top: 50%;right: 20%;
	.img-box {
		position: relative;
	
		&.stoped {
			animation-play-state: paused;
		}
	
		animation: rotate 12s linear .1s infinite;
	
		// top: 150rpx;
		// left: 100rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		// left: 50%;
	
		// transform: translateX(-50%);
		background-color: rgba(71,95,119,.2);
		display: flex;
		align-items: center;
		justify-content: center;
	
		.img {
			width: 76%;
			height: 76%;
			border-radius: 50%;
		}
	}
	
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}

}
</style>
