import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		musicUrl: '',
		isPlay: false,
		musicSrc: '../../static/icons/music-logo.png',
		songid: 0,
		musicCurrentTime: 0,
		songList: [],
		currentIndex: 0
	},
	mutations: {},
	getters: {
		getTime(state) {
			return state.musicCurrentTime
		},
		getCurrentIndex(state) {
			return state.currentIndex
		}
	},
	actions: {


	}

})
export default store
