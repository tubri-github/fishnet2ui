<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'LeafletMapComponent',
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  mounted() {
    // 地图初始化
    const map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 2);

    // 添加OpenStreetMap瓦片图层
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }).addTo(map);

    // 你可以在这里添加更多的地图功能，比如标记等
  }
};
</script>

<style>
.map-container {
  /*position: absolute;*/
  /*top: 60px; !* 假设你的头部高度为60px *!*/
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0; /* 或根据需要设置合适的z-index */
}

/* 重置leaflet地图在Vue中的默认样式 */
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>
