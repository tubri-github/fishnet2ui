<template>
  <div id="mapContainer" class="map-container"></div>
  <font-awesome-icon :icon="['fas', 'map-pin']" />
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {onBeforeUnmount, onMounted, ref, watch} from "vue";

export default {
  name: 'LeafletMapComponent',
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const map = ref(null);
    const markers = ref([]);
    // 创建一个添加标记到地图的方法
    const addMarkers = (items) => {
      // 确保地图实例存在
      if (!map.value) return;

      // 清除已有的标记
      markers.value.forEach(marker => map.value.removeLayer(marker));
      markers.value = [];

      // 为每个selectedItem添加标记
      items.forEach(item => {
        const icon = L.divIcon({
          html: '<i class="fa fa-map-pin" aria-hidden="true"></i>',
          className: 'custom-icon',
          iconSize: L.point(20, 20),
          iconAnchor: L.point(10, 20)
        });

        const marker = L.marker([item.Latitude, item.Longitude], {icon}).addTo(map.value);
        markers.value.push(marker);
      });
    };

    onMounted(() => {
      // 初始化地图
      map.value = L.map('mapContainer').setView([51.505, -0.09], 3);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }).addTo(map.value);

      // 初始化时为所有selectedItems添加标记
      addMarkers(props.selectedItems);
    });

    watch(() => props.selectedItems, (newItems) => {
      // 当selectedItems变化时，更新标记
      addMarkers(newItems);
    });

    onBeforeUnmount(() => {
      // 组件卸载前清理地图
      if (map.value) {
        map.value.remove();
        map.value = null;
      }
    });
    return {
      // 如果你需要在模板中访问地图实例，可以返回它
      map
    };
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
.custom-icon {
  color: red;
  font-size: 24px;
  position: absolute;
  top: -24px;
  left: -12px;
}
</style>
