<template>
	<view>
		<view class="song-list-box">
			<view class="song-header">
				<image src="../../static/icons/play.png" mode="widthFix"></image>
				<view>
					<text style="font-size: 32rpx;">播放全部</text>
					<text style="font-size: 28rpx;color: #999;">（共{{musicList.length}}首）</text>
				</view>
			</view>
			<view class="song-list">
				<songListItem :musicList="musicList" @my-event="goToPlay" @mv-event="goToPlayMv"/>

			</view>
		</view>
		<playFloatingWindow @my-event="goPlay" style="position: fixed;top: 50%;" />
	</view>
</template>

<script>
	import songListItem from '../../components/song-list-item/song-list-item.vue';
	import playFloatingWindow from '../../components/player-floating-window/player-floating-window.vue'
	export default {
		data() {
			return {
				songListDesc: [],
				musicList: [],
				keyWords: ''
			}
		},
		components: {
			songListItem,
			playFloatingWindow
		},
		onLoad(option) {
			console.log(option)
			this.keyWords = option.keyWords
			uni.setNavigationBarTitle({
				title: option.keyWords + '的搜索结果'
			});
			this.getSearchResult()
		},
		methods: {
			async getSearchResult() {
				let res = await this.$myRequest({
					url: '/search?keywords=' + this.keyWords
				})
				console.log(res.result.songs)
				this.musicList = res.result.songs
			},
			//播放音乐
			goToPlay(id) {
				uni.navigateTo({
					url: '../player/player?id=' + id
				})
			},
			goToPlayMv(mvid){
				uni.navigateTo({
					url:'../mv/mv?id='+mvid
				})
			},
			goPlay(id, time) {
				uni.navigateTo({
					url: '../player/player?id=' + id + '&time=' + time
				})
			}
		}
	}
</script>

<style lang="scss">
	.song-list-box {

		box-sizing: border-box;
		width: 100%;
		// height: 500rpx;
		background-color: #fff;
		// position: absolute;
		// bottom: 0;
		// top: 400rpx;
		// border-top-left-radius: 30rpx;
		// border-top-right-radius: 30rpx;
		padding: 20rpx 32rpx;

		.song-header {
			display: flex;
			align-items: center;
			width: 100%;

			image {
				width: 50rpx;

			}

			view {
				display: flex;
				align-items: center;
				margin-left: 10rpx;
			}

		}

		.song-list {
			width: 100%;
			margin-top: 20rpx;


		}
	}
</style>
