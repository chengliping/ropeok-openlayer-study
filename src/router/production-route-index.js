/**
 * 主路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { projectRoutes } from './modules/project';// 项目路由
import config from '../../config/config';

let routes = projectRoutes;
routes.push({
  path: '/',
  redirect: config.redirectRoute
});// 生产环境"/"重定向到首页
const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
export { router, routes };
