<template>
  <header class="app-header">
    <nav>
      <router-link to="/" class="app-header-router-link">Home</router-link>
    </nav>
  </header>
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
}

.app-header-router-link {
  font-size: 16px;
  color: #ffffff;
  transition: 300ms;
  font-weight: 700;

  &:focus,
  &:hover {
    opacity: 0.7;
  }
}
</style>
