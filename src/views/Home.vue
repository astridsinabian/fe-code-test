<template>
  <div>
    <button class="home-button" @click="onDisplayPersonsList">Visa personer</button>
    <button class="home-button" @click="onDisplayFamiliesList">Visa familjer</button>
    <button class="home-button" @click="onDisplayPersonsForm">Skapa ny person</button>
  </div>

  <Persons v-if="shouldDisplayPersonsList" :persons="persons" @remove-person="onRemovePerson" />

  <Families v-if="shouldDisplayFamiliesList" :families="families" />

  <PersonsForm v-if="shouldDisplayPersonsForm" :emptyPerson="emptyPerson" @save-form="onSaveForm" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

import { IPerson } from "@/components/person/types";
import Persons from "@/components/person/Persons.vue";
import PersonsForm from "@/components/person/PersonsForm.vue";

import Families from "@/components/family/Families.vue";
import { IFamily } from "@/components/family/types";

export default defineComponent({
  components: {
    Persons,
    Families,
    PersonsForm,
  },
  setup() {
    const persons = ref<IPerson[]>([]);
    const families = ref<IFamily[]>([]);
    const shouldDisplayPersonsList = ref<boolean>(false);
    const shouldDisplayFamiliesList = ref<boolean>(false);
    const shouldDisplayPersonsForm = ref<boolean>(false);
    const emptyPerson = ref<IPerson>({
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      family: "",
    });

    async function getPersons(): Promise<void> {
      try {
        const response = await axios.get("http://so.fthou.se:8080/api/persons");
        persons.value = response.data;
      } catch (error) {
        console.error(error);
      }
    }

    async function getFamilies(): Promise<void> {
      try {
        const response = await axios.get("http://so.fthou.se:8080/api/families");
        families.value = response.data;
      } catch (error) {
        console.error(error);
      }
    }

    async function addPerson(newPerson: IPerson): Promise<void> {
      try {
        await axios.post("http://so.fthou.se:8080/api/person", newPerson);
        await getPersons();
      } catch (error) {
        console.error(error);
      }
    }

    async function removePerson(id: string): Promise<void> {
      try {
        await axios.delete(`http://so.fthou.se:8080/api/person/${id}`);
        await getPersons();
      } catch (error) {
        console.error(error);
      }
    }

    function onDisplayPersonsForm(): void {
      shouldDisplayPersonsForm.value = !shouldDisplayPersonsForm.value;
      shouldDisplayPersonsList.value = false;
      shouldDisplayFamiliesList.value = false;
    }

    async function onDisplayPersonsList(): Promise<void> {
      await getPersons();
      shouldDisplayPersonsList.value = !shouldDisplayPersonsList.value;
      shouldDisplayPersonsForm.value = false;
      shouldDisplayFamiliesList.value = false;
    }

    async function onDisplayFamiliesList(): Promise<void> {
      await getFamilies();
      shouldDisplayFamiliesList.value = !shouldDisplayFamiliesList.value;
      shouldDisplayPersonsList.value = false;
      shouldDisplayPersonsForm.value = false;
    }

    async function onSaveForm(newPerson: IPerson): Promise<void> {
      await addPerson(newPerson);
    }

    async function onRemovePerson(id: string): Promise<void> {
      await removePerson(id);
    }

    return {
      persons,
      families,
      emptyPerson,
      shouldDisplayPersonsList,
      shouldDisplayFamiliesList,
      shouldDisplayPersonsForm,
      onDisplayPersonsForm,
      onDisplayPersonsList,
      onDisplayFamiliesList,
      onSaveForm,
      onRemovePerson,
    };
  },
});
</script>

<style scoped lang="scss">
.home-button {
  padding: 15px 10px;
  color: #ffffff;
  background-color: #2b365b;
  border: 1px solid #2b365b;
  margin-right: 1px;
  transition: 300ms;
  font-size: 16px;

  &:focus,
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
