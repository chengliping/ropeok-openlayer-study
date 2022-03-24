<template>
  <div>
    <h1>路由列表</h1>
    <ul>
      <li
        v-for="(item , index) in projectRoutes"
        :key="index"
      >
        <router-link
          v-if="!item.children"
          :to="item.path"
        >
          {{ item.path }}
        </router-link>
        <div v-if="item.children">
          <ul>
            <li
              v-for="subItem in item.children"
              :key="subItem.path"
            >
              <router-link
                :to="item.path + '/' + subItem.path"
              >
                {{ item.path + '/' + subItem.path }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <h1>测试路由列表</h1>
    <ul>
      <li
        v-for="(item , index) in testRoutes"
        :key="'testRoutes' + index"
      >
        <router-link
          v-if="!item.children"
          :to="item.path"
        >
          {{ item.path }}
        </router-link>
        <div v-if="item.children">
          <ul>
            <li
              v-for="subItem in item.children"
              :key="'testRoutes' + subItem.path"
            >
              <router-link
                :to="item.path + '/' + subItem.path"
              >
                {{ item.path + '/' + subItem.path }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { projectRoutes } from '../router/modules/project';
import {testRoutes} from '../router/modules/test-routes';
import _ from 'lodash';
let routeList = _.cloneDeep(projectRoutes);
export default {
  data() {
    return {
      projectRoutes:routeList,
      testRoutes
    };
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    }
  }
};
</script>

<style scoped lang="less">
</style>
