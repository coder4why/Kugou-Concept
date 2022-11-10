<template>
	<view class="login-page">
		<video class="login-video" v-if="!isMP" initial-time=0 :auto-pause-if-open-native='false'
			:auto-pause-if-navigate='false' objectFit="fill" src="../../static/images/login/login_bg.mp4"
			:controls='false' :show-fullscreen-btn='false' duration=8 autoplay loop muted></video>
		<view class="login-bg" v-else></view>
		<view class="login-close" @click="goback" :style="'margin-top:'+ `${isMP ? '25px':'0px'}`">
			<image src="../../static/images/login/close.png" mode="aspectFill"></image>
		</view>
		<view class="login-center">
			<view class="login-mobile-text">手机号登录</view>
			<view class="login-mobile-area">国家地区 中国</view>
			<view class="login-mobile-number">
				<view class="areaCode">+86</view>
				<input class="mobile-input" placeholder="请输入手机号" />
			</view>
			<view class="login-btn" @click="login">登录</view>
			<view class="account-login-btn">账号登录</view>
			<view class="login-otherStyle">
				<view class="white-line"></view>
				<view class="other-style">其他登录方式</view>
				<view class="white-line"></view>
			</view>
			<view class="login-styles">
				<image v-if="!isMP" src="../../static/images/login/QQLogin.png" mode="aspectFill"></image>
				<image src="../../static/images/login/WechatLogin.png" mode="aspectFill" @click="wxlogin"></image>
				<image v-if="!isMP" src="../../static/images/login/appleLogin.png" mode="aspectFill"></image>
			</view>
			<view class="login-protocal">
				<checkbox class="checkBox" />
				我已阅读并同意
				<view>《用户协议》</view>
				和
				<view>《隐私政策》</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMP: false,
			}
		},
		onLoad() {
			// #ifdef MP
			this.isMP = true;
			// #endif
		},
		onHide() {},
		methods: {
			goback() {
				uni.navigateBack();
			},
			login() {
				uni.switchTab({
					url: "/pages/mine/mine"
				})
			},
			wxlogin() {
				/* 小程序秘钥： 97da1396cf3fe7b663634ebb61d87750 */
				// #ifdef MP
				uni.getUserProfile({
					desc: '用于登录',
					success: (res) => {
						console.log('成功', JSON.stringify(res));
						uni.showToast({
							title: res.userInfo.nickName,
							duration: 2000
						})
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/mine/mine"
							})
						}, 2000)
					},
					fail: (error) => {
						console.log(error);
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '@/common/pages/login/login.less';
</style>
