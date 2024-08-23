import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ContactList from '@views/contact/ContactList.vue'; 
import ContactAdd from '@views/contact/ContactAdd.vue'; 
import ContactEdit from '@views/contact/ContactEdit.vue';
import ContactShow from '@views/contact/ContactShow.vue';
import not from '@views/contact/Not.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/add',
    name: 'add',
    component: ContactAdd,
  },
  {
    path: '/liste',
    redirect: '/list',
  },
  {
    path: '/list',
    name: 'list',
    component: ContactList, 
  },
  {
    path: '/edit',
    name: 'edit',
    component: ContactEdit, 
  },
  {
    path: '/show',
    name: 'show',
    component: ContactShow, 
  },
  // {
  //   path: '/prets',
  //   name: 'pret',
  //   component: ajouterPret, 
  // }
  {
    path: '/:pathMatch(.*)*',
    component: not,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;