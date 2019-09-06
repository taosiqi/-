const URL = 'https://cimagecloud.utools.club/index.php/';
const util = require('./util.js')
const getUrl = uri => {
  return URL + uri;
}
const request = (url, options) => {
  return new Promise((resolve, reject) => {
    options.data.qrCode = wx.getStorageSync('rd_session') ?JSON.parse(wx.getStorageSync('rd_session'))[0]['qrCode']:'';
    wx.request({
      url: getUrl(url),
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(util.tip("系统错误，请稍后再试"))
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}

const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}

const remove = (url, options) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}
//直接过滤返回res.data 这里回去调handleError判断其他异常
const handelResponse = (res, cb, errCb) => {
  if (res.code == 200) {
    return cb(res.data)
  } else {
    if (typeof errCb == 'function') {
      errCb()
      handleError(res)
    } else {
      handleError(res)
    }
    return res.data
  }
}
const handleError = (res) => {
  if (res.code) {
    switch (res.code) {
      case 201:
        util.tip(res.error)
        break
      default:
        util.tip(res.error)
    }
  } else {
    util.tip("系统错误，请稍后再试")
  }
}
module.exports = {
  get,
  post,
  put,
  remove,
  handelResponse,
  handleError
}