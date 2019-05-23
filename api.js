const URL = 'http://v.juhe.cn/laohuangli/';
const getUrl = uri => {
    return URL + uri;
}
const request = (url, options) => {
    console.log(JSON.stringify(options.data))
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                'Content-Type': 'application/json; charset=UTF-8',
                'x-token': 'x-token'  // 看自己是否需要
            },
            success(request) {
                if (request.data.code === 2000) {
                    resolve(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {
                reject(error.data)
            }
        })
    })
}

const get = (url, options = {}) => {
    return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
    return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
    return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, { method: 'DELETE', data: options })
}
// 案例
// api.get('now', {
//     location:'beijing',
//     key: 'e3500ec8708c4caa9e5049e640764f1c'
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