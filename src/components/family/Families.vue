<template>
  <table>
    <tr>
      <th class="families-table-header">Id</th>
      <th class="families-table-header">Namn</th>
      <th class="families-table-header">Familjemedlemmar</th>
    </tr>

    <tr v-for="family in families" :key="family.id">
      <Family :family="family" />
      <td>
        <button class="families-table-button" @click="onEditFamily(family)">Ändra</button>
        <button class="families-table-button" @click="onRemoveFamily(family.id)">Ta bort</button>
      </td>
    </tr>
  </table>

  <Modal :shouldDisplay="shouldDisplayModal">
    <template #header>
      <h3 class="families-edit-form-heading">Ändra uppgifter</h3>
    </template>

    <template #body>
      <form class="families-edit-form" @submit="onSubmitForm">
        <span>{{ editFamily.name }}</span>

        <ul>
          <li v-for="familyMember in editFamily.familyMembers" :key="familyMember.id">
            <span>{{ familyMember.firstName }} {{ familyMember.lastName }}</span>
            <input type="radio" v-model="selectedFamilyMember" :value="familyMember" />
          </li>
        </ul>

        <div class="families-edit-form-action-buttons">
          <button class="families-edit-form-action-button" type="submit">Spara</button>
          <button class="families-edit-form-action-button" @click="onCancelForm">Avbryt</button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";

import { IFamily } from "./types";
import Family from "./Family.vue";

import Modal from "@/layout/Modal.vue";
import { IPerson } from "../person/types";

export default defineComponent({
  components: {
    Family,
    Modal,
  },
  props: {
    families: {
      type: Array as PropType<IFamily[]>,
      required: true,
    },
  },
  emits: ["remove-family", "change-family"],
  setup(props, context) {
    const shouldDisplayModal = ref<boolean>(false);
    const editFamily = ref<IFamily | null>(null);
    const selectedFamilyMember = ref<IPerson>();

    function onRemoveFamily(id: string): void {
      context.emit("remove-family", id);
    }

    function onEditFamily(family: IFamily): void {
      shouldDisplayModal.value = true;
      editFamily.value = family;
    }

    function onSubmitForm(): void {
      context.emit("change-family", editFamily.value, selectedFamilyMember.value);
      shouldDisplayModal.value = false;
    }

    function onCancelForm(): void {
      shouldDisplayModal.value = false;
    }

    return {
      editFamily,
      shouldDisplayModal,
      selectedFamilyMember,
      onRemoveFamily,
      onEditFamily,
      onSubmitForm,
      onCancelForm,
    };
  },
});
</script>

<style scoped lang="scss">
.families-table-header {
  text-align: left;
  padding: 10px;
  background-color: #ececec;
}

.families-table-button {
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

.families-edit-form-heading {
  margin: 10px 0;
}

.families-edit-form {
  display: flex;
  flex-direction: column;
}

.families-edit-form-action-buttons {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.families-edit-form-action-button {
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

.families-edit-form-input {
  padding: 10px;
  margin-bottom: 5px;
  border: none;
  background-color: #ececec;
  font-size: 16px;
}
</style>
