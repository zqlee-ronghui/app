import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/views/Main";
import ProjectEdit from "@/views/ProjectEdit";
import ProjectList from "@/views/ProjectList";
import View from "@/views/View";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {path: '/project/create', component: ProjectEdit},
      {path: '/project/list', component: ProjectList},
      {path: '/project/view/:id', component: View, props: true}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
