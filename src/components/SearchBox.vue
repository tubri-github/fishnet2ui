<template>
  <div class="search-box">
    <form @submit.prevent="onSearch">
      <div class="input-group">
        <label for="taxon">Taxon</label>
        <input type="text" id="taxon" v-model="searchFields.taxon" />
      </div>

      <div class="input-group">
        <label for="location">Location</label>
        <input type="text" id="location" v-model="searchFields.location" />
      </div>

      <div class="input-group">
        <label for="code">Institution Code / Catalog Number</label>
        <input type="text" id="code" v-model="searchFields.code" />
      </div>

      <div class="input-group">
        <label for="dateRange">Date Range (yyyy-yyyy)</label>
        <input type="text" id="dateRange" v-model="searchFields.dateRange" />
      </div>

      <div class="input-group">
        <label for="other">Other</label>
        <input type="text" id="other" v-model="searchFields.other" />
      </div>

      <div class="input-group">
        <label for="polygon">Search Polygon</label>
        <input type="text" id="polygon" v-model="searchFields.polygon" placeholder="Paste WKT or select from menu" />
      </div>

      <div class="actions">
        <button type="submit" @click="search">Search</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchBox',
  emits: ['search'],
  methods:{
    search() {
      this.$emit('search');
    },
  },
  setup() {
    const searchFields = ref({
      taxon: '',
      location: '',
      code: '',
      dateRange: '',
      other: '',
      polygon: ''
    });

    function onSearch() {
      // Trigger the search logic here
      console.log(searchFields.value);
      // This is where you'd likely emit an event or invoke a store action
    }

    return {
      searchFields,
      onSearch
    };
  }
};
</script>
<style scoped>
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
  font-family: 'Open Sans';
}

.input-group {
  display: block;
  margin-bottom: 10px;
  padding: 0 10px 0 10px
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 0.875rem;
  text-align:left;
}

.input-group input[type="text"],
.input-group select {
  width: 100%;
  padding: 8px;
  border: 0px solid #ccc;
  border-radius: 4px;
  background-color:#eef3f5;
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
</style>
