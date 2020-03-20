<template>
    <div class="container">
        <div class="blocs-routes">
            <router-link to="/index"><Blockroute message="Site" /></router-link>
            <router-link v-if="$store.state.isUserLoggedIn" to="/admin"><Blockroute message="Admin" /></router-link>
            <router-link v-else to="/authentication"><Blockroute message="Admin" /></router-link>
        </div>
    </div>
</template>

<script>
import Blockroute from './Blockroute.vue';

export default {
    name: 'Blockroutes',

    components: {
        Blockroute
    },
    data() {
		return {
		}
    },
    methods: {
    }
}
</script>

<style scoped>
.container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.blocs-routes{
    display: flex;
    justify-content: space-around;
    width: 600px;
    height: 200px;
}

a{text-decoration: none;}
</style>
