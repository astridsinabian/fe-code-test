<template>
  <table>
    <tr>
      <th class="persons-table-header">Id</th>
      <th class="persons-table-header">Förnamn</th>
      <th class="persons-table-header">Efternamn</th>
      <th class="persons-table-header">Telefonnummer</th>
      <th class="persons-table-header">Adress</th>
      <th class="persons-table-header">Familjnummer</th>
    </tr>

    <tr v-for="person in persons" :key="person.id">
      <Person :person="person" />
      <td>
        <button class="persons-table-button" @click="onRemovePerson(person.id)">Ta bort</button>
      </td>
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
  setup(props, context) {
    function onRemovePerson(id: string): void {
      context.emit("remove-person", id);
      console.log("id", id);
    }

    return {
      onRemovePerson,
    };
  },
});
</script>

<style scoped lang="scss">
.persons-table-header {
  text-align: left;
  padding: 10px;
  background-color: #ececec;
}

.persons-table-button {
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
