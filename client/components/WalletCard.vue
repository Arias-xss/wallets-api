<template>
  <article class="card">
    <!-- Title bar -->
    <header class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div class="text-truncate">{{ wallet.address }}</div>

        <!-- Toolbar -->
        <div class="d-flex flex-nowrap">
          <!-- Star icon -->
          <button
            type="button"
            class="btn btn-link"
            title="Add/Remove from favorites"
            @click="$emit('star', wallet, !wallet.favorite)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="text-warning"
              viewBox="0 0 16 16"
            >
              <path
                v-if="wallet.favorite"
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              />
              <path
                v-else
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
              />
            </svg>
          </button>

          <!-- Refresh icon -->
          <button
            class="btn btn-link"
            title="Refresh balance"
            @click="$emit('refreshbalance', wallet)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
              />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          </button>

          <!-- Delete icon -->
          <button
            type="button"
            class="btn btn-link"
            title="Remove wallet"
            @click="$emit('remove', wallet)"
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
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
              />
              <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Balance -->
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="fw-bold">Balance: {{ balance }}</div>

      <!-- Exchange icon -->
      <NuxtLink
        class="btn btn-outline-primary d-flex align-items-center"
        title="Exchange balance"
        :to="{ name: 'exchange-address', params: { address: wallet.address } }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"
          />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { fromWei } from "web3-utils";
import type { Wallet } from "../../shared";

const props = defineProps<{
  wallet: Wallet;
}>();

defineEmits<{
  (event: "star", wallet: Wallet, favorite: boolean): void;
  (event: "refreshbalance", wallet: Wallet): void;
  (event: "remove", wallet: Wallet): void;
}>();

const balance = computed(() => fromWei(props.wallet.balance, "ether"));
</script>

<style scoped>
.wallet-inner-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.75rem;
}
</style>
