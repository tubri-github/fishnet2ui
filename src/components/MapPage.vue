<template>
  <div class="map-view">
    <div class="search-area">
<!--      <search-box @search="toggleSelectedList"/>-->
      <search-box :initialQuery="query"  @start-tour="startTour" @search="fetchOccurrences" :polygon="polygon"/>
    </div>
    <div class="map-area" >
      <leaflet-map-component @polygonDrawn="handlePolygonDrawn"
                             :selectedItems="items"
                             :showPaginationButtons="pagination.showedPageInfo"
                             :currentPage="pagination.currentPage"
                             :totalPages="pagination.totalPages"
                             :resultsPlotted="items.length"
                             @changePage="changePage"/>

      <transition name="slide-up">
        <selected-list
            ref="selectedListRef"
            :isActive="showSelectedList"
            v-if="showSelectedList"
            :selectedItems="items"
            :otherData="otherData"
            :additionalInfo="additionalInfo"
            :extraInfo="extraInfo"
            :paginationData="paginationData"
            @fetchPageData="fetchPageData"
            @download ="handleDownload"
        />
      </transition>
    </div>

  </div>
</template>

<script>
import {computed, ref} from 'vue';
import { ElLoading } from 'element-plus';
import api from '@/api/api';
import debounce from 'lodash/debounce';
import {driver} from 'driver.js';
import '@/assets/driver_theme.css';
import 'driver.js/dist/driver.css';


import SearchBox from "@/components/SearchBox";
import LeafletMapComponent from "@/components/LeafletMapComponent";
import SelectedList from "@/components/SelectedList";
import streamSaver from 'streamsaver';
import 'web-streams-polyfill/dist/polyfill.es5';
import axios from "axios";

