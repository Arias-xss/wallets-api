<template>
  <div
    class="modal fade"
    id="wallet-form-modal"
    tabindex="-1"
    aria-labelledby="walletFormModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="walletFormModal">Add Wallet</h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="hide"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">
              Wallet address:
              <input
                v-model="address"
                type="text"
                name="address"
                class="form-control"
                placeholder="0x..."
              />
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="hide">Close</button>
          <button class="btn btn-primary" @click="handleSubmit">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "save", address: string): void;
  (event: "update:modelValue", value: boolean): void;
}>();

// v-model
const props = defineProps<{ modelValue: boolean }>();
const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const address = ref("");

let modal: bootstrap.Modal;
onMounted(() => {
  modal = new bootstrap.Modal(
    document.getElementById("wallet-form-modal") as HTMLElement
  );
});

onUnmounted(() => {
  modal.dispose();
});

watch(show, (show) => {
  if (show) {
    modal.show();
  } else {
    modal.hide();
  }
});

function hide() {
  address.value = "";
  show.value = false;
}

function handleSubmit() {
  emit("save", address.value);
  hide();
}
</script>
