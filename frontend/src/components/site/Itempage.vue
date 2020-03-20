<template>
  <div id="itempage">
    <Headerapp />
    <div class="items">
      <h2>{{ item.title }}</h2>
      <img id="img" :src="item.image" />
      <p id="description">{{ item.description }}</p>
      <p id="price">{{ item.price }}€</p>
    </div>
    <br />
    <router-link to="/index">
      <button class="button btnPrimary">Retour</button>
    </router-link>
  </div>
</template>

<script>
import Headerapp from "../Headerapp";
import ItemService from "../../services/itemService";

export default {
  name: "Itempage",
  components: {
    Headerapp
  },
  data() {
    return {
      item: ""
    };
  },
  async created() {
    const cheminComplet = document.location.href;
    const nomDuFichier = cheminComplet.substring(
      cheminComplet.lastIndexOf("/") + 1
    );

    const res = await ItemService.getOne(nomDuFichier);
    this.item = res.data;
  }
};
</script>

<style scoped>
.items {
  min-width: 380px;
  display: inline-block;
  background: #ffffff;
  position: relative;
  text-align: center;
  font-family: "Just Another Hand", cursive;

  border: 3px solid #333333;
  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
  text-transform: uppercase;
  letter-spacing: 0.3ch;
  margin: 1em 0;
}
.items::before {
  /* content: ""; */
  border: 2px solid #353535;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
  border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
}
#itempage {
  text-align: center;
}

#img {
  height: 380px;
  width: 380px;
  object-fit: contain;
}

#description {
  max-width: 380px;
}

button {
  font-size: 1.2em;
  padding: 10px;
}

#price {
  color: red;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0;
}
</style>
