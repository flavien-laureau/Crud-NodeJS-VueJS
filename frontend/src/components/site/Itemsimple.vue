<template>
  <div class="items">
    <h2>{{ item.title }}</h2>
    <div class="img-container">
      <router-link :to="`site/item/` + item._id">
        <img class="img" :src="item.image" />
      </router-link>
    </div>

    <p class="price">{{ item.price }}€</p>
  </div>
</template>

<script>
export default {
  name: "Itemsimple",
  props: {
    item: Object
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.items {
  height: 430px;
  width: 330px;
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
  /* content: ''; fait bugguer le lien*/
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

.img-container {
  height: 80%;
}

.img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.price {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: red;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0;
}
</style>
