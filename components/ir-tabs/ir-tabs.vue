<template>
	<view :style="{width, overflow: 'hidden'}">
		<!-- nav -->
		<view class="ir-nav-con" :style="{width, background: navBgColor}">
			<view v-for="(nav, index) in navs" :key="index"
				:class="['ir-nav', {'ir-active': currNav === index, 'ir-over-hide': navEqual}]"
				:style="{backgroundColor: currNav === index && navType === 'card' ? activeColor : ''}"
				@click="changeNav(index)">
				<image v-if="nav.icon && currNav !== index" :src="nav.icon" class="ir-nav-icon" />
				<image v-if="nav.activeIcon && currNav === index" :src="nav.activeIcon" class="ir-nav-icon" />
				<text class="ir-nav-text" :style="{
					color: textColor(index),
					fontSize: currNav === index ? '18px': '16px'
				}">{{nav.name || nav}}</text>
				<view
					v-if="navType === 'border'"
					class="ir-line"
					:style="{backgroundColor: currNav === index ? activeColor : ''}" />
			</view>
		</view>
		<view class="ir-page-con" :style="{transform: `translateY(${transY}rpx)`, height: pageH}">
			<!-- loagding -->
			<view v-if="showLoading" class="ir-loading-con" :style="{backgroundColor: loadingBg}">
				<!-- #ifndef APP-NVUE -->
				<view class="ir-loading">
					<view
						v-for="item in [1,2,3,4,5]"
						:key="item"
						:class="['ir-loading-point', `ir-loading-point${item}`, {'ir-loading-ani': loadingAni}]"
						:style="{background: loadingColor}" />
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<view class="ir-circle" :style="{
					transform: `rotate(${angle}deg)`,
					borderLeftColor: loadingColor,
					borderRightColor: loadingColor}"></view>
				<!-- #endif -->
			</view>
			<!-- 多个页面共用一个slot -->
			<view
				v-if="!multiple"
				:class="['ir-page', {transition: transAni}]"
				:style="[pageStyle, {transform: `translateX(${transX}rpx)`}]"
				@touchstart="touchstart"
				@touchmove="touchmoveS"
				@touchend='touchendS'
				@touchcancel='touchendS'>
				<slot>default</slot>
			</view>
			<!-- 多页分别为不同slot -->
			<view
				v-if="multiple"
				:class="['ir-flex', {transition: transAni}]"
				:style="{transform: `translateX(${transX}rpx)`}"
				@touchstart="touchstart"
				@touchmove="touchmove"
				@touchend='touchend'
				@touchcancel="touchend">
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page1">1</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page2">2</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page3">3</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page4">4</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page5">5</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page6">6</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page7">7</slot>
				</view>
				<view class="ir-page" :style="[pageStyle]">
					<slot name="page8">8</slot>
				</view>
			</view>
		</view>
		<view v-if="showLoadingMask && showLoading" class="ir-loading-mask" :style="{background: loadingMaskBg}" />
	</view>
</template>

