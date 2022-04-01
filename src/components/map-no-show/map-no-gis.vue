<!-- 地图展示 20200329 -->
<template>
  <div
    id="map"
    class="map-page"
  >
    <div class="click-center">
      {{ clickCenter }}
    </div>
    <h2 ref="mapOverlay">我是自定义覆盖物啦</h2>
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
import {Point, Polygon, Circle, LineString} from 'ol/geom'; // 几何体
import { Style, Icon, Fill, Stroke, Text } from 'ol/style'; // style
import { Vector as LayerVector } from 'ol/layer'; // layer
import Overlay from 'ol/Overlay'; // 覆盖物
export default {
  name: 'MapNoGisShow',
  data() {
    return {
      mapObject: null, // map
      mapIconMarkLayer: null, // 添加点的图层
      mapPolygonLayer: null, // 添加多边形图层
      mapCircleLayer: null, // 添加圆形图层
      mapLineLayer: null, // 添加线
      mapOverlayLayer: null, // 添加自定义覆盖物
      clickCenter: [0, 0] // 点击显示坐标
    };
  },
  mounted() {
    this.initMap(); // 初始化地图
    this.addMouseEvent(); // 鼠标点击事件
    this.addMapIconMark(); // 添加图标的点
    this.addMapPolygon(); // 添加多边形
    this.addMapCircle(); // 添加圆形
    this.addMapLine(); // 添加线
    this.addMapOverlay(); // 添加自定义覆盖物
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
      // console.log(evt.coordinate); // 点击的经纬度
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
      // 创建矢量层
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
     * 添加多边形
     */
    addMapPolygon() {
      if(this.mapPolygonLayer) this.mapPolygonLayer.getSource().clear();

      // 创建矢量容器
      const vectorSource = new SourceVector({
        features: [
          new Feature({
            name: 'polygon',
            geometry: new Polygon([
              [
                [ 117.99873280768396, 24.529627248390202 ],
                [ 118.03365382795336, 24.512233122928624 ],
                [ 118.01426145677569, 24.500721081836705 ],
                [ 117.99904930834772, 24.5042683032589 ],
                [ 117.98478800301554, 24.53176094566155 ]
              ]
            ])
          })
        ]
      });
      // 创建矢量层
      this.mapPolygonLayer = new LayerVector({
        className: 'map-polygon',
        source: vectorSource,
        zIndex: 100,
        style: new Style({
          stroke: new Stroke({
            color:  '#409eff',
            width: 2,
            lineDash: null,
            lineDashOffset: 0
          }),
          fill: new Fill({
            color: 'rgba(0,0,0,0.8)' //颜色、渐变或图案
          }),
          text: this.getTextStyle('添加多边形')
        })
      });
      this.mapObject.addLayer(this.mapPolygonLayer);
    },
    /**
     * 添加圆形
     */
    addMapCircle(){
      if(this.mapCircleLayer) this.mapCircleLayer.getSource().clear();

      // 创建矢量容器
      const vectorSource = new SourceVector({
        features: [
          new Feature({
            name: 'circle',
            geometry: new Circle(
              [ 117.99444931988718, 24.479064926250462 ],
              // 1000 / this.mapObject.getView().getProjection().getMetersPerUnit()
              0.01
            )
          })
        ]
      });
      // 创建矢量层
      this.mapCircleLayer = new LayerVector({
        className: 'map-circle',
        source: vectorSource,
        zIndex: 100,
        style: new Style({
          stroke: new Stroke({
            color:  '#409eff',
            width: 2,
            lineDash: null,
            lineDashOffset: 0
          }),
          fill: new Fill({
            color: 'rgba(0,0,0,0.8)' //颜色、渐变或图案
          }),
          text: this.getTextStyle('添加多边形')
        })
      });
      this.mapObject.addLayer(this.mapCircleLayer);
    },
    /**
     * 添加线
     */
    addMapLine() {
      if(this.mapLineLayer) this.mapLineLayer.getSource().clear();

      // 创建矢量容器
      const vectorSource = new SourceVector({
        features: [
          new Feature({
            name: 'line',
            geometry: new LineString(
              [
                [118.13073235993387, 24.533700182779317],
                [118.1582035446644, 24.521075024946217],
                [118.14371693377497, 24.512703850610738],
                [118.16693011169436, 24.50542969976235]
              ]
            )
          })
        ]
      });
      // 创建矢量层
      this.mapLineLayer = new LayerVector({
        className: 'map-line',
        source: vectorSource,
        zIndex: 100,
        style: new Style({
          stroke: new Stroke({
            color:  '#409eff',
            width: 2,
            lineDash: null,
            lineDashOffset: 0
          }),
          text: this.getTextStyle('添加多边形')
        })
      });
      this.mapObject.addLayer(this.mapLineLayer);
    },
    /**
     * 添加自定义覆盖物
     */
    addMapOverlay() {
      if(this.mapOverlayLayer) this.mapObject.removeOverlay(this.mapOverlayLayer);

      this.mapOverlayLayer = new Overlay({
        position: [ 118.1450476000662, 24.46852539920972 ],
        offset: [0, 0],
        element: this.$refs.mapOverlay, // document.getElementById("textInfo")
        positioning: 'center-center',
        stopEvent: false
      });
      this.mapObject.addOverlay(this.mapOverlayLayer);
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
