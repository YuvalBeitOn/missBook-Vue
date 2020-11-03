import { bookService } from '../services/book-service.js'

export default {
    template: `
    <section class="book-add flex justify-center align-center">
        <input @input="getBooks" type="text" list="googleBooks" name="search-input" placeholder="Add book...">
        <ul v-if="bookOptions">
            <li  v-for="opt in bookOptions"  :key='opt.id'>  {{opt.title}}  <button  @click="addBook(opt)">+</button> </li>
        </ul>
    </section>`,
    data() {
        return {
            bookOptions: null,
        }
    },
    methods: {
        getBooks(ev) {
            console.log(ev);
            bookService.getBooksFromGoogle(ev.target.value)
                .then(books => {
                    this.bookOptions = books
                });
            console.log(this.inputVal, 'getBooks');
        },
        addBook(book) {
            console.log('addbook');
            bookService.addBook(book);
            bookOptions = null;
        }

    },
    created() {

    }
}