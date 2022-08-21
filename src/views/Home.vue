<template>
  <Persons :persons="persons" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

import { IPerson } from "@/components/person/types";
import Persons from "@/components/person/Persons.vue";

export default defineComponent({
  components: {
    Persons,
  },
  setup() {
    const persons = ref<IPerson[]>([]);

    onMounted(async () => {
      await getPersons();
    });

    async function getPersons() {
      try {
        const response = await axios.get("http://so.fthou.se:8080/api/persons");
        persons.value = response.data;
      } catch (error) {
        console.error(error);
      }
    }

    return { persons };
  },
});
</script>

<style scoped lang="scss"></style>
