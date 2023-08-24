<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link to="/" class="navbar-brand">{{ appName }}</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" :class="{ active: $route.path === '/' }">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <!--
            <li class="nav-item" :class="{ active: $route.path === '/marcas' }">
              <router-link to="/marcas" class="nav-link">Marcas</router-link>
            </li>
            -->
            <li
              class="nav-item"
              :class="{ active: $route.path === '/eletrodomesticos' }"
            >
              <router-link to="/eletrodomesticos" class="nav-link"
                >Eletrodomésticos</router-link
              >
            </li>
            <li
              class="nav-item"
              :class="{ active: $route.path === '/eletrodomesticos/create' }"
            >
              <router-link to="/eletrodomesticos/create" class="nav-link"
                >Novo Eletrodoméstico</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main role="main">
      <router-view />
      <!-- Renderiza o componente da rota atual -->
    </main>
    <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>By <a href="">Williamsena13</a></p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      appName: "Nome Loja",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.jumbotron {
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-bottom: 0;
  background-color: #fff;
}
@media (min-width: 768px) {
  .jumbotron {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.jumbotron p:last-child {
  margin-bottom: 0;
}

.jumbotron h1 {
  font-weight: 300;
}

.jumbotron .container {
  max-width: 40rem;
}

footer {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

footer p {
  margin-bottom: 0.25rem;
}
</style>
