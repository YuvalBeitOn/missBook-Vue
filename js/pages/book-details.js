import { bookService } from '../services/book-service.js'
import '../cmps/book-list.js';
import longText from "../cmps/long-text.js";
import reviewAdd from "../cmps/review-add.js";
import bookReviews from "../cmps/book-reviews.js";
import { eventBus } from '../services/event-bus-service.js';



export default {
    data() {
        return {
            book: null,
            hideDesc: true,
            isAddingReview: false,
            nextBookId: null,
            prevBookId: null
        }
    },
    template: `
        <section v-if="book" class="book-details">
            <ul class="details flex justify-center">
            <div class="main-details flex flex-column space-between">
                <li><img class="book-img" :src="book.thumbnail" alt="book-photo"></li>
                <li class="sale" v-if="isOnSale"><img class="sale-img" src="img/sale.png"></li>
            </div>
            <div class="aside-details flex flex-column space-between">
                <li><h2>{{book.title}}</h2></li>
                <li>{{book.subtitle}}</li>
                <li> {{displayReadLength}}</li>
                <li :class="color">{{book.listPrice.amount}}
                    <span :class="color"  >{{displayCurrencyIcon}}</span>
                </li>          
               <li>Authors: {{displayAuthors}}</li>
               <li>Published Date: {{book.publishedDate}}</li>
                <li> {{displayPublished}}</li>
               <li>Pages: {{book.pageCount}}
                </li>
               <li>Categories: 
                   <span>{{displayCategories}}</span>
                </li>
               <li>Language: {{book.language}}</li>
                <li><long-text :txt="book.description"></long-text></li> 
                </div>
            </ul>
            <div class="details-btns flex justify-center align-center">
            <button @click="toggleAddReview">Add Review</button>
            <review-add v-if="isAddingReview"  :isAddingReview="isAddingReview" :toggleAddReview="toggleAddReview" @added="updateBook" :book="book"></review-add>
            <button v-on:click="unSelectBook">Back</button>
            </div>
                    <ul v-if="book.reviews" class="reviews">
                        <li v-for="review in book.reviews" :key="review.id">
                            <book-reviews @delete="deleteReview" :review="review" />
                        </li>
                    </ul>
             <nav>
            <router-link v-if="prevBookId" :to="prevBookId" exact>Previous Book</router-link>             
            <router-link v-if="nextBookId" :to="nextBookId" exact>Next Book</router-link>
             
            </nav>       
        </section>
    `,
    computed: {
        displayReadLength() {
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount > 200 && this.book.pageCount < 500) return 'Decent Reading'
            else return 'Light Reading'
        },
        displayPublished() {
            if (this.book.publishedDate > 10) return 'Veteran Book'
            else if (this.book.publishedDate < 1) return 'New!'
        },
        displayAuthors() {
            const authors = this.book.authors;
            return (authors) ? authors.join(',') : 'Unknown'
        },
        displayCategories() {
            if (this.book.categories) return this.book.categories.join(', ');
            else return '';
        },
        displayCurrencyIcon() {
            if (this.book.listPrice.amount) {
                if (this.book.listPrice.currencyCode === 'ILS') return '₪';
                else if (this.book.listPrice.currencyCode === 'USD') return '$';
                else return '€';
            } else return 'Not For Sale';
        },
        color() {
            if (this.book.listPrice.amount > 150) return 'red';
            else if (this.book.listPrice.amount < 20) return 'green';
        },
        isOnSale() {
            return this.book.listPrice.isOnSale;
        },
    },

    watch: {
        '$route.params.bookId': function() {
            this.onRouteUpdate();
        }
    },
    methods: {
        unSelectBook() {
            this.$router.push(`/book`)
        },
        deleteReview(reviewId) {
            const idx = this.book.reviews.findIndex(review => review.id === reviewId)
            this.book.reviews.splice(idx, 1)
            bookService.saveBooksToStorage();
            eventBus.$emit('show-msg', { txt: 'Review has been deleted', type: 'Success' })
        },
        updateBook(book) {
            const id = this.$route.params.bookId
            this.book = book;
            console.log(this.book, 'update');

        },
        toggleAddReview() {
            console.log('here');
            this.isAddingReview = !this.isAddingReview;
        },
        onRouteUpdate() {
            const id = this.$route.params.bookId
            console.log(id);
            bookService.getById(id)
                .then(book => {
                    this.book = book;
                    console.log(this.book, 'book');
                })
            const nextPrevBooks = bookService.getNextAndPrevId(id)
            this.nextBookId = nextPrevBooks.nextBookId;
            this.prevBookId = nextPrevBooks.prevBookId;
        }


    },
    components: {
        longText,
        reviewAdd,
        bookReviews
    },
    created() {
        this.onRouteUpdate();
    }
}