<template>
  <div id="map" class="map-container" ref="mapContainer"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {driver} from "driver.js";
import '@/assets/driver_theme.css';
import 'driver.js/dist/driver.css';

export default {
  name: 'LeafletMapComponent',
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    },
    showPaginationButtons: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    resultsPlotted: {
      type: Number,
      default: 0
    }
  },
  emits: ['polygonDrawn','changePage'],
  setup(props, { emit }) {
    const mapContainer = ref(null);
   // const markers = ref([]);
    let map;
    let markersLayer;
    let paginationControlInstance;

    const startTour = () => {
      const driverInstance  = driver({
        popoverClass: 'blue-white-popover',
        showProgress: false,
        allowHTML: true,
        allowClose: false,
        steps: [

          // Step 3: Viewing Results - 结果展示区域
          {
            element: '.selected-list-container',  // 结果展示区域
            popover: {
              title: 'Viewing Results',
              description: 'Your search results will appear below the map area. Let\'s go over the result tabs.',
              position: 'top'
            }
          },
          {
            element: '#tab-dataTable',  // Search Results 标签
            popover: {
              title: 'Search Results Tab',
              description: 'This tab shows a listing of specimen records returned by your search.',
              position: 'top',
              align:'start'
            }
          },
          {
            element: '#tab-otherData',  // Taxon 标签
            popover: {
              title: 'Taxon Tab',
              description: 'Taxon -summary listing the number of records found for each taxon in your result set. A link to the Encyclopedia of Life is also provided for each taxon, making it easy to get further information (general description, life history, photos etc.) about a particular species',
              position: 'top',
              align:'start'
            }
          },
          {
            element: '#tab-additionalInfo',  // Providers & Citation 标签
            popover: {
              title: 'Providers & Citation Tab',
              description: 'Providers & Citation -summary listing the number of records found for each data provider in your result set along with a generated citation.',
              position: 'top',
              align:'start'
            }
          },
          {
            element: '#tab-extraInfo',  // Location 标签
            popover: {
              title: 'Location Tab',
              description: 'This tab summarizes the number of records found for unique locations in your result set.',
              position: 'top',
              align:'start'
            }
          },
          // Step 4: Downloading/Mapping Results - 下载和映射结果
          {
            element: '.download-options',  // 下载链接区域
            popover: {
              title: 'Downloading/Mapping Results',
              description: 'You can download the full dataset for the selected tab (Search Results, Taxon, Providers or Location) in either comma separated value (CSV) or tab delimited text (TXT) format. If your query results contain mappable geographic coordinates, the Search Results tab will also contain a Keyhole Markup Language (KML) format in addition to the CSV and TXT links. KML files can be visualized in Google Earth as well as many newer GIS programs',
              position: 'top',
              align:'start'
            }
          }
        ]
      });


      driverInstance.drive();
      localStorage.setItem('hasSeenTableTour', true); // 标记用户已经看过引导
    };



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
        //const polygonString = JSON.stringify(polygon.geometry.coordinates);
        // console.log(polygonString);
        const coordinates = polygon.geometry.coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(',');
        const wktPolygon = `POLYGON((${coordinates}))`;
        emit('polygonDrawn', wktPolygon);
        //emit('polygonDrawn', polygonString);
      });
      if (props.showPaginationButtons) {
        addPaginationControls();
      }
    });

    const addPaginationControls = () => {
      if (paginationControlInstance) {
        updatePaginationInfo();
        return;
      }

      const paginationControl = L.Control.extend({
        options: {
          position: 'topright'  // 控件位置
        },
        onAdd: function () {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          const paginationContainer = L.DomUtil.create('div', 'pagination-container', container);

          const prevButton = L.DomUtil.create('a', 'leaflet-control-button prev', paginationContainer);
          prevButton.innerHTML = '&laquo;';
          prevButton.href = '#';
          prevButton.title = 'Previous Page';
          prevButton.onclick = () => {
            emit('changePage', { direction: 'prev' });
            return false;
          };

          const pageInfo = L.DomUtil.create('span', 'page-info', paginationContainer);
          pageInfo.id ='page-info'
          pageInfo.innerHTML = `Page ${props.currentPage} of ${props.totalPages}`;

          const nextButton = L.DomUtil.create('a', 'leaflet-control-button next', paginationContainer);
          nextButton.innerHTML = '&raquo;';
          nextButton.href = '#';
          nextButton.title = 'Next Page';
          nextButton.onclick = () => {
            emit('changePage', { direction: 'next' });
            return false;
          };

          return container;
        }
      });

      paginationControlInstance = new paginationControl();
      map.addControl(paginationControlInstance);
      updatePaginationInfo();
    };

    const updatePaginationInfo = () => {
      const pageInfo = document.getElementById('page-info');
      const prevButton = document.querySelector('.leaflet-control-button.prev');
      const nextButton = document.querySelector('.leaflet-control-button.next');

      if (pageInfo) {
        if (props.totalPages === 0) {
          pageInfo.innerHTML = 'No match found for this query :(';
          // 隐藏分页按钮
          if (prevButton) prevButton.style.display = 'none';
          if (nextButton) nextButton.style.display = 'none';
        } else {
          pageInfo.innerHTML = `Page ${props.currentPage} of ${props.totalPages}`;
          // 显示分页按钮
          if (prevButton) prevButton.style.display = 'block';
          if (nextButton) nextButton.style.display = 'block';
        }
      }

      if (!localStorage.getItem('hasSeenTableTour')) {
        startTour();
      }
    };

    watch([() => props.showPaginationButtons,() => props.currentPage, () => props.totalPages, () => props.resultsPlotted], () => {
      if (!paginationControlInstance) {
        // 确保控件在第一次搜索后初始化，无论是否有结果
        addPaginationControls();
      }
        updatePaginationInfo();

    }, { flush: 'post' });

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
              .bindPopup( `<div style="font-family: Arial, sans-serif; font-size: 14px; padding: 10px; max-width: 300px;">
                <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${item.InstitutionCode} ${item.CatalogNumber}</div>
                <div>
                  <span style="font-weight: bold;">Species:</span> ${item.ScientificName}<br>
                  <span style="font-weight: bold;">No. of Specimens:</span> ${item.IndividualCount}<br>
                  <span style="font-weight: bold;">Locality:</span> ${item.Locality}<br>
                  <span style="font-weight: bold;">Collector:</span> ${item.Collector}<br>
                  <span style="font-weight: bold;">Date Collected:</span> ${item.MonthCollected}/${item.DayCollected}/${item.YearCollected}
                </div>
              </div>`);
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
    const goToPreviousPage = () => {
      emit('changePage', { direction: 'prev' });
    };

    const goToNextPage = () => {
      emit('changePage', { direction: 'next' });
    };
    return {
      // 如果你需要在模板中访问地图实例，可以返回它
      mapContainer,
      goToNextPage,
      goToPreviousPage
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
.leaflet-control-button {
  display: block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: white;
  color: black;
  text-decoration: none;
  border: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
}

.leaflet-control-button:hover {
  background-color: #f0f0f0;
}

.leaflet-control-button[style*="display: none"] {
  display: none; /* 确保按钮在隐藏时不占用空间 */
}

.custom-icon {
  color: red;
  font-size: 24px;
  position: absolute;
  /*top: -24px;
  left: -12px;*/ /*this will lead to markers offset on the map while zoom in/out*/
}
.leaflet-right{
  left: 50%;
  transform: translateX(-50%);
  right: auto;
}
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  top: 10px;
  z-index: 1000;
  transform: translateX(-50%);
}

.page-info {
  margin: 0 10px;
  font-size: 14px;
  white-space: nowrap;
}

.page-info.no-results {
  font-style: italic;
  color: red;
}

</style>
