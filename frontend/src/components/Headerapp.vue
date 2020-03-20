<template>
  <header>
    <h1>Crud NodeJS / VueJS</h1>
    <button v-if="$store.state.isUserLoggedIn" @click="logOut" class="button btnPrimary">Déconnexion</button>
    <router-link to="/">
      <button class="button btnPrimary">Retour à l'index</button>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Headerapp",
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/authentication");
    }
  }
};
</script>

<style scoped>
header {
  height: 100px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  color: #fff;
  cursor: pointer;
  text-decoration: none;
}

h1 {
  margin: 0 60px;
  color: #fafafa;
}

.button {
  color: #fff;
  font-size: 1.05em;
  margin: auto 15px;
  height: 50px;
  border-radius: 5px;
}

.btnPrimary {
  background-color: #428bca;
  border: 2px solid #0088ff;
}

.btnPrimary:hover {
  background-color: #317ab9;
}
</style>
