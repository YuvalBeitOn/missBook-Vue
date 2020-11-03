import bookApp from './pages/book-app.js';
import homePage from './pages/home-page.js';
import bookDetails from './pages/book-details.js';

const aboutUs = {
    template: `
    <section>
        <h1>about us...</h1>
    </section>
    `
}

const myRoutes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutUs
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
]

export const myRouter = new VueRouter({ routes: myRoutes })