<template>
  <div>
    <button class="home-button" @click="onDisplayPersonsList">Visa personer</button>
    <button class="home-button" @click="onDisplayFamiliesList">Visa familjer</button>
    <button class="home-button" @click="onDisplayPersonForm">Skapa ny person</button>
    <button class="home-button" @click="onDisplayFamilyForm">Skapa ny familj</button>
  </div>

  <Persons
    v-if="shouldDisplayPersonsList"
    :persons="persons"
    :families="families"
    @remove-person="onRemovePerson"
    @change-person="onChangePerson"
  />

  <Families
    v-if="shouldDisplayFamiliesList"
    :families="families"
    @remove-family="onRemoveFamily"
    @change-family="onChangeFamily"
  />

  <PersonForm v-if="shouldDisplayPersonForm" @save-person="onSavePerson" />

  <FamilyForm v-if="shouldDisplayFamilyForm" @save-family="onSaveFamily" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

import Persons from "@/components/person/Persons.vue";
import PersonForm from "@/components/person/PersonForm.vue";
import { IPerson, IPersonForm, IPersonToFamilyForm } from "@/components/person/types";

import Families from "@/components/family/Families.vue";
import FamilyForm from "@/components/family/FamilyForm.vue";
import { IFamily, IFamilyForm } from "@/components/family/types";

export default defineComponent({
  components: {
    Persons,
    Families,
    PersonForm,
    FamilyForm,
  },
  setup() {
    const url = "http://so.fthou.se:8080"; // Proxy config in vue.config.js not working, created varible instead
    const persons = ref<IPerson[]>([]);
    const families = ref<IFamily[]>([]);
    const shouldDisplayPersonsList = ref<boolean>(false);
    const shouldDisplayFamiliesList = ref<boolean>(false);
    const shouldDisplayPersonForm = ref<boolean>(false);
    const shouldDisplayFamilyForm = ref<boolean>(false);

    async function getPersons(): Promise<void> {
      try {
        const response = await axios.get(`${url}/api/persons`);
        persons.value = response.data;
      } catch (error) {
        console.error(error);
      }
    }

    async function getFamilies(): Promise<void> {
      try {
        const response = await axios.get(`${url}/api/families`);
        families.value = response.data;
      } catch (error) {
        console.error(error);
      }
    }

    async function onSavePerson(newPerson: IPersonForm): Promise<void> {
      try {
        await axios.post(`${url}/api/person`, newPerson);
        await getPersons();
      } catch (error) {
        console.error(error);
      }
    }

    async function onSaveFamily(newFamily: IFamilyForm): Promise<void> {
      try {
        await axios.post(`${url}/api/family`, newFamily);
        await getFamilies();
      } catch (error) {
        console.error(error);
      }
    }

    async function onRemovePerson(id: string): Promise<void> {
      try {
        await axios.delete(`${url}/api/person/${id}`);
        await getPersons();
      } catch (error) {
        console.error(error);
      }
    }

    async function onRemoveFamily(id: string): Promise<void> {
      try {
        await axios.delete(`${url}/api/family/${id}`);
        await getFamilies();
      } catch (error) {
        console.error(error);
      }
    }

    async function onChangePerson(person: IPersonToFamilyForm): Promise<void> {
      try {
        await axios.patch(`${url}/api/family/addPerson`, person);
        await getPersons();
      } catch (error) {
        console.error(error);
      }
    }

    async function onChangeFamily(editFamily: IFamily, familyMember: IPerson): Promise<void> {
      try {
        await axios.patch(`${url}/api/family/${editFamily.id}/removePerson/${familyMember.id}`);
        await getPersons();
        await getFamilies();
      } catch (error) {
        console.error(error);
      }
    }

    function onDisplayPersonForm(): void {
      shouldDisplayPersonForm.value = !shouldDisplayPersonForm.value;
      shouldDisplayPersonsList.value = false;
      shouldDisplayFamiliesList.value = false;
      shouldDisplayFamilyForm.value = false;
    }

    function onDisplayFamilyForm(): void {
      shouldDisplayFamilyForm.value = !shouldDisplayFamilyForm.value;
      shouldDisplayPersonForm.value = false;
      shouldDisplayPersonsList.value = false;
      shouldDisplayFamiliesList.value = false;
    }

    async function onDisplayPersonsList(): Promise<void> {
      await getPersons();
      await getFamilies();
      shouldDisplayPersonsList.value = !shouldDisplayPersonsList.value;
      shouldDisplayPersonForm.value = false;
      shouldDisplayFamiliesList.value = false;
      shouldDisplayFamilyForm.value = false;
    }

    async function onDisplayFamiliesList(): Promise<void> {
      await getFamilies();
      shouldDisplayFamiliesList.value = !shouldDisplayFamiliesList.value;
      shouldDisplayPersonsList.value = false;
      shouldDisplayPersonForm.value = false;
      shouldDisplayFamilyForm.value = false;
    }

    return {
      persons,
      families,
      shouldDisplayPersonsList,
      shouldDisplayFamiliesList,
      shouldDisplayPersonForm,
      shouldDisplayFamilyForm,
      onDisplayPersonForm,
      onDisplayPersonsList,
      onDisplayFamiliesList,
      onDisplayFamilyForm,
      onSavePerson,
      onSaveFamily,
      onRemovePerson,
      onRemoveFamily,
      onChangeFamily,
      onChangePerson,
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
