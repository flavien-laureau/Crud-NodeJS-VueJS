<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'app',
    data() {
		return{
            
		}
	},

    created() {
    },

    methods: {
        btn() {
            this.route = 'site';

            
        }
    }
}
</script>

<style>
body, html, #app{
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color:#FAFAFA;
}




</style>
