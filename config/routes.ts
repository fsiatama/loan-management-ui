﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'home',
    icon: 'home',
    component: './Dashboard',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list.borrowers-list',
    icon: 'user',
    path: '/borrowers',
    component: './Borrowers',
  },
  {
    name: 'list.loans-list',
    icon: 'bank',
    path: '/loans',
    component: './Loans',
  },
  {
    name: 'list.concepts-list',
    icon: 'creditCard',
    path: '/concepts',
    component: './Concepts',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
