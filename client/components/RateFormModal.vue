<template>
  <div
    class="modal fade"
    id="rate-form-modal"
    tabindex="-1"
    aria-labelledby="rateFormModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="rateFormModal">
            Edit exchange rate
          </h1>
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
              New rate:
              <input
                v-model="rate"
                type="number"
                name="address"
                class="form-control"
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
import type { CurrencyExchange } from "../../shared";

const emit = defineEmits<{
  (event: "save", address: string): void;
  (event: "update:modelValue", value: boolean): void;
}>();

const props = defineProps<{
  modelValue: boolean;
  exchange: CurrencyExchange;
}>();

// v-model
const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const rate = ref<string | number>("");
watch(props, ({ exchange }) => {
  rate.value = exchange.rate;
});

let modal: bootstrap.Modal;
onMounted(() => {
  modal = new bootstrap.Modal(
    document.getElementById("rate-form-modal") as HTMLElement
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
  rate.value = "";
  show.value = false;
}

function handleSubmit() {
  emit("save", String(rate.value));
  hide();
}
</script>
