<template>
    <div>
        <Headerapp />
        <div class="itemsSite">
            <div class="itemSite" v-for="(item, index) in items" :key="item._id">
                <Itemsimple :item="items[index]" />
            </div>
        </div>
    </div>
</template>

<script>
import Headerapp from '../Headerapp.vue';
import Itemsimple from './Itemsimple.vue';
import ItemService from '../../services/itemService'


export default {
    name: 'Index',
    components: {
        Headerapp,
        Itemsimple
    },
    data() {
		return {
            items: []
		}
    },
    async created() {
       
        const res = await ItemService.get()
        this.items = res.data
    }
}
</script>

<style scoped>
.itemsSite{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width: 1000px;
    margin: 0 auto;

}
.itemSite{
    display: flex; 
    flex-basis: calc(50%);  
    justify-content: center;
}
</style>
