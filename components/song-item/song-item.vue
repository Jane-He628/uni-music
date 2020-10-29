<template>
	<view class="song-item">
		<image :src="imgurl" mode="widthFix" :style="{borderRadius:borderRadius+ 'px'}"></image>
		<view class="play-count">
			<image src="../../static/icons/airphone.png" mode="widthFix"></image>
			<text>{{playCount > 10000 ? Math.floor(playCount / 10000) + '万' : playCount}}</text>
		
		</view>
	</view>
</template>

<script>
	export default {
		props:["imgurl",'playCount','borderRadius'],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.song-item{
	width: 240rpx;
	position: relative;
	image {
		width: 100%;
	
	}
	.play-count {
		position: absolute;
		top: 6rpx;
		right: 6rpx;
		display: flex;
		align-items: center;
	
		image {
			width: 40rpx;
		}
	
		text {
			font-size: 24rpx;
		color: #fff;
		}
	}
}
</style>
