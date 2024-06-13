<template>
  <div class="map-view">
    <div class="search-area">
<!--      <search-box @search="toggleSelectedList"/>-->
      <search-box @search="fetchOccurrences" :polygon="polygon"/>
    </div>
    <div class="map-area" :class="{ 'loading': isLoading }">
      <leaflet-map-component @polygonDrawn="handlePolygonDrawn"  :selectedItems="items"/>

      <transition name="slide-up">
        <selected-list
            :isActive="showSelectedList"
            v-if="showSelectedList"
            :selectedItems="items"
            @download ="handleDownload"
        />
      </transition>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
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
    const items = ref([
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "773",
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Country: "U.S.A.",
          StateProvince: "Nebraska",
          County: "Saunders",
          Locality: "Salt Creek At Ashland; T12N,R9E,S1, W1/2; Salt Creek",
          YearCollected: 1977,
          MonthCollected: 10,
          DayCollected: 19,
          Collector: "Peters, E.J.; Maret, T.",
          BasisOfRecord: "Voucher",
          Remarks: "Publication:maret,t.r. And E.j. Peters. 1980. The Fishes Of Salt Creek Basin, Nebraska. Transactions Of The Nebraska Academy Of Sciences. Viii: 35-54.",
          DateLastModified: "2006-04-25T",
          status:"active",
          Latitude: 40.09478,
          Longitude: -99.43253

        },
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "785",
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Country: "U.S.A.",
          StateProvince: "Nebraska",
          County: "Hall",
          Locality: "Platte River At Mormon Island; Middle Platte River",
          YearCollected: 1980,
          Collector: "Cochnar, J.; Jenson, D.",
          BasisOfRecord: "Voucher",
          Remarks: "Mormon Island Fish Inventory",
          DateLastModified: "2006-04-25T",
          status:"active",
          Latitude: 40.06816,
          Longitude: -99.37672
        },
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "7920",
          IndividualCount: 4,
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Latitude: 42.92198,
          Longitude: -98.40169,
          CoordinateUncertaintyInMeters: 4000,
          Country: "U.S.A.",
          StateProvince: "Nebraska",
          County: "Boyd",
          Locality: "Missouri River At Sunshine Bottoms, N. of Lynch, NE; Missouri River",
          YearCollected: 1976,
          MonthCollected: 8,
          Collector: "Peters, E.J.; Fiet, D.",
          BasisOfRecord: "Voucher",
          Remarks: "Identified By Bob Hrabik 02 Aug 1984",
          DateLastModified: "2006-04-25T",
          status:"closed",

        },
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "8011",
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Country: "U.S.A.",
          StateProvince: "Nebraska",
          County: "Cass",
          Locality: "Platte River At Louisville; T12N,R11E; Lower Platte River",
          YearCollected: 1973,
          MonthCollected: 7,
          Collector: "Lynch, J.D.",
          BasisOfRecord: "Voucher",
          DateLastModified: "2006-04-25T",
          status:"active",
          Latitude: 40.28672,
          Longitude: -99.84347
        },
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "813",
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Country: "U.S.A.",
          StateProvince: "Oklahoma",
          Locality: "Salt Fork Of Arkansas River",
          YearCollected: 1939,
          MonthCollected: 8,
          DayCollected: 24,
          Collector: "Moore, G.A.; Class",
          BasisOfRecord: "Voucher",
          Remarks: "Note: Notropis Percobromus= N. Atherinoides",
          DateLastModified: "2006-04-25T",
          status:"reforming",
          Latitude: 40.24452,
          Longitude: -99.70591
        },
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "2476",
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Country: "U.S.A.",
          StateProvince: "Nebraska",
          County: "Nemaha",
          Locality: "Little Nemaha River; T5N,R14E,S9,SE1/4; Little Nemaha River",
          YearCollected: 1973,
          MonthCollected: 8,
          DayCollected: 28,
          Collector: "Schainost, S.; Kucera, P.",
          BasisOfRecord: "Voucher",
          Remarks: "Bliss, Q. And S. Schainost. 1973. Nebraska Stream Inventory Reports. Nebraska Game And Parks Commission Wildlife Services, Aquatic Wildlife Division, Lincoln. Ne, 68503.",
          DateLastModified: "2006-04-25T",
          status:"active",
          Latitude: 40.25511,
          Longitude: -100.1205
        },
        {
          InstitutionCode: "UNSM",
          CollectionCode: "Fish",
          CatalogNumber: "24815",
          ScientificName: "Notropis atherinoides",
          Family: "Cyprinidae",
          PreparationType: "Alcoholic",
          Country: "U.S.A.",
          StateProvince: "Nebraska",
          County: "Nemaha",
          DateLastModified: "2006-04-25T",
          status:"active",
          Latitude: 40.11145,
          Longitude: -99.48468
        },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24815",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.09478,
        Longitude: -99.43253
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24815",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24815",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.06816,
        Longitude: -99.37672
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24814",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.0094,
        Longitude: -98.05828
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24811",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.06918,
        Longitude: -98.37672
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24819",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.09478,
        Longitude: -99.43253
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24812",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24813",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "773",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Saunders",
        Locality: "Salt Creek At Ashland; T12N,R9E,S1, W1/2; Salt Creek",
        YearCollected: 1977,
        MonthCollected: 10,
        DayCollected: 19,
        Collector: "Peters, E.J.; Maret, T.",
        BasisOfRecord: "Voucher",
        Remarks: "Publication:maret,t.r. And E.j. Peters. 1980. The Fishes Of Salt Creek Basin, Nebraska. Transactions Of The Nebraska Academy Of Sciences. Viii: 35-54.",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "785",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Hall",
        Locality: "Platte River At Mormon Island; Middle Platte River",
        YearCollected: 1980,
        Collector: "Cochnar, J.; Jenson, D.",
        BasisOfRecord: "Voucher",
        Remarks: "Mormon Island Fish Inventory",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "7920",
        IndividualCount: 4,
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Latitude: 42.92198,
        Longitude: -98.40169,
        CoordinateUncertaintyInMeters: 4000,
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Boyd",
        Locality: "Missouri River At Sunshine Bottoms, N. of Lynch, NE; Missouri River",
        YearCollected: 1976,
        MonthCollected: 8,
        Collector: "Peters, E.J.; Fiet, D.",
        BasisOfRecord: "Voucher",
        Remarks: "Identified By Bob Hrabik 02 Aug 1984",
        DateLastModified: "2006-04-25T",
        status:"closed",

      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "8011",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Cass",
        Locality: "Platte River At Louisville; T12N,R11E; Lower Platte River",
        YearCollected: 1973,
        MonthCollected: 7,
        Collector: "Lynch, J.D.",
        BasisOfRecord: "Voucher",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "813",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Oklahoma",
        Locality: "Salt Fork Of Arkansas River",
        YearCollected: 1939,
        MonthCollected: 8,
        DayCollected: 24,
        Collector: "Moore, G.A.; Class",
        BasisOfRecord: "Voucher",
        Remarks: "Note: Notropis Percobromus= N. Atherinoides",
        DateLastModified: "2006-04-25T",
        status:"reforming",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "2476",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        Locality: "Little Nemaha River; T5N,R14E,S9,SE1/4; Little Nemaha River",
        YearCollected: 1973,
        MonthCollected: 8,
        DayCollected: 28,
        Collector: "Schainost, S.; Kucera, P.",
        BasisOfRecord: "Voucher",
        Remarks: "Bliss, Q. And S. Schainost. 1973. Nebraska Stream Inventory Reports. Nebraska Game And Parks Commission Wildlife Services, Aquatic Wildlife Division, Lincoln. Ne, 68503.",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
      {
        InstitutionCode: "UNSM",
        CollectionCode: "Fish",
        CatalogNumber: "24815",
        ScientificName: "Notropis atherinoides",
        Family: "Cyprinidae",
        PreparationType: "Alcoholic",
        Country: "U.S.A.",
        StateProvince: "Nebraska",
        County: "Nemaha",
        DateLastModified: "2006-04-25T",
        status:"active",
        Latitude: 40.22732,
        Longitude: -100.38391
      },
    ]);
    // const otherData = ref([]);
    // const additionalInfo = ref([]);
    // const extraInfo = ref([]);
    let fparams = ref([]);

    const showSelectedList = ref(false);
    const polygon = ref('');
    const isLoading = ref(false);

    const debouncedFetchOccurrences = debounce(async (params) => {
      try {
        isLoading.value = true;
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([, value]) => value != null && value !== '')
        );
        fparams = filteredParams
        // const [occurrencesResponse, otherDataResponse, additionalInfoResponse, extraInfoResponse] = await Promise.all([
        const [occurrencesResponse] = await Promise.all([
          api.getOccurrences(filteredParams),
          // api.getOtherData(filteredParams),
          // api.getAdditionalInfo(filteredParams),
          // api.getExtraInfo(filteredParams)
        ]);

        items.value = occurrencesResponse.data.occurrences;
        // otherData.value = otherDataResponse.data;
        // additionalInfo.value = additionalInfoResponse.data;
        // extraInfo.value = extraInfoResponse.data;
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
    async function handleDownload({ type, tab }) {
      try {
        let response;
        switch (tab) {
          case 'dataTable':
            response = await api.getOccurrences({ ...fparams,... {num:null, fmt: type, att:1} });
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

    return {
      searchTerm,
      results,
      search,
      items,
      toggleSelectedList,
      showSelectedList,
      handlePolygonDrawn,
      fetchOccurrences,
      handleDownload,
      polygon,
      isLoading,
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