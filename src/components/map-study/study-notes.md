### 中文文档
http://linwei.xyz/ol3-primer/ch01/index.html

| 地图map |
| --- |
| 视图view |
| 图层layer |
| 数据源source = 和layer一一对应 |
| 控件control = 固定位置，在地图最上层，例如放大缩小，全屏等 |
| 交互interaction | 	

#### 创建地图new ol.map
##### layers = [] 设置地图图层
	new ol.layer.Tile({source: new ol.source.OSM()}) 创建一个使用Open Street Map地图源的瓦片图层 (背景地图图层）

##### view 设置显示地图的视图 new ol.View
	center  定义地图显示中心于经度0度，纬度0度处
	zoom   并且定义地图显示层级为2
	
##### target 让id为map的div作为地图的容器 （web gis 依赖于html）



