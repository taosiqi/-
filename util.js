// 格式化时间
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 时分
const hour = date => {
        const hour = date.getHours()
        const minute = date.getMinutes()

        return [hour, minute].map(formatNumber).join(':')
    }
// 年月日
const year = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
// 提示
const tip = (msg) => {
    wx.showToast({
        title: msg,
        mask: true,
        icon: 'none'
    });
}
module.exports = {
    formatTime: formatTime,
    hour: hour,
    year: year,
    tip:tip
}