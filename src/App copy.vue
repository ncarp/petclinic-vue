<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark" role="navigation">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><span></span></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main-navbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="main-navbar" style>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'home' }"
              ><span class="fa fa-home"></span> Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'find owners' }"
              ><span class="fa fa-search"></span> Find owners</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'vets' }"
              ><span class="fa fa-th-list"></span> Veterinarians</RouterLink
            >
          </li>

          <li>
            <a routerLink="welcome" title="home page">
              <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
              <span> Home</span>
            </a>
          </li>

          <li class="dropdown">
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="glyphicon glyphicon-user" aria-hidden="true"></span> Owners<span
                class="caret"
              ></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/owners"
                  ><span class="glyphicon glyphicon-search" aria-hidden="true"></span
                  ><span> Search</span></a
                >
              </li>
              <li>
                <a routerLink="/owners/add"
                  ><span class="glyphicon glyphicon-plus" aria-hidden="true"></span
                  ><span> Add New</span></a
                >
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="glyphicon glyphicon-education" aria-hidden="true"></span>
              Veterinarians<span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/vets"
                  ><span class="glyphicon glyphicon-search" aria-hidden="true"></span
                  ><span> All</span></a
                >
              </li>
              <li>
                <a routerLink="/vets/add"
                  ><span class="glyphicon glyphicon-plus" aria-hidden="true"></span
                  ><span> Add New</span></a
                >
              </li>
            </ul>
          </li>
          <li>
            <a routerLink="/pettypes" routerLinkActive="active" title="pettypes">
              <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
              <span> Pet Types</span>
            </a>
          </li>
          <li>
            <a routerLink="/specialties" routerLinkActive="active" title="specialties">
              <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
              <span> Specialties</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!--
  <div class="container-fluid main-wrapper">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"><span></span></a>
        </div>

        <ul class="nav navbar-nav">
          <li>
            <a routerLink="welcome" title="home page">
              <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
              <span> Home</span>
            </a>
          </li>

          <li class="dropdown">
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="glyphicon glyphicon-user" aria-hidden="true"></span> Owners<span
                class="caret"
              ></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/owners"
                  ><span class="glyphicon glyphicon-search" aria-hidden="true"></span
                  ><span> Search</span></a
                >
              </li>
              <li>
                <a routerLink="/owners/add"
                  ><span class="glyphicon glyphicon-plus" aria-hidden="true"></span
                  ><span> Add New</span></a
                >
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="glyphicon glyphicon-education" aria-hidden="true"></span>
              Veterinarians<span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/vets"
                  ><span class="glyphicon glyphicon-search" aria-hidden="true"></span
                  ><span> All</span></a
                >
              </li>
              <li>
                <a routerLink="/vets/add"
                  ><span class="glyphicon glyphicon-plus" aria-hidden="true"></span
                  ><span> Add New</span></a
                >
              </li>
            </ul>
          </li>
          <li>
            <a routerLink="/pettypes" routerLinkActive="active" title="pettypes">
              <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
              <span> Pet Types</span>
            </a>
          </li>
          <li>
            <a routerLink="/specialties" routerLinkActive="active" title="specialties">
              <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
              <span> Specialties</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
-->

  <div class="content-wrapper">
    <router-outlet></router-outlet>
  </div>

  <br />
  <br />
  <div class="container footer-wrapper">
    <div class="row">
      <div class="col-12 text-center">
        <img src="./assets/logo.svg" style="margin: 20px" alt="Vue" height="60" width="60" />
        <img src="./assets/images/spring-pivotal-logo.png" alt="Sponsored by Pivotal" />
      </div>
    </div>
  </div>

  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'owners' }">Owners</RouterLink>
        <RouterLink :to="{ name: 'vets' }">Vets</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<style lang="less">
//@import '@/assets/less/petclinic.less';
</style>
