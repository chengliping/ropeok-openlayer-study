/**
 * 项目路由
 * @type {[null]}
 */
const projectRoutes = [
  { path: '/index', component: ()=>import('../../components/index.vue') },
  { path: '/research', component: () => import('../../components/research/research') }
];
export { projectRoutes };
