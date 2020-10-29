<template>
	<view class="home">
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.bannerId">
				<image :src="item.imageUrl"></image>
			</swiper-item>
		</swiper>
		<view class="recommend">
			<view class="title">人气歌单推荐</view>
			<view class="re-box">
				<view class="re-item" v-for="item in recommendSongList" :key="item.id" @click="goRecommendSong(item)">
					<songItem :imgurl="item.picUrl" :playCount="item.playCount" />
					<view class="desc">
						<text>{{item.name}}</text>
					</view>

				</view>

			</view>
		</view>
		<playFloatingWindow @my-event="goPlay" style="position: fixed;top: 50%;" />
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import songItem from '../../components/song-item/song-item.vue';
	import playFloatingWindow from '../../components/player-floating-window/player-floating-window.vue'
	export default {
		data() {
			return {
				swipers: [], //轮播图
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				recommendSongList: [], //推荐歌单

			}
		},
		components: {
			songItem,
			playFloatingWindow
		},
		computed: {
			...mapState(['musicUrl'])
		},
		onLoad() {
			this.getSwipers();
			this.getRecommendSongList();
			//console.log(innerAudioContext)
		},
		methods: {
			//获取轮播图数据
			async getSwipers() {
				let res = await this.$myRequest({
					url: '/banner'
				});
				console.log(res)
				this.swipers = res.banners
			},
			async getRecommendSongList() {
				let res = await this.$myRequest({
					url: '/personalized?limit=6'
				});

				this.recommendSongList = res.result

			},
			//去歌单详情
			goRecommendSong(option) {
				
				uni.navigateTo({
					url: '/pages/songList/songList?id=' + option.id
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
	.home {
		swiper {
			width: 750rpx;
			height: 300rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.recommend {
			width: 96%;
			height: 400rpx;
			// background-color: red;
			margin: 0 auto;
			margin-top: 20rpx;

			.title {
				font-size: 30rpx;
				margin-bottom: 20rpx;

			}

			.re-box {
				display: flex;

				flex-wrap: wrap;
				justify-content: space-between;

				.re-item {
					position: relative;
					width: 32%;
					// height: 100rpx;
					// border: 1px solid black;
					margin-bottom: 16rpx;


					.desc {
						// width: 200rpx;
						
						text-overflow: -o-ellipsis-lastline;
						  overflow: hidden;
						  text-overflow: ellipsis;
						  display: -webkit-box;
						  -webkit-line-clamp: 2;
						  line-clamp: 2;
						  -webkit-box-orient: vertical;
						
						font-size: 26rpx;
					}


				}

			}


		}


	}
</style>
