<template>
  <div id="app" class style="font-family: 'Itim', cursive;"> 
    
      
    <!-- อยากให้หน้าตาเป็นแบบไหนใส่ที่นี่-->
    <back-header />
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 /* text-align: center;*/
  color: #2c3e50;
  margin-top: 10px;
}

/* Fade transition*/
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 2.5s;
}

.fade-enter-to {
  opacity: 1;
}

.thumbnail-pic img{
      width: 150px;
    }


  .style{
    font-family: 'Itim', cursive;
  }
/* user */
  .bg{
    background: linear-gradient(90deg,  #ffd7e1,#e4c6ff);
    border-radius: 20px 20px 20px 20px;
    width: 70%;
    height: 70%;
}

/* Blogs */
 .bg1{
    background: linear-gradient(40deg,  #c7ffee,#fff6e8);
    border-radius: 20px 20px 20px 20px;
    width: 70%;
    height: 70%;
    
}

/* Room */
.bg2{
    background: linear-gradient(120deg,  #b9f2f5,#fbccff);
    border-radius: 20px 20px 20px 20px;
    width: 70%;
    height: 70%;
}

/* Comment */
.bg3{
    background: linear-gradient(120deg,  #E6E6FA,#ffdfea);
    border-radius: 20px 20px 20px 20px;
    width: 70%;
    height: 70%;
}

.bg4{
    background: linear-gradient(0deg,#a9f1df,#ffcfcf);
    border-radius: 20px 20px 20px 20px;
    margin-right: 85px;
    width: 70%;
    height: 70%;
}

/*
form {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px;
  background: white;
  border-radius: 20px 20px 20px 20px;
} */

/* user */
.box{
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  border: 1px;
  border-style: dashed;
  border-color: #DCDCDC;
  background: white;
  border-radius: 30px 30px 30px 30px; /* ความมนของกรอบ*/
  margin-bottom: 10px; /* ระยะห่างกรอบ */
}
/* user ข้างล่าง*/
.box-1{
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  border: 1px;
  border-style: groove;
  border-color: white; /* สีเส้นขอบ */
  background: SteelBlue;
  border-radius: 30px 30px 30px 30px; /* ความมนของกรอบ*/
  margin-bottom: 10px; /* ระยะห่างกรอบ */
  color: white; /* สีฟ้อน */
}

/* Blogs */
.box1{
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  border: 1px;
  border-style: dashed;
  border-color: #DCDCDC;
  background: white;
  border-radius: 30px 30px 30px 30px; /* ความมนของกรอบ*/
  margin-bottom: 10px; /* ระยะห่างกรอบ */
}


/* Room */
.box2{
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  border: 1px;
  border-style: dashed;
  border-color: #DCDCDC;
  background: white;
  border-radius: 30px 30px 30px 30px; /* ความมนของกรอบ*/
  margin-bottom: 10px; /* ระยะห่างกรอบ */
}

/* Comment*/
.box3{
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  border: 1px;
  border-style: dashed;
  border-color: #DCDCDC;
  background: white;
  border-radius: 30px 30px 30px 30px; /* ความมนของกรอบ*/
  margin-bottom: 10px; /* ระยะห่างกรอบ */
}

t{
   border-radius: 20px 20px 20px 20px;
    margin: 30px;
}


</style>
