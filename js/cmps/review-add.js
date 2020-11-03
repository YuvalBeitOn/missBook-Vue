import { bookService } from '../services/book-service.js'
import { utilService } from '../services/util-service.js'
import { eventBus } from '../services/event-bus-service.js';


export default {
    props: ["book"],
    template: `
    <section>
    <button @click="toggleAddReview">Add Review</button>
    <section v-show="isAddingReview" class="review-add">
        <form class="add-review-form flex flex-column justify-center align-center" @submit.prevent>
            <h3>Add a review</h3>
            <label>
                Full Name:
                <input ref="nameInput" type="text" name="nameInput" v-model:value="review.fullName">
            </label>
            <label class="rating">
                Rate: 
                <select v-model:value="review.rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
            <label>
                Read At:
                <input type="date" name="readAt" v-model:value="review.readAt">
            </label>
            <label>
                Tell us more...
            </label>
            <textarea name="moreInfo" cols="40" rows="5" v-model:value="review.moreInfo"></textarea>
        </form>
        <div>
            <button @click="addReview">Add Review</button>
            <button @click="toggleAddReview">Cancel</button>
        </div>
    </section>
</section>
`,
    data() {
        return {
            isAddingReview: false,
            review: {
                id: '',
                fullName: 'Book Reader',
                rating: '1',
                readAt: new Date().toISOString().substr(0, 10),
                moreInfo: ''
            }
        }
    },
    methods: {
        toggleAddReview() {
            this.isAddingReview = !this.isAddingReview;
        },
        addReview() {
            this.review.id = utilService.makeId()
            bookService.addReview(this.review, this.book.id)
                // this.$emit('added', this.bookId);
            eventBus.$emit('show-msg', { txt: 'Review has been added', type: 'Success' })
            this.review = {
                id: '',
                fullName: 'Book Reader',
                rating: '1',
                readAt: new Date().toISOString().substr(0, 10),
                moreInfo: ''
            }
        }
    },
    mounted() {
        this.$refs['nameInput'].focus()
    },
};