export default {
  name: "MapPage.vue",
  components:{
    SearchBox,
    LeafletMapComponent,
    SelectedList
  },
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const searchTerm = ref('');
    const results = ref([]);
    const items = ref([]);
    const otherData = ref([]);
    const additionalInfo = ref([]);
    const extraInfo = ref([]);
    let fparams = ref([]);
    const paginationData = ref({
      dataTableTotal: 0,
      otherDataTotal: 0,
      additionalInfoTotal: 0,
      extraInfoTotal: 0
    });
    const pagination = ref({
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: computed(() => Math.ceil(pagination.value.totalItems / pagination.value.pageSize)),
      showedPageInfo: false
    });
    // const loadingState = reactive({
    //   occurrences: 'Loading...',
    //   taxas: 'Loading...',
    //   providers: 'Loading...',
    //   locations: 'Loading...',
    // });

    const startTour = () => {
      const driverInstance  = driver({
        popoverClass: 'blue-white-popover',
        showProgress: false,
        allowHTML: true,
        allowClose: false,
        steps: [
          {
            popover: {
              title: 'Hello, FishNet2 community!\n',
              description:
                  '<p>We\'re excited to announce a fresh new look for FishNet! We\'ve given our interface a makeover to enhance your experience while keeping all the features and APIs you used to have. We are currently working on more exciting updates coming next!</p>' +
                  '<p style="font-size:20px">Having issues? Contact us via <a href="mailto:support@fishnet2.net">support@fishnet2.net</a> or visit our <a href="https://github.com/tubri/Fishnet2Community/discussions"> GitHub community</a>to submit an error report.</p>',
              position: 'center',
            }
          },
          {
            element: '#searchFields',  // 假设这是搜索表单的ID
            popover: {
              title: 'Conducting a Search',
              description: 'Enter your search terms into the provided fields and click execute to conduct a search.',
              position: 'left',
              align:'start'
            }
          },
          {
            element: '#searchFields',  // 假设这是显示 ">>" 链接的元素
            popover: {
              title: 'Search Field Helper',
              description: 'Some fields may contain a dropdown list, which opens a search helper to guide your search.',
              position: 'left',
              align: 'center'
            }
          },
          {
            element: '#locationHelper',  // 位置搜索帮助
            popover: {
              title: 'Location Search Helper',
              description: 'The location search helper allows you to specify more precise location details.',
              position: 'left'
            }
          },
          {
            element: '#institutionCodeHelper',  // 机构代码搜索帮助
            popover: {
              title: 'Institution Code Search Helper',
              description: 'This helper displays a list of available institution codes for a more specific query.',
              position: 'left'
            }
          },
          {
            element: '#polygonSearch',  // 假设这是多边形搜索的链接
            popover: {
              title: 'Polygon Search Helper',
              description: 'Paste WKT or Draw a Polygon (Click \'&#11202;\') to draw polygons on the map as search criteria.',
              position: 'left'
            }
          },
          {
            element: '.leaflet-draw.leaflet-control',  // 假设这是多边形搜索的链接,map
            popover: {
              title: 'Polygon Search Helper',
              description: 'Paste WKT or Draw a Polygon (Click \'&#11202;\') to draw polygons on the map as search criteria.',
              position: 'right'
            }
          }
        ]
      });


      driverInstance.drive();
      localStorage.setItem('hasSeenTour', true); // 标记用户已经看过引导
    };

    // onMounted(() => {
    //   // 页面加载时检查用户是否已经看过引导
    //   if (!localStorage.getItem('hasSeenTour')) {
    //     startTour();
    //   }
    // });


    const showSelectedList = ref(false);
    const polygon = ref('');
    let loadingInstance = null;
    const selectedListRef = ref(null);

    const debouncedFetchOccurrences = debounce(async (params) => {
      try {
        loadingInstance = ElLoading.service({
          lock: true,
          text: 'Loading...',
          background: 'rgba(255, 255, 255, 0.7)',
        });

        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([, value]) => value != null && value !== '')
        );
        fparams = filteredParams
        // 并行请求多个 API
        await Promise.all([
          api.getOccurrences(filteredParams)
              .then((response) => {
                items.value = response.data.occurrences;
                paginationData.value.dataTableTotal = response.data.total;
                pagination.value.totalItems = response.data.total;
                pagination.value.pageSize = 20;
                loadingInstance.setText('Occurrences Data Loaded Successfully'); // 更新状态
              })
              .catch(() => {
                items.value = []; // 清空数据
                loadingInstance.setText('Failed to Load Occurrence Data'); // 显示加载失败
              }),
          api.getTaxas(filteredParams)
              .then((response) => {
                otherData.value = response.data.taxas;
                paginationData.value.otherDataTotal = response.data.total;
                loadingInstance.setText('Taxa Data Loaded Successfully'); // 更新状态
              })
              .catch(() => {
                otherData.value = []; // 清空数据
                loadingInstance.setText('Failed to Load Taxa Data'); // 显示加载失败
              }),
          api.getProviders(filteredParams)
              .then((response) => {
                additionalInfo.value = response.data.providers;
                paginationData.value.additionalInfoTotal = response.data.total;
                loadingInstance.setText('Provider and Citation Data Loaded Successfully'); // 更新状态
              })
              .catch(() => {
                additionalInfo.value = []; // 清空数据
                loadingInstance.setText('Failed to Load Provider and Citation Data'); // 显示加载失败
              }),
          api.getLocaton(filteredParams)
              .then((response) => {
                extraInfo.value = response.data.locations;
                paginationData.value.extraInfoTotal = response.data.total;
                loadingInstance.setText('Location Data Loaded Successfully'); // 更新状态
              })
              .catch(() => {
                extraInfo.value = []; // 清空数据
                loadingInstance.setText('Failed to Load Location Data '); // 显示加载失败
              }),
        ]);

        showSelectedList.value = true;
        pagination.value.showedPageInfo = true;
      } catch (error) {
        // console.error('Error fetching data:', error);
        alert(error.message);
      } finally {
        if (loadingInstance) {
          loadingInstance.close();
        }
      }
    }, 500);

    function toggleSelectedList() {
      showSelectedList.value = !showSelectedList.value;
    }
    function handlePolygonDrawn(polygonString) {
      polygon.value = polygonString;
    }

    async function fetchOccurrences(params) {
      debouncedFetchOccurrences(params);
    }

    async function getJwtToken() {
      try {
        const response = await axios.get(process.env.VUE_APP_API_BASE_URL + '/clients');
        return response.data.token; // 假设返回的是 { token: 'jwt-token-value' }
      } catch (error) {
        console.error('Error fetching JWT:', error);
        return null;
      }
    }



    async function fetchPageData({ page, size, tab }) {
      try {
        loadingInstance = ElLoading.service({
          lock: true,
          text: 'Loading Page Data...',
          background: 'rgba(255, 255, 255, 0.7)',
        });
        let response;
        switch (tab) {
          case 'dataTable':
            response = await api.getOccurrences({ ...fparams,... {num:size,set:page} });
            items.value = response.data.occurrences;
            paginationData.value.otherDataTotal = response.data.total;
            pagination.value.currentPage = page;
            pagination.value.pageSize = size;
            pagination.value.totalItems = response.data.total;
            break;
          case 'otherData':
            response = await api.getTaxas({ ...fparams,... {num:size,set:page} });
            otherData.value = response.data.taxas;
            paginationData.value.additionalInfoTotal = response.data.total;
            break;
          case 'additionalInfo':
            response = await api.getProviders({ ...fparams,... {num:size,set:page} });
            additionalInfo.value = response.data.providers;
            paginationData.value.dataTableTotal = response.data.total;
            break;
          case 'extraInfo':
            response = await api.getLocaton({ ...fparams,... {num:size,set:page} });
            extraInfo.value = response.data.locations;
            paginationData.value.extraInfoTotal = response.data.total;
            break;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        if (loadingInstance) {
          loadingInstance.close();
        }
      }
    }
    // const downloadFile = async ({ type, tab}) => {
    //   try {
    //     const fparams = { /* 替换为你的参数 */ };
    //     await handle2Download({ ...{ type, tab}, fparams });
    //   } catch (error) {
    //     console.error('Download failed', error);
    //   }
    // };
    // const handle2Download = ({ type, tab, fparams }) => {
    //   return new Promise((resolve, reject) => {
    //     let url;
    //     switch (tab) {
    //       case 'dataTable':
    //         url = `${process.env.VUE_APP_API_BASE_URL}/occurrence`;
    //         break;
    //       case 'otherData':
    //         url = `${process.env.VUE_APP_API_BASE_URL}/taxa`;
    //         break;
    //       case 'additionalInfo':
    //         url = `${process.env.VUE_APP_API_BASE_URL}/providers`;
    //         break;
    //       case 'extraInfo':
    //         url = `${process.env.VUE_APP_API_BASE_URL}/location`;
    //         break;
    //       default:
    //         throw new Error('Invalid tab type');
    //     }
    //     let currParams = { ...fparams,...{ fmt: type, att: 1 }}
    //     delete currParams.num;
    //     const params = new URLSearchParams(currParams);
    //
    //     const fetchUrl = `${url}/?${params.toString()}`;
    //     const fileName = 'data.csv'; // 默认文件名
    //     const workerBlob = new Blob([`
    //       self.onmessage = async (event) => {
    //         const { url, fileName } = event.data;
    //         importScripts('https://unpkg.com/streamsaver@2.0.6/StreamSaver.js');
    //         importScripts('https://cdn.jsdelivr.net/npm/web-streams-polyfill@3.1.1/dist/ponyfill.min.js');
    //
    //         try {
    //           const response = await fetch(url);
    //
    //           if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //           }
    //
    //           const contentDisposition = response.headers.get('content-disposition');
    //           let finalFileName = fileName;
    //           if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
    //             const match = contentDisposition.match(/filename="(.+)"/);
    //             if (match && match[1]) {
    //               finalFileName = match[1];
    //             }
    //           }
    //
    //           const fileStream = streamSaver.createWriteStream(finalFileName, {
    //             size: parseInt(response.headers.get('content-length'), 10),
    //           });
    //
    //           const readableStream = response.body;
    //
    //           if (self.WritableStream && readableStream.pipeTo) {
    //             await readableStream.pipeTo(fileStream);
    //           } else {
    //             const writer = fileStream.getWriter();
    //             const reader = readableStream.getReader();
    //             const pump = () =>
    //               reader.read().then(({ done, value }) => {
    //                 if (done) {
    //                   writer.close();
    //                   return;
    //                 }
    //                 writer.write(value).then(pump);
    //               });
    //
    //             pump();
    //           }
    //
    //           self.postMessage({ success: true });
    //         } catch (error) {
    //           self.postMessage({ success: false, error: error.message });
    //         }
    //       };
    //     `], { type: 'application/javascript' });
    //
    //     const workerUrl = URL.createObjectURL(workerBlob);
    //     const worker = new Worker(workerUrl);
    //
    //     worker.postMessage({ url: fetchUrl, fileName });
    //
    //     worker.onmessage = (event) => {
    //       URL.revokeObjectURL(workerUrl);
    //       if (event.data.success) {
    //         resolve();
    //       } else {
    //         reject(new Error(event.data.error));
    //       }
    //     };
    //
    //     worker.onerror = (error) => {
    //       URL.revokeObjectURL(workerUrl);
    //       reject(error);
    //     };
    //   });
    // };

    async function handleDownload({ type, tab }) {
      const jwtToken = await getJwtToken(); // Retrieve the JWT token

      if (!jwtToken) {
        console.error('Failed to retrieve token.');
        return;
      }
      try {
        let url;
        switch (tab) {
          case 'dataTable':
            url = `${process.env.VUE_APP_API_BASE_URL}/occurrence`;
            break;
          case 'otherData':
            url = `${process.env.VUE_APP_API_BASE_URL}/taxa`;
            break;
          case 'additionalInfo':
            url = `${process.env.VUE_APP_API_BASE_URL}/providers`;
            break;
          case 'extraInfo':
            url = `${process.env.VUE_APP_API_BASE_URL}/locations`;
            break;
          default:
            throw new Error('Invalid tab type');
        }
        let currParams = { ...fparams,...{ fmt: type, att: 1 }}
        delete currParams.num;
        const params = new URLSearchParams(currParams);
        const response = await fetch(`${url}/?${params.toString()}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${jwtToken}` // Add JWT token to the request header
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'data.csv'; // 默认文件名
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match && match[1]) {
            fileName = match[1];
          }
        }

        const fileStream = streamSaver.createWriteStream(fileName, {
          size: parseInt(response.headers.get('content-length'), 10), // 可选
        });

        const readableStream = response.body;

        if (window.WritableStream && readableStream.pipeTo) {
          // 更现代的浏览器
          await readableStream.pipeTo(fileStream);
          // console.log('Download complete');
        } else {
          // 旧版浏览器
          const writer = fileStream.getWriter();
          const reader = readableStream.getReader();
          const pump = () =>
              reader.read().then(({ done, value }) => {
                if (done) {
                  writer.close();
                  return;
                }
                writer.write(value).then(pump);
              });

          pump();
        }
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file');
      }
    }


    // async function handleDownload({ type, tab }) {
    //   try {
    //     let response;
    //     switch (tab) {
    //       case 'dataTable':
    //         response = await api.getOccurrences({ ...fparams,... {num:null, fmt: type, att:1} });
    //         break;
    //       case 'otherData':
    //         response = await api.getTaxas({ ...fparams,... {num:null, fmt: type, att:1} });
    //         break;
    //       case 'additionalInfo':
    //         response = await api.getProviders({ ...fparams,... {num:null, fmt: type, att:1} });
    //         break;
    //       case 'extraInfo':
    //         response = await api.getLocaton({ ...fparams,... {num:null, fmt: type, att:1} });
    //         break;
    //     }
    //     const blob = new Blob([response.data], { type: response.headers['content-type'] });
    //
    //     // 提取文件名
    //     const contentDisposition = response.headers['content-disposition'];
    //     let fileName = 'data.csv'; // 默认文件名
    //     // console.log(contentDisposition)
    //     if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
    //       const match = contentDisposition.match(/filename="(.+)"/);
    //       // console.log(match)
    //       if (match && match[1]) {
    //         fileName = match[1];
    //       }
    //     }
    //
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = fileName;
    //     link.click();
    //     URL.revokeObjectURL(link.href);
    //   } catch (error) {
    //     console.error('Error downloading file:', error);
    //     alert('Error downloading file');
    //   }
    // }


    function search() {
      // fake search logic
      // console.log('Searching for:', searchTerm.value);
      // fake data
      results.value = [
        { identifier: 1, name: 'Result 1' },
        { identifier: 2, name: 'Result 2' },
        { identifier: 3, name: 'Result 3' },
      ];
    }

    function changePage({ direction }) {
      const selectedList = selectedListRef.value;
      if (selectedList) {
        selectedList.changePage({ direction });
      }
    }



    return {
      searchTerm,
      results,
      search,
      items,
      otherData,
      additionalInfo,
      extraInfo,
      toggleSelectedList,
      showSelectedList,
      handlePolygonDrawn,
      fetchOccurrences,
      handleDownload,
      polygon,
      fetchPageData,
      paginationData,
      changePage,
      selectedListRef,
      pagination,
      startTour
    };
  },
}
</script>

