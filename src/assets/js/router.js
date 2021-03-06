import wepy from 'wepy'

/**
 * Created by 熊超超 on 2018/9/18.
 */

export default {
  redirectTo: url => wepy.redirectTo({url}), // 关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到 tabbar 页面。
  reLaunch: url => wepy.reLaunch({url}), // 关闭所有页面，打开到应用内的某个页面,
  navigateTo: url => wepy.navigateTo({url}), // 保留当前页面，跳转到应用内的某个页面，但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。
  switchTab: url => wepy.switchTab({url}), // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  navigateBack: (delta = 1) => wepy.navigateBack({delta}) // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
}
