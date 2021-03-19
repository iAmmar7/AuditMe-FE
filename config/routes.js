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
  // {
  //   path: '/admin',
  //   component: '../layouts/AdminSecuredLayout',
  //   routes: [
  //     {
  //       path: '/admin',
  //       component: '../layouts/BasicLayout',
  //       authority: ['admin'],
  //       routes: [
  //         {
  //           path: '/admin',
  //           name: 'admin',
  //           icon: 'crown',
  //           component: './Admin',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/user',
    component: '../layouts/UserSecuredLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['user'],
        routes: [
          {
            path: '/user/',
            name: 'Dashboard',
            icon: 'dashboard',
            component: './user/Landing',
          },
          {
            path: '/user/priorities-form',
            name: 'Priorities Issues',
            icon: 'form',
            component: './user/PrioritiesForm',
          },
          {
            path: '/user/initiative-form',
            name: 'Initiatives',
            icon: 'edit',
            component: './user/InitiativesForm',
          },
          {
            path: '/user/reports',
            name: 'Reports',
            icon: 'tablet',
            routes: [
              // {
              //   path: '/user/reports/observation-reports',
              //   name: 'Observations',
              //   component: './user/ObservationsReports',
              // },
              {
                path: '/user/reports/priorities-reports',
                name: 'Priorities Issues',
                component: './user/PrioritiesReports',
              },
              {
                path: '/user/reports/initiative-reports',
                name: 'Initiatives',
                component: './user/InitiativesReports',
              },
            ],
          },
          {
            path: '/user/settings',
            name: 'Settings',
            icon: 'setting',
            hideInMenu: true,
            component: './user/Settings',
          },
          {
            path: '/user/am-checklist',
            name: 'Area Manager Checklist',
            icon: 'edit',
            component: './user/AMChecklist',
          },
          {
            path: '/user/employee-feedback',
            name: 'Employee Feedback',
            icon: 'edit',
            component: './user/EmployeeFeedback',
          },
          {
            component: './404',
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
