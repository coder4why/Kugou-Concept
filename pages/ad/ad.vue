<template>
	<view class="ad-page">
		<view class="ad-bg" v-if="isShowlogo">
			<image src="../../static/images/launch/launch_bg.png" mode="aspectFill"></image>
		</view>
		<view class="app-logo" v-if="isShowlogo">
			<image class="kg-slogan" src="../../static/images/launch/slogan.png"></image>
			<image class="kg-logo" src="../../static/images/launch/launch_logo.png" mode="widthFix"></image>
		</view>
		<view class="ad-content" v-else-if="lastTime>0 && !isShowlogo">
			<image class="ad-image" mode="aspectFill"
				src="https://img10.360buyimg.com/imgzone/jfs/t1/195606/26/27841/74672/631a9b49E401c3ef9/c493b7c67237c9f3.jpg!q70.dpg.webp">
			</image>
			<view class="ad-times" @click="gotoTab()">
				<text>{{lastTime+'s'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowlogo: true,
				lastTime: 5,
				timer: null,
			}
		},
		onLoad() {
			console.log("页面加载完成”");
			let seconds = 1;
		 	let secondTimer = setInterval(() => {
				if (seconds <= 0) {
					this.isShowlogo = false;
					clearInterval(secondTimer);
					this.loadAds();
					return;
				}
				seconds--;
			}, 1000);
		},
		onHide() {
			clearInterval(this.timer);
		},
		onShow() {
			console.log("你好啊，uniapp");
		},
		methods: {
			loadAds() {
				this.timer = setInterval(() => {
					if (this.lastTime <= 0) {
						this.gotoTab();
						return;
					}
					this.lastTime--;
				}, 1000);
			},
			gotoTab() {
				clearInterval(this.timer);
				uni.switchTab({
					url: '../index/index',
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url('@/common/pages/ad/ad.less');
</style>
