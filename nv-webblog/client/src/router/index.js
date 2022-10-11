import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'
import Login from '@/components/Login'


//Blog
import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'


//Comment
import CommentIndex from '@/components/Comments/Index'
import CommentCreate from '@/components/Comments/CreateComment'
import CommentEdit from '@/components/Comments/EditComment'
import CommentShow from '@/components/Comments/ShowComment'

//Room
import RoomIndex from '@/components/Rooms/Index'

// upload testing
import Upload from '@/components/Utils/Upload'

Vue.use(Router)

export default new Router({
  mode:'history',
  
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    //authen
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    //blog
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },

    //comments
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/comment/create',
      name: 'comment-create',
      component: CommentCreate
    },
    {
      path: '/comment/edit/:commentId',
      name: 'comment-edit',
      component: CommentEdit
    },
    {
      path: '/comment/:commentId',
      name: 'comment',
      component: CommentShow
    },

    // upload testing
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },

     //room
     {
      path: '/rooms',
      name: 'rooms',
      component: RoomIndex
    },


  ]
})
