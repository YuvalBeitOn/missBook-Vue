var vid = {
    name: 'video',
    props: ["content"],
    template: `
    <section><iframe width="420" height="315"
    :src="content">
</iframe></section>
    `
}

var txt = {
    name: 'text',
    props: ["content"],
    template: `
    <section><h1>{{content}}</h1></section>
    `
}

export const aboutUs = {
    name: 'about-us',
    template: `
    <section>
        <!-- <h1>About Us</h1>
        <nav>
            <router-link to="/about/team">Our Team</router-link> | 
            <router-link to="/about/services">Our Services</router-link>
        </nav> -->
        <!-- <router-view/> -->
        <component v-for="todo in todos" :key="todo.id" :is="todo.type" :content="todo.content"></component>

    </section>   `,
    data() {

        return {
            todos: [{
                type: 'txt',
                content: 'Learn Vue',


            }, {
                type: 'vid',
                content: 'https://www.youtube.com/watch?v=fwY4EJRM7ak&ab_channel=%D7%A8%D7%91%D7%99%D7%91%D7%9B%D7%A0%D7%A8RavivKaner',

            }]
        }
    },
    components: {
        vid,
        txt
    }
}

export const aboutUsTeam = {
    name: 'about-us-team',
    template: `
    <section>
        <h2>Our team is Awesome</h2>
        <p>
            Team is everyting Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex nesciunt soluta molestiae odio deserunt harum quibusdam quam temporibus ratione eligendi, impedit consequatur. Voluptate quas dicta, praesentium et officiis suscipit.            
        </p>
    </section>
    `
}
export const aboutUsServices = {
    name: 'about-us-services',
    template: `
    <section>
        <h2>Our Services</h2>
        <p>
            Our services are delicious Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex nesciunt soluta molestiae odio deserunt harum quibusdam quam temporibus ratione eligendi, impedit consequatur. Voluptate quas dicta, praesentium et officiis suscipit.            
        </p>
    </section>
    `
}