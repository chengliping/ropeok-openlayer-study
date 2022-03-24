<template>
  <div>
    test
    <el-button
      type="primary"
      @click="init"
    >
      test
    </el-button>
    worker获取到的数据：{{ data.foo }}
  </div>
</template>

<script>

// import TestWorker from 'worker-loader!./test.worker.js';
import TestWorker from './test.worker.js';
export default {
  name: 'VueTest',
  data () {
    return {
      data: {}
    };
  },
  mounted () {

  },
  methods: {
    init () {
      const w = new TestWorker();
      w.onmessage = (event) =>{
        this.data = event.data;
      };
    }
  }
};
</script>

<style scoped>

</style>

