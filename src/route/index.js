import VueRouter from 'vue-router';
import createEmail from '../pages/createEmail.vue';
import emailPreview from '../pages/emailPreview.vue';
import inbox from '../pages/inbox-view.vue';

const routes = [
  { path: '/make-email', component: createEmail },
  { path: '/email-preview', component: emailPreview },
  { path: '/', component: inbox },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
