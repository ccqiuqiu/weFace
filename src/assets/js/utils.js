/**
 * Created by 熊超超 on 2018/9/12.
 */
import wepy from 'wepy'

import { getStore } from 'wepy-redux'
import Immutable from 'seamless-immutable'  // https://github.com/rtfeldman/seamless-immutable
import api, {intercept} from './api'

const $IM = Immutable
const $store = getStore()

export default {
  install() {
    wepy.component.prototype.$IM = $IM
    wepy.component.prototype.$store = $store
    wepy.component.prototype.$api = api
    wepy.app.prototype.$api = api
  },
  $IM,
  $store,
  intercept
}
