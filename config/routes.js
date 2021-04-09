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
    path: '/',
    component: '../layouts/UserSecuredLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['user'],
        routes: [
          {
            path: '/home',
            name: 'Home',
            icon: 'home',
            component: './home/Home',
          },
          {
            path: '/eder',
            name: 'EDER',
            icon: 'form',
            routes: [
              {
                path: '/eder/dashboard',
                name: 'Dashboard',
                component: './eder/Dashboard',
              },
              {
                path: '/eder/timeline',
                name: 'Timeline',
                component: './eder/Timeline',
                hideInMenu: true,
              },
              {
                path: '/eder/priorities-form',
                name: 'Priority Issues',
                component: './eder/PrioritiesForm',
              },
              {
                path: '/eder/initiative-form',
                name: 'Initiatives',
                component: './eder/InitiativesForm',
              },
              {
                path: '/eder/observation-form',
                name: 'Observations',
                component: './eder/PrioritiesForm',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/station-visit',
            name: 'Station Visit',
            icon: 'FolderViewOutlined',
            routes: [
              {
                path: '/station-visit/checklist',
                name: 'Housekeeping Checklist',
                component: './station_visit/HousekeepingChecklist',
              },
            ],
          },
          {
            path: '/employee-feedback',
            name: 'Employee Feedback',
            icon: 'contacts',
            routes: [
              {
                path: '/employee-feedback/submission',
                name: 'Feedback Submission',
                component: './employee_feedback/EmployeeFeedback',
              },
            ],
          },
          {
            path: '/reports',
            name: 'Reports',
            icon: 'tablet',
            routes: [
              {
                path: '/reports/initiative-reports',
                name: 'Initiatives',
                component: './reports/InitiativesReports',
              },
              {
                path: '/reports/am-checklist',
                name: 'Housekeeping Checklist',
                component: './station_visit/HousekeepingChecklist',
              },
              {
                path: '/reports/priorities-reports',
                name: 'Priority Issues',
                component: './reports/PrioritiesReports',
              },
              {
                path: '/reports/observation-reports',
                name: 'Observations',
                component: './reports/ObservationsReports',
                hideInMenu: true,
              },
              {
                path: '/reports/feedback-reports',
                name: 'Feedback',
                component: './reports/EmployeeFeedbackReports',
              },
            ],
          },
          {
            path: '/settings',
            name: 'Settings',
            icon: 'setting',
            hideInMenu: true,
            component: './user/Settings',
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
