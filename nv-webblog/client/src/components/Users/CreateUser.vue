<template>

<div>

    <b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg">

    <h1> สร้างผู้ใช้งาน </h1>
<hr>
    
    <form class="box" v-on:submit.prevent = "createUser">
        <p>Username : <input type="text" class="form-control" v-model="user.name"></p>
        <p>ชื่อผู้ใช้งาน : <input type="text" class="form-control" v-model="user.lastname"></p>
        <p>email : <input type="text" class="form-control" v-model="user.email"></p>
        <p>password : <input type="password" class="form-control" v-model="user.password"></p>
<hr>
        <p><b-button pill variant="success" type="submit">สร้างผู้ใช้งาน</b-button>
         <b-button pill variant="danger" type="reset">ล้างข้อมูล</b-button>
         <b-button pill variant="secondary" v-on:click="navigateTo('/users')">ย้อนกลับ</b-button>
   </p> 
   </form>
   
    <div class="box-1">
        <p>Username : {{ user.name }} </p>
        <p>ชื่อผู้ใช้งาน : {{ user.lastname }}</p>
        <p>email : {{ user.email }}</p>
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
        async createUser () {
            try {
                await UsersService.post(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (error) {
                console.log(error)
            }
        }
        ,navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    }
}

</script>
<style scoped>
input {
      width: 450px;
    }



</style>
