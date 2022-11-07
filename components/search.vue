<template>
	<view>
		<u-nav-bar :leftWidth="isDetail ? '25px':'45px'" :rightWidth="isDetail ? '10px':'20px'" fixed statusBar border='false'>
			<block slot="left">
				<image v-if="!isDetail" class="discoverText" src="../static/images/global/discover.png" mode="widthFix"></image>
				<uni-icons v-else type="back" color="#000" size="20" @click="goback"></uni-icons>
			</block>
			<view class="search-filed" :class="!isMP ? 'searchH5':'searchMP'">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" class="nav-bar-input" :value="value"  type="text" placeholder="输入搜索关键词"
					@confirm="(text)=>$emit('search',text)" />
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<block v-if="!isDetail" slot="right">
				<uni-icons type="mic-filled" color="#666" size="20" />
			</block>
			<!-- #endif -->
		</u-nav-bar>
	</view>
</template>

<script>
	import uNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uNiIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uNavBar,
			uNiIcons
		},
		name: "search",
		props:{
			isDetail:false,
			value:""
		},
		data() {
			return {
				isMP: true,
			};
		},
		//组件的生命周期：跟VUE2.0版本的页面生命周期函数一样
		created() {
			// #ifdef !MP
			this.isMP = false;
			console.log("非小程序")
			// #endif
		},
		methods:{
			goback(){
				uni.navigateBack();
			},
		}
	}
</script>

<style lang="less" scoped>
	.search-filed,
	.search-filed {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 32px;
		align-self: center;
		border-radius: 16px;
		background-color: rgba(0, 0, 0, 0.1);
		justify-content: flex-start;
		padding-left: 10px;
	}

	.searchH5 {
		width: calc(100vw - 140rpx);
	}

	.searchMP {
		width: 55vw;
	}

	.nav-bar-input {
		text-align: left;
		margin-left: 5px;
		font-size: 15px;
		color: black;
	}
	.discoverText{
		display: block;
		width: 45px;
		height: 40px;
	}
	
</style>
