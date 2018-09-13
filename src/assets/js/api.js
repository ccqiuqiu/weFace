/**
 * Created by 熊超超 on 2018/9/13.
 */
import wepy from 'wepy'

// api
export default {
  test: (data = {}) => request('get', 'https://www.ccqiuqiu.win/v1/public/test', data)
}

// 请求响应拦截器
export const intercept = {
  config (p) {
    // 此处可以修改请求参数
    // p.header['token'] = 'ddddd'
    return p
  },
  // 请求成功后的回调函数
  success (p) {
    if (p.statusCode !== 200) {
      p.data = {
        success: false,
        error: {
          code: p.statusCode,
          message: p.errMsg
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
    // console.log('request complete: ', p)
  }
}

// 请求封装
function request(method, url, data) {
  return wepy.request({url, data, header: {}, method})
    .then((p) => p.data.success ? {data: p.data.data} : {error: p.data.error})
    .catch((p) => ({error: p.data.error}))
}
