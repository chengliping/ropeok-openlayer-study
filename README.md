# hello-world

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn start
```

### Run local api server
```
yarn api
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 第三方工具包
1. rk-cookie：cookie工具类的npm包，https://github.com/ShuangMuChengLi/rk-cookie
2. html5-storage：storage工具类的npm包，https://github.com/ShuangMuChengLi/html5-storage
3. rk-encrypt：md5、sha256等加密工具类的npm包，https://github.com/ShuangMuChengLi/rk-encrypt
4. rk-util: 工具类的npm包。https://github.com/ShuangMuChengLi/rk-uitl
5. moment: http://momentjs.cn/
6. lodash: https://www.lodashjs.com/
7. element-ui: https://element.eleme.cn/#/zh-CN
8. rk-axios: axios封装类的npm包。http请求错误和token配置在common中配置  https://github.com/ShuangMuChengLi/rk-axios
### Log

####  20200420
版本：3.0.0
1. 重构框架，新建分支3.0.0
2. 使用vue-cli脚手架编译vue.js代码，命令yarn start。
3. 启动本地json的api服务，命令yarn api
##### 非兼容性更新
1. 使用public文件夹代替之前的resource文件夹
2. 代理在vue.config.js中配置，不再使用app.js设置代理
3. 模板文件在public/index.html

####  20200518
版本：3.0.1
1. 添加npm run demo  编译demo
2. 添加npm run current  编译当前开发的路由
3. 移除config/config.json  buildTarget配置

####  20200520
版本：3.0.2
框架精简
1. 删除demo，public。这些后续在共享平台提供。不在框架体现
2. rk-cookie：cookie工具类的npm包，删除本地cookie-util.js，https://github.com/ShuangMuChengLi/rk-cookie
3. html5-storage：storage工具类的npm包，删除本地storage-util.js，https://github.com/ShuangMuChengLi/html5-storage
4. rk-encrypt：md5、sha256等加密工具类的npm包，https://github.com/ShuangMuChengLi/rk-encrypt

####  20200522
版本：3.0.3
框架打包优化
1. 将lodash、elementUI、moment单独打包.减小单个库文件大小

####  20200526
版本：3.0.4
1. rk-util: 工具类的npm包。删除本地util.js  https://github.com/ShuangMuChengLi/rk-uitl
2. rk-axios: axios封装类的npm包。删除本地axios.js。http请求错误和token配置在common中配置  https://github.com/ShuangMuChengLi/rk-axios

####  20200611
版本：3.0.5

添加websocket本地api模拟服务

config/websocket-config.js中进行websocket配置
````
let wsConfig = [
  {
    path: '/webSocket/policeCarInfo/',
    json: require('../api/json/webSocket/policeCarInfo')
  },
  {
    path: '/webSocket/policeInfo/',
    json: require('../api/json/webSocket/policeInfo')
  }
];
module.exports = wsConfig;
````
websocket demo: src/components/test/websocket-api-test.vue
````
let url = api.websocket.policeCarInfo;
let websocket = new WebSocket(url);
websocket.onmessage = (e) => {
  console.log(JSON.parse(e.data));
};
````
