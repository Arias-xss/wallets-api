<template>
  <div v-if="loading" class="d-flex justify-content-center my-3">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <ErrorAlert v-else-if="error" :message="error" dismissable />

  <table
    class="table table-striped table-bordered"
    :style="{ opacity: loading ? 0.5 : 1 }"
  >
    <thead>
      <tr>
        <th>Currency</th>
        <th>Rate</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="exchange of exchanges">
        <!-- Currency -->
        <td class="align-middle">
          {{ currencyName(exchange.destinationCurrencyId) }}
        </td>

        <!-- Rate -->
        <td class="align-middle">
          {{ exchange.rate }}
        </td>

        <!-- Actions -->
        <td class="align-middle">
          <RateFormModal
            v-model="showRateFormModal"
            :exchange="exchangeBeingEdited"
            @save="handleEditFormSave"
          />

          <button
            class="btn btn-link"
            title="Edit rate"
            @click="() => handleEditButtonClick(exchange)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Currency, CurrencyExchange } from "../../shared";

const currenciesApi = useCurrenciesApi();
const exchangesApi = useCurrencyExchangesApi();
const loading = ref(true);
const error = ref<string | null>(null);

const currencies = ref(Array<Currency>());
const exchanges = ref(Array<CurrencyExchange>());

const showRateFormModal = ref(false);
const exchangeBeingEdited = ref<CurrencyExchange>(null!);

onMounted(() => {
  getAllCurrencies();
  getAllExchanges();
});

function handleEditButtonClick(exchange: CurrencyExchange) {
  showRateFormModal.value = true;
  exchangeBeingEdited.value = exchange;
}

function handleEditFormSave(rate: string) {
  exchangesApi
    .update(exchangeBeingEdited.value.destinationCurrencyId, { rate })
    .then(
      (updatedExchange) => {
        const index = exchanges.value.indexOf(exchangeBeingEdited.value);
        exchanges.value.splice(index, 1, updatedExchange);
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function getAllExchanges() {
  exchangesApi
    .getAll()
    .then(
      (fetchedExchanges) => {
        exchanges.value = fetchedExchanges;
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function getAllCurrencies() {
  currenciesApi
    .getAll()
    .then(
      (fetchedCurrencies) => {
        currencies.value = fetchedCurrencies;
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function currencyName(id: number): string {
  const currency = currencies.value.find((c) => c.id === id);
  return currency === undefined ? "" : currency.name;
}
</script>
