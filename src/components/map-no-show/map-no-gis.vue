<!-- 地图展示 20200329 -->
<template>
  <div
    id="map"
    class="map-page"
  >
    <div class="click-center">
      {{ clickCenter }}
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map'; // map
import { TileArcGISRest, Vector as SourceVector } from 'ol/source'; // 源
import TileLayer from 'ol/layer/Tile'; // 瓦片
import View from 'ol/View'; // 视图
import * as olControl from 'ol/control'; // 控件
import { Feature } from 'ol'; // feature
import { Point } from 'ol/geom'; // 几何体
import { Style, Icon, Fill, Stroke, Text } from 'ol/style'; // style
import { Vector as LayerVector } from 'ol/layer'; // layer
export default {
  name: 'MapNoGisShow',
  data() {
    return {
      mapObject: null, // map
      mapIconMarkLayer: null, // 添加点的图层
      clickCenter: [0, 0] // 点击显示坐标
    };
  },
  mounted() {
    this.initMap(); // 初始化地图
    this.addMouseEvent(); // 鼠标点击事件
    this.addMapIconMark(); // 添加图标的点
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      this.mapObject = new Map({
        layers: [
          new TileLayer({
            source: new TileArcGISRest({
              url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
            })
          })
        ],
        target: 'map',
        controls: [
          new olControl.FullScreen() // 全屏控件，显示在右上角
        ],
        view: new View({
          projection: 'EPSG:4326',
          center: [118.089425, 24.479883],
          zoom: 12
        })
      });
    },
    /**
     * 添加鼠标点击事件
     * */
    addMouseEvent() {
      // 添加鼠标点击事件
      this.mapObject.on('click', (evt) => this.mapClick(evt));
      // 添加鼠标经过事件
      this.mapObject.on('pointermove', (evt) => this.mapPointerMove(evt));
    },
    /**
     * 地图点击
     */
    mapClick(evt) {
      this.clickCenter = evt.coordinate; // 获取点击的中心点
      // 移动地图
      this.mapObject.getView().animate({
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
    },
    /**
     * 添加图标的点
     */
    addMapIconMark() {
      if(this.mapIconMarkLayer) this.mapIconMarkLayer.getSource().clear();

      // 创建矢量容器
      const vectorSource = new SourceVector({
        features: [
          new Feature({
            type: 'icon',
            name: '添加点',
            geometry: new Point([118.089425, 24.479883])
          })
        ]
      });
      this.mapIconMarkLayer = new LayerVector({
        className: 'map-icon-mark',
        source: vectorSource,
        zIndex: 100,
        style: new Style({
          image: new Icon({
            src: require('../map-gis/images/red_mark.png')
          }),
          text: this.getTextStyle('添加点')
        })
      });
      this.mapObject.addLayer(this.mapIconMarkLayer);
    },
    /**
     * 设置文字样式
     */
    getTextStyle(text) {
      return new Text({
        text: text,
        fill: new Fill({
          color: '#fff'
        }),
        font: '14px Microsoft YaHei',
        offsetX: 0,
        offsetY: 30,
        padding:[ 2, 10, 0, 10],
        // 文本边框
        backgroundStroke: new Stroke({
          color: '#f00',
          width: 1
        }),
        // 文本填充
        backgroundFill: new Fill({
          color:'rgba(0,0,0,0.5)'
        })
      });
    }
  }
};
</script>

<style scoped lang="less">
  #map{
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
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
