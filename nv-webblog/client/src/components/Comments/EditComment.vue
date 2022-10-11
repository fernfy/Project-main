<template>
  <div>
<b-container class="bv-example-row">
    <b-row class="text-left">
         <b-col></b-col>

         <b-col cols="10" class="bg3">


    <h1>แก้ไขความคิดเห็น {{ comment.id }}</h1>
    <hr>
    <form class="box3" v-on:submit.prevent="editComment">
      <p>หัวข้อ: <input type="text" class="form-control" v-model="comment.title" /></p>

<!-- add-->

 <transition name="fade"> 
        <div class="thumbnail-pic" v-if="comment.thumbnail != 'null'">
          <img :src="BASE_URL+comment.thumbnail" alt="thumbnail">
        </div>
      </transition>

 <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          < <p v-if="isInitial || isSuccess"/> >
          <p v-if="isInitial">
             ลากไฟล์ของคุณมาที่นี่ <br />
                  หรือคลิกเพื่อเรียกดู
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">อัพโหลดรูปเรียบร้อยแล้ว!.</p>
          <p v-if="isFailed">อัพโหลดรูปไม่สำเร็จ</p>
        </div>

        <div>
          <ul class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img
                style="margin-bottom: 5px"
                :src="BASE_URL + picture.name"
                alt="picture image"
              />
              <hr>
              <button v-on:click.prevent="useThumbnail(picture.name)">แสดงภาพขนาดเล็ก</button>
              <button v-on:click.prevent="delFile(picture)"> ลบรูปภาพ </button>
              
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </form>



      <p><strong>เนื้อหา:</strong></p>
      <p>
        <vue-ckeditor
          v-model.lazy="comment.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($ecent)"
        />
      </p>
      <hr>
      <p>
        <b-button  pill variant="warning"  type="submit">ยืนยันการแก้ไขความคิดเห็น</b-button>
         <b-button pill variant="secondary" v-on:click="navigateTo('/comments')">ย้อนกลับ</b-button>
         <br>
      </p>
    </form>
</b-col>
      <b-col> </b-col>
     </b-row>

</b-container>


  </div>
</template>
<script>

import CommentService from "@/services/CommentsService";
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


      comment: {
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
    async editComment() {
      try {
        await CommentService.put(this.comment);
        this.$router.push({
          name: "comments",
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

 created () {
      this.config.toolbar = [
        {
          name: "document",
          items: [
            "Source",
            "-",
            "Save",
            "NewPage",
            "Preview",
            "Print",
            "-",
            "Templates"
          ]
        },
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "PasteFrromWord",
            "-",
            "Undo",
            "Redo"
          ]
        },
        {
          name: "editing",
          items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
          },
        {
        name: "forms",
        items: [
          "From",
          "Checkbox",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
    },
    "/",
    {
        name: "basicstyles",
        items: [
          "Bold",
          "Itatic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
    },
    {
      name: "paragaph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "Links", items: ["Link", "Unlink", "Anchor"] },
    {
      name:"insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontaRule",
        "Smiley",
        "PageBreak",
        "Iframe",
        "InsertPre"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"]},
    { name: "colors", items: ["TextColor", "BGColor"]},
    { name: "tools", items: ["Maximize", "ShowBlocks"]},
    { name: "about", items: ["About"]}

      ]
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
      let result = confirm("คุณแน่ใจนะที่จะลบรีวิวนี้?")
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
      this.comment.thumbnail = filename
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
      let commentId = this.$route.params.commentId;
      this.comment = (await CommentService.show(commentId)).data;


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
    input {
      width: 450px;
}

</style>