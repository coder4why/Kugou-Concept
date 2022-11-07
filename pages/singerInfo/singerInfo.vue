<template>
	<view>
		<view class="top-view">
			<image :src="singerInfo.imgurl" mode="widthFix"></image>
			<view class="intro">{{getIntro()}}</view>
		</view>
		<view class="songs-view">
			<view class="song-item" v-for="(item,index) in songs" :key="index">
				<view class="title" @click="playMusic(item)">{{getFileName(item,index)}}</view>
				<view class="right">
					<image class="media" src="../../static/images/global/video.png" mode="widthFix" @click="palyVideo(item)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { apiGetHotSingerSongs,apiGetHotSingerInfo ,apiGetMp3Url,apiGetMvDetail} from '../../utils/api'
	export default {
		data() {
			return {
				singerInfo:{},
				songs:[]
			}
		},
		onLoad(obj) {
			let singerinfo = JSON.parse(obj.info);
			uni.setNavigationBarTitle({
				title:singerinfo.singername
			});
			Promise.all([
				apiGetHotSingerInfo(singerinfo.singerid).then(res=>{
					return res;
				}),
				apiGetHotSingerSongs(singerinfo.singerid).then(res=>{
					return res;
				})
			]).then((values)=>{
				console.log('结果：',values);
				[this.singerInfo,this.songs] = [values[0].data,values[1].data.info];
				this.singerInfo.imgurl = singerinfo.imgurl;
				console.log(JSON.stringify(this.singerInfo));
				console.log(JSON.stringify(this.songs[0]));
			});
		},
		methods: {
			getIntro(){
				if(!this.singerInfo.intro){
					return '';
				}
				if(this.singerInfo.intro.length>130){
					return this.singerInfo.intro.substr(0,130)+'...';
				}else{
					return this.singerInfo.intro;
				}
			},
			getFileName(item,index){
				if(item.filename.length>30){
					return (index+1) + '	' +item.filename.substr(0,30)+"...";
				}else{
					return (index+1) + '	' +item.filename;
				}
			},
			playMusic(item){
				console.log(item);
				apiGetMp3Url(item.hash).then((res) => {
					if(res.data.url){
						let musicObj = {
							imgUrl: this.singerInfo.imgurl,
							singerName: item.filename,
							songName: this.singerInfo.singername,
							url: res.data.url
						};
						this.$store.commit('setMusicObj', musicObj);
						this.$store.commit('setMusicStatus', false);
						console.log('打印：', this.$store.state.musicObj);
						uni.navigateTo({
							url: "/pages/play/play"
						})
					}else{
						uni.showToast({
							title:"暂无权限"
						});
					}
				});
			},
			palyVideo(obj){
				apiGetMvDetail(obj.mvhash).then(res=>{
					if(res.data.mvdata && res.data.mvdata.sq && res.data.mvdata.sq.downurl && res.data.mvdata.sq.downurl.length>0){
						uni.navigateTo({
							url:'/pages/mvPlay/mvPlay?url='+res.data.mvdata.sq.downurl+"&title="+obj.filename
						})
					}else{
						uni.showToast({
							title:"暂无权限"
						})
					}
					
				});
			}
		}
	}
</script>

<style lang="less" scoped>
.top-view{
	height: 160px;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	image{
		width: 100vw;
		height: 160px;
		filter: blur(5px);
	}
	
}
.songs-view{
	margin: 15px;
	.song-item{
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 0.5px solid lightgray;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.title{
			font-size: 14px;
			font-weight: bold;
			text-overflow: ellipsis;
			line-height: 100rpx;
			white-space: nowrap;
			overflow: hidden;
			min-width: 75%;
		}
		image{
			width: 20px;
		}
	}
}
.right{
	display: flex;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.intro{
	position: absolute;
	left: 20px;
	right: 20px;
	color: white;
	font-size: 12px;
	text-indent: 2em;
	line-height: 20px;
	letter-spacing: 1px;
}
.media{
	width: 50px;
	height: 100rpx;
	display: block;
}
</style>
