<template>
  <div class="advanced-search-page">
    <header-component></header-component>
    <div class="advanced-search">
      <!-- 这里放置高级搜索字段 -->
      <input v-model="filters.title" placeholder="Title" />
      <input v-model="filters.author" placeholder="Author" />
      <button @click="search">Find</button>
    </div>
    <div class="search-results">
      <div class="results-header">Advanced Search Results:</div>
      <div class="result" v-for="result in results" :key="result.id">
        {{ result.title }} by {{ result.author }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "AdvancedSearchPage.vue",
  setup() {
    const filters = ref({
      title: '',
      author: '',
    });
    const results = ref([]);

    function search() {
      // 模拟搜索逻辑
      console.log('Advanced searching with filters:', filters.value);
      // 假数据替代
      results.value = [
        { id: 1, title: 'Title 1', author: 'Author 1' },
        { id: 2, title: 'Title 2', author: 'Author 2' },
        { id: 3, title: 'Title 3', author: 'Author 3' },
      ];
    }

    return {
      filters,
      results,
      search,
    };
  },
};
</script>

<style scoped>
.advanced-search-page {
  display: flex;
  flex-direction: column;
}
.advanced-search {
  display: flex;
  gap: 10px;
  margin: 20px;
}
.search-results {
  background: #fff;
  padding: 10px;
}
.results-header {
  font-weight: bold;
}
.result {
  margin-bottom: 5px;
}
</style>