import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.js';
import bookDetails from '../pages/book-details.js';
import bookFilter from '../cmps/book-filter.js';
import { eventBus } from '../services/event-bus-service.js'


export default {
    template: `
        <section class="book-app container">
            <div  v-if="!selectedBook">
                <book-filter @filtered="setFilter"/>
                <book-list :books="booksToShow" @selected="selectBook"/>            
            </div>
            <book-details v-else :book="selectedBook" @unSelect="selectedBook=null"/>                
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        }
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const { fromPrice, toPrice, byName } = this.filterBy
            const txt = byName.toLowerCase();
            return this.books.filter(book => {
                return book.title.includes(txt) && book.listPrice.amount > fromPrice && book.listPrice.amount < toPrice
            })
        }
    },
    created() {
        bookService.getBooks()
            .then(books => this.books = books)
    },
    components: {
        bookDetails,
        bookFilter,
        bookList
    }
}