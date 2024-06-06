// 项目配置项，区分开发、生产环境
let config = {}

// 开发环境
if (process.env.NODE_ENV === 'development') {
	config = {
		// 后端服务器地址
		server_url: 'https://api.dianlanzhijia.top'
	}
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
	config = {
		// 后端服务器地址
		server_url: 'https://api.dianlanzhijia.top'
	}
}

export default config