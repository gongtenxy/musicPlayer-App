/*
登录流程
1.收集表单数据
2.前端验证
  验证用户信息合法性
  前端验证不通过提示用户，不发请求给后端
  前端验证通过，发请求给后端（携带账户，密码）给服务器
3.后端验证
  验证用户是否存在
  不存在，返回并告诉前端用户不存在
  用户存在验证密码是否正确
  密码不正确返回前端提示密码不正确
  密码正确返回前端数据，提示登录成功（携带用户相关信息）
*/
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
  },

  //表单内容改变回调
  handleInput(event){
    let type = event.currentTarget.dataset.type //data-id: key:value形式
    this.setData({
      [type]:event.detail.value
    })
  },
  //登录回调
  async login(){
    let {phone,password} = this.data;
    /*
    内容为空
    格式不正确
    通过
    */
   if(!phone){
    wx.showToast({
      title:'手机号不能为空',
      icon: 'none'
    })
    return;
   }
   let phoneReg = /^1[3-9]\d{9}$/;
   if(!phoneReg.test(phone)){
    wx.showToast({
      title:'手机号格式不正确',
      icon: 'none'
    })
    return;
   }
   if(!password){
    wx.showToast({
      title:'密码不能为空',
      icon: 'none'
    })
    return;
   }
  //  wx.showToast({
  //    title: '前端验证通过',
  //  })

  //  后端验证
  let result = await request('/login/cellphone',{phone,password,isLogin:true});
  if(result.code === 200){
    wx.showToast({
      title: '登陆成功',
    })
    //将用户信息存至本地
    wx.setStorageSync("userInfo", JSON.stringify(result.profile))
    //跳转到个人中心页
    wx.reLaunch({
      url: '/pages/personal/personal',
    })
  }else if(result.code === 501){
    wx.showToast({
      title: '账号不存在',
      icon:'none'
    })
    
  }else if(result.code === 502){
    wx.showToast({
      title: '密码错误',
      icon:'none'
    })
  }else{
    wx.showToast({
      title: '登陆失败，请重新登录',
      icon:'none'
    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})