<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div id="app">

    <HeaderComponent></HeaderComponent>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
section {
  scroll-margin-top: 80px; /* 这里的值与 header 的高度相同 */
}
body{
  margin:0;
  font-weight: bold;
  font-family: 'Open Sans';
}
</style>
