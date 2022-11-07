<template>
	<view>
		<view class="singer-title">热门歌手</view>
		<view class="singer-list">
			<view class="singer-item" v-for="(item,index) in singers" :key="index" @click="$emit('showMore',item)">
				<image class="singer-img" :src="item.imgurl" mode="aspectFill"></image>
				<!-- <view class="singer-blur"></view> -->
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "HotSinger",
		props: {
			singers: {
				default: [],
				type: Array
			},
		},
	}
</script>

<style lang="less" scoped>
	.singer-title {
		font-size: 16px;
		font-weight: bold;
		margin-left: 15px;
		text-align: left;
		color: black;
	}

	.singer-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0 30rpx;
		min-height: 200px;
		align-items: center;
		justify-content: space-around;
	}

	.singer-item {
		width: 25vw;
		height: 25vw;
		border-radius: 20px;
		margin-top: 30rpx;
	}

	.singer-img {
		position: absolute;
		display: block;
		width: 25vw;
		height: 25vw;
		border-radius: 20px;
	}
	
</style>
