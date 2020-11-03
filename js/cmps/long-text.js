export default {
    props: ["txt"],
    template: `
      <section class="mr-5">
        <p>{{textToShow}}</p>
        <button @click="isShowAll = !isShowAll">{{buttonTxt}}</button>
      </section>
      `,
    data() {
        return {
            isShowAll: false,
        };
    },
    computed: {
        textToShow() {
            const txt = this.txt;
            if (txt.length > 100 && !this.isShowAll) {
                return txt.substring(0, 100) + "...";
            } else return txt;
        },
        buttonTxt() {
            if (!this.isShowAll) {
                return "Read more...";
            } else {
                return "Read Less";
            }
        },
    },
};