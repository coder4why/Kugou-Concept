<template>
	<view class="mv-page">
		<video class="mv-video" initial-time=0 :auto-pause-if-open-native='false'
			:auto-pause-if-navigate='false' objectFit="contain" :src="url" :controls='true' :show-fullscreen-btn='true'
			autoplay></video>
		<view class="recommend-mv" v-if="similarMvs.length>0">视频推荐</view>
		<recommond-songs-vue isVideo :songs="similarMvs" v-if="similarMvs.length>0"></recommond-songs-vue>
		<view class="end-space"></view>
	</view>
</template>

<script>
	import recommondSongsVue from '../../components/recommondSongs.vue';
	import {
		apiSearchMusic_MediaVideo
	} from '../../utils/api';
	import {
		pauseMusic
	} from '../../utils/muiscTool';
	export default {
		components: {
			recommondSongsVue
		},
		data() {
			return {
				url: "",
				isH5: false,
				similarMvs: [],
			}
		},
		onLoad(obj) {
			console.log('2222',JSON.stringify(obj));
			// #ifdef APP-PLUS || H5
			this.isH5 = true;
			// #endif
			this.$store.commit('setMusicStatus', false);
			pauseMusic();
			this.url = obj.url;
			uni.setNavigationBarTitle({
				title: obj.title
			});

			uni.showLoading();
			apiSearchMusic_MediaVideo(obj.singername, 15).then(res => {
				uni.hideLoading();
				let result = res.data.info;
				result.map((sItem, index) => {
					sItem.imgurl = sItem.imgurl || sItem.topic_url ||
						'http://imge.kugou.com/stdmusic/250/20220930/20220930145957746541.jpg';
					if (sItem.imgurl && sItem.imgurl.indexOf('{size}') != -1) {
						sItem.imgurl = sItem.imgurl.replace('{size}', '150');
					}
					if (sItem.songname && sItem.songname.indexOf('em>') != -1) {
						sItem.songname = sItem.songname.replace(/<em>/g, "").replace(
							/<\/em>/g, "");
					}
					sItem.specialname = (sItem
							.songname || sItem.specialname || sItem.albumname || sItem.filename || '佚名')
						.replace(/<em>/g, "")
						.replace(
							/<\/em>/g, "");
					sItem.username = (sItem.singername || sItem.nickname).replace(/<em>/g,
						"").replace(
						/<\/em>/g, "");
				});
				this.similarMvs = result;
			})
		}
	}
</script>

<style lang="less" scoped>
	.mv-page {
		background-color: white;
		padding-bottom: 10px;
	}

	.mv-video {
		width: 100vw;
		height: 240px;
	}

	.recommend-mv{
		margin: 15px;
		font-size: 18px;
		font-weight: bold;
		border-bottom: 0.5px solid lightgray;
	}
</style>
