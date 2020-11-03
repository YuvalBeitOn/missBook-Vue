export default {
    props: ['book'],
    template: `
        <li class="book-preview book flex justify-center align-center flex-column">
            <img :src="book.thumbnail" alt="book-photo">
            <h3>{{book.title}}</h3>
            <h4>{{book.listPrice.amount}}<span>{{displayCurrencyIcon}}</span></h4>
</li>
    `,
    computed: {
        displayCurrencyIcon() {
            // new Intl - curreny
            if (this.book.listPrice.currencyCode === 'ILS') return '₪';
            else if (this.book.listPrice.currencyCode === 'USD') return '$';
            else return '€';
        }
    }

}