<template>
  <div v-if="loading" class="d-flex justify-content-center my-3">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <ErrorAlert v-else-if="error" :message="error" dismissable />

  <template v-if="wallet">
    <ErrorAlert v-if="wallet.old" message="Wallet is old!" />

    <div class="grid-layout">
      <!-- Balance -->
      <div class="card">
        <div class="card-header">Balance</div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Balance editor -->
            <template v-if="editingBalance">
              <input
                v-if="editingBalance"
                v-model="editedBalance"
                class="form-control"
                type="number"
                placeholder="Amount in ETH"
              />

              <!-- Done button -->
              <button
                class="btn btn-link"
                title="Done"
                @click="handleDoneButtonClick"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="text-success"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"
                  />
                </svg>
              </button>

              <!-- Cancel icon -->
              <button
                class="btn btn-link"
                title="Cancel"
                @click="handleCancelButtonClick"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="text-danger"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                  />
                </svg>
              </button>
            </template>

            <template v-else>
              <div class="fw-bold">{{ balance }} ETH</div>

              <!-- Edit icon -->
              <button
                class="btn btn-link"
                title="Edit amount"
                @click="handleEditButtonClick"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
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
            </template>
          </div>
        </div>
      </div>

      <!-- Exchange -->
      <div class="card">
        <div class="card-header">Exchange</div>
        <div class="card-body">
          <select class="form-select" v-model.number="destinationCurrencyId">
            <option
              v-for="exchange of exchanges"
              :value="exchange.destinationCurrencyId"
            >
              {{ currencyName(exchange.destinationCurrencyId) }}
            </option>
          </select>

          <div class="fw-bold">
            ≈{{ convertedBalance }} {{ currencySymbol }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { fromWei, toWei } from "web3-utils";
import type { Currency, CurrencyExchange, Wallet } from "../../../shared";

const walletsApi = useWalletsApi();
const currenciesApi = useCurrenciesApi();
const exchangesApi = useCurrencyExchangesApi();
const loading = ref(true);
const error = ref<string | null>(null);

const route = useRoute();
const address = computed(() => String(route.params.address));

const editingBalance = ref(false);
const editedBalance = ref<string | number>(0);

const wallet = ref<Wallet>();
const destinationCurrencyId = ref(1);

const currencies = ref(Array<Currency>());
const exchanges = ref(Array<CurrencyExchange>());

onMounted(() => {
  getWallet();
  getAllCurrencies();
  getAllExchanges();
});

function handleEditButtonClick() {
  editingBalance.value = true;
  editedBalance.value = balance.value;
}

function handleDoneButtonClick() {
  wallet.value!.balance = toWei(editedBalance.value, "ether");
  editingBalance.value = false;
}

function handleCancelButtonClick() {
  editingBalance.value = false;
}

function getWallet() {
  walletsApi
    .getByAddress(address.value)
    .then(
      (fetchedWallet) => {
        wallet.value = fetchedWallet;
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

const balance = computed(() =>
  wallet.value === undefined ? "" : fromWei(wallet.value.balance, "ether")
);

const selectedExchangeRate = computed(() => {
  const exchange = exchanges.value.find(
    (e) => e.destinationCurrencyId === destinationCurrencyId.value
  );

  return exchange?.rate ?? "0";
});

const currencySymbol = computed(() => {
  const currency = currencies.value.find(
    (c) => c.id === destinationCurrencyId.value
  );

  return currency === undefined ? "" : currency.symbol;
});

const convertedBalance = computed(() => {
  if (!wallet.value) {
    return 0;
  }

  return (
    Number(fromWei(wallet.value.balance, "ether")) *
    Number(selectedExchangeRate.value)
  );
});
</script>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
