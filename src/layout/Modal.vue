<template>
  <div v-if="shouldDisplay" class="modal">
    <div class="modal-content">
      <header>
        <slot name="header" />
      </header>

      <div>
        <slot name="body" />
      </div>

      <footer class="modal-content-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    shouldDisplay: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  transition: opacity 0.3s ease;
}

.modal-content {
  width: 50vw;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px #00000054;
}

.modal-content-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
