<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body, #app {
  height: 100%;
}
body{
  overflow-x: hidden;
}
.mint-indicator-wrapper {
  height: 100px;
  line-height: 15px;
  padding: 10px !important;
}
.mint-indicator-text {
  font-size: 14px !important;
}
</style>
