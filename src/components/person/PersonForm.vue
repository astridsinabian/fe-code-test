<template>
  <div class="persons-form-container">
    <form class="persons-form" @submit.prevent="onSubmit">
      <input
        class="persons-form-input"
        v-model="form.firstName"
        type="text"
        placeholder="Förnamn"
      />

      <input
        class="persons-form-input"
        v-model="form.lastName"
        type="text"
        placeholder="Efternamn"
      />

      <input class="persons-form-input" v-model="form.address" type="text" placeholder="Adress" />

      <input
        class="persons-form-input"
        v-model="form.phoneNumber"
        type="text"
        placeholder="Telefonnummer"
      />

      <input
        class="persons-form-input"
        v-model="form.family"
        type="text"
        placeholder="Tillhörande familjnummer"
      />

      <button class="persons-form-button" type="submit">Lägg till</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import { IPersonForm } from "./types";

export default defineComponent({
  setup(props, context) {
    const emptyPerson: IPersonForm = {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      family: "",
    };
    const form = ref<IPersonForm>(emptyPerson);

    function onSubmit(): void {
      context.emit("save-person-form", form.value);
      form.value = emptyPerson;
    }

    return { form, onSubmit };
  },
});
</script>

<style scoped lang="scss">
.persons-form-container {
  padding: 15px;
}

.persons-form {
  display: flex;
  flex-direction: column;
  width: 20vw;
}

.persons-form-input {
  padding: 10px;
  margin: 5px;
  border: none;
  background-color: #ececec;
  font-size: 16px;
}

.persons-form-button {
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
