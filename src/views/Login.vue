<template>
    <div>
        <label>Username atau Meail Anda</label>
        <input type="text" v-model="form.username"/>

        <label>Password</label>
        <input type="text" v-model="form.password"/>
        <button v-on:click="submit()">Submit</button>
        <router-link to="/register">Register</router-link>
    </div>
    
    

</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            form: {
                username: '',
                password:''
            }
        }
    },

    methods: {
        submit(){
            axios.post('localhost:8082/guess/signup', this.form)
                .then(function( ){
                    // Handle success
                    alert ("suskses menambahkan data")
                }.bind(this));
        }
    }
}
</script>