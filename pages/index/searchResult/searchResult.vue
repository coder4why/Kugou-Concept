<template>
	<view class="search-result" v-if='results.length>0'>
		<search isDetail :value="searchText" @search="searchAny"></search>
		<view v-for="(item,index) in results" :key="index" v-if="item.songs.length>0">
			<view class="title">{{item.title}}</view>
			<recommond-songs-vue :isVideo='index==1' showVideo class='result-view' :songs="item.songs">
			</recommond-songs-vue>
			<view class="showMore" @click="showMore(index)">查看更多“{{searchText}}”{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	import search from '@/components/search.vue'
	import recommondSongsVue from '../../../components/recommondSongs.vue';
	import {
		apiSearchMusic_SingleSong,
		apiSearchMusic_AlbumList,
		apiSearchMusic_MediaVideo,
		apiSearchMusic_SongList,
		apiSearchMusic_AlbumInfo
	} from '../../../utils/api';

	export default {
		components: {
			recommondSongsVue,
			search
		},
		data() {
			return {
				searchText: "",
				results: []
			}
		},
		onLoad(obj) {
			this.searchText = obj.searchText;
			uni.setNavigationBarTitle({
				title: this.searchText
			});
			this.searchWord();
		},
		methods: {
			searchAny(obj) {
				this.searchText = obj.detail.value;
				this.searchWord();
			},
			showMore(index) {
				if (index == 0) {
					uni.navigateTo({
						url:'/pages/video/videoDetail/videoDetail?keyword='+this.searchText
					});
					return;
				}
				uni.showToast({
					title: '没有更多了...'
				});
			},
			searchWord() {
				uni.showLoading();
				Promise.all([
					apiSearchMusic_SingleSong(this.searchText, 5).then((res) => {
						return res.data.info;
					}),
					apiSearchMusic_MediaVideo(this.searchText, 5).then(res => {
						return res.data.info;
					}),
					apiSearchMusic_SongList(this.searchText, 5).then(res => {
						return res.data.info;
					}),
					apiSearchMusic_AlbumList(this.searchText, 5).then(res => {
						return res.data.info;
					})
				]).then((res) => {
					uni.hideLoading();
					res.map((item, index) => {
						item.map((sItem, sIndex) => {
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
									.songname || sItem.specialname || sItem.albumname || sItem
									.filename || '佚名').replace(/<em>/g, "")
								.replace(
									/<\/em>/g, "");
							sItem.username = (sItem.singername || sItem.nickname).replace(/<em>/g,
								"").replace(
								/<\/em>/g, "");
						});
					});
					this.results = [{
						songs: res[0],
						title: '单曲'
					}, {
						songs: res[1],
						title: '视频'
					}, {
						songs: res[2],
						title: '歌单'
					}, {
						songs: res[3],
						title: '专辑'
					}];
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-result {
		padding-bottom: 20px;
	}

	.search-result,
	.result-view {
		width: 100vw;
	}

	.title {
		margin: 15px;
		font-size: 18px;
		font-weight: bold;
		border-bottom: 0.5px solid lightgray;
	}

	.showMore {
		text-align: center;
		font-size: 11px;
		color: gray;
		max-width: 40vw;
		background-color: #f5f5f5;
		margin: 0 auto;
		height: 25px;
		line-height: 25px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-radius: 12.5px;
	}
</style>
