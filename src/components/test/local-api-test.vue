<template>
  <div>
    <p>请先运行 npm run api</p>
    <ul>
      <li
        v-for="(item,key) in alarmInfoStatisticsByType"
        :key="key"
      >
        {{ item.alarmType }} - {{ item.alarmCount }}
      </li>
    </ul>
  </div>
</template>
<script>
import { rkAxios, JSONHeader } from '@/js/tools/rk-axios';
import { api } from '../../../config/api-config';
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      alarmInfoStatisticsByType:[]
    };
  },
  created() {

  },
  mounted() {
    // this.postLocalJson();
    this.postLocalJsonContentTypeJSON();
    // this.getLocalJson();
    // this.deleteLocalJson();
    // this.putLocalJson();
    // this.patchLocalJson();
  },
  methods: {
    /**
     * 验证返回值 200 正常
     * 用于正常情况下的  data数据不为空   对data做验证
     */

    verifyResponse(response) {
      let code = _.get(response, 'data.code');
      if (code === 200) {
        return _.get(response, 'data.data');
      } else {
        return false;
      }
    },
    /**
     * get提交  content-type为form
     * @returns {Promise.<void>}
     */
    async getRemoteJson(){
      let result = await rkAxios.get('/remove-api/users', {data:111}).then((res)=>{
        let data = this.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    /**
     * post提交  content-type为form
     * @returns {Promise.<void>}
     */
    async postLocalJson(){
      let data = {
        data: [
          1,
          2
        ]
      };
      let result = await rkAxios.post(api.alarmInfo.alarmInfoStatisticsByType, data).then((res)=>{
        let data = this.verifyResponse(res);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        this.alarmInfoStatisticsByType = result;
      }
    },
    /**
     * post提交  content-type为JSON
     * @returns {Promise.<void>}
     */
    async postLocalJsonContentTypeJSON(){
      let data = {
        data: [
          1,
          2
        ]
      };
      let result = await rkAxios.post(api.alarmInfo.alarmInfoStatisticsByType, data, JSONHeader).then((res)=>{
        let data = this.verifyResponse(res);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async getLocalJson(){
      let result = await rkAxios.get(api.alarmInfo.alarmInfoStatisticsByType, {id :1}).then((res)=>{
        let data = this.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async deleteLocalJson(){
      let result = await rkAxios.delete(api.alarmInfo.alarmInfoStatisticsByType).then((res)=>{
        let data = this.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async putLocalJson(){
      let result = await rkAxios.put(api.alarmInfo.alarmInfoStatisticsByType, {data:111}).then((res)=>{
        let data = this.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async patchLocalJson(){
      let result = await rkAxios.patch(api.alarmInfo.alarmInfoStatisticsByType, {data:111}).then((res)=>{
        let data = this.verifyResponse(res);
        console.log(data);
        if(data){
          return data;
        }else{
          return false;
        }
      }).catch((e)=>{
        console.error(e);
        return false;
      });
      if(result){
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    }
  }
};
</script>

<style scoped lang="less">

</style>
