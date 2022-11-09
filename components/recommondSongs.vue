<template>
	<view class="recommend-songs">
		<view class="recommend-item" v-for="(item,index) in songs" :key="index">
			<image class="item-image" :class="isVideo ? 'video-img':''" :src="item.imgurl" mode="widthFix"
				@click="playMusic(item)"></image>
			<view class="titles" @click="playMusic(item)">
				<view class="title" v-if="item.specialname">
					{{item.specialname}}
				</view>
				<view class="title subTitle" v-if="item.username">{{item.username}}</view>
			</view>
			<view class="play" @click="showVideo ?playVideo(item):null">
				<image :class="showVideo ? 'play-video' : 'play-image'"
					:src="showVideo ? require('../static/images/global/video.png') : require('../static/images/global/next.png')"
					mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		apiGetMp3Url,
		apiGetMvDetail
	} from '@/utils/api.js';
import { isNull } from '../utils/global';
	export default {
		name: "recommondSongs",
		props: {
			songs: {
				default: [],
				type: Array
			},
			showVideo: {
				default: false,
				type: Boolean
			},
			isRank: {
				default: false,
				type: Boolean
			},
			isVideo: {
				default: false,
				type: Boolean
			},
		},

		methods: {
			playMusic(obj) {
				console.log('是否榜单：', this.isRank);
				if (this.isRank) {
					this.$emit('playMusic', obj);
					return;
				}
				if (this.isVideo || (isNull(obj.hash) && !isNull(obj.mvhash))) {
					console.log('播放视频');
					this.playVideo(obj);
					return;
				}
				console.log('播放音频',JSON.stringify(obj));
				uni.showLoading();
				apiGetMp3Url(obj.hash).then((res) => {
					uni.hideLoading();
					if (res.data.url) {
						let musicObj = {
							imgUrl: res.data.imgUrl.replace('{size}', '150'),
							singerName: res.data.singerName,
							songName: res.data.songName,
							url: res.data.url
						};
						this.$store.commit('setMusicObj', musicObj);
						this.$store.commit('setMusicStatus', false);
						uni.navigateTo({
							url: "/pages/play/play"
						})
					} else {
						uni.showToast({
							title: "暂无权限"
						});
					}
				});
			},
			
			isVideoPage(){
				let curPage = getCurrentPages();
				let route = curPage[curPage.length - 1].route;
				return (route == 'pages/mvPlay/mvPlay');
			},
			
			playVideo(item) {
				console.log('111:',JSON.stringify(item));
				uni.showLoading();
				apiGetMvDetail(item.mvhash || item.hash).then(res => {
					uni.hideLoading();
					if (res.statusCode == 200 && res.data.mvdata && res.data.mvdata.sq.downurl && res.data.mvdata
						.sq.downurl.length > 0) {
							
							if(this.isVideoPage()){
								//销毁当前页面，定向到新页面
								uni.redirectTo({
									url: '/pages/mvPlay/mvPlay?url=' + res.data.mvdata.sq.downurl + "&title=" + 
										item.specialname + '&singername=' + (item.singername || item.username || item.specialname)
								})
							}else{
								//保留当前页面，跳转新页面
								uni.navigateTo({
									url: '/pages/mvPlay/mvPlay?url=' + res.data.mvdata.sq.downurl + "&title=" +
										item.specialname + '&singername=' + (item.singername || item.username || item.specialname)
								})
							}
					} else {
						uni.showToast({
							title: "暂无权限"
						})
					}

				});
			}
		},
	}
</script>

<style lang="less" scoped>
	.recommend-item {
		height: 60px;
		width: calc(100vw - 30px);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin: 5px 15px;
		border-bottom: 0.5px solid aliceblue;
		text-align: left;
		font-size: 14px;
		color: #222;
		background-size: calc(100vw - 30px) 160px;
		object-fit: cover;

		.item-image {
			display: block;
			width: 50px;
			height: 50px;
			border-radius: 5px;
			min-height: 50px;
			min-width: 50px;
		}

		.video-img {
			min-width: 100px;
			max-height: 50px;
		}

		.titles {
			height: 50px;
			margin-left: 10px;
			font-weight: bold;
			font-family: Arial, Helvetica, sans-serif;
			margin-right: 30px;
			min-width: 65%;
			word-wrap: break-word;
			align-self: flex-start;
			margin-top: 5px;

			.title {
				overflow: hidden;
				text-overflow: ellipsis;
				color: black;
				margin-right: 20px;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.subTitle {
				margin-top: 3px;
				color: darkgrey;
				font-size: 13px;
				overflow: hidden;
				margin-right: 20px;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.play {
			position: absolute;
			right: 15px;
			width: 30px;
			height: 30px;

			.play-image {
				display: block;
				width: 16px;
				height: 16px;
				margin: 8px;
			}

			.play-video {
				display: block;
				width: 20px;
				height: 20px;
				margin: 0px;
			}
		}
	}
</style>
