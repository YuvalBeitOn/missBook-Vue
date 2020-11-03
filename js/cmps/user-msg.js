import { eventBus } from "../services/event-bus-service.js"

export default {
    template: `
        <section class="user-msg" v-if="msg" :class="msgClass">
            <h2>{{msg.type}} <button @click="msg=null">x</button></h2>
            <span>{{msg.txt}}</span>

        </section>
    `,
    data() {
        return {
            msg: null,
        }
    },
    computed: {
        msgClass() {
            return { success: this.msg.type === 'Success', error: this.msg.type === "Error" }
        }
    },
    created() {
        eventBus.$on('show-msg', msg => {
            this.msg = msg
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        })

    }
}