<template>
  <div>
    模拟websocket api。先执行npm run api启动本地api服务
  </div>
</template>

<script>
import { api } from '../../../config/api-config';

export default {
  name: 'VueTest',
  data(){
    return {};
  },
  mounted() {
    let url = api.websocket.policeCarInfo;
    let websocket = new WebSocket(url);
    //打开事件
    websocket.onopen = (e) => {
      console.log('实时告警已经连接！');
    };
    websocket.onmessage = (e) => {
      console.log(JSON.parse(e.data));
    };
    websocket.onclose = (e) => {
      console.log('我被关闭了');
    };
    websocket.onerror = (e) =>{
      console.log('我出错了');
    };

  },
  methods:{

  }
};
</script>

<style scoped>

</style>
