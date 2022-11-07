<template>
	<view class="swiper-banner">
		<swiper indicator-dots indicator-color='rgba(255,255,255,0.3)' autoplay indicator-active-color="#FFFFFF"
			interval="3000" circular previous-margin="15px" next-margin="0px">
			<swiper-item style="height: 180px;" v-for="(item,index) in banners" :key="index">
				<view class="swiper-item">
					<image :src='item' class="banner-image" mode="heightFix"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "swiperBanner",
		data() {
			return {
				banners: [
					"http://p1.music.126.net/HUocfL_MLu51IBNbc8L3Cg==/109951168013888720.jpg?imageView&quality=89",
					"http://p1.music.126.net/olbRkbn05pdzgYWtzmd39w==/109951168010072539.jpg?imageView&quality=89",
					"http://p1.music.126.net/pFsw-3QoQStGVO7MOY2JVw==/109951168013942316.jpg?imageView&quality=89",
					"http://p1.music.126.net/N8EXz4YPp2s64imMNCVSNA==/109951168013969500.jpg?imageView&quality=89",
					"http://p1.music.126.net/wyBs07cxERS6bSy-oLg-_g==/109951168013950218.jpg?imageView&quality=89"
				]
			};
		}
	}
</script>

<style lang="less" scoped>
	.swiper-banner {
		margin: 10px 0;
		height: 160px;
		// background-color: yellow;
	}

	.swiper-item {
		height: 160px;
		width: calc(100vw - 30px);
		display: flex;
		align-items: center;
		justify-content: center;
		// background-color: red;
	}

	.banner-image {
		display: block;
		border-radius: 10px;
		height: 160px;
		width: calc(100vw - 30px);
	}

</style>
