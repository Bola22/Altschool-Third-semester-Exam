import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/views/HomePage.vue"
import RepoPage from "@/views/RepoPage.vue"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faCodeFork } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faCodeFork, faGithub)



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "HomePage",
            component: HomePage,
        } ,
        {
            path: "/repo:id",
            name: "RepoPage",
            component: RepoPage,
        },
        // { path: '/:pathMatch(.*)*',
        //   name: 'NotFound', 
        //   component: NotFound 
        // },
    ]
})

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
