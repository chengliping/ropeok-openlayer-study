<!-- openlayers 3 中文文档学习 -->
<template>
  <div class="map" id="map"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map'; // map
import { Tile } from 'ol/layer'; // layer
import { OSM } from 'ol/source'; // source
import View from 'ol/View'; // view
export default {
  name: 'OlMapStudy',
  data() {
    return {
      mapObject: null
    };
  },
  mounted() {
    this.initMap(); // 初始化显示地图
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      // 创建地图
      this.mapObject = new Map({
        // 设置地图图层
        layers: [
          // 创建一个使用Open Street Map地图源的瓦片图层
          new Tile({
            source: new OSM()
          })
        ],
        // 设置显示地图的视图
        view: new View({
          projection: 'EPSG:4326',
          center: [118.089425, 24.479883], // 定义地图显示中心于经度0度，纬度0度处
          zoom: 12 // 并且定义地图显示层级为2
        }),
        target: 'map' // 让id为map的div作为地图的容器
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .map{
    position: relative;
    width: 100vw;
    height: 100vh;
  }
</style>
