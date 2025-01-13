import './fonts.css'
import './index.css';
import router from './router'
import App from './App.vue'
import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useGraphql from './composables/useGraphql'

const app = createApp({
    setup() {
      const { apolloClient } = useGraphql()
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })
  
app.use(router)

app.mount('#app')