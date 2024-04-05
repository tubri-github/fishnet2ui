<template>
  <div class="map-view">
    <div class="search-area">
      <search-box @search="toggleSelectedList"/>
    </div>
    <div class="map-area">
      <leaflet-map-component ref="map"/>

      <transition name="slide-up">
        <selected-list
            :isActive="showSelectedList"
            v-if="showSelectedList"
            :selectedItems="items"
            @close="showSelectedList = false"
        />
      </transition>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';

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
          status:"active"
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
          status:"active"
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
          status:"closed"
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
          status:"active"
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
          status:"reforming"
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
          status:"active"
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
          status:"active"
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
        status:"active"
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
        status:"active"
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
        status:"active"
      }
    ]);
    const showSelectedList = ref(false);

    function toggleSelectedList() {
      showSelectedList.value = !showSelectedList.value;
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
      showSelectedList
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