

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

export const RouteConfig=[
  //web页面
  {
    path:'/web',
    component:()=>(import('../../layout/web')),
    name:'webhome',
    model:[import('../../models/user.js')],
  //   routes:[
  //     {
  //       path : '/ad',
  //       component : ()=> import('../IndexPage.js'),
  //       name:'',
  //       model:[import('../../models/init.js')]
  //     },
  //     {

  //     }
  //   ]
   },

  {
    path : '/ad',
    component:()=> (import('../../App.js')),
    name:'ad',
    
    model:[]
  },

  {
    path : '/admin',
    component:()=> (import('../../layout/admin')),
    name:'adminhome',
    
    model:[import('../../models/user.js')],
    routes:[
      {
        path:'/admin/article/manager',
        component:()=>(import("../../views/admin/article/manager")),
        model:[import('../../models/user.js')]
      },
      {
        path:'/admin/',
        component:()=>(import("../../views/admin/home/index")),
        model:[import('../../models/user.js')]
      },
      
    ]
  },
]