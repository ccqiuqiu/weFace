const path = require('path')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    /* sass: {
      outputStyle: 'compressed'
    }, */
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
    iview: {
      pagePath: 'pages',
      // 可选，默认为 pages。如果页面目录不为pages，或有多个目录, 通过此值设置。
      // 参考配置：
      // pagePath: 'page2'                         page2为页面有目录
      // pagePath:['page1','page2',...]            多页面目录

      config: {
        inject: true,
        // 可选，默认为 true, 注入iView的全部组件。 如果不想全部, 通过此值设置。
        // 参考配置：
        // inject: false 不注入任何组件
        // inject:['button','icon',...] 只注入部分组件
        // 若inject为false，在页面中设置 config = {
        //     iView: ['button', 'card']
        //   } 可以为页面单独注入组件

        prefix: 'i-',
        // 可选，默认为 'i-', 组件名前缀。 如果使用其他组件名前缀, 通过此值设置。
        // 参考配置：
        // prefix: 'a-' button的组件名为'a-button'

        px2: {
          relative: 375,          // 相对值,rpx是 相对于750宽度 ；  rem，em 是相对的 font-size
          decimalPlaces: 2,       //  保留的小数位数
          targetUnits: 'rpx'      // 目标转换的单位 支持 rpx rem em px
        }
        // 可选，默认为false, 开启px单位转换。 可选值 true, false, config object {...}
        // 参考配置：
        // px2: true
        // px2: {}
      }
    },
    px2units: { // 小程序规定屏幕宽度为750rpx， 所以750px的设计稿，1px = 1rpx
      filter: /\.wxss$/,
      config: {
        // divisor: 1,
        // multiple: 1,
        // decimalPlaces: 2,
        // comment: 'no',
        // targetUnits: 'rpx'
      }
      // 忽略 abc.wxss 文件示例
      // filter: /(?<!\/abc)\.wxss$/i
    },
    autoprefixer: {
      filter: /\.wxss$/,
      config: {
        browsers: [
          'Android >= 5.0',
          'ios >= 6',
          'Safari >= 6',
          'Chrome >= 12',
          'ChromeAndroid >= 5.0'
        ]
      }
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
