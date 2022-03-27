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
        :element-name="mapIconData.elementName"
        :class-name="mapIconData.className"
      />

      <!-- 折线 -->
      <map-broken-line
        :point-list="mapBrokenLineData.pointList"
        :line-color="mapBrokenLineData.lineColor"
        :line-width="mapBrokenLineData.lineWidth"
        :line-dash="mapBrokenLineData.lineDash"
        :element-name="mapBrokenLineData.elementName"
        :class-name="mapBrokenLineData.className"
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
import MapBrokenLine from './map-broken-line'; // 折线
export default {
  name: 'MapGisShow',
  components: {
    MapIconMark, // 点标注
    MapBrokenLine // 折线
  },
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
      },

      // 折线
      mapBrokenLineData: {
        pointList: [ // 线条所有的点数组 Array[array]， 必须
          [118.13073235993387, 24.533700182779317],
          [118.1582035446644, 24.521075024946217],
          [118.14371693377497, 24.512703850610738],
          [118.16693011169436, 24.50542969976235]
        ],
        elementName: '地图线条', //弹窗标识别名 String， 非必须，默认为 'el-mapLineString'
        lineColor: 'rgba(0,77,168,0.9)', // 线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 线条宽度 Number，非必须，默认为 2
        lineDash: [10], // 虚线 Array[number]， 是否使用虚线，默认为 null
        className: 'map-line-string', // 图层的class String， 非必须， 默认 "map-line-string"
        zIndex: 300 // 图层z轴高度， 非必须， 默认 300
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
