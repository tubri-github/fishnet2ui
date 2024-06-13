<template>
  <div class="map-view">
    <div class="search-area">
<!--      <search-box @search="toggleSelectedList"/>-->
      <search-box @search="fetchOccurrences" :polygon="polygon"/>
    </div>
    <div class="map-area" :class="{ 'loading': isLoading }">
      <leaflet-map-component @polygonDrawn="handlePolygonDrawn"
                             :selectedItems="items"
                             :showPaginationButtons="items.length > 0"
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
import api from '@/api/api';
import debounce from 'lodash/debounce';

import SearchBox from "@/components/SearchBox";
import LeafletMapComponent from "@/components/LeafletMapComponent";
import SelectedList from "@/components/SelectedList";
export default {
  name: "MapPage.vue",
  components:{
    SearchBox,
    LeafletMapComponent,
    SelectedList
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
      totalPages: computed(() => Math.ceil(pagination.value.totalItems / pagination.value.pageSize))
    });


    const showSelectedList = ref(false);
    const polygon = ref('');
    const isLoading = ref(false);
    const selectedListRef = ref(null);

    const debouncedFetchOccurrences = debounce(async (params) => {
      try {
        isLoading.value = true;
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([, value]) => value != null && value !== '')
        );
        fparams = filteredParams
        const [occurrencesResponse, otherDataResponse, additionalInfoResponse, extraInfoResponse] = await Promise.all([
        // const [occurrencesResponse] = await Promise.all([
          api.getOccurrences(filteredParams),
          api.getTaxas(filteredParams),
          api.getProviders(filteredParams),
          api.getLocaton(filteredParams)
        ]);

        items.value = occurrencesResponse.data.occurrences;
        paginationData.value.dataTableTotal = occurrencesResponse.data.total;
        pagination.value.totalItems = occurrencesResponse.data.total;
        pagination.value.pageSize = 20;
        otherData.value = otherDataResponse.data.taxas;
        paginationData.value.otherDataTotal = otherDataResponse.data.total;
        additionalInfo.value = additionalInfoResponse.data.providers;
        paginationData.value.additionalInfoTotal = additionalInfoResponse.data.total;
        extraInfo.value = extraInfoResponse.data.locations;
        paginationData.value.extraInfoTotal = extraInfoResponse.data.total;
        showSelectedList.value = true;
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
      } finally {
        isLoading.value = false;
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


    async function fetchPageData({ page, size, tab }) {
      try {
        isLoading.value = true;
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
        console.error('Error fetching page data:', error);
        alert('Error fetching page data');
      } finally {
        isLoading.value = false;
      }
    }

    async function handleDownload({ type, tab }) {
      try {
        let response;
        switch (tab) {
          case 'dataTable':
            response = await api.getOccurrences({ ...fparams,... {num:null, fmt: type, att:1} });
            break;
          case 'otherData':
            response = await api.getTaxas({ ...fparams,... {num:null, fmt: type, att:1} });
            break;
          case 'additionalInfo':
            response = await api.getProviders({ ...fparams,... {num:null, fmt: type, att:1} });
            break;
          case 'extraInfo':
            response = await api.getLocaton({ ...fparams,... {num:null, fmt: type, att:1} });
            break;
        }
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // 提取文件名
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'data.csv'; // 默认文件名
        console.log(contentDisposition)
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          const match = contentDisposition.match(/filename="(.+)"/);
          console.log(match)
          if (match && match[1]) {
            fileName = match[1];
          }
        }

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file');
      }
    }


    function search() {
      // fake search logic
      console.log('Searching for:', searchTerm.value);
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
      isLoading,
      fetchPageData,
      paginationData,
      changePage,
      selectedListRef,
      pagination
    };
  },
}
</script>

<style scoped>
.map-view {
  /*position: relative;*/
  height: 100vh;
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

</style>