const BASE_URL = 'http://42.194.193.249:3430'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if(res) {
					
				 //    uni.showToast({
					// 	title: '获取数据成功'
					// })
					resolve(res.data)
				}
				
			},
			fail: (err)=>{
				// uni.showToast({
				// 	title: '请求接口失败'
				// })
				reject(err)
			}
		})
	})
}