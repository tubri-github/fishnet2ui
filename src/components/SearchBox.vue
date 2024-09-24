<template>
  <agreement-modal @accept="handleAgreementAccept"></agreement-modal>
  <div class="search-box" id="searchFields">
    <form class="search-box-content" @submit.prevent="validateAndSearch">
      <div class="input-group">
        <label for="taxon">TAXON</label>
        <el-input type="text" id="taxon" v-model="searchFields.t" clearable/>
      </div>
      <div class="input-group" id="locationHelper">
        <label for="location">LOCATION</label>
        <div class="location-wrapper">
          <el-input type="text" id="location" v-model="searchFields.l" @focus="showLocationTooltip = true"  @click="handleInputClick"  clearable/>
          <div class="tooltip" v-if="showLocationTooltip">
            <label for="continent">CONTINENT/OCEAN:</label>
            <el-input style=" width: 80%;" type="text" class="location-field" id="continent" v-model="locationFields.continent" clearable/>

            <label for="country">COUNTRY:</label>
            <el-input style=" width: 80%;" type="text" class="location-field" id="country" v-model="locationFields.country" clearable/>

            <label for="stateProvince">STATE/PROVINCE:</label>
            <el-input style=" width: 80%;" type="text"  class="location-field" id="stateProvince" v-model="locationFields.stateProvince" clearable/>

            <label for="county">COUNTY:</label>
            <el-input style=" width: 80%;" type="text" class="location-field" id="county" v-model="locationFields.county" clearable/>
            <el-row style="font-size:1rem;color:#3e6398;">For a finer-grained location search, fill in any or all of the above fields.</el-row>

            <button type="button" @click="applyLocation">Apply</button>
          </div>
        </div>
      </div>

      <div class="input-group" id="institutionCodeHelper">
        <label for="code">INSTITUTION CODE/CATALOG NUMBER</label>
        <div class="select-wrapper">
          <el-input type="text" id="code" v-model="searchFields.c" clearable/>
          <button type="button" @click="toggleDropdown">▼</button>
          <div class="dropdown" v-if="showDropdown">
            <table>
              <thead>
              <tr>
                <th>Code</th>
                <th>Institution</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in institutionCodes" :key="item.code" @click="selectCode(item.code)">
                <td>{{ item.code }}</td>
                <td>{{ item.label }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div class="input-group">
        <label for="dateRange">DATE RANGE (yyyy-yyyy)</label>
        <el-input type="text" id="dateRange" v-model="searchFields.d" clearable/>
      </div>

      <div class="input-group">
        <label for="other">OTHER</label>
        <el-input type="text" id="other" v-model="searchFields.q" clearable/>
      </div>

      <div class="input-group" id="polygonSearch">
        <label for="polygon">SEARCH POLYGON</label>
        <el-input type="text" id="polygon" v-model="searchFields.p" placeholder="Paste WKT or Draw a Polygon (Click '&#11202;')" clearable/>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="actions">
        <button type="submit">SEARCH</button>
      </div>
    </form>
    <footer class="searchbox-footer">
      <p>Looking for help? <a @click="restartTour">Click here.</a></p>
      <p>
        Join us on
        <a href="https://www.facebook.com/FishNet2/info/" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://github.com/tubri/Fishnet2Community/discussions" target="_blank" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="mailto:fishnet2@tulane.edu" target="_blank" aria-label="Email">
          <i class="fab fa-envelope">fishnet2@tulane.edu</i>
        </a>
      </p>
      <p>Development funding provided by:<br>
        <a href="http://www.nsf.gov/">National Science Foundation</a> | <a href="http://www.nbii.gov/">National Biological Information Infrastructure</a><br>
          © 2017 FishNet 2 - All Rights Reserved</p>
    </footer>
  </div>

</template>

<script>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import AgreementModal from "@/components/AgreementModel";
import { institutionCodes } from '@/data/institutionCode';

export default {
  name: 'SearchBox',
  emits: ['search','start-tour'],
  components:{
    AgreementModal
  },
  props: {
    polygon: {
      type: String,
      default: ''
    }
  },
  methods:{
    search() {
      this.onSearch();
    },
  },
  setup(props, { emit }) {
    const searchFields = ref({
      t: '',
      l: '',
      c: '',
      d: '',
      q: '',
      p: props.polygon,
      api:'nelson',
      fmt:'json',
      num:'20',
    });

    const locationFields = ref({
      continent: '',
      country: '',
      stateProvince: '',
      county: ''
    });

    const handleAgreementAccept =() => {
      emit('start-tour'); // 触发 start-tour 事件
    }
    const restartTour = () => {
      emit('start-tour'); // 重新开始 driver.js 引导
    };

    const showLocationTooltip = ref(false);
    const showDropdown = ref(false);
    const errorMessage = ref('');

    const handleClickOutside = (event) => {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip && !tooltip.contains(event.target)) {
        showLocationTooltip.value = false;
      }
    };

    const handleInputClick = (event) => {
      event.stopPropagation();
      showLocationTooltip.value = true;
    };
    onMounted(async () => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });


    watch(() => props.polygon, (newVal) => {
      searchFields.value.p = newVal;
    });
    function applyLocation() {
      const fields = locationFields.value;
      const parts = [];

      if (fields.continent) parts.push(`ContinentOcean:${fields.continent}`);
      if (fields.country) parts.push(`Country:${fields.country}`);
      if (fields.stateProvince) parts.push(`StateProvince:${fields.stateProvince}`);
      if (fields.county) parts.push(`County:${fields.county}`);

      searchFields.value.l = parts.join('; ');
      showLocationTooltip.value = false;
    }
    function toggleDropdown() {
      showDropdown.value = !showDropdown.value;
    }

    function selectCode(code) {
      searchFields.value.c = code;
      showDropdown.value = false;
    }

    function validateAndSearch() {
      // 验证至少一个输入框有值
      // console.log("d")
      if (
          !searchFields.value.t &&
          !searchFields.value.l &&
          !searchFields.value.c &&
          !searchFields.value.d &&
          !searchFields.value.q &&
          !searchFields.value.p
      ) {
        errorMessage.value = 'At least one search field must be filled.';
      } else {
        errorMessage.value = '';
        onSearch();
      }
    }




    function onSearch() {
      // Trigger the search logic here
      emit('search', { ...searchFields.value });

      // This is where you'd likely emit an event or invoke a store action
    }

    return {
      searchFields,
      onSearch,
      locationFields,
      showLocationTooltip,
      applyLocation,
      institutionCodes,
      toggleDropdown,
      showDropdown,
      selectCode,
      handleInputClick,
      errorMessage,
      validateAndSearch,
      handleAgreementAccept,
      restartTour
    };
  }
};
</script>
<style scoped>
.search-box-content{
  flex: 1;
}
.searchbox-footer {

  text-align: center;
  font-size: 10px;
}

