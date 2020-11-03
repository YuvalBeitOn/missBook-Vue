import { myRouter } from './routes.js'
import userMsg from './cmps/user-msg.js'
import appHeader from './cmps/app-header.js'


const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section>   
            <app-header></app-header>         
            <main>
                <router-view></router-view>
            </main>
            <user-msg/>
        </section>
    `,
    components: {
        userMsg,
        appHeader
    }
}

const app = new Vue(options);