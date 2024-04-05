<template>
  <header class="app-header">
    <img src="@/assets/fn2logo.png" alt="Logo" class="logo"/> <!-- 假设你有logo图片 -->
    <nav>
      <router-link to="/">Search</router-link>
      <router-link to="/advanced-search">Join FishNet</router-link>
      <a>Join FishNet</a>
      <a>Contact Us</a>
      <a>Services</a>
      <a>About</a>
      <a>Georeferencing</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent.vue'
};
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fafafa;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 确保头部在其他内容之上 */
  /* 其他样式 */
}
.logo {
  width: 100px; /* 根据实际logo大小调整 */
}
nav a {
  color: #637fc4;
  margin-left: 20px;
  text-decoration: none;
  font-weight: bold;
  font-family: 'Open Sans';
}
nav a.router-link-active {
  text-decoration: underline;
}
</style>