import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import store from './store/index.js'  
Vue.prototype.$store = store 
Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false

Vue.prototype.ScanAudio = function(){
        var music = null;
        music = uni.createInnerAudioContext(); //创建播放器对象
        music.src= "./static/raw/right.mp3"; //选择播放的音频
        music.play(); //执行播放
		console.log(1)
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
