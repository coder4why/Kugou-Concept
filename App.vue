<script>
	// #ifdef APP-PLUS || H5
	import vConsole from 'vconsole';
	import {
		pauseMusic
	} from './utils/muiscTool';
	// #endif
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			// #ifdef APP-PLUS || H5
			// var vconsole = new vConsole();
			// #endif
			
		},
		onHide: function() {
		}
	}
</script>

<style lang='less'>

	/*每个页面公共css */
	/* @import './common/css/normal.less'; */
	@import 'static/iconfont/iconfont.css';

	::v-deep uni-swiper {
		height: 160px !important;
	}

	::v-deep uni-swiper .uni-swiper-dots-horizontal {
		left: 60px !important;
	}

	::v-deep .uni-navbar--border {
		border-bottom-style: none !important;
		;
	}
</style>
