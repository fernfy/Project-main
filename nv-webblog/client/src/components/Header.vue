<template>
    <div>
        <div class="sidebar"> 
            
            <a><router-link :to="{name: 'rooms'}"><i class="fa fa-bars" aria-hidden="true"></i> รายละเอียดห้องปฏิบัติธรรม</router-link></a> 
            <a><router-link :to="{name: 'blogs'}"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> การจองห้องปฏิบัติธรรม</router-link></a>
            <a><router-link :to="{name: 'comments'}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> ความคิดเห็นผู้เข้าใช้ห้องปฏิบัติธรรม</router-link></a>
            <a><router-link :to="{name: 'users'}"><i class="fa fa-address-card-o" aria-hidden="true"></i> ผู้ใช้งาน</router-link></a>
            <a><router-link :to="{name: 'login'}"><i class="fa fa-user-o" aria-hidden="true"></i> Login</router-link></a>
            <a><a v-on:cick.prevent="logout" href="login"><i class="fa fa-sign-in" aria-hidden="true"></i> Logout</a></a>
        
        </div>
    </div>

</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
};
</script>

<style scoped>
    /* The side navigation menu */
.sidebar {
  margin: 0;
  padding: 0;
  width: 230px;
  background-color: rgb(14, 27, 61,0.98);
  position: fixed;
  height: 100%;
  overflow: auto;
  font-size: 17px;
  border-radius: 0px 30px 30px 0px;

}

/* Sidebar links */
.sidebar a {
  display: block;
  color: white;
  padding: 9px; /* ห่างจากตัวออกไป */
  text-decoration: none;
}

/* Active/current link */
.sidebar a.active {
  background-color: #04AA6D;
  color: white;
}

/* Links on mouse-over */
.sidebar a:hover:not(.active) {
  background-color: #62caaf;
  border-radius: 50px 50px 50px 50px;
  color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

.sidebar a.router-link-active{
    color: white;
    background-color: #0090ad;
     border-radius: 50px 50px 50px 50px;

}

</style>