<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div id="app">
    <agreement-modal></agreement-modal>
    <HeaderComponent></HeaderComponent>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import AgreementModal from "@/components/AgreementModel";

export default {
  name: 'App',
  components: {
    AgreementModal,
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
  margin-top: 60px;
}
body{
  margin:0;
  font-weight: bold;
  font-family: 'Open Sans';
}
</style>
