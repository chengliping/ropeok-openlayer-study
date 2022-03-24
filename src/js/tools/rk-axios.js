import http, { AxiosRequestConfig } from 'axios';
import { getCookie } from 'rk-cookie';
import { parse } from 'querystring';
import rkUtil from 'rk-util';

const { noNoneGetParams } = rkUtil;
const cancelTokenSourceMap = {};
const CancelToken = http.CancelToken;
let errorCallback;
let beforeRequire;

let deleteData;

http.interceptors.request.use(config => {
  if (config.method === 'get' || config.method === 'delete') {
    //  给data赋值以绕过if判断
    config.data = deleteData;
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
}, err => Promise.reject(err));

const util = {
  /**
   * 处理异常  登录过期  跳转登录页
   * @param e
   */
  handleError (e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
};

/**
 * 往url中添加query参数
 * @param url
 * @param query
 * @returns {*}
 */
function addQueryToUrl (url, query) {
  if (typeof url !== 'string') return '';

  if (!url.includes('http')) {
    url = window.location.origin + url;
  }

  const urlObj = new URL(url);
  if (typeof query === 'string') {
    query = parse(query);
  }
  for (const key in query) {
    if (!Object.prototype.hasOwnProperty.call(query, key)) continue;

    urlObj.searchParams.set(key, query[key]);
  }
  return urlObj.toString();
}

/**
 * 构建数据格式,默认form提交
 * @param inputData 数据
 * @param inputOption  http选项
 * @returns {*}
 */
const getParams = (inputData, inputOption) => {
  const type = typeof inputData;
  if (type === 'string') {
    return inputData;
  }
  const ContentType = inputOption && inputOption.headers && inputOption.headers['Content-Type'];
  if (!ContentType) {
    // 默认Form提交
    return noNoneGetParams(inputData);
  }
  // JSON提交
  if (ContentType.indexOf('application/json') !== -1) {
    return noNoneGetParams(inputData, true);
  }
  // 文件提交
  if (ContentType.indexOf('multipart/form-data') !== -1) {
    return inputData;
  }
  // 默认Form提交
  return noNoneGetParams(inputData);
};

/**
 * 构建options，添加token信息
 * @param option http选项
 * @returns {*}
 */
const getOption = (option) => {
  const Authorization = getCookie('token');
  if (!Authorization) {
    return option || {};
  }

  if (!option) {
    option = {
      headers: {
        'Authorization': Authorization
      }
    };
  }
  if (!option.headers) {
    option.headers = {};
  }
  option.headers['Authorization'] = Authorization;
  return option;
};

/**
 * post put patch公用方法
 * @param type  方法：post、put、patch
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function dataMethod (type, url, data, option) {
  let axiosOption;
  if (beforeRequire) {
    const result = beforeRequire(option, data);
    data = result?.data || data;
    axiosOption = result?.option;
  }

  if (!axiosOption) {
    axiosOption = getOption(option); // 添加token
  }

  const source = CancelToken.source();
  axiosOption['cancelToken'] = source.token; //添加取消请求
  cancelTokenSourceMap[url] = source; // 暂存取消请求的source

  let params = null;
  if (data) {
    params = getParams(data, option);// 重构数据
  }
  return await http[type](url, params, axiosOption).then((res) => {
    delete cancelTokenSourceMap[url];
    return res;
  }).catch((e) => {
    util.handleError(e);
    throw e;
  });
}

/**
 * get delete 公用方法。将data格式化后，拼接到url后面
 * @param type  方法：get、delete
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function urlMethod (type, url, data, option) {
  let axiosOption;
  if (beforeRequire) {
    const result = beforeRequire(option, data);
    data = result?.data || data;
    axiosOption = result?.option;
  }

  if (!axiosOption) {
    axiosOption = getOption(option); // 添加token
  }

  const source = CancelToken.source();
  axiosOption['cancelToken'] = source.token; //添加取消请求
  cancelTokenSourceMap[url] = source; // 暂存取消请求的source

  if (data) {
    let params = null;
    const dataType = typeof data;
    if (dataType === 'string') {
      params = data;
    } else {
      params = noNoneGetParams(data);
    }
    url = addQueryToUrl(url, params);
  }
  return await http[type](url, axiosOption).then((res) => {
    return res;
  }).catch((e) => {
    util.handleError(e);
    throw e;
  });
}

export const rkAxios = {
  /**
   * 设置get,delete 请求参数放在头部且设置Content-Type: application/json
   *
   * */
  setDeleteData (data) {
    deleteData = data;
  },
  /**
   * 错误请求时回调
   * @param callback ErrorCallback: (e: Error);
   */
  setErrorCallback (callback) {
    errorCallback = callback;
  },
  /**
   * 设置请求前钩子
   * @param callback BeforeRequire (option?: AxiosRequestConfig, data?): BeforeRequireReturn;
   * BeforeRequireReturn: {
      data?;
      option?: AxiosRequestConfig;
    }
   */
  setBeforeRequire (callback) {
    beforeRequire = callback;
  },

  /**
   * post请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  post: async (url, data, option) => dataMethod('post', url, data, option),
  /**
   * patch请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  patch: async (url, data, option) => dataMethod('patch', url, data, option),
  /**
   * put请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  put: async (url, data, option) => dataMethod('put', url, data, option),
  /**
   * get请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  get: async (url, data, option) => urlMethod('get', url, data, option),
  /**
   * delete请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  delete: async (url, data, option) => urlMethod('delete', url, data, option),
  /**
   * 终止请求
   *
   * */
  cancelSource: (url, msg = '取消') => {
    if (!cancelTokenSourceMap) return;

    if (url && cancelTokenSourceMap[url]) {
      cancelTokenSourceMap[url].cancel(msg);
    }

    for (const key in cancelTokenSourceMap) {
      if (!cancelTokenSourceMap.hasOwnProperty(key)) continue;

      cancelTokenSourceMap[key].cancel(msg);
    }
  }

};

/**
 * axios中JSON提交的config配置
 * @type {{headers: {Content-Type: string}}}
 */
export const JSONHeader = {
  headers: {
    'Content-Type': 'application/json'
  }
};
/**
 * axios中multipart/form-data提交的config配置
 * @type {{headers: {Content-Type: string}}}
 */
export const fileHeader = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};
export default rkAxios;
