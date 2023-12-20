<template>
  <WalletFormModal v-model="showWalletFormModal" @save="handleSave" />

  <div class="d-flex justify-content-between mb-3">
    <button type="button" class="btn btn-primary" @click="handleAddButtonClick">
      + Add wallet
    </button>

    <div>
      <select v-model="sortBy" class="form-select">
        <option value="favorite">Favorites first</option>
        <option value="new">Recently added first</option>
        <option value="first">First added first</option>
      </select>
    </div>
  </div>

  <div v-if="loading" class="d-flex justify-content-center my-3">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <ErrorAlert v-else-if="error" :message="error" dismissable />

  <div class="wallet-grid" :style="{ opacity: loading ? 0.5 : 1 }">
    <WalletCard
      v-for="wallet of wallets"
      :wallet="wallet"
      @star="handleStar"
      @remove="handleRemove"
      @refreshbalance="handleRefreshBalance"
    ></WalletCard>
  </div>
</template>

<script setup lang="ts">
import type { UpdateWallet, Wallet } from "../../shared";

const walletsApi = useWalletsApi();
const loading = ref(true);
const error = ref<string | null>(null);

const sortBy = ref<"favorite" | "new" | "first">("favorite");
watch(sortBy, getAllWallets);

const showWalletFormModal = ref(false);

const wallets = ref(Array<Wallet>());

onMounted(getAllWallets);

function getAllWallets() {
  walletsApi
    .getAll({ sort: sortBy.value })
    .then(
      (fetchedWallets) => {
        wallets.value = fetchedWallets;
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function handleAddButtonClick() {
  showWalletFormModal.value = true;
}

function handleSave(address: string) {
  loading.value = true;
  walletsApi
    .create({ address })
    .then(
      (newWallet) => {
        wallets.value.push(newWallet);
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function handleStar(wallet: Wallet, favorite: boolean) {
  handleEdit(wallet, { favorite });
}

function handleEdit(wallet: Wallet, changes: UpdateWallet) {
  loading.value = true;
  walletsApi
    .update(wallet.address, changes)
    .then(
      (updatedWallet) => {
        const index = wallets.value.indexOf(wallet);
        wallets.value.splice(index, 1, updatedWallet);
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function handleRemove(wallet: Wallet) {
  loading.value = true;
  walletsApi
    .remove(wallet.address)
    .then(
      () => {
        wallets.value.splice(wallets.value.indexOf(wallet), 1);
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}

function handleRefreshBalance(wallet: Wallet) {
  loading.value = true;
  walletsApi
    .refreshBalance(wallet.address)
    .then(
      (refreshedWallet) => {
        const index = wallets.value.indexOf(wallet);
        wallets.value.splice(index, 1, refreshedWallet);
        error.value = null;
      },
      (e: Error) => (error.value = e.message)
    )
    .finally(() => (loading.value = false));
}
</script>

<style>
.wallet-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media screen and (max-width: 750px) {
  .wallet-grid {
    display: inline;
    margin-bottom: 1rem;
  }
}
</style>
