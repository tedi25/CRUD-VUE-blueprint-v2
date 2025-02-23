<template>
  <div id="myModal" class="modal">
    <div class="modal-content-wrapper">
      <div class="modal-header">
        <slot name="header"></slot>
        <span class="close" @click="emit('close')">&times;</span>
      </div>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
</script>

<style scoped>
#myModal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  border: 1px solid #888;
  width: 60%;
  background-color: var(--vt-c-white-soft);
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #04aa6d;
  padding: 15px;
  color: var(--vt-c-white-soft);
  font-size: var(--font-xl);
}

.modal-header span {
  cursor: pointer;
}

.modal-content {
  padding: 15px;
  font-size: var(--font-lg);
}

.modal-footer {
  display: flex;
  padding: 0 15px 15px;
}

.close {
  font-size: var(--font-2xl);
  font-weight: bold;
}
</style>
