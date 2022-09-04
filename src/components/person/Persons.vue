<template>
  <table>
    <tr>
      <th class="persons-table-header">Id</th>
      <th class="persons-table-header">Förnamn</th>
      <th class="persons-table-header">Efternamn</th>
      <th class="persons-table-header">Telefonnummer</th>
      <th class="persons-table-header">Adress</th>
    </tr>

    <tr v-for="person in persons" :key="person.id">
      <Person :person="person" />
      <td>
        <button class="persons-table-button" @click="onEditPerson(person)">Ändra</button>
        <button class="persons-table-button" @click="onRemovePerson(person.id)">Ta bort</button>
      </td>
    </tr>
  </table>

  <Modal :shouldDisplay="shouldDisplayModal">
    <template #header>
      <h2 class="persons-modal-header-heading">Ändra uppgifter</h2>
    </template>

    <template #body>
      <form class="persons-modal-form" @submit="onSubmitForm">
        <div>
          <strong>Person ID: {{ editPersonId }}</strong>
        </div>

        <select v-model="selectedFamily" class="persons-modal-form-dropdown">
          <option v-for="family in families" :key="family.id" :value="family">
            {{ family.name }}
          </option>
        </select>

        <div class="persons-modal-form-action-buttons">
          <button class="persons-modal-form-action-button" type="submit">Spara</button>
          <button class="persons-modal-form-action-button" @click="onCancelForm">Avbryt</button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import { IPerson, IPersonFamilyForm } from "./types";
import Person from "./Person.vue";

import Modal from "@/layout/Modal.vue";
import { IFamily } from "../family/types";

export default defineComponent({
  components: {
    Person,
    Modal,
  },
  props: {
    persons: {
      type: Array as PropType<IPerson[]>,
      required: true,
    },
    families: {
      type: Array as PropType<IFamily[]>,
      required: true,
    },
  },
  emits: ["remove-person", "change-person"],
  setup(props, context) {
    const shouldDisplayModal = ref<boolean>(false);
    const selectedFamily = ref({
      id: 0,
      name: "",
    });
    const editPersonId = ref<string>("");
    const editPerson = ref<IPersonFamilyForm>({
      personId: 0,
      familyName: "",
      familyId: 0,
    });

    function onRemovePerson(id: string): void {
      context.emit("remove-person", id);
    }

    function onEditPerson(person: IPerson): void {
      shouldDisplayModal.value = true;
      editPersonId.value = person.id;
    }

    function onSubmitForm(): void {
      context.emit("change-person", {
        personId: editPersonId.value,
        familyId: selectedFamily.value.id,
        familyName: selectedFamily.value.name,
      });

      shouldDisplayModal.value = false;
    }

    function onCancelForm(): void {
      shouldDisplayModal.value = false;
    }

    return {
      editPerson,
      editPersonId,
      shouldDisplayModal,
      selectedFamily,
      onRemovePerson,
      onEditPerson,
      onSubmitForm,
      onCancelForm,
    };
  },
});
</script>

<style scoped lang="scss">
.persons-table-header {
  text-align: left;
  padding: 10px;
  background-color: #ececec;
}

.persons-table-button {
  padding: 10px;
  margin-right: 5px;
  border: 1px solid #2b365b;
  background-color: #ffffff;
  transition: 300ms;

  &:focus,
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}

.persons-modal-header-heading {
  margin: 10px 0;
}

.persons-modal-form {
  display: flex;
  flex-direction: column;
}

.persons-modal-form-dropdown {
  padding: 5px;
  margin: 10px 0;
}

.persons-modal-form-action-buttons {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.persons-modal-form-action-button {
  margin-left: 5px;
  padding: 10px;
  border: 1px solid #2b365b;
  background-color: #ffffff;
  transition: 300ms;

  &:focus,
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}

.persons-modal-form-input {
  padding: 10px;
  margin-bottom: 5px;
  border: none;
  background-color: #ececec;
  font-size: 16px;
}
</style>
