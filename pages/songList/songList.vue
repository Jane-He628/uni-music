<template>
	<view class="songlist-box">
		<view class="header-info" :style="{'background':songListDesc.backgroundCoverUrl?`url(${songListDesc.backgroundCoverUrl})`:'linear-gradient(to bottom right, #0099CC, #669999)'}">
			<view class="song-info">
				<view class="song-img">
					<songItem :imgurl="songListDesc.coverImgUrl" :playCount="songListDesc.playCount" :borderRadius="10" />
				</view>
				<view class="song-intro">
					<view class="song-title">
						<text>{{songListDesc.name}}</text>
					</view>
					<view class="intro-people">
						<image :src="avatarUrl" mode="widthFix"></image>
						<text>{{nickname}}</text>
					</view>
				</view>
			</view>
			<view class="song-desc">
				<view class="item">
					<image src="../../static/icons/comment.png" mode="widthFix"></image>
					<text>{{songListDesc.commentCount}}</text>
				</view>
				<view class="item">
					<image src="../../static/icons/share.png" mode="widthFix"></image>
					<text>{{songListDesc.shareCount}}</text>
				</view>
				<view class="item">
					<image src="../../static/icons/download.png" mode="widthFix"></image>
					<text>下载</text>
				</view>
				<view class="item">
					<image src="../../static/icons/collect.png" mode="widthFix"></image>
					<text>收藏</text>
				</view>
			</view>
		</view>
		<view class="song-list-box">
			<view class="song-header">
				<image src="../../static/icons/play.png" mode="widthFix"></image>
				<view>
					<text style="font-size: 32rpx;">播放全部</text>
					<text style="font-size: 28rpx;color: #999;">（共{{musicList.length}}首）</text>
				</view>
			</view>
			<view class="song-list">
				<songListItem :musicList = "musicList" @my-event = "goToPlay" @mv-event = "goToPlayMv"/>
				
			</view>
		</view>
			<playFloatingWindow @my-event="goPlay" style="position: fixed;top: 50%;" />
	</view>
</template>

<script>
	import songItem from '../../components/song-item/song-item.vue';
	import songListItem from '../../components/song-list-item/song-list-item.vue';
	import playFloatingWindow from '../../components/player-floating-window/player-floating-window.vue'
	export default {
		data() {
			return {
				picUrl: 'https://p1.music.126.net/xFuNzlIR5D3vMhigqx4EOw==/109951164412414795.jpg',
				playCount: 303104,
				id: '',
				songListDesc: [],
				musicList: [],
				avatarUrl:'',
				nickname:''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getSongListDesc();

		},
		components: {
			songItem,songListItem,playFloatingWindow
		},
		methods: {
			//获取歌单详情
			async getSongListDesc() {
				let res = await this.$myRequest({
					url: `/playlist/detail?id=${this.id}`
				});

				this.songListDesc = res.playlist;
			
				this.avatarUrl = this.songListDesc.creator['avatarUrl'];
				this.nickname =  this.songListDesc.creator['nickname']
				let tracksMusic = this.songListDesc.trackIds;
				tracksMusic.forEach(async (element) => {
					let res = await this.$myRequest({
						url: `/song/detail?ids=${element.id}`
					});
					this.musicList.push(res.songs[0]);
					uni.removeStorageSync('songList');
				    uni.setStorageSync('songList',this.musicList)
					//console.log(this.$store.state.songList)
					
				})
				console.log(this.musicList)
			},
			
			
			//去播放音乐页面
			goToPlay(id){
				//console.log(id)
				// uni.setStorageSync('songid',option.id)
				uni.navigateTo({
					url:  '/pages/player/player?id='+id
				})
			},
			goPlay(id, time) {
				uni.navigateTo({
					url: '../player/player?id=' + id + '&time=' + time
				})
			},
			goToPlayMv(mvid){
				console.log(mvid)
				// uni.navigateTo({
				// 	url:'../mv/mv?id='+mvid
				// })
			},
		
		}
	}
</script>

<style lang="scss">
	page {

		width: 100%;
		height: 100%;
		background-color: #fff;
		position: relative;
	}

	.header-info {
		width: 100%;

		// height: 400rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;


		.song-info {
			width: 100%;
			display: flex;
			padding: 30rpx 30rpx 0 30rpx;

			.song-intro {
				padding: 10rpx 0rpx;
				margin-left: 40rpx;

				.song-title {
					width: 90%;
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
				}

				.intro-people {
					margin-top: 20rpx;
					display: flex;
					align-items: center;

					image {
						width: 60rpx;
						border-radius: 50%;
					}

					text {
						font-size: 28rpx;
						color: #fff;
						margin-left: 16rpx;
					}
				}
			}
		}

		.song-desc {
			padding: 16rpx 60rpx;
			display: flex;
			justify-content: space-around;

			// background: red;
			.item {
				// width: 0rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 50rpx;
				}

				text {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}

	.song-list-box {

		box-sizing: border-box;
		width: 100%;
		// height: 500rpx;
		background-color: #fff;
		// position: absolute;
		// bottom: 0;
		// top: 400rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
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
