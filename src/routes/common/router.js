

// export const RouteConfig=[
//   //web页面
//   {
//     path:'/ad',
//     component:()=>(import('../IndexPage.js')),
//     name:'home',
    

//     model:[],
//   //   routes:[
//   //     {
//   //       path : '/ad',
//   //       component : ()=> import('../IndexPage.js'),
//   //       name:'',
//   //       model:[import('../../models/init.js')]
//   //     },
//   //     {

//   //     }
//   //   ]
//    },

//   {
//     path : '/',
//     component:()=> (import('../../App.js')),
//     name:'ad',

//     model:[]
//   }

// ]

export const RouteConfig = [
  // web页面
  {
    path: '/web',
    component: () => (import('../../layout/web')),
    name: 'webHome',
    model: [import('../../models/user.js'), import('../../models/article.js'), import('../../models/tag.js')],
    routes: [
      {
        path : '/web/home',
        redirect: true,
        component: () => (import('../../views/web/home/home.js')),
        name: 'home',
        model: [import('../../models/user.js')]
      },
      // {
      //   path : '/web/archives',
      //   component: ()=> (import('../../views/web/archives/archives.js')),
      //   name:'archives',
      //   model:[]
      // },
      {
        path : '/web/article/:id',
        component: ()=> (import('../../views/web/article/article.js')),
        name:'article',
        model: [import('../../models/user.js'), import('../../models/article.js'), import('../../models/discuss.js')]
      },
      // {
      //   path : '/web/categories/:name',
      //   component : ()=> (import('../../views/web/categories/categories.js')),
      //   name:'category',
      //   model:[]
      // },
      // {
      //   path : '/web/categories',
      //   component : ()=> (import('../../views/web/categories/categories.js')),
      //   name:'categories',
      //   model:[]
      // },
      // {
      //   path : '/web/categories',
      //   component: ()=> (import('../../views/web/categories/categories.js')),
      //   name:'categories',
      //   model:[]
      // },
      // {
      //   path : '/web/tags/:name',
      //   component: ()=> (import('../../views/web/tag/tag.js')),
      //   name:'tags',
      //   model:[]
      // },
      {
        path : '/web/about',
        component : ()=> (import('../../views/web/about/about.js')),
        name:'about',
        model:[]
      },

    ]
   },

  
  // {
  //   path : '/admin',
  //   component:()=> (import('../../layout/admin')),
  //   name:'adminhome',
    
  //   model:[import('../../models/user.js')],
  //   routes:[
  //     {
  //       path:'/admin/article/manager',
  //       component:()=>(import("../../views/admin/article/manager")),
  //       model:[import('../../models/user.js')]
  //     },
  //     {
  //       path:'/admin/',
  //       component:()=>(import("../../views/admin/home/index")),
  //       model:[import('../../models/user.js')]
  //     },
      
  //   ]
  // },

  {
    path : '/',
    component:()=> (import('../../App.js')),
    name:'ad',
    model:[],
    routes: []
  },
]