<style scoped>
.map-view {
  /*position: relative;*/
  height: 90vh;
  display: flex;
}
.map-area.loading {
  pointer-events: none;
  opacity: 0.5;
}
.search-area {
  flex: 1; /* 占据1/3的宽度 */
  border-right: 1px solid #ccc; /* 与地图组件分隔开 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.map-area {
  flex: 3; /* 占据2/3的宽度 */
  position: relative; /* 为弹出的SelectedList组件定位 */
}

.selected-list{
  width: 100%; /* 与.map-area同宽 */
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
}


.driver-popover.driverjs-theme {
  background-color: #fde047;
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 15px;
}

.driver-popover.driverjs-theme .driver-popover-title,
.driver-popover.driverjs-theme .driver-popover-description,
.driver-popover.driverjs-theme .driver-popover-progress-text {
  color: #000;
}

.driver-popover.driverjs-theme button {
  flex: 1;
  text-align: center;
  background-color: #000;
  color: #ffffff;
  border: 2px solid #000;
  text-shadow: none;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 6px;
}

.driver-popover.driverjs-theme button:hover {
  background-color: #000;
  color: #ffffff;
}

.driver-popover.driverjs-theme .driver-popover-navigation-btns {
  justify-content: space-between;
  gap: 3px;
}

.driver-popover.driverjs-theme .driver-popover-close-btn {
  color: #9b9b9b;
}

.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-left.driver-popover-arrow {
  border-left-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-right.driver-popover-arrow {
  border-right-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-top.driver-popover-arrow {
  border-top-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-bottom.driver-popover-arrow {
  border-bottom-color: #fde047;
}


</style>