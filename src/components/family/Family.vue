<template>
  <td class="family-table-data-cell">{{ family.name }}</td>
  <td class="family-table-data-cell">
    <span
      v-for="familyMember in family.familyMembers"
      :key="familyMember"
      class="family-table-data-cell-name"
    >
      {{ familyMember.firstName }} {{ familyMember.lastName }}
    </span>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IFamily } from "@/components/family/types";

export default defineComponent({
  props: {
    family: {
      type: Object as PropType<IFamily>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.family-table-data-cell {
  padding: 10px;
  min-width: 150px;
}

.family-table-data-cell-name {
  padding: 0 5px;
  border-right: 1px solid #000000;
}
</style>
