# Template
<template>
  <div class="table-container">
    <h2>Partner Institutions</h2>

    <div class="table-wrapper">
      <table class="partner-table">
        <thead>
        <tr>
          <th class="th-institution">Institution</th>
          <th>Status</th>
          <th>Cached</th>
          <th>Declared</th>
          <th>Skipped</th>
          <th>Resource Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(partner, index) in partners" :key="index">
          <td class="td-institution">{{ partner.Institution }}</td>
          <td class="td-center">
            <span class="status-badge">{{ partner.Status }}</span>
          </td>
          <td class="td-center">{{ partner.Cached }}</td>
          <td class="td-center">{{ partner.Declared }}</td>
          <td class="td-center">{{ partner.Skipped }}</td>
          <td class="td-resource">{{ partner.ResourceName }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

# Script
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'

const loading = ref(true)
const partners = ref([])

onMounted(() => {
  fetchPartners()
})

const fetchPartners = async () => {
  loading.value = true
  try {
    const response = await api.getProvidersList()
    partners.value = response.data.providers
  } catch (error) {
    partners.value = []
    console.error('Error fetching partners:', error)
  } finally {
    loading.value = false
  }
}
</script>

# Style
<style scoped>
.table-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}
h2 {
  color: #007bff;
  text-align:left;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 10px;
}
.table-title {
  font-size: 24px;
  color: #2c3e50;
  font-family: "Times New Roman", Georgia, serif;
  margin-bottom: 20px;
}

.table-wrapper {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.partner-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.partner-table th {
  background-color: #f8fafc;
  padding: 12px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
}

.partner-table td {
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
}

.td-institution {
  color: #1e40af;
  font-weight: 500;
  white-space: normal;
  max-width: 300px;
}

.td-center {
  text-align: center;
}

.td-resource {
  color: #1e40af;
  font-weight: 500;
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  background-color: #dcfce7;
  color: #166534;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.partner-table tr:nth-child(even) {
  background-color: #f8fafc;
}

.partner-table tr:hover {
  background-color: #eff6ff;
  transition: background-color 0.15s ease;
}

/* 加载状态样式 */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 响应式处理 */
@media screen and (max-width: 1024px) {
  .table-wrapper {
    overflow-x: auto;
  }

  .partner-table {
    min-width: 800px;
  }
}

/* 自定义滚动条 */
.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
</style>