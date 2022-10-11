<template>
  <div> 
    
    <b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg3">


    <h1>แสดงความคิดเห็น {{ comment.id }} </h1><hr>

<div class="box3">
    <h5>ความคิดเห็น: {{ comment.id }}</h5><hr>
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
      <b-button  pill variant="warning" v-on:click="navigateTo('/comment/edit/' + comment.id)">
        แก้ไขความคิดเห็น
      </b-button>
      <b-button pill variant="secondary" v-on:click="navigateTo('/comments')">ย้อนกลับ</b-button>
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
      comment: null,
    };
  },
  async created() {
    try {
      let commentId = this.$route.params.commentId;
      this.comment = (await CommentService.show(commentId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>