<script>
	/**
	 * IrTabs 标签页
	 * @description 用于展示同一页面不同标题下内容
	 * @property {String} width 整个组件宽度（宽度+单位）
	 * @property {String} height 整个组件高度（高度+单位）
	 * @property {String} navType 选项卡样式，可选border和card
	 * @property {Array} navs 选项卡标题列表 **必填
	 * @property {String} navTextColor 选项卡未选中文字颜色
	 * @property {String} navBgColor 选项卡背景颜色
	 * @property {Number} curr 当前选中项，从0开始
	 * @property {Boolean} multiple 为true时，每个选项卡传入一个slot内容，默认false
	 * @property {String} activeColor 选中项颜色
	 * @property {String} activeTextColor 选中项文字颜色（navType为border时，不传入则与activeColor相同）
	 * @property {String} fontSize 选项卡字体大小（大小+单位）
	 * @property {Boolean} navEqual 每个选项卡是否宽度是否相等，默认为true；false则根据文字长度自动分配
	 * @property {Boolean} pullRefresh 是否启用下拉刷新
	 * @property {Boolean} loading 是否展示loading样式，使用下拉刷新功能，loading为必填项
	 * @property {String} loadingColor loading动画点颜色
	 * @property {String} loadingBg loading动画背景颜色
	 * @property {Boolean} showLoadingMask loading是否有遮罩
	 * @property {String} loadingMaskBg loading遮罩颜色
	 * 
	 * 
	 * @slot 每一页的slot name分别为page1，page2……，最大可容纳8个子页面
	 * 
	 * 
	 * 注：在nvue中使用下拉刷新时，页面隐藏或销毁时，请将loading设置为false，以免造成不必要的资源浪费
	 */
	
	export default {
		name:"IrTabs",
		model: {
		    prop: "value",
			event: "change",
		},
		props: {
			height: {
				type: String,
				default: '100vh',
				// #ifdef H5
				default: 'calc(100vh - 88rpx)'
				// #endif
			},
			width: {
				type: String,
				default: '750rpx'
			},
			navType: {
				type: String,
				default: 'border'
			},
			navs: {
				type: Array,
				required: true
			},
			navBgColor: {
				type: String,
				default: '#fff'
			},
			navTextColor: {
				type: String,
				default: ''
			},
			value: {
				type: Number,
				default: 0
			},
			multiple: {
				type: Boolean,
				default: false
			},
			activeColor: {
				type: String,
				default: '#007AFF'
			},
			activeTextColor: {
				type: String,
				default: ''
			},
			fontSize: {
				type: String,
				default: '30rpx'
			},
			navEqual: {
				type: Boolean,
				default: true
			},
			pullRefresh: {
				type: Boolean,
				default: false
			},
			loading: {
				type: [Boolean, String],
				default: 'undefined'
			},
			loadingColor: {
				type: String,
				default: '#007AFF'
			},
			loadingBg: {
				type: String,
				default: '#fff'
			},
			showLoadingMask: {
				type: Boolean,
				default: true
			},
			loadingMaskBg: {
				type: String,
				default: 'transparent'
			}
		},
		data() {
			return {
				currNav: 0,		// 选中的卡片index
				transX: 0,		// 模块在x方向的偏移
				transY: 0,		// 模块在y方向的偏移
				prevTransX: 0,	// 模块原本在x方向的偏移
				start: false,		// 是否开始滑动
				startX: 0,		// 手指接触开始时在x轴的位置
				startY: 0,		// 手指接触开始时在y轴的位置
				size: 750,		// 组件所占宽度（Number类型）
				transAni: false,	// translate时是否启用transtion动画效果
				attrNameX: 'clientX',		// 获取x轴数据的属性名（nvue中不同）
				attrNameY: 'clientY',		// 获取y轴数据的属性名（nvue中不同）
				pageStyle: null,		// 页面动态样式
				leftOrTop: 'left',		// 延x轴还是y轴移动
				ltFlag: false,		// 是否已经设置移动方向
				showLoading: false,	// 是否显示下拉刷新loading
				loadingAni: false,		// 是否开始loading动画
				disabled: false,		// loading过程中，不能进行各项操作
				// #ifdef APP-NVUE
				angle: 130,		// loading初始角度（nvue）
				timer: null		// loading角度设置计时器（nvue）
				// #endif
			}
		},
		computed: {
			// 页面除去导航栏的高度
			pageH() {
				return `calc(${this.height} - 84rpx)`
			}
		},
		watch: {
			value(val){
				this.currNav = val;
				console.log(val);
				
			},
			loading(val) {
				// 当loading状态为false时，恢复初始状态
				if (!val) {
					this.showLoading = false
					this.transY = 0
					this.loadingAni = false
					this.disabled = false
					// #ifdef APP-NVUE
					clearInterval(this.timer)
					this.angle = 130
					// #endif
				}
			}
		},
		created() {
			this.pageStyle = {
				height: this.pageH,
				width: this.width,
				minWidth: this.width,
				maxWidth: this.width
			}
			this.size = parseInt(this.width)
			// 设置当前选中项
			this.currNav = this.value
			this.prevTransX = this.transX = -this.value * this.size
			// #ifdef APP-NVUE
			this.attrNameX = 'screenX'
			this.attrNameY = 'screenY'
			// #endif
			if (this.pullRefresh && this.loading === 'undefined') {
				throw new Error('使用下拉刷新功能，loading为必填项')
			}
		},
		destroyed() {
			if (this.timer) {
				clearInterval(this.timer)
			}
		},
		methods: {
			// touchstart 通用
			touchstart(e) {
				if (this.disabled) return
				this.start = true
				this.startX = e.changedTouches[0][this.attrNameX]
				this.startY = e.changedTouches[0][this.attrNameY]
			},
			// 每个页面内容相同时，touchmove
			touchmoveS(e) {
				if (this.disabled || !this.start) return
				const min = -this.size
				const max = this.size
				const left = this.getLength(e, 'X')
				const top = this.getLength(e, 'Y')
				const curr = this.currNav
				const lot = this.setDirection(left, top)
				
				// 左右滑动
				if (lot === 'left') {
					// #ifdef APP-NVUE
					this.transAni = true
					// #endif
					if (curr === 0 && left > 0
						|| curr === this.navs.length - 1 && left < 0
						|| left > max || left < min) return
					this.transX = left
				} else {	// 上下滑动
					this.movingY(top)
				}
			},
			// 每个页面内容相同时，touchend
			touchendS(e) {
				if (this.disabled || !this.start) return
				const left = this.getLength(e, 'X')
				const top = this.getLength(e, 'Y')
				const curr = this.currNav
				const size = this.size
				this.ltFlag = false
				// 左右滑动
				if (this.leftOrTop === 'left') {
					if (curr === 0 && left > 0
						|| curr === this.navs.length - 1 && left < 0) return
					let transX = 0
					if (left > 200) {
						transX = size
					} else if (left < -200) {
						transX = -size
					}
					
					this.transAni = true
					this.transX = transX
					setTimeout(_ => {
						this.transAni = false
						this.transX = -transX
						this.currNav += this.transX / size
						// #ifdef APP-NVUE
						this.transX = transX
						this.currNav += -this.transX / size
						// #endif
						if (transX !== 0) {
							this.$emit('updata:curr', this.currNav)
							this.$emit('navChange', this.currNav)
						}
						this.$nextTick(_ => {
							setTimeout(_ => {
								this.transAni = true
								this.transX = 0
							}, 30)
						})
					}, 300)
				} else {	// 上下滑动
					this.setTransY(top)
				}
				this.start = false
			},
			// 每个页面内容不相同时，touchmove
			touchmove(e) {
				if (this.disabled || !this.start) return
				const size = this.size
				const min = -(this.navs.length - 1) * size
				const max = 0
				const left = this.getLength(e, 'X')
				const top = this.getLength(e, 'Y')
				
				const lot = this.setDirection(left, top)
				
				// 左右滑动
				if (lot === 'left') {
					// #ifdef APP-NVUE
					this.transAni = true
					// #endif
					if (left > size || left < -size) return
					let transX = this.prevTransX + left
					if (transX > max) {
						transX = max
					} else if (transX < min) {
						transX = min
					}
					this.transX = transX
				} else {	// 上下滑动
					this.movingY(top)
				}
			},
			// 每个页面内容不相同时，touchend
			touchend(e) {
				if (this.disabled || !this.start) return
				const left = this.transX - this.prevTransX
				const top = this.getLength(e, 'Y')
				const size = this.size
				let trans = 0
				this.ltFlag = false
				// 左右滑动
				if (this.leftOrTop === 'left') {
					if (left > 200) {
						trans = size
					} else if (left < -200) {
						trans = -size
					}
					this.transAni = true
					this.transX = this.prevTransX + trans
					this.prevTransX = this.transX
					this.currNav = Math.abs(this.transX / size)
					if (trans !== 0) {
						this.$emit('updata:curr', this.currNav)
						this.$emit('navChange', this.currNav)
					}
					setTimeout(_ => { this.transAni = false }, 300)
				} else {	// 上下滑动
					this.setTransY(top)
				}
				this.start = false
			},
			// 点击菜单
			changeNav(index) {
				if (this.disabled) return
				// #ifdef APP-NVUE
				this.transAni = true
				// #endif
				this.currNav = index
				this.$emit('updata:curr', index)
				this.$emit('navChange', index)
				if (this.multiple) {
					this.prevTransX = this.transX = -index * this.size
				}
			},
			// 获取移动的距离
			getLength(e, attr) {
				return (e.changedTouches[0][this[`attrName${attr}`]] - this[`start${attr}`]) * 2
			},
			// 设置滑动方向
			setDirection(left, top) {
				let lot = this.leftOrTop
				if (!this.ltFlag) {
					lot = Math.abs(left) < Math.abs(top) ? 'top' : 'left'
					this.leftOrTop = lot
					this.ltFlag = true
				}
				return lot
			},
			// y轴移动中数据设置
			movingY(top) {
				if (!this.pullRefresh) return
				if (top > 100 || top < 0) return
				this.transY = top - 100
				this.showLoading = true
			},
			// y轴方向滑动结束后
			setTransY(top) {
				if (!this.pullRefresh) return
				if (top >= 100) {
					this.loadingAni = true
					this.$emit('refresh')
					this.disabled = true
					// #ifdef APP-NVUE
					this.$nextTick(_ => {
						this.angle += 360
						this.timer = setInterval(()=>{  //创建定时器,3秒执行异一次
							this.angle += 360
						}, 700)
					})
					// #endif
				} else {
					this.showLoading = false
					this.transY = 0
				}
			},
			// 设置菜单字体颜色
			textColor(index) {
				let color = ''
				if (this.navType === 'border' && this.currNav === index) {
					color = this.activeTextColor || this.activeColor
				} else if (this.navType === 'card' && this.currNav === index) {
					color = this.activeTextColor
				} else {
					color = this.navTextColor
				}
				return color
			}
		}
	}
