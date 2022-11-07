<template>
	<view class="main">
		<search :value="searchText" @search="searchAny"></search>
		<swiper-banner></swiper-banner>
		<view class="song-items" v-for="(item,index) in recommendSongs" :key="index">
			<view class="title">
				<view class="left">{{item.title}}</view>
				<view class="more" @click="showMore(item,index+1)">查看更多</view>
			</view>
			<recommondSongs showVideo :songs="item.list"></recommondSongs>
		</view>
		<FloatMusicVue />
	</view>
</template>

<script>
	import search from '@/components/search.vue'
	import swiperBanner from '@/components/swiperBanner.vue'
	import recommondSongs from '@/components/recommondSongs.vue'
	import {
		apiGetMainLists,
	} from '@/utils/api.js';
	import FloatMusicVue from '../../components/FloatMusic.vue';
	export default {
		components: {
			search,
			swiperBanner,
			recommondSongs,
			FloatMusicVue
		},
		data() {
			return {
				searchText: "",
				recommendSongs: [],
			}
		},
		onLoad() {
			this.requestList();
		},
		onShow() {
			this.searchText = '';
			if (this.recommendSongs.length == 0) {
				this.requestList();
			}
		},
		methods: {
			requestList() {
				uni.showLoading();
				Promise.all([
					apiGetMainLists("1").then(res => {
						return res.data.info;
					}),
					apiGetMainLists("2").then(res => {
						return res.data.info;
					}),
					apiGetMainLists("3").then(res => {
						return res.data.info;
					}),
				]).then((res) => {
					let songs = [{
							title: "华语新歌",
							list: res[0]
						},
						{
							title: "欧美新歌",
							list: res[1]
						},
						{
							title: "日韩新歌",
							list: res[2]
						},
					];
					songs.map((item, index) => {
						item.list.map((sItem, sIndex) => {
							sItem.cover = sItem.cover.replace('{size}', '150');
							sItem.imgurl = sItem.cover;
							sItem.specialname = sItem.filename;
							sItem.username = sItem.authors[0].author_name;
						});
					});
					this.recommendSongs = songs;
					uni.hideLoading();
				});
			},
			searchAny(obj) {
				this.searchText = obj.detail.value;
				uni.navigateTo({
					url: '/pages/index/searchResult/searchResult?searchText=' + obj.detail.value
				})
			},
			showMore(item, index) {
				console.log('显示更多', index);
				uni.navigateTo({
					url: '/pages/index/moreMusic/moreMusic?type=' + index + "&title=" + this.recommendSongs[index -
						1].title
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	@import url('@/common/pages/index/index.less');

	.title {
		margin-top: 15px;
		font-size: 16px;
		font-weight: bold;
		margin-left: 15px;
		text-align: left;
		color: black;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 15px;

		.more {
			color: grey;
			font-size: 13px;
		}
	}

	.song-items {
		border-bottom: 5px #f5f5f5 solid;
	}
</style>
