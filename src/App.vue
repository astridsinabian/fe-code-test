<template>
  <header class="app-header">FE Kodtest</header>
  <router-view />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.app-header {
  padding: 15px;
  background-color: #0d1840;
  color: #ffffff;
  font-weight: 700;
}
</style>
