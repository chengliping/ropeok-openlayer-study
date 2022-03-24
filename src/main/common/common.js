import '../../css/base.less';
import 'animate.css';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {store} from '../../js/store/vuex-index';// vuex配置
import App from '../../components/App';
import { rkAxios } from '@/js/tools/rk-axios';
import { getCookie } from 'rk-cookie';

/**
 * 设置axios请求错误时的回调
 */
rkAxios.setErrorCallback((e)=>{
  if (e.response && e.response.status) {
    if (e.response.status === 401) {
      // if (window.location.href.indexOf("/#/login") === -1) {
      //   this.vue.$message.error("登录过期，请重新登录");
      //   storageUtil.setSession("historyUrl", window.location.href);
      //   window.location.href = "/#/login";
      // }
    }
  }
});
/**
 *  * 设置token信息
 * @param option AxiosRequestConfig axios请求配置
 * @param data string | JSON; axios请求数据
 * @return {*}
 * {
  data?: string | JSON;
  option?: AxiosRequestConfig;
}
 */
const getOption = (option, data) => {
  const Authorization = getCookie('token');
  if(!Authorization){
    return option || {};
  }
  if(!option) {
    option = {
      headers: {
        'Authorization':Authorization
      }
    };
  }
  if(!option.headers){
    option.headers = {};
  }
  option.headers['Authorization'] = Authorization;
  return {option, data};
};
rkAxios.setBeforeRequire(getOption);
/**
 *
 * @param options
 * {
 *   router:vue router
 * }
 */
export default function(options){
  Vue.use(ElementUI);
  new Vue({
    store,
    router: options.router,
    created(){
    },
    render: h => h(App)
  }).$mount('#app');
}
