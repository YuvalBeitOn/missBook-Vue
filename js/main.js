import { myRouter } from './routes.js'
import userMsg from './cmps/user-msg.js'
import appHeader from './cmps/app-header.js'
import { bookService } from './services/book-service.js'




const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section class="main-app">   
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
    },
    created() {
        bookService.getBooks()
            .then(books => this.books = books)
    },
}


const app = new Vue(options);