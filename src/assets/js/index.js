/**
 * Created by 熊超超 on 2018/9/12.
 */
import wepy from 'wepy'

import { getStore } from 'wepy-redux'
import Immutable from 'seamless-immutable'  // https://github.com/rtfeldman/seamless-immutable
import api, {intercept} from './api'
import $router from './router'
import $utils from './utils'

const $IM = Immutable

export default {
  install() {
    wepy.component.prototype.$IM = $IM
    wepy.component.prototype.$store = getStore()
    wepy.component.prototype.$api = api
    wepy.component.prototype.$utils = $utils
    wepy.component.prototype.$router = $router
    wepy.app.prototype.$api = api
  },
  $IM,
  $store: getStore(),
  intercept,
  $utils,
  $router
}
