<template>
    <div id="admin">
        <Headerapp />
        
        <div v-if="$store.state.isUserLoggedIn" class="b-container">
            <div class="table-wrapper">
                <div class="table-title b-row">
                    <b-button v-b-modal.addModal @click="state = 'add'" variant="primary">Ajouter un objet</b-button>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Photo</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Auteur</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in itemsComputed" :key="item._id">
                            <td>{{ item.title }}</td>
                            <td class="td-img"><img class="img" :src="item.image"></td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.price }}€</td>
                            <td>Flavien</td>
                            <td>
                                <router-link :to="'/site/item/' + item._id"><a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a></router-link>
                                <a href="#" class="edit" @click="handleModify(item._id, $event), $bvModal.show('addModal')" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="delete" @click="handleDelete(item._id, $event)" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>      
                    </tbody>
                </table>
            </div>


            <b-modal
                id="addModal"
                ref="addModal"
                title="Ajoutez votre objet"
                @hidden="resetModal"
                @ok="handleOk($event)"
                >
                <form>
                    <b-form-group label="Nom de l'objet" invalid-feedback="Name is required">
                        <b-form-input @keydown.enter="handleOk" v-model="name" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Image" invalid-feedback="Image is required">
                        <b-form-file name="image" v-model="file" @change="changeFile" accept=".jpg, .jpeg, .png" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
                        <div class="mt-3">Selected file: {{ file ? file.name : '' }}<button v-if="file" @click="file = null, stateModify = false">X</button></div>
                    </b-form-group>
                    
                    <b-form-group label="Description" invalid-feedback="Description is required">
                        <b-form-input @keydown.enter="handleOk" v-model="description" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Prix" invalid-feedback="Price is required">
                        <b-form-input @keydown.enter="handleOk" v-model="price" required></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div>

        <div v-else class="b-container loginErrContent">
            <div class="loginErr">
                <p>Veuillez-vous connecter</p>
                <router-link to="/authentication"><button class="btn btn-primary">J'ai un compte !</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Headerapp from '../Headerapp.vue';
import ItemService from '../../services/itemService';



export default {
    name: 'Admin',

    components: {
        Headerapp
    },
    data() {
		return {
            items: [],
            id: "",
            name: "",
            file: null,
            image: "",
            description: "",
            price: "",
            state: "",
            stateModify: false
		}
    },
    async created() {
        this.refresh();
    },
    methods: {
        async refresh() {
            await ItemService.get()
                .then(item => {
                    this.items = item.data
                })
                .catch(error => console.log(error))
        },
        
        resetModal() {
            this.name = "";
            this.file = null;
            this.image = "";
            this.description = "";
            this.price = "";
            this.state = "";
            this.stateModify = false;
            this.id = "";
        },
        handleOk(e) {

            const require = () =>  {
                if(this.name != "" && (this.file != null || this.image != "") && this.description != ""  && this.price != "") {
                    return true
                }else {
                    return false
                }
            }

            if(require()){
                let formData = new FormData()

                if(this.state === 'add') { //Si on ajoute un item
                    let item = {
                        "title": this.name,
                        "description": this.description,
                        "userId":this.$store.state.userId,
                        "price": this.price
                    }
                    formData.append('item', JSON.stringify(item))
                    formData.append('image', this.file)

                    for (var value of formData.values()) {
                        console.log(value); 
                    }

                    this.addSubmit(formData);

                }else if(this.state === 'modify'){
                    if(this.stateModify === false) { //si on modifie item sans image
                        let item = {
                            "title": this.name,
                            "description": this.description,
                            "image": this.image,
                            "userId":this.$store.state.userId,
                            "price": this.price
                        }
                        formData.append('item', JSON.stringify(item))
                        this.modifySubmit(formData);
                    }

                    else if(this.stateModify === true) { //si on modifie item avec nouvelle image
                        let item = {
                            "title": this.name,
                            "description": this.description,
                            "userId":this.$store.state.userId,
                            "price": this.price
                        }
                        formData.append('item', JSON.stringify(item))
                        formData.append('image', this.file, item.title)

                        this.modifySubmit(formData);
                    }
                }

                //Close modal
                this.$nextTick(() => {
                    this.$refs.addModal.hide();
                });

            }else {
                e.preventDefault()
                alert('Veuillez remplir tout les champs')
            }

            
        },

        addSubmit(item) {
            // Push the formdata to DB
            ItemService.post(item, this.$store.state.token).then(() => this.refresh())
        },

        handleDelete(id, e) {
            e.preventDefault();

            const confirm = window.confirm('etes-vous sure ?')

            if(confirm) {
                ItemService.delete(id, this.$store.state.token)
                .then(() => this.refresh())
            }
        },

        handleModify(id, e) {
            e.preventDefault();

            this.state = 'modify';
            this.id = id;

            let item;

            this.items.forEach(elt => {
                if(id === elt._id) {
                    item = elt;
                }
            });

            this.name = item.title;
            this.image = item.image;
            this.description = item.description;
            this.price = item.price;
        },

        modifySubmit(item) {
            ItemService.modify(this.id, item, this.$store.state.token)

                .then(() => this.refresh())
        },
        changeFile() {
            if(this.state == "modify") {
                this.stateModify = true;
            }
        }
    },
    computed: {
        itemsComputed() {
            return this.items
        }
    },

    watch: {
        price: function (value) {      
            this.price =  parseInt(value);
            if(isNaN(this.price)){
                this.price = ""
            }
        }
  }
}
</script>

<style scoped>
.b-container {
    width: 1200px;
    margin: 0 auto;
}
.table-wrapper {
    background: #fff;
    padding: 20px;
    margin: 30px 0;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 10px;
    min-height: 45px;
}
.table-title .btn {
    font-size: 1.5em;
}
table.table tr th, table.table tr td {
    font-size: 1.5em;
    border-color: #e9e9e9;
}
table.table td:last-child {
    width: 150px;
}
table.table td a {
    color: #a0a5b1;
    display: inline-block;
    margin: 0 5px;
}
table.table td a i {
    font-size: 1em;
}
table.table td a.view {
    color: #03A9F4;
}
table.table td a.edit {
    color: #FFC107;
}
table.table td a.delete {
    color: #E34724;
}
table.table td i {
    font-size: 19px;
}
.td-img{
    text-align: center;
}
.img{
    max-height: 100px;
}
.loginErrContent {
    text-align: center;
}
.loginErr {
    display: inline-block;
    text-align: center
}

</style>
