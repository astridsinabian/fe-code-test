<template>
  <table>
    <tr>
      <th class="families-table-header">Namn</th>
      <th class="families-table-header">Familjemedlemmar</th>
    </tr>

    <tr v-for="family in families" :key="family.id">
      <Family :family="family" />
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IFamily } from "./types";
import Family from "./Family.vue";

export default defineComponent({
  components: {
    Family,
  },
  props: {
    families: {
      type: Array as PropType<IFamily[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.families-table-header {
  text-align: left;
  padding: 10px;
  background-color: #ececec;
}

.families-table-button {
  padding: 10px;
  border: 1px solid #2b365b;
  background-color: #ffffff;
  transition: 300ms;

  &:focus,
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
