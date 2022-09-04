<template>
  <div class="family-form-container">
    <form class="family-form" @submit.prevent="onSubmit">
      <input class="family-form-input" v-model="form.familyName" type="text" placeholder="Namn" />
      <button class="family-form-button" type="submit">Lägg till</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { IFamilyForm } from "./types";

export default defineComponent({
  setup(props, context) {
    const form = ref<IFamilyForm>({
      familyName: "",
      familyId: "",
      personId: "",
    });

    function onSubmit(): void {
      context.emit("save-family", form.value);
      form.value = {
        familyName: "",
        familyId: "",
        personId: "",
      };
    }

    return { form, onSubmit };
  },
});
</script>

<style scoped lang="scss">
.family-form-container {
  padding: 15px;
}

.family-form {
  display: flex;
  flex-direction: column;
  width: 20vw;
}

.family-form-input {
  padding: 10px;
  margin: 5px;
  border: none;
  background-color: #ececec;
  font-size: 16px;
}

.family-form-button {
  padding: 10px;
  margin: 5px;
  color: #2b365b;
  background-color: #ffffff;
  border: 1px solid #2b365b;
  transition: 300ms;
  width: 50%;
  align-self: flex-end;
  font-size: 16px;

  &:focus,
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