.searchbox-footer a {
  color: #333;
  text-decoration: none;
}

.searchbox-footer a:hover {
  text-decoration: underline;
}

.searchbox-footer i {
  font-size: 20px;
  margin: 0 10px;
  color: #3b5998; /* Facebook 蓝色 */
}


.searchbox-footer p {
  margin: 5px 0;
}
.search-box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  /*position: absolute;*/
  /*top: 20vh; !* 位于视口高度的10%，可根据需要调整 *!*/
  /*left: 230px;*/
  /*transform: translateX(-50%);*/
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
  font-weight: bold;

  height: 100%; /* 确保容器占满父级 */
  position: relative;
  justify-content: space-between;

}

.input-group {
  display: block;
  margin-bottom: 10px;
  padding: 0 10px 0 10px;
  font-family: 'Noto Sans', 'Noto Sans Symbols', 'Arial', 'Segoe UI', sans-serif;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 0.875rem;
  text-align: left;
  font-family: 'Metropolis','Open Sans';
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-wrapper button {
  margin-left: 5px;
  padding: 8px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.select-wrapper button:hover {
  background-color: #004494;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown table {
  width: 100%;
  border-collapse: collapse;
}

.dropdown th, .dropdown td {
  padding: 8px;
  text-align: left;
}

.dropdown th {
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.dropdown td {
  cursor: pointer;
}

.dropdown td:hover {
  background-color: #f0f0f0;
}
.location-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1001;
  width: 100%;
  max-width: 300px;
}

.tooltip label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.875rem;
}

.tooltip input {
  width: 80%;
  padding: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.tooltip button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tooltip button:hover {
  background-color: #004494;
}

.input-group input[type="text"],
.input-group select {
  width: 100%;
  padding: 8px;
  border: 0px solid #ccc;
  border-radius: 4px;
  background-color: #eef3f5;
  font-size: 0.875rem;
}


/* 如果有关闭按钮 */
.close-button {
  float: right;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

/* 清除浮动 */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* 样式调整按钮 */
button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: rgb(24,47,6);
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* 按钮悬停颜色 */
}

@media (max-width: 768px) {
  .search-box {
    width: 100%;
    top: 20px;
    left: 10%;
    transform: none;
  }
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 10px;
}
</style>
