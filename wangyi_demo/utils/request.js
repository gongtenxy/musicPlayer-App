// 发送Ajax请求
/*
1.封装功能函数
  功能点明确
  函数内部保留固定代码（静态的）
  将动态数据抽取成形参，由使用者据自身情况动态传入实参
  一个良好的功能函数应该设置形参的默认值（ES6的形参默认值）
2.封装功能组件
  功能点明确
  函数内部保留固定代码（静态的）
  将动态数据抽取成props参数，由使用者据自身情况以标签属性形式动态传入props数据
  一个良好的组件应该设置组件的必要性及数据类型
 */
import config from './config'
export default (url, data={}, method='GET')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: config.mobileHost + url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success:(res)=>{
        if(data.isLogin){
          wx.setStorage({
            data: res.cookies,
            key: 'cookies',
          })
        }
        resolve(res.data);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })

  
}