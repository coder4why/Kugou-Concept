<template>
	<view class="mv-page">
		<video class="mv-video" :class="isH5 ? 'h5-video':''" initial-time=0 :auto-pause-if-open-native='false'
			:auto-pause-if-navigate='false' objectFit="contain" :src="url"
			:controls='true' :show-fullscreen-btn='true' autoplay loop></video>
	</view>
</template>

<script>
import { pauseMusic } from '../../utils/muiscTool';
	export default {
		data() {
			return {
				url:"",
				isH5:false
			}
		},
		onLoad(obj) {
			// #ifdef APP-PLUS || H5
				this.isH5 = true;
			// #endif
			console.log(obj.url);
			this.$store.commit('setMusicStatus',false);
			pauseMusic();
			this.url = obj.url;
			uni.setNavigationBarTitle({
				title:obj.title
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.mv-page{
		background-color: black;
	}
	.mv-video{
		width: 100vw;
		height: 100vh;
	}
	.h5-video{
		height: calc(100vh - 44px);
	}
</style>
