<template>
	<view class="singer-box">
		<view class="singer-info" :style="{'backgroundImage':`url(${singerInfo.img1v1Url})`}">
			<view class="singer-name">
				{{singerInfo.name}} 
			</view>
			
		</view>
		<view class="desc-info">
			<view class="desc-header">
				<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
			</view>
			<view class="singer-home" v-if="tabIndex == 0">
				<view class="remen">
					<view class="left-box">
						<image src="../../static/icons/play.png" mode="widthFix"></image>
						<text>近期热门</text>
					</view>
					<view class="right-box">
						<button @click="moreHotSongs">更多热歌</button>
					</view>
				</view>
				<view class="remen-song-list">
					<block v-for="(item,index) in hotThreeSons" :key="item.id">
						<view class="remen-item">
							<image :src="item.al.picUrl" mode="" style="width: 80rpx;height: 80rpx;position: absolute;left: 0;border-radius: 10rpx;"
							 class="avatar"></image>
							<view class="song-intro" style="margin-left: 100rpx;" @click="playMusic(item.id)">
								<view class="song-name" style="font-size: 30rpx;">
									{{item.name}}
								</view>
								<view class="song-desc" style="font-size: 24rpx;display: flex; ">
									<view class="" v-for="(sing,index) in item.ar" :key="index">
										<text>{{sing.name}}</text>-
									</view>
									<text>-</text>
									<text>{{item.al.name}}</text>
								</view>

							</view>
							<image src="../../static/icons/more.png" mode="widthFix" style="width: 40rpx;position: absolute;right: 0;"></image>
						</view>
					</block>

				</view>
				<view class="singer-intro">
					<view class="remen">
						<view class="left-box">

							<text>歌手简介</text>
						</view>
						<view class="right-box">
							<button @click="moreInfo">更多信息</button>
						</view>
					</view>
					<view class="singer-more-info">
						{{singerInfo.briefDesc}}
					</view>
				</view>
				<view class="similar-singer">

					<view class="similar-header">
						热门歌手
					</view>
					<view class="similar-singer-box">
						<scroll-view scroll-x="true" class="similar-singer-info">
							<block v-for="(item, index) in hotSingers" :key="index">
								<view class="item" @click="checkSingerInfo(item)">
									<view class="img">
										<image :src="item.picUrl" mode=""></image>
									</view>
									<text class="item-title text-over-1">{{item.name}}</text>
								</view>
							</block>

						</scroll-view>

					</view>

				</view>
			</view>
			<view class="song-list-box" v-if="tabIndex == 1">
				<view class="song-header">
					<image src="../../static/icons/play.png" mode="widthFix"></image>
					<view>
						<text style="font-size: 32rpx;">热门歌曲</text>
						<text style="font-size: 28rpx;color: #999;">（共{{hotSongs.length}}首）</text>
					</view>
				</view>
				<view class="song-list">
					<songListItem :musicList="hotSongs" @my-event="goToPlay" />

				</view>
			</view>
			<view class="songer-mv" v-if="tabIndex == 2">
				<view class="mv-header">
					<text style="color: #000;font-size: 30rpx;font-weight: bold;">全部</text>
					<text style="font-size: 26rpx;">（共{{mvList.length}}个）</text>
				</view>
				<view class="mv-list">
					<view class="mv-item" v-for="(item,index) in mvList" :key="index" @click="goPlayMv(item.id)">
						<view class="mv-info">
							<image :src="item.imgurl16v9" mode="" class="mv-img"></image>
							<view class="check-box">
								<image src="../../static/icons/play-icon.png" mode="widthFix"></image>
								<text>{{item.playCount > 10000 ? Math.floor(item.playCount / 10000) + '万' : item.playCount}}</text>
							</view>
						</view>
						<view class="mv-desc">
							<view class="mv-box">
								<view class="sing-name">
									{{item.artistName}}
								</view>
								<view class="mv-time">
									{{item.publishTime}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="sing-desc-intro" v-if="tabIndex == 3">
				<view class="" v-for="(item,index) in singerIntro" :key="index" style="margin-bottom: 40rpx;">
					<view class="dsc-title">
						<view class="border-react">

						</view>
						<text>{{item.ti}}</text>
					</view>
					<view class="text-desc">
						{{item.txt}}
					</view>
				</view>
			</view>
			<playFloatingWindow @my-event="goPlay" style="position: fixed;top: 50%;" />
		</view>

		<!-- 	<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs> -->
	</view>
</template>

<script>
	import vTabs from '../v-tabs/v-tabs.vue'
	import songListItem from '../song-list-item/song-list-item.vue';
	import playFloatingWindow from '../player-floating-window/player-floating-window.vue'
	export default {
		data() {
			return {
				current: 0,
				tabs: [
					'主页',
					'歌曲',
					'视频',
					'简介',

				],
				tabIndex: 0,
				singerInfo: [],
				hotSongs: [],
				hotSingers: [],
				hotThreeSons: [],
				singerIntro: [],
				mvList: [],
				singerid: 0

			}
		},
		onLoad(option) {

			this.singerid = option.id
			this.getSingerInfo(this.singerid);
			this.getHotSingers(this.singerid);
			this.getHotSongs(this.singerid);
			this.getSingerIntro(this.singerid);
			this.getMv(this.singerid);
		},
		components: {
			vTabs,
			songListItem,
			playFloatingWindow
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			},
			//去播放音乐页面
			goToPlay(id) {
				//console.log(id)
				uni.navigateTo({
					url: '/pages/player/player?id=' + id
				})
			},
			//获取歌手信息
			async getSingerInfo(id) {
				let res = await this.$myRequest({
					url: '/artists?id=' + id
				});
				this.singerInfo = res.artist;
				this.hotSongs = res.hotSongs;

			},
			//获取热门歌手
			async getHotSingers() {
				let res = await this.$myRequest({
					url: '/top/artists?offset=0&limit=10'
				});
				//console.log(res)
				this.hotSingers = res.artists;
			},
			//歌手热门50首歌曲
			async getHotSongs(id) {
				let res = await this.$myRequest({
					url: '/artists?id=' + id
				});
				//console.log(res.hotSongs)
				let threeSongs = []
				for (let i = 0; i < 3; i++) {
					//	console.log(res.songs[i])
					threeSongs[i] = res.hotSongs[i]
					// this.hotSongs.push(res.songs[i])
				}
				this.hotThreeSons = threeSongs
			//	console.log(this.hotThreeSons)
			},
			//获取歌手简介
			async getSingerIntro(id) {
				let res = await this.$myRequest({
					url: '/artist/desc?id=' + id
				});
				//console.log(res)
				this.singerIntro = res.introduction;
				//console.log(this.singerIntro)
			},
			//获取MV
			async getMv(id) {
				let res = await this.$myRequest({
					url: '/artist/mv?id=' + id
				});
				this.mvList = res.mvs
			//	console.log(res)
			},
			//查看更多热歌
			moreHotSongs() {
				this.tabIndex = 1;
				this.current = 1;
			},
			//查看更多信息
			moreInfo() {
				this.tabIndex = 3;
				this.current = 3;
			},
			goPlay(id, time) {
				uni.navigateTo({
					url: '../player/player?id=' + id + '&time=' + time
				})
			},
			//摆放音乐
			playMusic(id){
				uni.navigateTo({
					url:'../../pages/player/player?id='+id
				})
			},
			//播放mv
			goPlayMv(id){
				uni.navigateTo({
					url:'../../pages/mv/mv?id='+id
				})
			},
			//热门歌手信息
			async checkSingerInfo(singer){
				this.getSingerInfo(singer.id);
				this.getHotSingers(singer.id);
				this.getHotSongs(singer.id);
				this.getSingerIntro(singer.id);
				this.getMv(singer.id);
			}
		}
	}
</script>
<style lang="scss">
	@import "./singerInfo.scss";
</style>
