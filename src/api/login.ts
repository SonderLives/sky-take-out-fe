import request from '@/utils/request'

enum API {
  LOGIN_URL = '/employee/login',
}

export interface loginForm {
  username: string
  password: string
}

export interface loginResponseData {
  id: number
  name: string
  token: string
  userName: string
}

export const login = (data: loginForm) =>
  request({
    url: API.LOGIN_URL,
    method: 'post',
    data: data,
  })
