<template>
 <div>   

<b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg">
    <h1> ผู้ใช้ทั้งหมด </h1> 
    <h5>จำนวนผู้ใช้งาน {{ users.length }} คน</h5>
    <hr>

   <p> <b-button pill variant="success" v-on:click="navigateTo('/user/create/')">สร้างผู้ใช้ </b-button></p>

    <div class="box" v-for="user in users" v-bind:key="user.id">
       
       <!-- <p>id : {{ user.id }}</p> -->
        <p>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
        <p>email : {{ user.email }}</p>
      <!--   <p>password : {{ user.password}}</p> -->
        <hr>
        <p><b-button pill variant="primary" v-on:click="navigateTo('/user/'+ user.id)">ดูข้อมูลผู้ใช้</b-button>
        
         <b-button pill variant="warning" v-on:click="navigateTo('/user/edit/'+ user.id)">แก้ไขข้อมูล</b-button> 
        <b-button pill variant="danger" v-on:click="deleteUser(user)">ลบข้อมูล</b-button> 
        
    
        </p>
        
    </div>
  <!--  <p><button v-on:click="logout">Logout</button></p> -->


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
                users : []
            }
        },
       async created (){
           this.users = (await UsersService.index()).data
           console.log(results)
        },
        methods: {
            navigateTo (route){
                this.$router.push(route)
             
        },
        async deleteUser(user) {
            let result = confirm("คุณต้องการลบ ผู้ใช้นี้ใช่ไหม?")
               if(result) { 
                   try {
                    await UsersService.delete(user)
                    this.refreshData()
            } catch (error){
            console.log(error)
          }
        }
         },
         async refreshData() {
             this.users = (await UsersService.index()).data
         },
     /*     logout (){
             this.$store.dispatch('setToken', null)
             this.$store.dispatch('setUser', null)
             
             this.$router.push({  
                 name : 'login'
             })
         }, */
    }
}


</script>
<style scoped>


</style>
