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

      <!-- pointList 循环使用的方法 添加多个矢量点 -->
      <template v-for="(item, index) of mapIconData.pointList">
        <map-icon-mark
          :key="'map-icon-mark' + index"
          :position="item"
          :label="'标记点' + String(index)"
          :icon="mapIconData.icon"
          :element-name="mapIconData.elementName"
          :class-name="mapIconData.className"
        />
      </template>

      <!-- 折线 -->
      <map-broken-line
        :point-list="mapBrokenLineData.pointList"
        :line-color="mapBrokenLineData.lineColor"
        :line-width="mapBrokenLineData.lineWidth"
        :line-dash="mapBrokenLineData.lineDash"
        :element-name="mapBrokenLineData.elementName"
        :class-name="mapBrokenLineData.className"
      />

      <!-- 多边形 -->
      <map-polygon
        :point-list="mapPolygonData.pointList"
        :fill-color="mapPolygonData.fillColor"
        :line-color="mapPolygonData.lineColor"
        :line-width="mapPolygonData.lineWidth"
        :line-dash="mapPolygonData.lineDash"
        :element-name="mapPolygonData.elementName"
        :class-name="mapPolygonData.className"
      />

      <!-- 圆形 -->
      <map-circle
        :position="mapCircleData.position"
        :radius="mapCircleData.radius"
        :fill-color="mapCircleData.fillColor"
        :line-color="mapCircleData.lineColor"
        :line-width="mapCircleData.lineWidth"
        :line-dash="mapCircleData.lineDash"
        :element-name="mapCircleData.elementName"
        :class-name="mapCircleData.className"
      />

      <!-- 自定义覆盖物 -->
      <MapOverlay
        :position="mapOverlayData.position"
        :offset="mapOverlayData.offset"
        :className="mapOverlayData.className">
        <div>
          <img :src="mapOverlayData.img" alt="">
          <br />
          <h5>自定义覆盖物</h5>
        </div>
      </MapOverlay>

      <!-- 弹出窗体 -->
      <MapPopup
        :position="mapPopupData.position"
        :title="mapPopupData.title"
        :offset="mapPopupData.offset"
        :mapShow="mapPopupData.show"
        @close="mapPopupClose"
        :className="'map-popup'">
        {{ mapPopupData.popupText }}
      </MapPopup>

      <!-- 海量点 -->
      <MapPointCollection
        :pointList="mapPointCollectionData.pointList"
        :bg-img="mapPointCollectionData.bgImg"
        :distance="mapPointCollectionData.distance"
        :fillColor="mapPointCollectionData.fillColor"
        :fontColor="mapPointCollectionData.fontColor"
        :zIndex='mapPointCollectionData.zIndex'
        :offset="mapPointCollectionData.offset">
      </MapPointCollection>

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
import MapPolygon from './map-polygon'; // 多边形
import MapCircle from './map-circle'; // 圆形
import MapOverlay from './map-overlay'; // 自定义覆盖物
import MapPopup from './map-popup'; // 添加弹窗
import MapPointCollection from './map-point-collection'; // 添加海量点
export default {
  name: 'MapGisShow',
  components: {
    MapIconMark, // 点标注
    MapBrokenLine, // 折线
    MapPolygon, // 多边形
    MapCircle, // 圆形
    MapOverlay, // 自定义覆盖物
    MapPopup, // 添加弹窗
    MapPointCollection // 添加海量点
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
        pointList: [
          [118.10852501039507, 24.527215942485814],
          [118.0959414268017, 24.51847462330628],
          [118.1354382956505, 24.483313545330052]
        ],
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
      },

      // 多边形图层数据
      mapPolygonData: {
        pointList:[
          [ 117.99873280768396, 24.529627248390202 ],
          [ 118.03365382795336, 24.512233122928624 ],
          [ 118.01426145677569, 24.500721081836705 ],
          [ 117.99904930834772, 24.5042683032589 ],
          [ 117.98478800301554, 24.53176094566155 ]
        ],
        fillColor: 'rgba(255,0,0,0.8)', // 多边形填充颜色，非必须，默认为 'rgba(0,0,0,0.8)'
        elementName: '地图多边形', // 多边形识别名称 String, 非必须，默认为 'el-mapPolygon'
        lineColor: 'rgba(0,0,0,0.5)', // 多边形线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 多边形线条宽度 Number，非必须，默认为 2
        lineDash: null, // 多边形虚线 Array[number], 是否使用虚线 ，默认为 null
        className: 'map-polygon' // 图层的class String, 非必须，默认为 'map-polygon'
      },

      // 圆形图层数据
      mapCircleData: {
        position: [ 117.99444931988718, 24.479064926250462 ], // 圆中心点 Array， 必须
        radius: 1000, // 圆半径 number ，默认为 100
        fillColor: 'rgba(255,255,0,0.5)', // 圆形填充颜色，非必须，默认为 'rgba(255,255,255,0.5)'
        elementName: '圆形叠加', // 圆形识别名称 String, 非必须，默认为 'el-mapCircle'
        lineColor: '#409eff', // 圆形线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 圆形线条宽度 Number，非必须，默认为 2
        lineDash: [20, 5], // 圆形虚线 Array[number], 是否使用虚线 ，默认为 null
        className: 'map-circle' // 图层的class String, 非必须，默认为 'map-circle'
      },

      // 自定义覆盖物
      mapOverlayData: {
        position: [ 118.14654666428568, 24.46173651490975 ], // 标注中心点 Array, 必须
        className: 'map-overlay', // 设置自定义图层的class String ，非必须， 默认 'map-overlay'
        offset: [0, 0], // 设置自定义图层的偏移量 Array[number] ，非必须,默认[0, 0]
        img: require('./images/blue_mark.png') // slot
      },

      // 弹出窗体图层数据
      mapPopupData:{
        position: [ 118.11625111346247, 24.499098345382695 ], // 弹窗中心点 Array[array]， 必须
        title: '弹窗标题', // 弹窗标题 String，非必须，默认为 ' '
        popupText: '弹出窗体的内容',
        show: false, // 弹窗显隐 Boolean，必须，默认为 true
        offset:[0, 0], // 弹窗偏移 Array[number]，必须，默认为 [0, 0]
        className: 'map-popup' // 图层的class String，非必须，默认为 'map-popup'
      },

      // 海量点图层数据
      mapPointCollectionData: {
        pointList: [
          [118.03985241298678, 24.56660552297402],
          [118.17225966100695, 24.49398069058228],
          [118.23586288337708, 24.548048659904484],
          [118.04870630244483, 24.396473587403964],
          [118.04870630244483, 24.406473587403964]
        ],
        distance: 100, // 收起点的间距  number，必须，默认为 40
        zIndex: 500, // 图层z轴高度， 非必须， 默认 400
        offset:[0, 2], // 文字偏移距离 [x,y]， 非必须， 默认 [0,0]
        fontColor: '#ffeb00', // 文字的颜色 string （色彩标识，支持rgba），默认'#fff'(如果去掉文字那么直接rgba透明度设置为0)
        fillColor: '#06d073', // 文字的背景颜色 string（色彩标识，支持rgba），默认'#f00'(如果去不要背景颜色那么直接rgba透明度设置为0)
        bgImg: require('./images/blue_mark.png') // 设置背景图，如果设置了此那么文字背景可以不设置
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

      this.mapPopupOpen(evt); // 打开弹窗
    },
    /**
     * 打开弹窗
     * 当移动到point上时
     * */
    mapPopupOpen(evt) {
      // 获取地图上的重叠像素（用来获得叠加图层）
      const pixel = this.mapData.getEventPixel(evt.originalEvent);
      const hit = this.mapData.hasFeatureAtPixel(pixel);
      // 获取地图上的feature
      const feature = this.mapData.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        return feature;
      });
      // 获取叠加图层对像素叠加图层（hit）设置鼠标样式（给标注点添加鼠标经过样式）
      this.mapData.getTarget().style.cursor = hit ? 'pointer' : '';
      // 鼠标移动到点标注的时候显示弹出窗体，feature.get('name') 可以获取标注标题，如果设置了的话
      if(feature && feature.get('name') === this.mapIconData.elementName){
        // 显示弹出窗体
        this.mapPopupData.show = true;
        // 弹出窗体的内容
        this.mapPopupData.popupText = `当前坐标${this.mapIconData.position}`;
        // 弹出窗体的位置
        this.mapPopupData.position = this.mapIconData.position;
      }
    },
    /**
     * 关闭弹出窗体事件
     * @param e
     */
    mapPopupClose(e){
      this.mapPopupData.show = false;
      this.mapPopupData.popupText = '';
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
