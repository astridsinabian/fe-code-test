<template>
  <td class="person-table-data-cell">{{ person.id }}</td>
  <td class="person-table-data-cell">{{ person.firstName }}</td>
  <td class="person-table-data-cell">{{ person.lastName }}</td>
  <td class="person-table-data-cell">{{ person.phoneNumber }}</td>
  <td class="person-table-data-cell">{{ person.address }}</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IPerson } from "@/components/person/types";

export default defineComponent({
  props: {
    person: {
      type: Object as PropType<IPerson>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.person-table-data-cell {
  padding: 10px;
}
</style>
