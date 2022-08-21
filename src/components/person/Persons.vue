<template>
  <table>
    <tr>
      <th class="persons-table-header">Förnamn</th>
      <th class="persons-table-header">Efternamn</th>
      <th class="persons-table-header">Telefonnummer</th>
      <th class="persons-table-header">Adress</th>
      <th class="persons-table-header">Familjnummer</th>
    </tr>

    <tr class="persons" v-for="(person, index) in persons" :key="index">
      <Person :person="person" />
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IPerson } from "./types";
import Person from "./Person.vue";

export default defineComponent({
  components: {
    Person,
  },
  props: {
    persons: {
      type: Array as PropType<IPerson[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.persons-table-header {
  text-align: left;
  padding: 10px;
  background-color: #ececec;
}
</style>
