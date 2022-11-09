<template>
	<view>
		<!-- <view class="top-view">
			<image :src="imgUrl" mode="aspectFill"></image>
			<text>{{title}}</text>
		</view> -->
		<view class="play-menu" v-if="songs.length>0">
			<view class="left">
				<uni-icons type="tune-filled" color="#1E90FF" size="20"></uni-icons>
				<text>播放全部</text>
			</view>
			<view class="right">
				<uni-icons type="loop" color="#1E90FF" size="20"></uni-icons>
			</view>
		</view>
		<recommond-songs-vue showVideo :songs="songs"></recommond-songs-vue>
	</view>
</template>

<script>
	import uNiIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import recommondSongsVue from '../../../components/recommondSongs.vue';
	import {
		apiGetRankList,
		apiGetMp3Url,
		apiSearchMusic_SingleSong
	} from '../../../utils/api';
	import {
		isNull
	} from '../../../utils/global';
	export default {
		components: {
			recommondSongsVue,
			uNiIcons
		},
		data() {
			return {
				songs: [],
				// imgUrl: '',
				title: '',
			}
		},
		onLoad(obj) {
			this.title = obj.title || obj.keyword;
			uni.setNavigationBarTitle({
				title: obj.title || obj.keyword,
			});
			uni.showLoading();
			if (!isNull(obj.keyword)) {
				apiSearchMusic_SingleSong(obj.keyword, 100).then((res) => {
					uni.hideLoading();
					let result = res.data.info;
					result.map((sItem, sIndex) => {
						sItem.imgurl = sItem.imgurl || sItem.topic_url ||
							'http://imge.kugou.com/stdmusic/250/20220930/20220930145957746541.jpg';
						if (sItem.imgurl && sItem.imgurl.indexOf('{size}') != -1) {
							sItem.imgurl = sItem.imgurl.replace('{size}', '150');
						}
						if (sItem.songname && sItem.songname.indexOf('em>') != -1) {
							sItem.songname = sItem.songname.replace(/<em>/g, "").replace(
								/<\/em>/g, "");
						}
						if (sItem.singername && sItem.singername.indexOf('em>') != -1) {
							sItem.singername = sItem.singername.replace(/<em>/g, "").replace(
								/<\/em>/g, "");
						}
						sItem.specialname = sItem.songname;
						sItem.username = sItem.singername;
					});
					this.songs = result;
				});
			} else {
				apiGetRankList(obj.rankid).then((res) => {
					uni.hideLoading();
					if (res.data.songs && res.data.songs.list.length > 0) {
						res.data.songs.list.map((item, index) => {
							item.imgurl = item.album_sizable_cover.replace('{size}', '150');
							item.specialname = item.remark || "";
							if (item.authors.length > 0) {
								item.username = item.authors[0].author_name || '佚名';
							} else {
								item.username = '佚名';
							}
						});
					} else {
						uni.showToast({
							title: '未查询到列表数据'
						})
					}
					this.songs = res.data.songs.list;
				});
			}
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.play-menu {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		margin: 0px 15px;

		.left {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			height: 50px;

			text {
				font-size: 14px;
				color: black;
				margin-left: 4px;
				font-weight: bold;
			}
		}

		.right {
			width: 40px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.top-view {
		width: 100vw;

		// height: 100%;
		image {
			display: block;
			width: 100vw;
			// height: 100%;
			top: 0px;
			left: 0px;
			position: absolute;
			// filter: blur(px);
			opacity: 0.3;
		}

		text {
			top: 0px;
			left: 0px;
			font-size: 30px;
			text-align: center;
			position: absolute;
			width: 100vw;
			line-height: 160px;
			color: #000;
			font-weight: bold;
			display: none
		}
	}
</style>
