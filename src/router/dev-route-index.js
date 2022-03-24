/**
 * 主路由
 */
import Vue from 'vue';
import _ from 'lodash';
import VueRouter from 'vue-router';
import {projectRoutes} from './modules/project';// 项目路由
import {testRoutes} from './modules/test-routes';

let routes = _.cloneDeep(projectRoutes);
// 开发环境加入demo路由  order路由列表
routes.push({ path: '/', redirect: '/order' });// 开发环境"/"重定向到路由列表页
routes.push({ path: '/order', component: () => import('../components/order.vue') });// 路由列表
routes = _.concat(routes, testRoutes);
const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
export { router, routes };
