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
      <h2 class="families-modal-header-heading">Ändra uppgifter</h2>
      <div class="families-modal-header-text">
        <div>
          <strong>Familj: {{ editFamily.name }}</strong>
        </div>
        <div>
          <i>Radera familjemedlem genom att klicka i och spara.</i>
        </div>
      </div>
    </template>

    <template #body>
      <form class="families-modal-form" @submit="onSubmitForm">
        <ul v-if="editFamily.familyMembers.length > 0" class="families-modal-form-list">
          <li
            v-for="familyMember in editFamily.familyMembers"
            :key="familyMember.id"
            class="families-modal-form-list-item"
          >
            <span>{{ familyMember.firstName }} {{ familyMember.lastName }}</span>
            <input type="radio" v-model="selectedFamilyMember" :value="familyMember" />
          </li>
        </ul>

        <div v-else>Har inga familjemedlemmar</div>

        <div class="families-modal-form-action-buttons">
          <button class="families-modal-form-action-button" type="submit">Spara</button>
          <button class="families-modal-form-action-button" @click="onCancelForm">Avbryt</button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

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

.families-modal-header-heading {
  padding: 10px 0;
  margin: 0;
}

.families-modal-header-text {
  padding: 10px 0;
}

.families-modal-form {
  display: flex;
  flex-direction: column;
}

.families-modal-form-list {
  list-style: none;
  padding: 5px 0;
  margin: 0;
}

.families-modal-form-list-item {
  padding: 5px 0;
}

.families-modal-form-action-buttons {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.families-modal-form-action-button {
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

.families-modal-form-input {
  padding: 10px;
  margin-bottom: 5px;
  border: none;
  background-color: #ececec;
  font-size: 16px;
}
</style>
