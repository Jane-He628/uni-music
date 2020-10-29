<template>
<view class="">
	<view class="song-item"  v-for="(item,index) in musicList" :key="item.id" >
		<view class="order" :style="{'color':item.id==songid?'red':''}">
			{{index+1}}
		</view>
		<view class="song-box" @click="play(item.id)">
			<view class="song-name" :style="{'color':item.id==songid?'red':''}">
				{{item.name}}
			</view>
			<view class="song-desc-info" :style="{'color':item.id==songid?'red':''}">
				{{item.artists?item.artists[0].name:item.ar[0].name}}-{{item.album?item.album.name:item.al.name}}
			</view>
		</view>
		<view class="inco-grounp">
			<image src="../../static/icons/play-icon.png" mode="widthFix" @click="playMv(item)"></image>
			<image src="../../static/icons/more.png" mode="widthFix"></image>
		</view>
	</view>
</view>
	
</template>

<script>
	import {
	       mapState,  
	       mapMutations  
	   } from 'vuex';  
	export default {
		
		props:{
			musicList:{
				type:Array
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
		          ...mapState(['songid'])  
		      }, 
		methods: {
			play(id){
				
				this.$emit('my-event',id)
			
			},
			playMv(item){
				console.log(item)
				if(item.mvid !== 0){
					
					this.$emit('mv-event',item.mvid)
				}else{
					uni.showToast({
						title: '暂无MV播放'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.song-item {
				box-sizing: border-box;
				padding: 10rpx 0;
				position: relative;
				width: 100%;
				// height: 110rpx;
				// background: red;
				display: flex;
				align-items: center;

				.order {
					font-size: 30rpx;
					color: #999;
				}

				.song-box {
					margin-left: 30rpx;
					width: 500rpx;

					.song-name {
						font-size: 30rpx;
						height: 50rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}

					.song-desc-info {
						font-size: 24rpx;
						color: #999;
						height: 40rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}

				}

				.inco-grounp {
					position: absolute;
					right: 0;
					width: 140rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;

					image {
						width: 40rpx;
					}
				}
			}
</style>
