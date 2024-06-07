<template>
  <div class="selected-list-container" :class="{ 'active': isActive, 'full-height': fullHeight  }">
    <div class="selected-list-header">
      <div class="selected-list-header-left">
        Results
        <div class="download-options">
          <span>Download:</span>
          <select>
            <option value="csv">CSV</option>
            <option value="txt">TXT</option>
            <option value="kml">KML</option>
          </select>
      </div>

      </div>
      <div>
        <button  @click="togglePartialView"><font-awesome-icon icon="window-restore"/></button>
        <button @click="toggleFullView"><font-awesome-icon icon="expand-arrows-alt"/></button>
        <button  @click="$emit('close')"><font-awesome-icon icon="times"/></button>
      </div>

    </div>
    <table class="selected-list-table">
        <thead>
        <tr>
          <th></th>
          <th>Basis Of Record</th>
          <th>Catalog Number</th>
          <th>Collection Code</th>
          <th>Collector</th>
          <th>Coordinate Uncertainty (meters)</th>
          <th>Country</th>
          <th>County</th>
          <th>Date Last Modified</th>
          <th>Day Collected</th>
          <th>Family</th>
          <th>Georef Method</th>
          <th>Horizontal Datum</th>
          <th>Individual Count</th>
          <th>Institution Code</th>
          <th>Island</th>
          <th>Island Group</th>
          <th>Lat/Long Comments</th>
          <th>Latitude</th>
          <th>Locality</th>
          <th>Longitude</th>
          <th>Month Collected</th>
          <th>Preparation Type</th>
          <th>Remarks</th>
          <th>Scientific Name</th>
          <th>State/Province</th>
          <th>Tissues</th>
          <th>Verbatim Depth</th>
          <th>Verbatim Elevation</th>
          <th>Year Collected</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in selectedItems" :key="item.catalogNumber">
          <td><input type="checkbox" :checked="item.selected" /></td>
          <td>{{ item.basisOfRecord }}</td>
          <td>{{ item.catalogNumber }}</td>
          <td>{{ item.collectionCode }}</td>
          <td>{{ item.collector }}</td>
          <td>{{ item.coordinateUncertaintyInMeters }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.county }}</td>
          <td>{{ item.dateLastModified }}</td>
          <td>{{ item.dayCollected }}</td>
          <td>{{ item.family }}</td>
          <td>{{ item.georefMethod }}</td>
          <td>{{ item.horizontalDatum }}</td>
          <td>{{ item.individualCount }}</td>
          <td>{{ item.institutionCode }}</td>
          <td>{{ item.island }}</td>
          <td>{{ item.islandGroup }}</td>
          <td>{{ item.latLongComments }}</td>
          <td>{{ item.latitude }}</td>
          <td>{{ item.locality }}</td>
          <td>{{ item.longitude }}</td>
          <td>{{ item.monthCollected }}</td>
          <td>{{ item.preparationType }}</td>
          <td>{{ item.remarks }}</td>
          <td>{{ item.scientificName }}</td>
          <td>{{ item.stateProvince }}</td>
          <td>{{ item.tissues }}</td>
          <td>{{ item.verbatimDepth }}</td>
          <td>{{ item.verbatimElevation }}</td>
          <td>{{ item.yearCollected }}</td>
        </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: 'SelectedList',
  components: {FontAwesomeIcon},
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const fullHeight = ref(false);

    const togglePartialView = () => {
      fullHeight.value = false;
    };

    const toggleFullView = () => {
      fullHeight.value = true;
    };

    // const partialViewIcon = computed(() => fullHeight.value ? '图标1' : '图标2');
    // const fullViewIcon = computed(() => fullHeight.value ? '图标2' : '图标1');

    return {
      fullHeight,
      togglePartialView,
      toggleFullView,
      // partialViewIcon,
      // fullViewIcon,
      close() {
        emit('close');
      },
      statusClass(status) {
        return `status-${status.toLowerCase()}`;
      }
    };
  }

});
</script>

<style scoped>

.selected-list-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  max-height: 60vh; /* 或足够显示5行数据的高度 */
  overflow-y: auto; /* 显示滚动条 */
  transform: translateY(100%); /* 默认情况下隐藏 */
  transition: transform 0.3s ease-in-out;
  z-index: 1002; /* 确保弹出层在地图之上 */
}
.selected-list-container.active {
  transform: translateY(0); /* 弹出时变为0 */
}
.selected-list-container.full-height {
  position: absolute; /* 使用fixed定位可以让元素相对于视口定位 */
  top: 0; /* 顶部对齐 */
  right: 0; /* 右对齐 */
  bottom: 0; /* 底部对齐 */
  left: 0; /* 左对齐 */
  max-height: 120vh;
  transform: none; /* 不需要移动 */
}
.selected-list-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #f3f3f3;
  align-items: center;
  border-bottom: 1px solid #e1e1e8;
  font-size: 1.1rem;
}
.download-options {
  display: inline-block; /* 使下拉菜单与标题同行显示 */
  margin-left: 10px; /* 添加一点间距 */
}
.selected-count {
  background: #dee2e6;
  color: #495057;
  padding: 2px 8px;
  border-radius: 15px;
  font-size: 0.875rem;
}
.close-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.25rem;
}
.selected-list-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}
.selected-list-table thead {
  background-color: #f8f9fa;
}
.selected-list-table tbody {
   max-width: 100%;
   overflow-x: auto;
}
.selected-list-table th,
.selected-list-table td {
  padding: 0.5rem;
  border-bottom: 1px solid #e1e1e8;
  background-color: #f8f9fa;
}
.selected-list-table th:first-child,
.selected-list-table td:first-child {
  padding-left: 24px;
}

.selected-list-table th:last-child,
.selected-list-table td:last-child {
  padding-right: 24px;
}
/* 自定义滚动条样式 */
.selected-list-container::-webkit-scrollbar {
  width: 6px;
}

.selected-list-container::-webkit-scrollbar-track {
  background: #f1f3f5;
}

.selected-list-container::-webkit-scrollbar-thumb {
  background-color: #adb5bd;
  border-radius: 10px;
}
/* 状态颜色样式 */
.status-active {
  color: #27a745;
}

.status-closed {
  color: #dc3545;
}

.status-reforming {
  color: #ffc107;
}
button{
  border:none;
}
.fa-xmark, .fa-window-restore, .fa-maximize {
  cursor: pointer;
  border:none;
  /* 其他你希望的样式 */
}

.fa-window-restore:hover, .fa-maximize:hover {
  color: #007bff; /* 当鼠标悬停时改变颜色 */
}

.fa-xmark:hover {
  color: #e00b0b; /* 当鼠标悬停时改变颜色 */
}
</style>
