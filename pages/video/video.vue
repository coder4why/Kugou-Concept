<template>
	<view class="main">
		<u-nav-bar leftWidth="45px" rightWidth='150px' fixed statusBar border='false'>
			<block slot="left">
				<image class="discoverText" src="../../static/images/global/discover.png" mode="widthFix"></image>
			</block>
		</u-nav-bar>
		<hot-singer-vue v-if="hotSingers.length>0" :singers="hotSingers" @showMore="showMore"></hot-singer-vue>
		<view v-if="hotSingers.length>0" class="bank-text">全部榜单</view>
		<recommondSongs :songs="recommendSongs" isRank @playMusic="showDetail"></recommondSongs>
		<FloatMusicVue />
	</view>
</template>

<script>
	import FloatMusicVue from '../../components/FloatMusic.vue';
	import uNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import recommondSongs from '@/components/recommondSongs.vue'
	import HotSingerVue from '../../components/HotSinger.vue';
	import {
		apiGetDiscoverLists,
		apiGetRankList,
		apiGetHotSingers
	} from '@/utils/api.js';
	export default {
		components: {
			recommondSongs,
			uNavBar,
			FloatMusicVue,
			HotSingerVue
		},
		data() {
			return {
				recommendSongs: [],
				hotSingers: [] //热门歌手
			}
		},
		onLoad() {
			this.requestList();
		},
		onShow() {

		},
		methods: {
			requestList() {
				uni.showLoading();
				apiGetDiscoverLists().then(res => {
					res.data.info.map((item, index) => {
						item.imgurl = item.imgurl.replace('{size}', '150');
						item.username = item.specialname || item.songinfo[0].songname || '';
						item.specialname = item.rankname || '';
					});
					this.recommendSongs = res.data.info;
					uni.hideLoading();
				});

				apiGetHotSingers().then(res => {
					let list = res.data.data.info;
					list.map((item, index) => {
						item.imgurl = item.imgurl.replace("{size}", '200');
					});
					this.hotSingers = list;
				});
			},
			showDetail(obj) {
				console.log(obj);
				uni.navigateTo({
					url: "/pages/video/videoDetail/videoDetail?rankid=" + obj.rankid + "&title=" + obj.rankname +
						"&imgUrl=" + obj.imgurl
				})
			},
			showMore(obj){
				let jsonObj = {
					singername:obj.singername,
					imgurl:obj.imgurl,
					singerid:obj.singerid,
					fanscount:obj.fanscount
				};
				let json = JSON.stringify(jsonObj);
				uni.navigateTo({
					url:'/pages/singerInfo/singerInfo?info='+json
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	@import url('@/common/pages/index/index.less');

	.discoverText {
		display: block;
		width: 45px;
		height: 40px;
	}

	.main {
		text-align: center;
		font-size: 25px;
		color: orangered;
	}

	.bank-text {
		margin-top: 15px;
		font-size: 16px;
		font-weight: bold;
		margin-left: 15px;
		text-align: left;
		color: black;
	}
</style>
