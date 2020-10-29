<template>
	<view>
		<uni-search-bar @confirm="search"></uni-search-bar>
		<!-- 历史搜索 -->
		<view class="search-history" v-if="historyList.length>0">
			<view class="his-header">
				<text>历史搜索</text>
				<image src="../../static/icons/delete.png" mode="" @click="deleteHis"></image>
			</view>
			<view class="his-list" :style="{'height':checkHis?'140rpx':'auto'}">
				<block v-for="(item,index) in historyList" :key="index">
					<view class="his-item" @click="goToSearch(item)">
						{{item}}
					</view>
				</block>

			</view>
			<view class="check-more" @click="checkHisFn" v-if="historyList.length>14">
				<text>{{checkHis?'查看更多':'收起'}}</text>
				<image :src="checkHis?'../../static/icons/arrow-down.png':'../../static/icons/arrow-up.png'" mode=""></image>
			</view>
		</view>
		<!-- 热搜榜 -->
		<view class="hot-search">
			<view class="hot-title">
				<text>热搜榜</text>
			</view>
			<view class="hot-search-list" :style="{'height':checkMore?'200rpx':'auto'}">
				<block v-for="(item,index) in hotSearchList" :key="index">
					<view class="hot-item">
						<text class="order-text" :style="{'color':index+1 <= 3?'#FF0000':''}">{{index+1}}</text>
						<text class="hot-name" @click="goToDetail(item)">{{item.searchWord}}</text>
					</view>
				</block>

			</view>
			<view class="check-more" @click="checkMoreFn">
				<text>{{checkMore?'查看更多':'收起'}}</text>
				<image :src="checkMore?'../../static/icons/arrow-down.png':'../../static/icons/arrow-up.png'" mode=""></image>
			</view>
		</view>
		<playFloatingWindow @my-event="goPlay" style="position: fixed;top: 83%;" />
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue';
	import playFloatingWindow from '../../components/player-floating-window/player-floating-window.vue'
	export default {
		data() {
			return {
				searchVal: '',
				hotSearchList: [],
				checkMore: true,
				checkHis: true,
				historyList: [],
				

			}
		},
		components: {
			uniSearchBar,playFloatingWindow
		},
		onLoad() {
			this.getHotSearchList();
			if (uni.getStorageSync('history-list')) {
				this.historyList = uni.getStorageSync('history-list')
			}
		},
		methods: {
			search(e) {
				this.searchVal = e.value.trim();
				this.historyList.push(this.searchVal);
				uni.setStorageSync('history-list', this.historyList);
				uni.navigateTo({
					url:'../searchDetail/searchDetail?keyWords='+this.searchVal
				})
				
			},
			//获取热搜列表
			async getHotSearchList() {
				let res = await this.$myRequest({
					url: '/search/hot/detail'
				});
				this.hotSearchList = res.data
				console.log(this.hotSearchList)
			},
			//查看更多
			checkMoreFn() {
				if (!this.checkMore) {
					this.checkMore = false;

				}
				// this.checkText = '查看更多'
				this.checkMore = !this.checkMore
			},
			//查看更多历史记录
			checkHisFn() {
				if (!this.checkHis) {
					this.checkHis = false;

				}
				// this.checkText = '查看更多'
				this.checkHis = !this.checkHis
			},
			//删除历史记录
			deleteHis(){
				uni.removeStorageSync('history-list');
				this.historyList = [];
			},
			//跳转搜索详情
			goToSearch(keyWords){
				uni.navigateTo({
					url:'../searchDetail/searchDetail?keyWords='+keyWords
				})
			},
			goPlay(id, time) {
				uni.navigateTo({
					url: '../player/player?id=' + id + '&time=' + time
				})
			},
			goToDetail(options){
				this.goToSearch(options.searchWord)
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.search-history {
		width: 100%;
		padding: 20rpx;

		.his-header {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				font-size: 28rpx;
				color: #000;
				font-weight: bold;
			}

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.his-list {
			width: 100%;
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			height: 70px;
			overflow: hidden;

			.his-item {

				padding: 10rpx 16rpx;
				background-color: #ddd;
				height: 60rpx;
				border-radius: 20rpx;
				font-size: 28rpx;
				margin-right: 10rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	.hot-search {
		width: 100%;
		padding: 20rpx;

		.hot-title {
			width: 100%;
			padding: 20rpx 0;
			border-bottom: 2rpx solid #eee;

			text {
				font-size: 28rpx;
				color: #000;
				font-weight: bold;
			}
		}

		.hot-search-list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			height: 200rpx;
			overflow: hidden;
			margin-top: 20rpx;

			.hot-item {
				width: 50%;
				margin-bottom: 10rpx;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //用省略号显示
				white-space: nowrap; //不换行

				.order-text {
					font-size: 30rpx;

				}

				.hot-name {
					font-size: 30rpx;
					color: #000;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}

		}

	}

	.check-more {
		width: 100%;
		text-align: center;
		margin-top: 20rpx;

		text {
			font-size: 28rpx;
			color: #666;
			font-weight: bold;
		}

		image {
			width: 20rpx;
			height: 20rpx;
		}
	}
</style>
