<template>

<div>

<b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg">

    <h1> แก้ไขผู้ใช้ {{ user.id }}</h1><hr>
    
    <form class="box" v-on:submit.prevent = "editUser">
        <p>name : <input type="text" v-model="user.name"></p>
        <p>lastname : <input type="text" v-model="user.lastname"></p>
        <p>email : <input type="text" v-model="user.email"></p>
        <p>password : <input type="text" v-model="user.password"></p>
        
        <P><b-button type="submit" pill variant="warning">แก้ไขผู้ใช้</b-button>
        <b-button pill variant="secondary" v-on:click="navigateTo('/users')">ย้อนกลับ</b-button>
        </P>
    </form>

    <hr>

    <div class="box-1">
        <p>name : {{ user.name }} </p>
        <p>lastname : {{ user.lastname }}</p>
        <p>email : {{ user.email }}</p>
        <p>password : {{ user.password}}</p>
    </div>

</b-col>
      <b-col> </b-col>
     </b-row>
</b-container>

</div>
</template>

<script>
import UsersService from '@/services/UsersService'

    export default {
         data () {
            return{
            user:{
                name : '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },
    methods:{
        async editUser() {
            try {
                await UsersService.put(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (error) {
                console.log(error)
            }
        },
        navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    },
      async created () { 
          try {
              let userId = this.$route.params.userId
              this.user = (await UsersService.show(userId)).data
            } catch (error) {
                console.log(error)
            }

}
    }

</script>
<style scoped>


</style>
