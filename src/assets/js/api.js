/**
 * Created by 熊超超 on 2018/9/13.
 */
import wepy from 'wepy'
import $router from '../../assets/js/router'
import $utils from '../../assets/js/utils'

// const baseUrl = 'https://www.ccqiuqiu.win/weapi'
const baseUrl = 'http://127.0.0.1:3000'
// api
export default {
  test: (data = {}, showError) => request('get', '/v1/weFace/test', data, showError),
  reg: (data = {}, showError) => request('post', '/v1/public/wxReg', data, showError),
  login: (data = {}, showError) => request('post', '/v1/public/wxLogin', data, showError)
}

const errorCode = {
  404: '接口不存在',
  500: '服务端异常'
}

// 请求响应拦截器
export const intercept = {
  config (p) {
    // 此处可以修改请求参数
    p.header['token'] = wepy.getStorageSync('token')
    if (p.url.indexOf('https://') !== 0) {
      p.url = baseUrl + p.url
    }
    console.log(p, baseUrl)
    return p
  },
  // 请求成功后的回调函数
  success (p) {
    if (p.statusCode !== 200) {
      p.data = {
        success: false,
        error: {
          code: p.statusCode,
          message: errorCode[p.statusCode]
        }
      }
    }
    // console.log('request success: ', p)
    return p
  },
  // 请求失败后的回调函数, 一般是客户端出错
  fail (p) {
    p.data = {
      success: false,
      error: {
        code: '0',
        message: p.errMsg
      }
    }
    // console.log('request fail: ', p)
    return p
  },
  // 请求完成时的回调函数(请求成功或失败都会被执行)
  complete (p) {
    console.log('request complete: ', p)
    if (!p.data.success) {
      if (p.data.error.code === 401) {
        // p.data.error.message = '未登录或已过期'
        /* eslint-disable no-undef */
        const pages = getCurrentPages()
        $router.redirectTo('/pages/login?url=/' + pages[pages.length - 1].route)
      }
      console.error(p.data.error.message)
    }
  }
}

// 请求封装
function request(method, url, data, showError) {
  return wepy.request({url, data, header: {}, method})
    .then((p) => {
      if (showError && !p.data.success) {
        $utils.message(p.data.error.message, 'error')
      }
      return p.data.success ? {data: p.data.data} : {error: p.data.error}
    })
    .catch((p) => {
      if (showError) {
        $utils.message(p.data.error.message, 'error')
      }
      return {error: p.data.error}
    })
}
