<template>
    <div class="btn-bloc-route">{{message}}</div>
</template>

<script>
export default {
    name: 'Blockroute',
    props: {
        message: String,
        eventBus: Object,
    },
    data() {
		return {
            route: this.message
		}
    },
    methods: {
    }
}
</script>

<style scoped>

.btn-bloc-route{
    font-size: 3em;
    color: #fff;
    background-color: #3e3e3e;
    width: 220px;
    text-align: center;
    line-height: 400%;
    cursor: pointer;
}
</style>
