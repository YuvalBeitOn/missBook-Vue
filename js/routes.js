import bookApp from './pages/book-app.js';
import homePage from './pages/home-page.js';
import bookDetails from './pages/book-details.js';
import { aboutUs, aboutUsServices, aboutUsTeam } from './pages/about-us.js';


const myRoutes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutUs,
        children: [{
                path: 'services',
                component: aboutUsServices
            },
            {
                path: 'team',
                component: aboutUsTeam
            },
        ]
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