<template>
	<view v-if="musicObj.imgUrl" class="circle-view" :class="isMP ? 'isMP':''" @click="playMusic">
		<view class="left">
			<image class="cirle-image" :class="!isPlaying?'paused':'active'" :src="musicObj.imgUrl" mode="aspectFit">
			</image>
		</view>
		<!-- <text class="right">{{(musicObj.songName+'-'+musicObj.singerName).substr(0,5)}}</text> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: "FloatMusic",
		data() {
			return {
				isMP:false
			};
		},
		computed: {
			...mapState(["isPlaying", "musicObj"]),
		},

		created() {
			// #ifdef MP
				this.isMP = true;
			// #endif
		},
		methods: {
			playMusic() {
				uni.navigateTo({
					url: "/pages/play/play?isFloat=1"
				})
			}
		}
	}
</script>

<style>
	.circle-view {
		position: fixed;
		bottom: 75px;
		right: -55px;
		width: 120px;
		height: 50px;
		border-radius: 25px;
		background-image: linear-gradient(to right,#87CEFA, #00BFFF);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		overflow: hidden;
		box-shadow: #00BFFF 0 0 5px;
	}
	.isMP{
		bottom: 75rpx;
	}

	.left {
		width: 50px;
		height: 50px;
		left: 0px;
		top: 0px;
		border-radius: 25px;
		background-color: white;
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		z-index: 10002;
	}

	.right {
		font-size: 13px;
		align-self: center;
		left: 55px;
		right: 6px;
		position: absolute;
		color: white;
		text-align: left;
		z-index: 10001;
		overflow: hidden;
		word-wrap: unset;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.cirle-image {
		display: block;
		width: 46px;
		height: 46px;
		position: absolute;
		left: 2px;
		top: 2px;
		border-radius: 23px;
		animation: circleRoate 3s infinite linear;
	}

	@keyframes circleRoate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.active {
		animation-play-state: running;
	}

	.paused {
		animation-play-state: paused;
	}
</style>
