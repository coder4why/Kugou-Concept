<template>
	<view class="login-page">
		<u-nav-bar leftWidth="45px" rightWidth='150px' fixed statusBar border='false'>
			<block slot="left">
				<image class="discoverText" src="../../static/images/global/my.png" mode="widthFix"></image>
			</block>
			<!-- #ifdef APP-PLUS || H5 -->
			<block slot="right">
				<view class="nav-right">
					<image class="left" src="../../static/images/personal/profit.png" mode="heightFix"></image>
					<image class="right" src="../../static/images/personal/book.png" mode="heightFix"></image>
				</view>
			</block>
			<!-- #endif -->
		</u-nav-bar>
		<view class="userinfo-view">
			<image class="userinfo-bg" src="../../static/images/personal/topBg.png" mode="aspectFill"></image>
			<view class="userinfo-loginBtn" @click="toLogin">
				立即登录
			</view>
			<view class="kg-tip">更酷更好玩</view>
		</view>
		<view class="user-profit">
			<view class="left">
				<image class="profit" src="../../static/images/personal/profit.png" mode="widthFix"></image>
				<text class="text">福利活动中心</text>
				<image class="svip" src="../../static/images/global/svip.png" mode="heightFix"></image>
			</view>
			<view class="right">
				<text>听歌就送1日VIP</text>
				<image src="../../static/images/global/next.png" mode="heightFix"></image>
			</view>
		</view>
		<view class="tabs-view">
			<irTabsVue :navs="navs" v-model="tabIndex" width="60vw" height="45px" navType="border" navTextColor='grey'
				activeTextColor='black' fontSize='17px' activeColor="#00BFFF" navBgColor='white' multiple
				@navChange="(index)=>tabIndex = index">
			</irTabsVue>
		</view>
		<swiper previous-margin="0px" duration=300 next-margin="0px" @animationfinish="swiperSwitch" :current="tabIndex"
			style="height: 600px !important;">
			<swiper-item style="height: 600px;">
				<view class="tab-page page-music" style="height: 600px;background-color: transparent;">
					<view class="music-view" v-for="(item,index) in musicList" :key="index"
						style="align-self: flex-start;">
						<view class="color-view" :style="'background-color:'+`${item.color}`">
							<uni-icons :type="item.icon" color="#fff" size="25" />
						</view>
						<view class="info">
							<text class="name">{{item.name}}</text>
							<text class="count">{{item.count}}</text>
						</view>
					</view>
					<view style="height: 370px;width:100%"></view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="tab-page page-story">
					<image src="../../static/images/launch/slogan.png" mode="widthFix"></image>
				</view>
			</swiper-item>
			<swiper-item style="height: 230px;">
				<view class="tab-page page-channel">
					<image src="../../static/images/launch/kgLogo.png" mode="heightFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<FloatMusicVue />
	</view>
</template>

<script>
	import uNiIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import uNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import FloatMusicVue from '../../components/FloatMusic.vue';
	import irTabsVue from '../../components/ir-tabs/ir-tabs.vue';
	export default {
		components: {
			uNavBar,
			irTabsVue,
			uNiIcons,
			FloatMusicVue
		},
		data() {
			return {
				navs: ['音乐', '故事', '频道'],
				musicList: [{
						color: "#6495ED",
						name: "收藏",
						count: 65,
						icon: "heart"
					},
					{
						color: "teal",
						name: "最近",
						count: 85,
						icon: "fire"
					},
					{
						color: "#FFA07A",
						name: "本地",
						count: 65,
						icon: "paperclip"

					},
					{
						color: "#9370DB",
						name: "云盘",
						count: 65,
						icon: "cloud-upload"
					}
				],
				tabIndex: 0
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			switchTab(item) {
				console.log('switch:', item);
			},
			swiperSwitch(e) {
				console.log('Swiper:', e.detail.current);
				this.tabIndex = e.detail.current;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('@/common/pages/mine/mine.less');
</style>
