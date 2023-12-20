<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Digital Wallet Dashboard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink
                active-class="active"
                class="nav-link"
                aria-current="page"
                to="/"
              >
                Wallets
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                active-class="active"
                class="nav-link"
                to="/exchange-rates"
              >
                Exchange rates
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="container mx-auto my-4">
    <slot></slot>
  </main>
</template>
