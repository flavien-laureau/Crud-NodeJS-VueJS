<template>
    <div>
        <Headerapp />

    <div id="adminlog">
        <fieldset>
            <legend>Vos identifiants :</legend>

            <input 
                v-model="email" 
                type="text" 
                name="login" 
                id="login" 
                @keypress.enter="login"
                placeholder="Email">
            <br>
            <input 
                v-model="password" 
                type="text" 
                name="password" 
                id="password" 
                @keypress.enter="login"
                placeholder="Mot de passe">
            <br>
            <button @click='login' id="btn">Login</button>

        </fieldset>
    </div>
        
    </div>
</template>

<script>
import Headerapp from '../Headerapp.vue';
import AuthenticationService from '../../services/authenticationService'

export default {
    name: 'Auth',
    components: {
        Headerapp
    },
    data() {
		return {
            email: 'test@gmail.com',
            password: 'MDP'
		}
    },
    methods: {
        login() { 
            AuthenticationService.login({
                email: this.email,
                password: this.password
            })
                .then(res => {
                    this.$store.dispatch('setToken', res.data.token)
                    this.$store.dispatch('setUser', res.data.userId)
                    this.$router.push("/admin")
                })
                .catch(error => {
                    console.log('Erreur de connexion :', error)
                    this.email = '';
                    this.password = '';
                    alert('Email et/ou mot de passe incorrect')
                })
        }
    }
}
</script>

<style scoped>
#adminlog{
    display: flex;
    justify-content: center;
}
form {
    padding:10px;
    width:280px;
}
fieldset {
    padding:0 20px 20px 20px;
    margin-bottom:10px;
    border:1px solid #333;
}
legend {
    color:#333;
    font-weight:bold
}
input{
    background-color:#FFF3F3;
    padding:3px;
    border:1px solid #F5C5C5;
    border-radius:5px;
    width:200px;
    box-shadow:1px 1px 2px #C0C0C0 inset;
    margin: 5px 0;
}

#btn{
    width:100px;
    margin-top:5px;
    box-shadow:1px 1px 1px #D83F3D;
    cursor:pointer;
}
</style>
