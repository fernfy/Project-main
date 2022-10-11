<template>
  <div>

    <b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg3">


    <h1>ความคิดเห็นทั้งหมด</h1>
  <!--   <p><button v-on:click="logout">Logout</button></p> -->
    <h5>จำนวนความคิดเห็น {{ comments.length }} แสดงความคิดเห็น</h5>
<hr>

    <p><b-button pill variant="success" v-on:click="navigateTo('/comment/create')">แสดงความคิดเห็น</b-button></p>
    <div  class="box3" v-for="comment in comments" v-bind:key="comment.id">
      <p>ความคิดเห็นที่: {{ comment.id }}</p>
      <p>หัวข้อ: {{ comment.title }}</p>
      <p>ชื่อภาพ: {{ comment.thumbnail }}</p>
      
      <transition name="fade"> 
        <div class="thumbnail-pic" v-if="comment.thumbnail != 'null'">
          <img :src="BASE_URL+comment.thumbnail" alt="thumbnail">
        </div>
      </transition>
   
      <p>เนื้อหา: {{ comment.content }}</p>
      <hr>
      <p>
        <b-button pill variant="primary" v-on:click="navigateTo('comment/'+comment.id)">ดูความคิดเห็น</b-button>
        <b-button pill variant="warning" v-on:click="navigateTo('/comment/edit/' +comment.id)">แก้ไขความคิดเห็น</b-button>
        <b-button pill variant="danger" v-on:click="deleteComment(comment)"> ลบความคิดเห็น</b-button>
      </p>
      
    </div>

    </b-col>
      <b-col> </b-col>
     </b-row>
</b-container>

  </div>
</template>
<script>
import CommentService from "@/services/CommentsService";
export default {
  data() {
    return {
         BASE_URL: "http://localhost:8081/assets/uploads/",
      comments: [],
    };
  },
  async created() {
    this.comments = (await CommentService.index()).data;
  },
  methods: {

  /*   logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    */
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteComment(comment) {
      let result = confirm("คุณแน่ใจนะ ที่จะลบรีวิวนี้?");
      if (result) {
        try {
          await CommentService.delete(comment);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.comments = (await CommentService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>