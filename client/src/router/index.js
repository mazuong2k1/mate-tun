import Vue from 'vue'
import Router from 'vue-router'
import SearchAds from '@/pages/tool/SearchAds'
import ImportToShow from '@/pages/tool/ImportToShow'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/tool",
      name: "Home"
    },
    {
      path: '/tool',
      name: 'Search Ads',
      component: SearchAds
    },
    {
      path: '/import',
      name: 'Import To Show',
      component: ImportToShow
    },
    {
      path: '*',
      redirect: "/"
    }
  ]
})
