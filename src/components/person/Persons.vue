<template>
  <div v-for="(person, index) in persons" :key="index">
    <div>{{ person.firstName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IPerson } from "@/components/person/types";

export default defineComponent({
  props: {
    persons: {
      type: Array as PropType<IPerson[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss"></style>
