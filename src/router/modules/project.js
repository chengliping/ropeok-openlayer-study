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
  },
  {
    path: '/ol-map-study',
    name: 'openlayers3 中文文档学习',
    component: () => import('../../components/map-study/map')
  }
];
export { projectRoutes };
