const URL = 'http://v.juhe.cn/laohuangli/';
const util = require('./util.js')
const getUrl = uri => {
    return URL + uri;
}
const request = (url, options) => {

    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                'Content-Type': 'application/json; charset=UTF-8',
                'x-token': 'x-token' // 看自己是否需要
            },
            success(request) {
                // if (request.data.error_code === 0) {
                //     resolve(request.data)
                // } else {
                //     reject(util.tip("系统错误，请稍后再试"))
                // }
                resolve(request.data)
            },
            fail(error) {
                // reject(error.data)
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

// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}
// 案例
// api.get('d', {
//     date: "2019-01-01",
//     key: '6ee156b9fe48844b28e6abb08133e644'
// }).then(res => {
//     console.log(res)
// }).catch(err => {
// })
module.exports = {
    get,
    post,
    put,
    remove
}