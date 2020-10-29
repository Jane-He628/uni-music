<template>
	<view >
		<view class="mv-page">
		                <video id="myVideo" :src="mvUrl"
		                   enable-danmu danmu-btn controls :autoplay="true" :enable-play-gesture="true" vslide-gesture-in-fullscreen></video>
		            </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mvId:0,
				mvUrl:''
			}
		},
		onLoad(option) {
			this.mvId = option.id;
			this.getMv()
		},
		methods: {
			//获取歌手mv
			async getMv(){
				let res = await this.$myRequest({
					url:'/mv/url?id='+this.mvId
				});
				console.log(res)
				this.mvUrl = res.data.url
			}
		}
	}
</script>

<style lang="scss">
.mv-page video{
	width: 750rpx;
}
</style>
