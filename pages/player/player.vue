<template>
	<view class="play-song">
		<view style="position: absolute;margin-top: 10rpx;color: #fff;font-size: 15rpx;">
			<block v-for="(singer,index) in ar" :key="index">
				<text style="margin-right: 10rpx;" @click="goToSinger(singer.id)">{{singer.name}}</text>
			</block>
		</view>
		<view class="img-box" :class="[isPlay ? '' : 'stoped']" :style="{top:10*2+50+'rpx'}">
			<view class="circle">
				<image class="img" :src="musicSrc" mode=""></image>
			</view>

		</view>
		<view class="lyric-box">
			<view class="ullrc" :style="{marginTop:mtop+'rpx'}">
				<view class="ric" v-for="(item,index) in lrcList" :key="index" :class="[index==songindex?'cur':'']" v-if="lrcList.length>0">
					{{item.words}}
				</view>
<view class="ric" style="margin-top: 60rpx;">暂无歌词</view>
			</view>
		</view>
		<view class="btn-box">
			<view class="flex-item">
				<text class="iconfont">&#xe615;</text>
			</view>
			<view class="flex-item iconfont">&#xe628;</view>
			<view class="flex-item iconfont">&#xe60e;</view>
		</view>
		<view class="slider-bar">
			<view class="time start">{{currentTime}}</view>
			<slider class="line" :value="currentVal" :min="0" :max="silderVal" @changing="sliderChanging" @change="sliderChange"
			 block-size="8" backgroundColor="rgba(255,255,255,.5)" activeColor="rgba(255,255,255,.5)" />
			<view class="time end">{{songTime}}</view>
		</view>
		<view class="btn-groups flex-box">
			<view class="flex-item" @click="setPlayModel">
				<view v-if="playModel==0" class="iconfont">&#xe66c;</view>
				<view v-if="playModel==1" class="iconfont">&#xe66b;</view>
				<view v-if="playModel==2" class="iconfont">&#xe66d;</view>
			</view>
			<view class="flex-item" @click="playPrevSong">
				<view class="iconfont">&#xe78a;</view>
			</view>
			<view class="play-btn flex-item" @click="play">
				<view v-if="!isPlay" class="iconfont">&#xe638;</view>
				<view v-if="isPlay" class="iconfont">&#xe76a;</view>
			</view>
			<view class="flex-item" @click="playNextSong">
				<view class="iconfont">&#xe7a5;</view>
			</view>
			<view class="flex-item iconfont" @click="openList" id="list">&#xe634;</view>
		</view>
		<view class="poplist-box" v-if="isShowList">
			<view class="poplist-title">
				<text>当前播放({{songList.length}})首</text>
				<image src="../../static/icons/close-icon.png" mode="" style="width: 20rpx;height: 20rpx;" @click="closeList"></image>
			</view>
			<view class="poplist-list">
				<block v-for="(item,index) in songList" :key="item.id">
					<view class="remen-item">
						<image :src="item.al.picUrl" mode="" style="width: 80rpx;height: 80rpx;position: absolute;left: 0;border-radius: 10rpx;"
						 class="avatar"></image>
						<view class="song-intro" style="margin-left: 100rpx;width: 60%;" @click="playThisSong(item)">
							<view class="song-name" :style="{'color':item.id==songid?'red':''}">
								{{item.name}}
							</view>
							<view class="song-desc" style="">
								<view class="" v-for="(sing,index) in item.ar" :key="index">
									<text :style="{'color':item.id==songid?'red':''}">{{sing.name}}</text>-
								</view>
								<text :style="{'color':item.id==songid?'red':''}">-</text>
								<text :style="{'color':item.id==songid?'red':''}">{{item.al.name}}</text>
							</view>

						</view>

					</view>


				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {

				lytop: '222334',
				lycur: '44',
				lybot: '55',
				playModel: 1,
				songId: 0,
				songInfo: [],

				songUrl: '',
				songLrc: '',
				lrcList: [],
				songTime: '',
				silderVal: 0,
				currentVal: 0,
				currentTime: '0:00',
				mtop: 0,
				songindex: 0,
				time: 0,
				songList: [],
				singIndex: 0,
				isShowList: false,
				ar:[]
			}
		},
		onLoad(option) {


			this.songId = option.id;
			this.time = option.time
			this.$store.state.songid = this.songId
			this.songList = uni.getStorageSync('songList');
			this.getNextSong()
			this.initMusic();
			this.initSongLrc(this.songId);
			console.log(this.songList)
		},
		computed: {
			...mapState(['songid','isPlay','musicSrc'])
		},
		methods: {
			sliderChanging(e) {
				innerAudioContext.currentTime = e.detail.value;
				this.$store.state.isPlay = true;
				//console.log(e.detail)
			},
			sliderChange(e) {
				innerAudioContext.currentTime = e.detail.value;
				this.$store.state.isPlay = true;
			},
			//初始化音乐信息
			async initMusic() {
				//console.log(this.$store.state.songList)
				let res = await this.$myRequest({
					url: `/song/detail?ids=${this.songId}`
				});
				let songUrl = await this.$myRequest({
					url: `/song/url?id=${this.songId}`
				});

				this.songInfo = res.songs;
				console.log(res)
				this.ar = this.songInfo[0].ar
				this.$store.state.musicSrc = this.songInfo[0].al.picUrl;

				uni.setNavigationBarTitle({
					title: this.songInfo[0].name
				});

				this.songUrl = songUrl.data[0].url;
				this.$store.state.isPlay = true;
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.songUrl;
				this.$store.state.musicUrl = this.songUrl
				console.log(songUrl.data[0].url)
				if (parseFloat(this.time) > 0) {
					innerAudioContext.currentTime = this.time
				}

				innerAudioContext.onCanplay(() => {

					//	console.log(this.$store.getters.getTime)
					this.silderVal = innerAudioContext.duration
					this.songTime = '0' + parseInt(innerAudioContext.duration / 60) + ':' + (parseInt(innerAudioContext.duration %
						60) >= 10 ? parseInt(innerAudioContext.duration % 60) : '0' + parseInt(innerAudioContext.duration % 60));

				});
				innerAudioContext.onTimeUpdate(() => {


					this.currentVal = innerAudioContext.currentTime;
					this.$store.state.musicCurrentTime = innerAudioContext.currentTime;

					this.currentTime = '0' + parseInt(this.$store.state.musicCurrentTime / 60) + ':' + (parseInt(this.$store.state.musicCurrentTime %
						60) >= 10 ? parseInt(this.$store.state.musicCurrentTime % 60) : '0' + parseInt(this.$store.state.musicCurrentTime %
						60));
					this.setPosition(this.$store.state.musicCurrentTime);

				});
				innerAudioContext.onEnded(() => {
					this.initNextSong();
					// console.log(songUrl)
				})


			},

			play() {
				//console.log(innerAudioContext)
				if (this.$store.state.isPlay) {
					innerAudioContext.pause()
					//console.log('pause')
					this.$store.state.isPlay = false;
					this.$store.state.isPlay = !this.$store.state.isPlay;

				} else {
					//console.log('play')
					innerAudioContext.play()
				}

				this.$store.state.isPlay = !this.$store.state.isPlay
			},
			async initSongLrc(id) {
				let songLrc = await this.$myRequest({
					url: `/lyric?id=${id}`
				})
				//console.log(songLrc)
				if(songLrc.lrc){
					this.songLrc = songLrc.lrc.lyric;
					this.getLrcArray(this.songLrc)
					
					this.lrcList = this.getLrcArray(this.songLrc)
				}
				



			},
			getLrcArray(lrc) {
				//1. ["[00:01.06]难念的经", "[00:03.95]演唱：周华健", ....]
				var parts = lrc.split('\n');
				//2. [{time:1.06, words:"难念的经"}, {time:3.95, words:"演唱：周华健"}]
				for (var i = 0; i < parts.length; i++) {
					parts[i] = this.getLrcObj(parts[i]);
				}
				return parts;
				// "[00:01.06]难念的经"  --->  {time:1.06, words:"难念的经"}

			},
			getLrcObj(content) {
				var twoParts = content.split(']');
				//取出时间
				var time = twoParts[0].substr(1);
				var timeParts = time.split(":");
				var minute = +timeParts[0];
				var seconds = +timeParts[1];
				time = minute * 60 + seconds;
				//取出文字
				var words = twoParts[1];
				return {
					time: time,
					words: words
				}
			},
			getLrcIndex(time) {
				for (var i = 0; i < this.lrcList.length; i++) {
					if (time < this.lrcList[i].time) {
						return i - 1;
					}
				}
			},
			setPosition(time) {

				let i = this.getLrcIndex(time);
				this.songindex = i
				//	console.log(i)
				if (i === -1) {
					return; //最开始的情况，没有命中任何一句歌词，不管它
				}
				var top = i * 46 + 46 / 2 - 180 / 2;

				if (top < 0) {
					top = 0;
				}

				//console.log(this.songindex )
				//console.log(top)
				this.mtop = -top;
			},
			//获取下一首歌曲
			getNextSong() {
				//console.log(this.songList)
				this.singIndex = this.songList.findIndex((item) => {
					return item.id == this.songId
				});
				this.$store.state.currentIndex = this.singIndex

			},
			//播放下一首歌曲
			async playNextSong() {

				if (this.singIndex == this.songList.length - 1) {
					this.singIndex = 0;

					await this.initSong(this.singIndex)

				} else {
					this.initNextSong();
				}


			},
			//播放上一首歌曲
			playPrevSong() {
				if (this.singIndex == 0) {
					uni.showToast({
						title: '已经是第一首'
					});
					return;
				};
				this.initPrevSong();
			},
			async initNextSong() {
				this.singIndex += 1;
				this.$store.state.currentIndex = this.singIndex
				this.initSong(this.singIndex)
			},
			async initPrevSong() {

				this.singIndex -= 1;
				this.$store.state.currentIndex = this.singIndex
				this.initSong(this.singIndex)
			},
			async initSong(index) {
				let nextSongId = this.songList[index].id;
				// innerAudioContext.src = this.songList[this.singIndex];
				let songUrl = await this.$myRequest({
					url: `/song/url?id=${nextSongId}`
				});
				let res = await this.$myRequest({
					url: `/song/detail?ids=${nextSongId}`
				});
				uni.setNavigationBarTitle({
					title: res.songs[0].name
				});
				this.ar = res.songs[0].ar
				this.$store.state.musicSrc = res.songs[0].al.picUrl;
				this.$store.state.songid = nextSongId
				
				innerAudioContext.src = songUrl.data[0].url;
				this.initSongLrc(nextSongId);
			},
			//打开列表
			openList() {
				this.isShowList = true;
			},
			//关闭列表
			closeList() {
				this.isShowList = false;
			},
			//点击列表播放歌曲
			async playThisSong(option){
				console.log(option)
				let songUrl = await this.$myRequest({
					url: `/song/url?id=${option.id}`
				});
				let res = await this.$myRequest({
					url: `/song/detail?ids=${option.id}`
				});
				uni.setNavigationBarTitle({
					title: res.songs[0].name
				});
				this.$store.state.musicSrc = res.songs[0].al.picUrl;
				this.$store.state.songid = option.id
				innerAudioContext.src = songUrl.data[0].url;
				this.initSongLrc(option.id);
				this.isShowList = false;
			},
			//去歌手信息详情
			goToSinger(id){
				uni.navigateTo({
					url:'../../components/singerInfo/singerInfo?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/player.scss";
</style>
