<template>
	<uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
</template>

<script>
	//import airport from '../../common/airport.js'
	import uniIndexedList from '../../components/uni-indexed-list/uni-indexed-list.vue'
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				list: [],
				characterArr: [],
				sortList: [],
				character:["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
					"S", "T", "U", "V", "W", "X", "Y", "Z"],
					

			}
		},
		onLoad() {
			this.getSingersList();
			this.renderList()
			// uni.getStorage({
			// 	key:'store-singer',
			// 	success(res) {
			// 		this.renderList(res.data)
			// 	}
			// })
			 
		},
		methods: {
			bindClick(e) {
				let songid = JSON.parse(JSON.stringify(e)).item.name.id
				uni.navigateTo({
					url: '../../components/singerInfo/singerInfo?id='+songid
				})
				
				// console.log(songid)
			},
			//获取歌手名单数据
			async getSingersList() {
				for (let i = 0; i < this.character.length; i++) {
					let characterIndex =  this.character[i].toLowerCase();
					let res = await this.$myRequest({
						url: `/artist/list?type=-1&area=-1&initial=${characterIndex}`
					});
					this.characterArr.push(res)
                    
				}
				 uni.setStorageSync('store-singer', this.characterArr);
				 
				// uni.setStorage({
				// 	key:'store-singer',
				// 	data:this.characterArr
				// })
				// this.renderList(this.characterArr)

			},
			renderList(){
				const characterArr = uni.getStorageSync('store-singer');
				if(characterArr){
					characterArr.forEach((element, index) => {
						
						this.list.push({
							letter:this.character[index],
							data: element.artists
						})
					
					});
				}
				
				
			}
		}
	}
</script>

<style></style>
