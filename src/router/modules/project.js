/**
 * 项目路由
 * @type {[null]}
 */
const projectRoutes = [
  {
    path: '/index',
    name: 'map-gis展示首页',
    component: ()=>import('../../components/index.vue')
  },
  {
    path: '/research',
    name: '部门介绍',
    component: () => import('../../components/research/research')
  },
  {
    path: '/map-no-gis',
    name: 'map-no-gis展示',
    component: () => import('../../components/map-no-show/map-no-gis')
  }
];
export { projectRoutes };
