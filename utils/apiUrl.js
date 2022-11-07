let isH5 = false;
// #ifdef H5
isH5 = true
// #endif

console.log("是否是浏览器:", isH5);

const Base_Url = isH5 ? "/mobilecdnbj" : 'http://mobilecdnbj.kugou.com/api';
const Base_Url_mKg = isH5 ? "/mKg" : "http://m.kugou.com";
const Base_Url_mkg_https = isH5 ? "/mKg" : "https://m.kugou.com";
const Base_url_sSearch = isH5 ? "/sSearch" : "http://msearchcdn.kugou.com/api/v3";
const Base_url_mSearch = isH5 ? "/mSearch" : "http://msearch.kugou.com/api/v3/search/mv";
const Base_url_aSearch = isH5 ? "/aSearch" : "http://mobilecdn.kugou.com/api/v3";

export const API = {

	"GetMp3Url": Base_Url_mKg + "/app/i/getSongInfo.php?cmd=playInfo&hash=",

	"DiscoverList": Base_Url +
		"/v3/rank/list?version=9108&plat=0&showtype=2&parentid=0&apiver=6&area_code=1&withsong=1&with_res_tag=1",
	"MainList": Base_Url + "/v3/tag/specialList?plat=0&page=1&tagid=12&pagesize=30&ugc=1&id=68&sort=3",

	"DiscoverRankList": Base_Url_mkg_https + "/rank/info/?rankid={rankid}&page=1&json=true",

	"SearchMusicList": Base_url_sSearch +
		"/search/song?showtype=14&highlight=em&pagesize=30&tag_aggr=1&tagtype=全部&plat=0&sver=5&keyword={keyword}&correct=1&api_ver=1&version=9108&page=1&area_code=1&tag=1&with_res_tag=1",

	"MVDetail_2": Base_Url_mKg + "/app/i/mv.php?cmd=100&hash={mvhash}&ismp3=1&ext=mp4",

	//获取热门歌手列表：
	"HotSingerList": Base_Url +
		"/v5/singer/list?version=9108&showtype=1&plat=0&sextype=0&sort=1&pagesize=6&type=0&page=1&musician=0",

	//根据歌手singerid查询歌手信息：
	"HotSingerInfo": Base_Url + "/v3/singer/info?singerid={singerid}&with_res_tag=1",

	//根据歌手id singerid查询歌手所有歌曲
	"HotSingerSongs": Base_Url +
		"/v3/singer/song?sorttype=2&version=9108&identity=3&plat=0&pagesize=100&singerid={singerid}&area_code=1&page=1&with_res_tag=1",

	"MainSongsList": Base_Url +
		"/v3/rank/newsong?version=9108&plat=0&with_cover=1&pagesize={pagesize}&type={type}&area_code=1&page={page}&with_res_tag=1"

}

export const SearchAPI = {
	
	//单曲搜索
	"SingleSong": Base_url_sSearch +  "/search/song?showtype=14&highlight=em&pagesize={pagesize}&tag_aggr=1&tagtype=全部&plat=0&sver=5&keyword={keyword}&correct=1&api_ver=1&version=9108&page=1&area_code=1&tag=1&with_res_tag=1",
	//视频搜索
	"MediaVideo": Base_url_mSearch + "?version=9108&highlight=em&keyword={keyword}&pagesize={pagesize}&page=1&sver=2&with_res_tag=1",
	//歌单搜索
	"SongList": Base_Url + "/v3/search/special?version=9108&highlight=em&keyword={keyword}&pagesize={pagesize}&filter=0&page=1&sver=2&with_res_tag=1",
	//专辑搜索
	"AlbumList": Base_Url + "/v3/search/album?version=9108&iscorrection=1&highlight=em&plat=0&keyword={keyword}&pagesize={pagesize}&page=1&sver=2&with_res_tag=1",
	//专辑信息
	"AlbumInfo": Base_url_aSearch +  "/album/song?version=9108&albumid={albumid}&plat=0&pagesize={pagesize}&area_code=1&page=1&with_res_tag=1"

};
