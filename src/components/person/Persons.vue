<template>
  <div class="persons" v-for="(person, index) in persons" :key="index">
    <Person :person="person" />
  </div>
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
.persons {
  display: flex;
  flex-direction: column;
}
</style>