</script>

<style lang="scss" scoped>

.ir-nav-con {
	display: flex;
	flex-direction: row;
	// box-shadow: 0 0 16rpx 0 rgba(0,0,0,.3);
	justify-content: space-between;
	height: 84rpx;
	box-sizing: border-box;
	overflow: hidden;
	position: absolute;
	z-index: 1;
}
.ir-nav-con .ir-nav {
	display: flex;
	flex-direction: row;
	padding: 18rpx 10rpx 22rpx 10rpx;
	flex: 1;
	text-align: center;
	justify-content: center;
	align-items: center;
	white-space: nowrap;
}
.ir-over-hide {
	overflow: hidden;
	text-overflow: ellipsis;
}
.ir-nav-con .ir-nav .ir-nav-text {
	text-align: center;
	font-weight: bold;
}
.ir-nav-con .ir-nav .ir-nav-icon {
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
.ir-nav-con .ir-nav.ir-active {
	position: relative;
}
.ir-nav-con .ir-nav.ir-active .ir-line {
	content: '';
	// width: 64rpx;
	// height: 4rpx;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 14px;
	height: 4px;
	border-radius: 2px;
}

.ir-page-con {
	margin-top: 84rpx;
}

.ir-loading-con {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 150rpx;
}
.ir-loading {
	width: 150rpx;
	flex-direction: row;
}
.ir-loading .ir-loading-point {
	display: inline-block;
	width: 20rpx;
	height: 20rpx;
	margin-right: 10rpx;
	border-radius: 50%;
}
.ir-loading-ani {
	animation: irLoad 1.04s ease infinite;
}
.ir-loading .ir-loading-point.ir-loading-point0 {
	margin-right: 0; 
}
@-webkit-keyframes irLoad {
	0% { opacity: 1; }
	100% { opacity: 0; }
}
.ir-loading .ir-loading-point.ir-loading-point0 {
	-webkit-animation-delay: 0.13s;
	opacity: .2;
}
.ir-loading .ir-loading-point.ir-loading-point1 {
	-webkit-animation-delay: 0.26s;
	opacity: .4;
}
.ir-loading .ir-loading-point.ir-loading-point2 {
	-webkit-animation-delay: 0.39s;
	opacity: .6;
}
.ir-loading .ir-loading-point.ir-loading-point3 {
	-webkit-animation-delay: 0.52s;
	opacity: .8;
}
.ir-loading .ir-loading-point.ir-loading-point4 {
	-webkit-animation-delay: 0.65s;
	opacity: 1;
}

.ir-circle{
	width: 40rpx;
	height: 40rpx;
	border: 6rpx transparent solid;
	border-radius: 100%;
	transition: transform 0.7s linear;
}

.ir-flex {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 750rpx;
}
.ir-transition {
	transition: transform 0.3s;
}
.ir-page {
	overflow: hidden;
}
.ir-loading-mask {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 2;
}
</style>
