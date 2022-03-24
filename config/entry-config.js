/**
 * 入口文件配置
 * @type {string}
 */
const ENV = process.env.NODE_ENV;
console.log('当前入口:' + ENV);
let appEntry;
if(ENV === 'production'){
  appEntry = './src/main/production.js';
}else if (ENV === 'development') {
  appEntry = './src/main/dev.js';
}else{
  appEntry = './src/main/dev.js';
}
module.exports = appEntry;
