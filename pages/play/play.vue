<template>
	<view class="play-view">
		<image :src="songObj.imgUrl" class="play-bg" mode="heightFix"></image>
		<view class="animation-view">
			<image class="circle-round" src="../../static/images/global/playMp3_bg.png" mode="widthFix"></image>
			<image class="song-bg" :class="isPlaying ? 'active':'paused'" :src="songObj.imgUrl"></image>
		</view>
		<view class="play-controls">
			<uni-icons type="loop" color="black" size="30" @click="setPlayMode"></uni-icons>
			<view class="center-controls">
				<uni-icons class='privious' type="left" color="black" size="30" @click="setPlayMode"></uni-icons>
				<image class="play-icon"
					:src="!isPlaying ? '../../static/images/song/play.png':'../../static/images/song/pause.png'"
					mode="widthFix" @click="playAction"></image>
				<uni-icons class='next' type="right" color="black" size="30" @click="setPlayMode"></uni-icons>
			</view>
			<uni-icons type="bars" color="black" size="30" @click="setPlayMode"></uni-icons>
		</view>
		<view class="needle-view">
			<image src="../../static/images/song/needle.png" mode="heightFix" class="needle"></image>
		</view>
	</view>
</template>

<script>
	import uNiIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
	import {
		mapState
	} from 'vuex';
	import {
		playMusic,
		pauseMusic,
		resumePlay
	} from '../../utils/muiscTool';
	export default {
		components: {
			uNiIcons
		},
		computed: {
			...mapState(['isPlaying']),
		},
		data() {
			return {
				songObj: {},
			}
		},
		watch: {
			isPlaying: function(val) {
				if (val) {
					resumePlay();
				} else {
					pauseMusic();
				}
			}
		},
		onLoad(obj) {
			console.log(obj);
			let mp3Obj = this.$store.state.musicObj;
			this.songObj = mp3Obj;
			console.log(this.songObj);

			let title = this.songObj.singerName;
			if (this.songObj.singerName.indexOf(this.songObj.songName) == -1) {
				title = this.songObj.songName + '-' + this.songObj.singerName;
			}
			uni.setNavigationBarTitle({
				title
			});
			if (obj.isFloat && obj.isFloat == '1') {
				return;
			}
			if (!this.isPlaying) {
				playMusic(mp3Obj.url, (res) => {
					this.$store.commit("setMusicStatus", res);
				});
			}

		},
		beforeDestroy() {

		},
		methods: {
			setPlayMode() {
				//设置播放模式
			},
			playAction() {
				this.$store.commit("setMusicStatus", !this.isPlaying);
			}
		}
	}
</script>

<style lang="less" scoped>
	.play-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		filter: blur(200px);
	}

	.play-view,
	.animation-view,
	.play-controls,
	.center-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.play-controls,
	.center-controls {
		flex-direction: row;
	}

	.animation-view {
		margin-top: 100px;
		width: calc(100vw - 80px);
		height: calc(100vw - 80px);
	}

	.circle-round {
		width: calc(100vw - 80px);
		position: absolute;
		display: block;
	}

	.song-bg {
		width: 100px;
		height: 100px;
		border-radius: 50px;
		display: block;
		animation: circleRoate 8s infinite linear;
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

	.play-controls {
		position: absolute;
		bottom: 60px;
		justify-content: space-around;
		width: calc(100vw - 80px);
		left: 40px;
	}

	.play-icon {
		width: 40px;
	}

	.center-controls {
		width: 50vw;
		justify-content: space-around;
	}

	.privious,
	.next {
		width: 50px;
	}

	.needle-view {
		position: absolute;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		width: 60vw;
		height: 30vh;

		.needle {
			height: 180px;
			display: block;
			margin-left: 60px;
			// animation: needleRoate 2s linear;
			transform-origin: 20px -20px;
		}
	}

	@keyframes needleRoate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(-25deg);
		}
	}
</style>
