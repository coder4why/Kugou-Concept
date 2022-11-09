<template>
	<view>
		<view class="singer-title">热门歌手</view>
		<view class="singer-list">
			<view class="singer-item" v-for="(item,index) in singers" :key="index" @click="$emit('showMore',item)">
				<image class="singer-img" :src="item.imgurl" mode="aspectFill"></image>
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
		margin: 0 10rpx;
		min-height: 200px;
		align-items: center;
		justify-content: space-around;
	}

	.singer-item {
		width: 22vw;
		height: 22vw;
		border-radius: 10px;
		margin-top: 15rpx;
	}

	.singer-img {
		position: absolute;
		display: block;
		width: 22vw;
		height: 22vw;
		border-radius: 10px;
	}
	
</style>
