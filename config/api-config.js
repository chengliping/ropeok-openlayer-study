import config from './config';
/**
 * 接口配置
 */
const wsLocal = `ws://localhost:${ config.api_local_port }`;
export const api = {
  'alarmInfo':{
    'alarmInfoStatisticsByType':config.api_local + '/alarmInfo/alarmInfoStatisticsByType' // 获取告警信息(demo  可删除）
  },
  'websocket':{
    'policeCarInfo': `${ wsLocal }/webSocket/policeCarInfo/token`
  }
};
