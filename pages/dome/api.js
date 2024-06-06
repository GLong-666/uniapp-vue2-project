import { Get, Post } from '@/static/http/index.js'

export const check_login = data => Post('/app_api/check_login', data)

export const check_login_2 = data => Get('/app_api/check_login', data)