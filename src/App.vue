<template>
  <div id="app">
    <MainVue />
  </div>
</template>

<script>
import MainVue from './views/MainVue.vue'

export default {
  name: 'App',
  components: {
    MainVue
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>
