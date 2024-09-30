<template>
  <div id="map" class="map-container" ref="mapContainer"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import {onBeforeUnmount, onMounted, ref, watch,h, createApp} from "vue";
import {driver} from "driver.js";
import '@/assets/driver_theme.css';
import 'driver.js/dist/driver.css';
import { ElCollapse, ElCollapseItem } from 'element-plus';
import 'leaflet.gridlayer.googlemutant';

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

    const addColorLegend = () => {
      const legend = L.control({ position: 'topright' });

      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend custom-legend');
        const grades = [1, 6, 11, 16, 21];
        const colors = ['#6baed6', '#74c476', '#fd8d3c', '#e6550d', '#de2d26'];
        const descriptions = ['1', '2 - 10', '11 - 20', '21 - 30', '31+'];

        for (let i = 0; i < grades.length; i++) {
          div.innerHTML  +=
              `<div class="legend-item">
           <i class="fa fa-fish" style="color:${colors[i]}; font-size: 16px;"></i>
           <span>${descriptions[i]}</span>
         </div>`;
        }
        return div;
      };

      legend.addTo(map);
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

    const getColorByCount = (count) => {
      if (count === 1) return '#6baed6'; // 蓝色
      if (count <= 10) return '#74c476'; // 绿色
      if (count <= 20) return '#fd8d3c'; // 黄色
      if (count <= 30) return '#e6550d'; // 橙色
      return '#de2d26'; // 红色
    };


    const groupItemsByCoordinates = (items) => {
      const groupedItems = {};
      items.forEach((item) => {
        const key = `${item.Latitude},${item.Longitude}`;
        if (!groupedItems[key]) {
          groupedItems[key] = [];
        }
        groupedItems[key].push(item);
      });
      return groupedItems;
    };

    const addGroupedMarkers = (groupedItems) => {
      markersLayer.clearLayers();


      Object.entries(groupedItems).forEach(([key, items]) => {
        const [lat, lng] = key.split(',').map(Number);
        const color = getColorByCount(items.length);

        // 创建自定义图标元素
        const iconElement = document.createElement('i');
        iconElement.className = 'fa fa-fish'; // 使用 FontAwesome 鱼图标
        iconElement.style.color = color; // 设置颜色
        //iconElement.style.fontSize = '20px'; // 设置字体大小
        iconElement.ariaHidden = true;
        iconElement.style.textShadow = '1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000'; // 模拟边界效果



        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            html:  iconElement.outerHTML,
            className: 'custom-icon',
            iconSize: L.point(20, 20),
            iconAnchor: L.point(10, 20)
          })
        });


        // 创建弹出窗口内容
        const container = document.createElement('div');
        container.classList.add('custom-popup'); // 应用自定义样式

        // 如果只有一个点，直接显示详细信息
        if (items.length === 1) {
          // 单个点的情况，使用 ElCollapse 展示信息
          const collapseContent = h(
              ElCollapse,
              {
                accordion: true,
                modelValue: ['0'],
              },
              () => [
                h(
                    ElCollapseItem,
                    {
                      title: `${items[0].ScientificName} (${items[0].CatalogNumber})`,
                      name: '0',
                    },
                    () =>
                        h('div', { class: 'custom-popup' }, [
                          h('div', { class: 'popup-title' }, `${items[0].InstitutionCode} ${items[0].CatalogNumber}`),
                          h('div', {}, [
                            h('span', { class: 'popup-key' }, 'Species: '), h('span', { class: 'popup-value' }, `${items[0].ScientificName}`),
                            h('br'),
                            h('span', { class: 'popup-key' }, 'No. of Specimens: '), h('span', { class: 'popup-value' }, `${items[0].IndividualCount}`),
                            h('br'),
                            h('span', { class: 'popup-key' }, 'Locality: '), h('span', { class: 'popup-value' }, `${items[0].Locality}`),
                            h('br'),
                            h('span', { class: 'popup-key' }, 'Collector: '), h('span', { class: 'popup-value' }, `${items[0].Collector}`),
                            h('br'),
                            h('span', { class: 'popup-key' }, 'Date Collected: '), h('span', { class: 'popup-value' }, `${items[0].MonthCollected}/${items[0].DayCollected}/${items[0].YearCollected}`)
                          ])
                        ])
                )
              ]
          );

          // 增加大标题，包含坐标信息
          const popupHeader = h(
              'div',
              { class: 'popup-header fa fa-map-pin' },
              ` ${items[0].Latitude},${items[0].Longitude}`
          );

          // 将大标题和 collapse 内容结合
          const app = createApp({ render: () => h('div', [popupHeader, collapseContent]) });
          app.mount(container);
        } else {
          // 如果有多个点，使用 Vue render 函数创建 ElCollapse 组件
          const collapseContent = h(ElCollapse,
              {
                accordion: true, //only expand 1 record every time.
              },
              () =>
              items.map((item, index) =>
                  h(ElCollapseItem,
                      { title: `${item.ScientificName} (${item.CatalogNumber})`,
                              name: index.toString()
                      }, () =>
                      h('div', { class: 'custom-popup' }, [
                        h('div', { class: 'popup-title' }, `${item.InstitutionCode} ${item.CatalogNumber}`),
                        h('div', {}, [
                          h('span', { class: 'popup-key'  }, 'Species: '), `${item.ScientificName}`,
                          h('br'),
                          h('span', { class: 'popup-key' }, 'No. of Specimens: '), `${item.IndividualCount}`,
                          h('br'),
                          h('span', { class: 'popup-key'  }, 'Locality: '), `${item.Locality}`,
                          h('br'),
                          h('span', { class: 'popup-key'  }, 'Collector: '), `${item.Collector}`,
                          h('br'),
                          h('span', { class: 'popup-key'  }, 'Date Collected: '), `${item.MonthCollected}/${item.DayCollected}/${item.YearCollected}`
                        ])
                      ])
                  )
              )
          );

          // 增加大标题，包含坐标信息
          const popupHeader = h(
              'div',
              { class: 'popup-header fa fa-map-pin' },
              ` ${items[0].Latitude}, ${items[0].Longitude}`
          );
          // const container = document.createElement('div');
          const app = createApp({ render: () => h('div', [popupHeader, collapseContent]) });
          app.mount(container);


        }
        marker.bindPopup(container);
        marker.addTo(markersLayer);
      });
    };

    onMounted(() => {
      // 初始化地图
      map = L.map(mapContainer.value).setView([51.505, -0.09], 3);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }).addTo(map);

      // Add Google Maps layers
      const googleStreets = L.gridLayer.googleMutant({
        type: 'roadmap'
      }).addTo(map);

      const googleSatellite = L.gridLayer.googleMutant({
        type: 'satellite'
      });

      const googleHybrid = L.gridLayer.googleMutant({
        type: 'hybrid'
      });

      // Add layer control
      const baseLayers = {
        "Google Streets": googleStreets,
        "Google Satellite": googleSatellite,
        "Google Hybrid": googleHybrid
      };

      L.control.layers(baseLayers, null, { position: 'topleft' }).addTo(map);

      const customControl = document.querySelector('.leaflet-control-layers-toggle');
      customControl.innerHTML = '<i class="fa fa-layer-group"></i>'; // 使用 Font Awesome 的图层图标
      customControl.style.fontSize = '0.8rem'; // 设置图标大小
      customControl.style.width = '30px'; // 设置控件宽度
      customControl.style.height = '30px'; // 设置控件高度
      customControl.style.backgroundColor = 'white'; // 背景颜色
      customControl.style.display = 'flex'; // 使用 Flexbox 布局
      customControl.style.alignItems = 'center'; // 垂直居中
      customControl.style.justifyContent = 'center'; // 水平居中
      customControl.style.textDecoration = 'none'; // 水平居中




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
        addColorLegend();
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
        addColorLegend();
      }
        updatePaginationInfo();

    }, { flush: 'post' });

    watch(() => props.selectedItems, (newItems) => {
      const groupedItems = groupItemsByCoordinates(newItems);
      addGroupedMarkers(groupedItems);
      updateMapFocus(newItems);
      // markersLayer.clearLayers();
      // newItems.forEach(item => {
      //   if (item.Latitude && item.Longitude) {
      //     const icon = L.divIcon({
      //       html: '<i class="fa fa-map-pin" aria-hidden="true"></i>',
      //       className: 'custom-icon',
      //       iconSize: L.point(20, 20),
      //       iconAnchor: L.point(10, 20)
      //     });
      //
      //     L.marker([item.Latitude, item.Longitude], { icon })
      //         .addTo(markersLayer)
      //         .bindPopup( `<div style="font-family: Arial, sans-serif; font-size: 14px; padding: 10px; max-width: 300px;">
      //           <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${item.InstitutionCode} ${item.CatalogNumber}</div>
      //           <div>
      //             <span style="font-weight: bold;">Species:</span> ${item.ScientificName}<br>
      //             <span style="font-weight: bold;">No. of Specimens:</span> ${item.IndividualCount}<br>
      //             <span style="font-weight: bold;">Locality:</span> ${item.Locality}<br>
      //             <span style="font-weight: bold;">Collector:</span> ${item.Collector}<br>
      //             <span style="font-weight: bold;">Date Collected:</span> ${item.MonthCollected}/${item.DayCollected}/${item.YearCollected}
      //           </div>
      //         </div>`);
      //   }
      // });
      // updateMapFocus(newItems)
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
  display:flex;
  /*left: 50%;*/
  /*transform: translateX(-50%);
  right: auto;*/
}
.leaflet-bar{
  border: none !important;
}
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1000;
  transform: translateX(-100%);
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
/* Leaflet 自带的 Popup 样式调整 */
.leaflet-popup-content-wrapper {
  border-radius: 8px !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
  padding: 0 !important;
}

.leaflet-popup-tip {
  display: none !important; /* 隐藏默认的箭头 */
}

.leaflet-popup-content {
  width:100%  !important;
  margin: 0 !important;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 13px !important;
  font-weight: normal !important;
  color: #333;
  line-height: 1.4;
}

.custom-popup {
  width: 380px;
  max-height: 350px;
  overflow-y: auto;
  font-family: Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding: 10px;
  color: #333;
  border: none;
  word-wrap: break-word;
}

.popup-header {
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #2c3e50;
}

.popup-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 6px;
  color: #2c3e50;
}

