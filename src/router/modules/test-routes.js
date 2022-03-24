/**
 * 项目路由
 * @type {[null]}
 */
const testRoutes = [
  { path: '/vue-test', component: () => import('../../components/test/vue-test.vue') },
  { path: '/local-api-test', component: () => import('../../components/test/local-api-test.vue') },
  { path: '/websocket-api-test', component: () => import('../../components/test/websocket-api-test.vue') }
];
export { testRoutes };
