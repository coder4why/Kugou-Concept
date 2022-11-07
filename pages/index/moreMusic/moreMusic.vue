<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption">
			<recommond-songs-vue showVideo :songs="songs"></recommond-songs-vue>
		</mescroll-body>
	</view>
</template>

<script>
	import recommondSongsVue from '../../../components/recommondSongs.vue';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue"; // 非uni_modules版本
	import {
		apiGetMainLists,
	} from '../../../utils/api';

	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			recommondSongsVue,
			MescrollBody
		},
		data() {
			return {
				type: "",
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 20 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				songs: [],
			}
		},
		onLoad(obj) {
			this.type = obj.type;
			uni.setNavigationBarTitle({
				title:obj.title
			});
		},
		methods: {
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				// console.log(page.size,page.num);
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				apiGetMainLists(this.type, pageSize, pageNum).then(res => {
					let hasNext = true;
					res.data.info.map((sItem, sIndex) => {
						sItem.cover = sItem.cover.replace('{size}', '150');
						sItem.imgurl = sItem.cover;
						sItem.specialname = sItem.filename;
						sItem.username = sItem.authors[0].author_name;
					});
					//设置列表数据
					if (page.num == 1) {
						this.songs = [];
					} //如果是第一页需手动置空列表
					this.songs = this.songs.concat(res.data.info); //追加新数据
					setTimeout(() => {
						this.mescroll.endSuccess(20, pageNum<5); 
					}, 20)
				});
			},
		}
	}
</script>

<style>

</style>
