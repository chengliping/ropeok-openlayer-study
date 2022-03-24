<template>
  <div class="wrapper">
    <map-gis-show class="map" />
  </div>
</template>

<script>
import MapGisShow from './map-gis/map'; // 地图展示
export default {
  name: 'IndexPage',
  components: {
    MapGisShow
  }
};
</script>

<style scoped lang="less">
  .wrapper{
    width: 100vw;
    height: 100vh;
    .map {
      flex: 1;
      display: flex;
      width: 100%;
      height: 100%;
    }
  }
</style>
