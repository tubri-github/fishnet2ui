<template>
  <header class="app-header">
    <img src="@/assets/fn2logo.png" alt="Logo" class="logo"/> <!-- 假设你有logo图片 -->
    <nav>
      <router-link to="/">Search</router-link>
      <router-link to="/joinus">Join FishNet</router-link>
      <router-link to="/contact">Contact Us</router-link>
      <router-link to="/services">Services</router-link>
      <div @mouseover="showSubMenu = true" @mouseleave="showSubMenu = false" class="about-menu">
        <a>About</a>
        <div v-if="showSubMenu" class="submenu">
          <router-link to="/about">Fishnet 2</router-link>
          <router-link to="/datapolicy">Data Policies</router-link>
          <router-link to="/funding">Funding</router-link>
          <a href="#">Partner Institutions</a>
        </div>
      </div>
      <router-link to="/georef">Georeferencing</router-link>

    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HeaderComponent.vue',
  setup() {
    const showSubMenu = ref(false);
    return { showSubMenu };
  }

};
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  background-color: #fafafa;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 确保头部在其他内容之上 */
  height: 10vh;
  /* 其他样式 */
}
.logo {
  width: 100px; /* 根据实际logo大小调整 */
}
nav a {
  color: #637fc4;
  margin-right: 20px;
  text-decoration: none;
  font-weight: bold;
  font-family: 'Open Sans';
}
nav a.router-link-active {
  text-decoration: underline;
}

.about-menu {
  position: relative;
  display: inline-block;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  z-index: 1001; /* 确保子菜单在其他内容之上 */
}

.submenu a {
  padding: 10px 20px;
  text-decoration: none;
  color: #637fc4;
  white-space: nowrap; /* 防止子菜单项换行 */
}

.submenu a:hover {
  background-color: #f1f1f1;
}
</style>