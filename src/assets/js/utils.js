/**
 * Created by 熊超超 on 2018/9/12.
 */
import wepy from 'wepy'
import {$Message} from 'wepy-iview'

export default {
  setTitle: title => wepy.setNavigationBarTitle({ title }),
  message: (content, type = 'default', duration = 3000) => $Message({content, type, duration: duration / 1000})
}
