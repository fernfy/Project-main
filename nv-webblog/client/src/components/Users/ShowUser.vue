<template>
<div>

    <b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg">
    <h1> แสดงผู้ใช้ {{ user.id }} </h1>
    <hr>
    <div class="box">
       <p>id : {{ user.id }}</p>
        <p>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
        <p>email : {{ user.email }}</p>
       <!-- <p>password : {{ user.password}}</p> -->
<hr>
    <p>
     <!--  <b-button pill variant="warning" v-on:click="navigateTo('/user/edit/'+ user.id)">แก้ไขข้อมูล</b-button> -->
      <b-button pill variant="secondary" v-on:click="navigateTo('/users')">ย้อนกลับ</b-button>
    </p>
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
            return {
                user: null
            }
        },
    async created (){
        try{
           let userId = this.$route.params.userId
           this.user = (await UsersService.show(userId)).data
        } catch (error){
        console.log (error)
        }
    },
    methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
}

</script>
<style scoped>


</style>
