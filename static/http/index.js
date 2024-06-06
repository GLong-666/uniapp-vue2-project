import config from '@/static/config/index.js'

/**
 * @description 创建请求task
 * @param {String} method - 请求方式
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options 请求配置
 * @param {Boolean} options.is_cache 是否缓存数据
 * @param {Boolean} options.is_loading 是否显示loading
 * @param {String} options.loading_title loading文案
 */
const RequestTask = (method, url, data, options) => {
	return new Promise((resolve, reject) => {
		// 是否缓存数据，有缓存的话直接返回
		if (options.is_cache) {
			let cache_data = uni.getStorageSync('cache_data') || {}

			if (cache_data[url]) {
				return resolve(cache_data[url])
			}
		}

		// 是否显示loading
		if (options.is_loading) {
			uni.showLoading({
				title: options.loading_title || '',
				mask: true
			});
		}

		// 成功回调
		const success = res => {
			const data = res.data

			// 缓存数据，key是url
			if (options.is_cache) {
				let cache_data = uni.getStorageSync('cache_data') || {}
				cache_data[url] = data

				uni.setStorageSync('cache_data', cache_data)
			}

			return resolve(data)
		}

		// 失败回调
		const fail = err => {
			return reject(err)
		}

		// 执行完成回调
		const complete = () => uni.hideLoading()
		
		// 创建请求work
		uni.request({
			url: `${config.server_url}${url}`,
			header: {
				token: uni.getStorageSync('token')
			},
			method,
			data,
			success,
			fail,
			complete
		});
	})
}

/**
 * @description get请求方法
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options 请求配置
 */
export const Get = (url = '', data = {}, options = {}) => {
	return RequestTask('GET', url, data, options)
}

/**
 * @description post请求方法
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options 请求配置
 */
export const Post = (url = '', data = {}, options = {}) => {
	return RequestTask('POST', url, data, options)
}