.popup-key {
  font-weight: bold;
  color: #1a73e8;
}

.popup-value {
  color: #555;
  margin-bottom: 5px;
}

.el-collapse {
  border: none; /* 去掉 Collapse 的边框 */
  box-shadow: none; /* 去掉阴影 */
}

.el-collapse-item {
  border-bottom: none; /* 移除项之间的边框 */
}

.el-collapse-item__header {
  font-weight: bold;
  color: #333;
}

.el-collapse-item__arrow {
  color: #1a73e8; /* 箭头的颜色 */
}

.info.legend.custom-legend {
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 6px;
  /*box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);*/
  /*border: 1px solid #131313;*/
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.legend-item i {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  textShadow: 1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000 ;
  border-radius: 3px;
}

.legend-item span {
  display: inline-block;
  color: #333;
  vertical-align: middle;
}
.leaflet-control-layers-toggle{
  background-image:none;
}
.leaflet-retina .leaflet-control-layers-toggle{
  background-image:none;
}

.leaflet-control-layers-toggle:hover {
  transform: none; /* 防止放大效果 */
  width: 30px; /* 确保宽度不变 */
  height: 30px; /* 确保高度不变 */
  background-color: white; /* 保持背景色一致 */
  transition: none; /* 取消动画效果 */
}

.leaflet-control-layers {
  background-color: white; /* 保持背景颜色一致 */
  border-radius: 6px; /* 确保鼠标悬停时边框圆角不变 */
  border: none;

}
a.leaflet-control-layers{
  text-decoration: none;
}
.leaflet-touch .leaflet-control-layers{
  border:none;
}
.leaflet-control-layers-expanded {
  width: auto; /* 确保展开时宽度自适应内容 */
  height: auto;
}

/* 控制整个图层控件的样式 */
.leaflet-control-layers-list {
  font-family: Arial, sans-serif; /* 设置字体为更轻量的 Arial */
  font-size:  0.75rem; /* 调整字体大小 */
  font-weight: lighter; /* 取消粗体 */
  color: #484848; /* 字体颜色为深灰色 */
  line-height: 1; /* 增加行高，使选项之间间距更大 */
  padding: 2px; /* 控制控件内边距 */
}

/* 调整选项的对齐 */
.leaflet-control-layers-list label {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 确保文本和图标靠左对齐 */
  margin: 6px 0; /* 增加上下间距 */
}

/* 调整选项图标与文字之间的间距 */
.leaflet-control-layers-list input[type="radio"] {
  margin-right: 3px; /* 调整复选框与文字之间的间距 */
}

/* 修改展开时的控件样式，保持一致性 */
.leaflet-control-layers-expanded {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  padding: 8px;
}
.fa-fish{
  font-size: 24px;
}
</style>
