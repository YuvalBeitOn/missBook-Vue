import bookPreview from './book-preview.js';


export default {
    props: ['books'],
    template: `
        <section>
            <ul class="book-list flex wrap">
                   <book-preview v-for="book in books" :key="book.id" :book="book" @click.native="emitSelect(book.id)"/>
            </ul>
        </section>
    `,
    methods: {
        emitSelect(bookId) {
            this.$router.push(`book/${bookId}`)
        }
    },
    components: {
        bookPreview
    }
}