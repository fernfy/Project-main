<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-left">
        <b-col></b-col>

        <b-col cols="10" class="bg1">
    <h1>แก้ไขการจองห้องพักปฏิบัติธรรม {{ blog.id }} </h1><hr>

    <form class="box1" v-on:submit.prevent="editBlog">
      
      <p> ชื่อ : <input type="text" class="form-control" v-model="blog.firstname" /> </p>
      
      <p> นามสกุล : <input type="text" class="form-control" v-model="blog.lastname" /> </p>
      
      <p> ชื่อห้องพัก :
        <select required class="form-control"  v-model="blog.nroom">
                <option>ชาย1</option>
                <option>ชาย2</option>
                <option>ชาย3</option>
                <option>ชาย4</option>
                <option>ชาย5</option>
                <option>หญิง1</option>
                <option>หญิง2</option>
                <option>หญิง3</option>
                <option>หญิง4</option>
                <option>หญิง5</option>
        </select>
      </p>

      <p> จำนวนผู้เข้าปฏิบัติธรรม : <input type="number" class="form-control" required v-model="blog.pnum" /></p>

      <p> เบอร์โทรศัพท์ : <input type="tel" class="form-control" required v-model="blog.tel" /></p>
      
      <p> วันที่เริ่มต้น : <input type="date" required class="form-control" v-model="blog.dates" /></p>
      
      <p> เวลาที่เริ่มต้น: <input type="time" required class="form-control" v-model="blog.times" /></p>

      <p> วันที่สิ้นสุด : <input type="date" required class="form-control" v-model="blog.datee" /></p>
      
      <p> เวลาที่สิ้นสุด : <input type="time" required class="form-control" v-model="blog.timee" /></p>

      <p> อื่นๆ : <input type="text" required class="form-control" v-model="blog.other" /></p>

  <hr>

      <p>
        <b-button pill variant="warning" type="submit"> แก้ไขการจอง</b-button>
        <b-button pill variant="secondary" v-on:click="navigateTo('/blogs')">ย้อนกลับ</b-button>
      </p>

    </form>

          </b-col>
        <b-col> </b-col>
      </b-row>
    </b-container>

  </div>

</template>

<script>

import BlogService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";

import UploadService from "@/services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
          BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      //uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],

      pictures: [],
      pictureIndex: 0,


      blog: {
        title: "",
        thumbnail: "null",
        pictues: "null", //ระวังตรงนี้คำผิด
        content: "",
        category: "",
        status: "",
      },
      config: {
      //  toolbar: [
      //    ["Bold", "Italic", "Underline", "Strike", "Subscript", "SuperScript"],
      //  ],
        height: 300,
      },
    };
  },
  methods: {
    async editBlog() {
      try {
        await BlogService.put(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },

    onBlur (editor) {
          console.log(editor);
       },
          onFocus (editor) {
            console.log(editor);
          },
    
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      //reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      //this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      //upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }

          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      //handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      //append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      //save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },

    //เรียกใช้ v-0n:cick.prevent ส่ง picture ไปลบ 
    async delFile (material){
      let result = confirm("Want to delete?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }

        await UploadService.delete(dataJSON)

        for (var i=0; i<this.pictures.length; i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }
      }
    },

    /* thumbnail */
    useThumbnail (filename) {
      console.log(filename)
      this.blog.thumbnail = filename
    }
  },
  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },

  },

  
  components: {
    VueCkeditor
  },

  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;


    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
    .dropbox{
        outline: 2px dashed gray; /* the dash box */
        outline-offset: -10px;
        background: #fec3df;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: #fceebe;
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }

    ul.pictures {
      list-style: none;
      padding: 0;
      margin: 0;
      float: left;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    ul.pictures li {
      float: left;
    }
    ul.pictures li img {
      max-width: 180px;
      margin-right: 20px;
    }
    .clearfix {
      clear: both;
    }
    /* thumbnail */
    .thumbnail-pic img{
      width: 200px;
    }

    input,select {
      width: 450px;
    }

</style>