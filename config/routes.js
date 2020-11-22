export default [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    component: '../layouts/AuthLayout',
    routes: [
      {
        path: '/auth',
        name: 'auth',
        icon: 'smile',
        component: './auth',
      },
    ],
  },
  {
    path: '/admin',
    component: '../layouts/AdminSecuredLayout',
    routes: [
      {
        path: '/admin',
        component: '../layouts/BasicLayout',
        authority: ['admin'],
        routes: [
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
          },
        ],
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/UserSecuredLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/BasicLayout',
        authority: ['user'],
        routes: [
          {
            path: '/user/',
            name: 'User',
            icon: 'crown',
            component: './user/Landing',
          },
          {
            path: '/user/audit-report',
            name: 'Audit Report',
            icon: 'crown',
            component: './user/AuditReport',
          },
          {
            path: '/user/priorities-report',
            name: 'Prioritites Report',
            icon: 'crown',
            component: './user/Landing',
          },
        ],
      },
    ],
  },
  // {
  //   path: '/',
  //   component: '../layouts/SecurityLayout',
  //   routes: [
  //     {
  //       path: '/',
  //       component: '../layouts/BasicLayout',
  //       authority: ['admin', 'user'],
  //       routes: [
  //         {
  //           path: '/',
  //           redirect: '/welcome',
  //         },
  //         {
  //           path: '/welcome',
  //           name: 'welcome',
  //           icon: 'smile',
  //           component: './Welcome',
  //         },
  //         {
  //           path: '/admin',
  //           name: 'admin',
  //           icon: 'crown',
  //           component: './Admin',
  //           authority: ['admin'],
  //           routes: [
  //             {
  //               path: '/admin/sub-page',
  //               name: 'sub-page',
  //               icon: 'smile',
  //               component: './Welcome',
  //               authority: ['admin'],
  //             },
  //           ],
  //         },
  //         {
  //           name: 'list.table-list',
  //           icon: 'table',
  //           path: '/list',
  //           component: './ListTableList',
  //         },
  //         {
  //           component: './404',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    component: './404',
  },
];
