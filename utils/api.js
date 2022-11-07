import {
	API,
	SearchAPI
} from "./apiUrl";
import request from "./request";

export function apiGetMainLists(type, pagesize = 5, page = 1) {
	let url = API.MainSongsList.replace('{type}', type).replace('{pagesize}', pagesize).replace('{page}', page);
	return request(url, {});
}

export function apiGetDiscoverLists(data = {}) {
	return request(API.DiscoverList, data);
}

export function apiGetMusicUrl(songid) {
	return request(API.Mp3Url + songid, {});
}

export function apiGetRankList(rankid) {
	let url = API.DiscoverRankList.replace('{rankid}', rankid);
	return request(url, {});
}

export function apiGetMp3Url(mp3Hash) {
	let url = API.GetMp3Url + mp3Hash;
	return request(url, {});
}

export function apiGetMvDetail(mvhash) {
	let url = API.MVDetail_2.replace('{mvhash}', mvhash);
	return request(url, {});
}

export function apiGetHotSingers() {
	let url = API.HotSingerList;
	return request(url, {});
}

export function apiGetHotSingerInfo(singerid) {
	let url = API.HotSingerInfo.replace('{singerid}', singerid);
	return request(url, {});
}

export function apiGetHotSingerSongs(singerid) {
	let url = API.HotSingerSongs.replace('{singerid}', singerid);
	return request(url, {});
}

// 单曲搜索
export function apiSearchMusic_SingleSong(keyword,pagesize = 5) {
	let url = SearchAPI.SingleSong.replace('{keyword}', keyword).replace("{pagesize}",pagesize);
	return request(url, {});
}

// 视频搜索
export function apiSearchMusic_MediaVideo(keyword,pagesize = 5) {
	let url = SearchAPI.MediaVideo.replace('{keyword}', keyword).replace("{pagesize}",pagesize);
	return request(url, {});
}

// 歌单搜索
export function apiSearchMusic_SongList(keyword,pagesize = 5) {
	let url = SearchAPI.SongList.replace('{keyword}', keyword).replace("{pagesize}",pagesize);
	return request(url, {});
}

// 专辑搜索
export function apiSearchMusic_AlbumList(keyword,pagesize = 5) {
	let url = SearchAPI.AlbumList.replace('{keyword}', keyword).replace("{pagesize}",pagesize);
	return request(url, {});
}

// 专辑信息
export function apiSearchMusic_AlbumInfo(albumid,pagesize = 5) {
	let url = SearchAPI.AlbumInfo.replace('{albumid}', keyword).replace("{pagesize}",pagesize);
	return request(url, {});
}
