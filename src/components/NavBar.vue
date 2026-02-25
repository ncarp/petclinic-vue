<template>
  <nav class="navbar navbar-expand-lg navbar-dark" role="navigation">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }"><span></span></RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="main-navbar" style>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'welcome' }">
              <span class="glyphicon glyphicon-home" aria-hidden="true"></span><span> Home</span>
            </RouterLink>
          </li>
          <li class="dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              <span class="glyphicon glyphicon-user" aria-hidden="true"></span><span> Owners</span><span
                class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'owners' }">
                  <span class="glyphicon glyphicon-search" aria-hidden="true"></span><span> Search</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'add owner' }">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span> Add New</span>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="glyphicon glyphicon-education" aria-hidden="true"></span><span> Veterinarians</span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'vets' }">
                  <span class="fa fa-search"></span><span> All</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ path: '/vets/new' }">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span> Add New</span>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'pettypes' }" title="pettypes">
              <span class="glyphicon glyphicon-heart" aria-hidden="true"></span><span> Pet Types</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'specialties' }" title="specialties">
              <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span><span> Specialties</span>
            </RouterLink>
          </li>

          <!--
          <li class="nav-item">
            <a routerLink="welcome" title="home page">
              <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
              <span> Home</span>
            </a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-item dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              <span class="glyphicon glyphicon-user" aria-hidden="true"></span> Owners<span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/owners"><span class="glyphicon glyphicon-search" aria-hidden="true"></span><span>
                    Search</span></a>
              </li>
              <li>
                <a routerLink="/owners/add"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span> Add
                    New</span></a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-item dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              <span class="glyphicon glyphicon-education" aria-hidden="true"></span>
              Veterinarians<span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" :to="{ path: '/vets' }"><span class="glyphicon glyphicon-search"
                    aria-hidden="true"></span><span>
                    All</span></RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ path: '/vets' }"><span class="glyphicon glyphicon-plus"
                    aria-hidden="true"></span><span> Add
                    New</span></RouterLink>
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
        -->

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
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "@/assets/scss/petclinic.scss";
</style>
