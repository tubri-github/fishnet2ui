<template>
  <div class="selected-list-container" :class="{ 'active': isActive, 'full-height': fullHeight, 'minimized': !showTable }">
    <div class="selected-list-header">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="Search Results" name="dataTable">
          <div v-if="showTable">
            <div class="download-options">
              <span>Download:</span>
              <select v-model="downloadType" placeholder="Select">
                <option label="CSV" value="csv"></option>
                <option label="TXT" value="txt"></option>
                <option label="KML" value="kml"></option>
              </select>
              <el-button @click="handleDownload">Download</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Taxon" name="otherData">
          <div class="panel-header">
            <div class="download-options">
              <span>Download:</span>
              <select v-model="downloadType" placeholder="Select">
                <option label="CSV" value="csv"></option>
                <option label="TXT" value="txt"></option>
              </select>
              <el-button @click="handleDownload">Download</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Providers & Citation" name="additionalInfo">
          <div class="panel-header">
            <div class="download-options">
              <span>Download:</span>
              <select v-model="downloadType" placeholder="Select">
                <option label="CSV" value="csv"></option>
                <option label="TXT" value="txt"></option>
              </select>
              <el-button @click="handleDownload">Download</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Location" name="extraInfo">
          <div class="panel-header">
            <div class="download-options">
              <span>Download:</span>
              <select v-model="downloadType" placeholder="Select">
                <option label="CSV" value="csv"></option>
                <option label="TXT" value="txt"></option>
              </select>
              <el-button @click="handleDownload">Download</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div>
        <button @click="togglePartialView"><font-awesome-icon icon="window-restore" /></button>
        <button @click="toggleFullView"><font-awesome-icon icon="expand-arrows-alt" /></button>
        <button @click="toggleTable"><font-awesome-icon icon="times" /></button>
      </div>
    </div>
    <div v-if="showTable" class="selected-list-content" :class="{ 'full-height': fullHeight }">
      <div v-if="activeTab === 'dataTable'">
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
          <tr v-for="item in selectedItems" :key="item.CatalogNumber">
            <td><input type="checkbox" :checked="item.selected" /></td>
            <td>{{ item.BasisOfRecord }}</td>
            <td>{{ item.CatalogNumber }}</td>
            <td>{{ item.CollectionCode }}</td>
            <td>{{ item.Collector }}</td>
            <td>{{ item.CoordinateUncertaintyInMeters }}</td>
            <td>{{ item.Country }}</td>
            <td>{{ item.County }}</td>
            <td>{{ item.DateLastModified }}</td>
            <td>{{ item.DayCollected }}</td>
            <td>{{ item.Family }}</td>
            <td>{{ item.GeorefMethod }}</td>
            <td>{{ item.HorizontalDatum }}</td>
            <td>{{ item.IndividualCount }}</td>
            <td>{{ item.InstitutionCode }}</td>
            <td>{{ item.Island }}</td>
            <td>{{ item.IslandGroup }}</td>
            <td>{{ item.LatLongComments }}</td>
            <td>{{ item.Latitude }}</td>
            <td>{{ item.Locality }}</td>
            <td>{{ item.Longitude }}</td>
            <td>{{ item.MonthCollected }}</td>
            <td>{{ item.PreparationType }}</td>
            <td>{{ item.Remarks }}</td>
            <td>{{ item.ScientificName }}</td>
            <td>{{ item.StateProvince }}</td>
            <td>{{ item.Tissues }}</td>
            <td>{{ item.VerbatimDepth }}</td>
            <td>{{ item.VerbatimElevation }}</td>
            <td>{{ item.YearCollected }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="activeTab === 'otherData'">
        <table class="selected-list-table">
          <thead>
          <tr>
            <th></th>
            <th>ScientificName</th>
            <th>Num Records</th>
            <th>EoL Search</th>
            <th>MB Search</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in otherData" :key="item.ScientificName">
            <td><input type="checkbox" :checked="item.selected" /></td>
            <td>{{ item.ScientificName }}</td>
            <td>{{ item.NumRecords }}</td>
            <td><a href="http://www.eol.org/search?q={{ item.ScientificName }}" target="_blank">Search Encyclopedia of Life</a></td>
            <td><a href="http://www.morphbank.net/?keywords={{ item.NumRecords }}" target="_blank">Search Morph Bank</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="activeTab === 'additionalInfo'">
        <table class="selected-list-table">
          <thead>
          <tr>
            <th></th>
            <th>Institution</th>
            <th>InstitutionCode</th>
            <th>Num Records</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in additionalInfo" :key="item.InstitutionCode">
            <td><input type="checkbox" :checked="item.selected" /></td>
            <td>{{ item.Institution }}</td>
            <td>{{ item.InstitutionCode }}</td>
            <td>{{ item.NumRecords }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="activeTab === 'extraInfo'">
        <table class="selected-list-table">
          <thead>
          <tr>
            <th></th>
            <th>Country</th>
            <th>StateProvince</th>
            <th>County</th>
            <th>Locality</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Num Records</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in extraInfo" :key="item.InstitutionCode">
            <td><input type="checkbox" :checked="item.selected" /></td>
            <td>{{ item.Country }}</td>
            <td>{{ item.StateProvince }}</td>
            <td>{{ item.County }}</td>
            <td>{{ item.Locality }}</td>
            <td>{{ item.Latitude }}</td>
            <td>{{ item.Longitude }}</td>
            <td>{{ item.NumRecords }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="showTable" class="selected-list-footer">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, ref, watch} from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ElTabs, ElTabPane, ElPagination } from 'element-plus';
import 'element-plus/dist/index.css';

export default defineComponent({
  name: 'SelectedList',
  components: { FontAwesomeIcon, ElTabs, ElTabPane, ElPagination },
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    },
    otherData: {
      type: Array,
      default: () => []
    },
    additionalInfo: {
      type: Array,
      default: () => []
    },
    extraInfo: {
      type: Array,
      default: () => []
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'fetchPageData','download'],
  setup(props, { emit }) {
    const fullHeight = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalItems = ref(0);
    const activeTab = ref('dataTable');
    const showTable = ref(true);
    const downloadType = ref('csv');

    watch(props.selectedItems, (newItems) => {
      totalItems.value = newItems.length;
    });

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      switch (activeTab.value) {
        case 'dataTable':
          return props.selectedItems.slice(start, end);
        case 'otherData':
          return props.otherData.slice(start, end);
        case 'additionalInfo':
          return props.additionalInfo.slice(start, end);
        case 'extraInfo':
          return props.extraInfo.slice(start, end);
        default:
          return [];
      }

    });

    const togglePartialView = () => {
      fullHeight.value = false;
    };

    const toggleFullView = () => {
      fullHeight.value = !fullHeight.value;
      showTable.value = true;
    };

    const handleTabClick = (tab) => {
      activeTab.value = tab.name;
    };

    const handleSizeChange = (size) => {
      pageSize.value = size;
      fetchData();
    };

    const handleCurrentChange = (page) => {
      currentPage.value = page;
      fetchData();
    };

    const fetchData = () => {
      emit('fetchPageData', { page: currentPage.value, size: pageSize.value });
    };
    const toggleTable = () => {
      showTable.value = !showTable.value;
    };

    const handleDownload = () => {
      emit('download', { type: downloadType.value, tab: activeTab.value });
    };


    return {
      fullHeight,
      currentPage,
      pageSize,
      totalItems,
      activeTab,
      paginatedItems,
      togglePartialView,
      toggleFullView,
      handleTabClick,
      handleSizeChange,
      handleCurrentChange,
      fetchData,
      toggleTable,
      showTable,
      handleDownload,
      downloadType,
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
  overflow: hidden; /* 隐藏默认的滚动条 */
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
  max-height: 100vh;
  transform: none; /* 不需要移动 */
}

.selected-list-content.minimized {
  max-height: calc(20vh - 120px); /* 最小化时的高度 */
}
.selected-list-header,
.selected-list-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #f3f3f3;
  align-items: center;
  border-bottom: 1px solid #e1e1e8;
  font-size: 1rem;
  position: sticky;
  z-index: 1;
}
.selected-list-header {
  top: 0;
}
.selected-list-footer {
  bottom: 0;
  position: sticky; /* 确保页脚固定 */
  z-index: 1;
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
.selected-list-content {
  overflow-y: auto;
  max-height: calc(60vh - 120px); /* 表格部分有滚动条，固定高度，考虑到表头和分页部分的高度 */
  position: relative;
}
.selected-list-content.full-height {
  max-height: calc(100vh - 120px); /* 表格部分有滚动条，最大化高度 */
}
.selected-list-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.75rem; /* 调小字体大小 */
  line-height: 1rem; /* 调小行高 */
  white-space: nowrap; /* 禁用换行 */
}
.selected-list-table thead {
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 2;
}
.selected-list-table tbody {
  max-width: 100%;
  overflow-x: auto;
}
.selected-list-table th,
.selected-list-table td {
  padding: 0.25rem; /* 调小填充 */
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
button {
  border: none;
}
.fa-xmark, .fa-window-restore, .fa-maximize {
  cursor: pointer;
  border: none;
  /* 其他你希望的样式 */
}

.fa-window-restore:hover, .fa-maximize:hover {
  color: #007bff; /* 当鼠标悬停时改变颜色 */
}

.fa-xmark:hover {
  color: #e00b0b; /* 当鼠标悬停时改变颜色 */
}

</style>
