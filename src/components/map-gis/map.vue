<!-- 地图展示 20220324 -->
<template>
  <div class="open-layer">
    <div
      id="map"
      ref="rootMap"
    >
      <!--
        点标注，
        如果只想用文字标注label，
        可以把图片设置成一个像素的透明图片，
        如果只想用图标就label设置为null，
        单独的懒得封装了,
      -->
      <map-icon-mark
        :position="mapIconData.position"
        :label="mapIconData.label"
        :icon="mapIconData.icon"
        :elementName="mapIconData.elementName"
        :className="mapIconData.className"
      />
    </div>
    <div class="click-center">
      {{ clickCenter }}
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import * as olControl from 'ol/control';
import mapConfig from '../../../config/map-config';

import MapIconMark from './map-icon-mark'; // 点标注
export default {
  name: 'MapGisShow',
  components: {MapIconMark},
  data() {
    return {
      mapData: null,
      mapCenter: [118.089425, 24.479883],
      mapZoom: 12,
      clickCenter: [0, 0],

      // 点标注图层
      mapIconData: {
        position: [118.089425, 24.479883], // 标注中心点的 array， 必须
        icon: require('./images/red_mark.png'), // 文件地址 String[url]，必须，默认为null
        label: '这个是中心位置', // 标注点名称 String， 非必须， 默认为 null
        elementName: '点标识id', // 标注点识别名称 String， 可以通过 feature.get('name') 获取到， 非必须， 默认为 'el-mapIconMark'
        className: 'map-icon-mark' // 图层的class String， 非必须，默认为 'map-icon-mark'
      }
    };
  },
  mounted() {
    this.initMap(); // 初始化地图
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      const mapContainer = this.$refs.rootMap;
      const fullScreen = new olControl.FullScreen(); //全屏控件，显示在右上角
      const map = new Map({
        layers: mapConfig.streetMap,
        controls: [fullScreen],
        target: mapContainer,
        view: new View({
          projection: 'EPSG:4326',
          center: this.mapCenter,
          zoom: this.mapZoom
        })
      });
      // 添加鼠标点击事件
      map.on('click', (evt) => this.mapClick(evt));
      // 添加鼠标经过事件
      map.on('pointermove', (evt) => this.mapPointerMove(evt));
      this.mapData = map;
    },
    /**
     * 地图点击
     */
    mapClick(evt) {
      this.clickCenter = evt.coordinate; // 获取点击的中心点
      // 移动地图
      this.mapData.getView().animate({
        center: evt.coordinate
      });
    },
    /**
     * 鼠标划过地图事件
     */
    mapPointerMove(evt) {
      if (evt.dragging) {
        return false;
      }
    }
  }
};
</script>

<style scoped lang="less">
  .open-layer{
    height: 100vh;
    width: 100vw;
  }
  #map{
    height: 100vh;
    width: 100vw;
    background: #f2f2f2;
  }
  .click-center{
    position: absolute;
    top: 10px;
    right: 60px;
    padding: 10px;
    z-index: 2;
    background: #000000;
    color: #fff;
    border-radius: 4px;
  }
</style>
