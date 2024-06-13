<template>
  <div id="map" class="map-container" ref="mapContainer"></div>
  <font-awesome-icon :icon="['fas', 'map-pin']" />
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import {onBeforeUnmount, onMounted, ref, watch} from "vue";

export default {
  name: 'LeafletMapComponent',
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ['polygonDrawn'],
  setup(props, { emit }) {
    const mapContainer = ref(null);
   // const markers = ref([]);
    let map;
    let markersLayer;
    const updateMapFocus = (items) => {
      const latLngs = items
          .filter(item => item.Latitude && item.Longitude)
          .map(item => L.latLng(item.Latitude, item.Longitude));
      if (latLngs.length) {
        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds, { maxZoom: 10 });
      }
    };

    onMounted(() => {
      // 初始化地图
      map = L.map(mapContainer.value).setView([51.505, -0.09], 3);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }).addTo(map);



      // 初始化时为所有selectedItems添加标记
      //addMarkers(props.selectedItems);
      markersLayer = L.layerGroup().addTo(map);

      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems
        },
        draw: {
          polygon: true,
          marker: false,
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false
        }
      });
      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawnItems.addLayer(layer);

        const polygon = layer.toGeoJSON();
        const polygonString = JSON.stringify(polygon.geometry.coordinates);
        console.log(polygonString);
        const coordinates = polygon.geometry.coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(',');
        const wktPolygon = `POLYGON((${coordinates}))`;
        emit('polygonDrawn', wktPolygon);
        //emit('polygonDrawn', polygonString);
      });
    });

    watch(() => props.selectedItems, (newItems) => {
      markersLayer.clearLayers();
      newItems.forEach(item => {
        if (item.Latitude && item.Longitude) {
          const icon = L.divIcon({
            html: '<i class="fa fa-map-pin" aria-hidden="true"></i>',
            className: 'custom-icon',
            iconSize: L.point(20, 20),
            iconAnchor: L.point(10, 20)
          });

          L.marker([item.Latitude, item.Longitude], { icon })
              .addTo(markersLayer)
              .bindPopup(`<b>${item.ScientificName}</b><br>${item.Locality}`);
        }
      });
      updateMapFocus(newItems)
    });

    onBeforeUnmount(() => {
      // 组件卸载前清理地图
      if (map) {
        map.remove();
        map = null;
      }
    });
    return {
      // 如果你需要在模板中访问地图实例，可以返回它
      mapContainer
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
