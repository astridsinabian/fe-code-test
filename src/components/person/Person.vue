<template>
  <div class="person">
    <div>{{ person.firstName }} {{ person.lastName }}</div>
    <div>{{ person.family }}</div>
    <div>{{ person.phoneNumber }}</div>
    <div>{{ person.address }}</div>
  </div>
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
.person {
  padding: 10px;
}
</style>
