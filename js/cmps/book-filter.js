export default {
    template: `
    <section class="book-filter flex justify-center align-center flex-column">
        <form @submit.prevent = "emitFilter">
            <label>
                Title   
                <input type="text" v-model="filterBy.byName">
            </label>
            <label>
                min price
                <input type="number" v-model.number="filterBy.fromPrice">
            </label>
            <label>
                max price
                <input type="number" v-model.number="filterBy.toPrice">
            </label>
            <button>Apply Filter</button>
        </form>
    </section>

    `,
    data() {
        return {
            filterBy: { byName: '', fromPrice: 0, toPrice: 1000 }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}