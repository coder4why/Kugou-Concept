const innerAudioContext = uni.createInnerAudioContext();
export function playMusic(url,callback) {
	innerAudioContext.autoplay = true;
	innerAudioContext.src = url;
	innerAudioContext.onPlay(() => {
		callback && callback(true);
	});
	innerAudioContext.onError((res) => {
		uni.showToast({
			title:'播放异常'
		});
		callback && callback(false);
	});
	innerAudioContext.onEnded((res) => {
		callback && callback(false);
	});
}

export function pauseMusic() {
	innerAudioContext.pause();
}

export function resumePlay() {
	innerAudioContext.play();
}
