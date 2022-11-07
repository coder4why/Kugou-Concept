import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	namespaced: true,
	state:{
		/*
		{
			imgUrl: res.imgUrl,
			singerName: res.singerName,
			songName: res.songName,
			url: res.url
		}
		*/
		musicObj:{},
		isPlaying:false,
		showFloat:false,
	},
	mutations:{
		setMusicObj(state,obj){
			state.musicObj = obj;
			state.showFloat = true;
			// let curPage = getCurrentPages();
			// let route = curPage[curPage.length - 1].route;
			// state.showFloat = (route == 'pages/index/index' || 'pages/video/video' || 'pages/mine/mine');
		},
		setMusicStatus(state,isPlaying){
			state.isPlaying = isPlaying;
		}
	}
});

export default store;