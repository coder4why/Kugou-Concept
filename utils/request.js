
export default async function request(url, method = 'GET', data = {}) {
	var	promise = await new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: "GET",
			data:data,
			success: (result) => {
				let data = result;
				if(typeof (result.data) == 'string' && result.data.indexOf('KG_TAG_RES_START') != -1){
					data = result.data.replace('<!--KG_TAG_RES_START-->',"").replace('<!--KG_TAG_RES_END-->','');
				}
				let res = data; 
				if(typeof(data) == 'string'){
					res = JSON.parse(data);
				}
				if (res || res.status == '1' || result.statusCode == '200') {
					// console.log('成功');
					resolve(res);
				} else {
					uni.showToast({
						title: '接口调用失败',
						duration: 1500
					});
				}
			},
			fail: (error) => {
				reject(error);
			}
		});
	});
	return promise;
}
