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
            hideDesc: true
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
                <li v-bind:style="{color}">{{book.listPrice.amount}}
                    <span>{{displayCurrencyIcon}}</span>
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
                <li><long-text v-bind:txt="book.description"></long-text></li> 
                </div>
            </ul>
            <div class="details-btns flex justify-center align-center">
            <review-add  :book="book"></review-add>
            <button v-on:click="unSelectBook">Back</button>
            </div>
                    <ul class="reviews">
                        <li v-for="review in book.reviews" :key="review.id">
                            <book-reviews @delete="deleteReview" :review="review" />
                        </li>
                    </ul>
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
            return this.book.authors.join(',');
        },
        displayCategories() {
            return this.book.categories.join(', ');
        },
        displayCurrencyIcon() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪';
            else if (this.book.listPrice.currencyCode === 'USD') return '$';
            else return '€';
        },
        color() {
            if (this.book.listPrice.amount > 150) return 'red';
            else if (this.book.listPrice.amount < 20) return 'green';
        },
        isOnSale() {
            return this.book.listPrice.isOnSale;
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
        }
    },
    components: {
        longText,
        reviewAdd,
        bookReviews
    },
    created() {
        console.log(this.$route.params);
        const id = this.$route.params.bookId
        console.log(id);
        bookService.getById(id)
            .then(book => this.book = book)
    }
}